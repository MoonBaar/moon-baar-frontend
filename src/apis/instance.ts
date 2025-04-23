import axios from 'axios';
import {logout} from './api/users';

export const baseURL = process.env.REACT_APP_BASE_URL;

export const baseAPI = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
type FailedQueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: Error | null) => void;
};

let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

baseAPI.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        }).then(() => baseAPI(originalRequest));
      }

      isRefreshing = true;

      try {
        await baseAPI.post('/users/refresh');
        console.log('토큰 재발급');
        processQueue(null);
        return baseAPI(originalRequest);
      } catch (refreshError: any) {
        processQueue(refreshError, null);
        const status = refreshError.response?.status;

        if (status === 401 || status === 403) {
          console.log('토큰 만료');
          await logout();
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  },
);
