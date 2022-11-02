import axios from 'axios';

const agent = axios.create({ baseURL: '/api/v1/root' });

export const login = (payload: { username: string; password: string }) =>
  agent.post<{ token: string }>('/users/login', payload).then((res) => res.data);
