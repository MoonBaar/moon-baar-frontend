import {EventListProps} from '@/assets/types/eventListType';
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
