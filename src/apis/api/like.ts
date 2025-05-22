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

export const getLikeList = async (page: number) => {
  try {
    const {data} = await baseAPI.get('/users/me/likes', {
      params: {page, size: 10},
    });
    return data;
  } catch (error) {
    throw error;
  }
};
