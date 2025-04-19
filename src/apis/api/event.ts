import {EventListProps} from '@/assets/types/event';
import {baseAPI} from '../instance';

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
