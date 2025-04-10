import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const baseAPI = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});
