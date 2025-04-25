import {StatProps} from '@/assets/types/achievement';
import {baseAPI} from '../instance';

export const getStatistics = async () => {
  try {
    const response = await baseAPI.get<StatProps>('/users/me/statistics');
    return response.data;
  } catch (error) {
    throw error;
  }
};
