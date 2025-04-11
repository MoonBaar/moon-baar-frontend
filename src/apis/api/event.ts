import {baseAPI} from '../instance';

export const getEventList = async () => {
  try {
    const {data} = await baseAPI.get('/events');

    return data;
  } catch (error) {
    console.log('get event list fail: ', error);
  }
};
