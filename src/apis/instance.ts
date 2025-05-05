import axios from 'axios';

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

    const isRefreshRequest = originalRequest.url.includes('/users/refresh');
    if (isRefreshRequest) {
      return Promise.reject(err);
    }

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
        processQueue(null);
        return baseAPI(originalRequest);
      } catch (refreshError: any) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  },
);
