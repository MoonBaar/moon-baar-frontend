import {baseAPI} from '../instance';

export const postLike = async (id: number) => {
  try {
    const {data} = await baseAPI.post(`/events/${id}/like`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const delLike = async (id: number) => {
  try {
    const {data} = await baseAPI.delete(`/events/${id}/like`);
    return data;
  } catch (error) {
    throw error;
  }
};
