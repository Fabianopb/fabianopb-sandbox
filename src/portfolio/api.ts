import axios from 'axios';
import { Badge, Project, Skill } from './types';
import { getToken } from './utils';

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

type ProjectPayload = Omit<Project, '_id'>;

// User endpoints
export const login = (payload: { username: string; password: string }) =>
  agent.post<{ token: string }>('/users/login', payload).then((res) => res.data);

// Skills endpoints
export const getSkills = () => agent.get<Skill[]>('/skills').then((r) => r.data);

export const addSkills = (payload: SkillPayload[]) => agent.post('/skills', payload).then((res) => res.data);

export const editSkill = (skillId: string, payload: SkillPayload) =>
  agent.put(`/skills/${skillId}`, payload).then((res) => res.data);

export const deleteSkill = (skillId: string) => agent.delete(`/skills/${skillId}`).then((res) => res.data);

// Badges endpoints
export const getBadges = () => agent.get<Badge[]>('/badges').then((r) => r.data);

export const addBadge = (payload: BadgePayload) => agent.post('/badges', payload).then((res) => res.data);

export const editBadge = (badgeId: string, payload: BadgePayload) =>
  agent.put(`/badges/${badgeId}`, payload).then((res) => res.data);

export const deleteBadge = (badgeId: string) => agent.delete(`/badges/${badgeId}`).then((res) => res.data);

// Projects endpoints
export const getProjects = () => agent.get<Project[]>('/projects').then((r) => r.data);

export const addProject = (payload: ProjectPayload) => agent.post<string>('/projects', payload).then((res) => res.data);

export const editProject = (projectId: string, payload: ProjectPayload) =>
  agent.put(`/projects/${projectId}`, payload).then((res) => res.data);

export const deleteProject = (projectId: string) => agent.delete(`/projects/${projectId}`).then((res) => res.data);
