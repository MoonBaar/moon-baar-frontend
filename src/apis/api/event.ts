import {EventListProps} from '@/assets/types/event';
import {baseAPI} from '../instance';

interface EventListParams {
  query?: string | null;
  page: number;
  category?: number | null;
  isFree?: boolean | null;
}

export const getEventList = async ({
  query,
  page,
  category,
  isFree,
}: EventListParams): Promise<EventListProps> => {
  const {data} = await baseAPI.get('/events', {
    params: {query, page, category, isFree},
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
