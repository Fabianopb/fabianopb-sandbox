import axios from 'axios';

const agent = axios.create({ baseURL: '/api/v1/portfolio' });

type Skill = {
  name: string;
  value: number;
};

export const login = (payload: { username: string; password: string }) =>
  agent.post<{ token: string }>('/users/login', payload).then((res) => res.data);

export const getSkills = () => agent.get<Skill[]>('/skills').then((r) => r.data);

export const addSkills = () => agent.post('/skills');
