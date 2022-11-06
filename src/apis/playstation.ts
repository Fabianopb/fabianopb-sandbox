import axios from 'axios';
import { getToken } from '../common/session';

const agent = axios.create({ baseURL: '/api/v1/playstation' });

agent.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    // eslint-disable-next-line dot-notation
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const getPs4Games = () => agent.get(`/wishlist`).then((res) => res.data);
