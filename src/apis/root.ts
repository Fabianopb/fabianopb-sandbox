import axios from 'axios';
import { getToken } from '../common/session';

const agent = axios.create({ baseURL: '/api/v1/root' });

agent.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    // eslint-disable-next-line dot-notation
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const login = (payload: { username: string; password: string }) =>
  agent.post<{ token: string }>('/users/login', payload).then((res) => res.data);

export const getSession = () => agent.get<{ token: string }>('/users/session').then((res) => res.data);
