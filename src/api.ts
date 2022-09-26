import axios from 'axios';

const agent = axios.create({ baseURL: '/api/v1/portfolio' });

type Skill = {
  _id: string;
  name: string;
  value: number;
};

type SkillPayload = {
  name: string;
  value: number;
};

export const login = (payload: { username: string; password: string }) =>
  agent.post<{ token: string }>('/users/login', payload).then((res) => res.data);

export const getSkills = () => agent.get<Skill[]>('/skills').then((r) => r.data);

export const addSkills = (payload: SkillPayload[]) => agent.post('/skills', payload).then((res) => res.data);

export const editSkill = (skillId: string, payload: SkillPayload) =>
  agent.put(`/skills/${skillId}`, payload).then((res) => res.data);

export const deleteSkill = (skillId: string) => agent.put(`/skills/${skillId}`).then((res) => res.data);
