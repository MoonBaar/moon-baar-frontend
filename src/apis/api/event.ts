import {
  EventDetailProps,
  EventDetailStatusProps,
  EventListProps,
} from '@/assets/types/event';
import {baseAPI} from '../instance';
import {useQuery} from '@tanstack/react-query';
import {boundsProps, footprintListProps} from '@/assets/types/map';
import {AxiosError} from 'axios';
import {getEventDetailWithStatus} from '../services/event';

interface EventListParams {
  query: string | null;
  page: number;
  categoryId: number | null;
  isFree: boolean | null;
  districtId: number | null;
  startDate: string | null;
}

export const getEventList = async ({
  query,
  page,
  categoryId,
  isFree,
  districtId,
  startDate,
}: EventListParams): Promise<EventListProps> => {
  const {data} = await baseAPI.get('/events', {
    params: {query, page, categoryId, isFree, districtId, startDate},
  });

  return data;
};

export const getEventListWithStatus = async ({
  query,
  page,
  categoryId,
  isFree,
  districtId,
  startDate,
}: EventListParams): Promise<EventListProps> => {
  const {data} = await baseAPI.get('/events/with-status', {
    params: {query, page, categoryId, isFree, districtId, startDate},
  });

  return data;
};

export const getEventDetail = async (id: number) => {
  const response = await baseAPI.get<EventDetailProps>(`/events/${id}`);

  return response.data;
};

export const useGetEventDetail = (id: number) => {
  return useQuery({
    queryKey: ['info', id],
    queryFn: () => getEventDetailWithStatus(id),
  });
};

export const getEventDetailStatus = async (id: number) => {
  try {
    const res = await baseAPI.get<EventDetailStatusProps>(
      `/events/${id}/user-status`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const fetchFootPrints = async (bounds: boundsProps) => {
  const response = await baseAPI.get<footprintListProps>(
    '/users/me/footprints',
    {
      params: bounds,
    },
  );
  return response.data;
};

export const useGetFootPrints = (bounds: boundsProps) => {
  return useQuery({
    queryKey: ['events', bounds],
    queryFn: () => fetchFootPrints(bounds),
    enabled:
      bounds.maxLat !== null &&
      bounds.minLat !== null &&
      bounds.maxLng !== null &&
      bounds.minLng !== null,
  });
};

export const postVisit = async (
  id: number,
  latitude: number,
  longitude: number,
) => {
  try {
    const {data} = await baseAPI.post(`/events/${id}/visit`, {
      timeout: 8000,
      latitude,
      longitude,
    });

    return data;
  } catch (error) {
    throw error instanceof AxiosError && error.response?.data.message;
  }
};

export const getVisitList = async (page: number, period: string) => {
  try {
    const {data} = await baseAPI.get('/users/me/visits', {
      params: {
        page,
        size: 10,
        period,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
