import {EventListProps} from '@/assets/types/event';
import {baseAPI} from '../instance';
import {useQuery} from '@tanstack/react-query';
import {boundsProps, footprintListProps} from '@/assets/types/map';

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

export const getEventDetail = async (id: number) => {
  try {
    const {data} = await baseAPI.get(`/events/${id}`);

    return data;
  } catch (error) {
    console.log('get event detail fail: ', error);
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
