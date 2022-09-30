import axios from 'axios';
import { Badge, Skill } from './portfolio/types';
import { getToken } from './portfolio/utils';

const agent = axios.create({ baseURL: '/api/v1/portfolio' });

agent.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    // eslint-disable-next-line dot-notation
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

type SkillPayload = Omit<Skill, '_id'>;

type BadgePayload = Omit<Badge, '_id'>;

export const login = (payload: { username: string; password: string }) =>
  agent.post<{ token: string }>('/users/login', payload).then((res) => res.data);

export const getSkills = () => agent.get<Skill[]>('/skills').then((r) => r.data);

export const addSkills = (payload: SkillPayload[]) => agent.post('/skills', payload).then((res) => res.data);

export const editSkill = (skillId: string, payload: SkillPayload) =>
  agent.put(`/skills/${skillId}`, payload).then((res) => res.data);

export const deleteSkill = (skillId: string) => agent.delete(`/skills/${skillId}`).then((res) => res.data);

export const getBadges = () => agent.get<Badge[]>('/badges').then((r) => r.data);

export const addBadge = (payload: BadgePayload) => agent.post('/badges', payload).then((res) => res.data);
