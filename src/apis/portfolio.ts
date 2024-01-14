import axios from 'axios';
import { Project } from '../portfolio/types';
import { getToken } from '../common/session';

const agent = axios.create({ baseURL: '/api/v1/portfolio' });

agent.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    // eslint-disable-next-line dot-notation
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

type ProjectPayload = Omit<Project, '_id'>;

// Projects endpoints
export const getProjects = () => agent.get<Project[]>('/projects').then((r) => r.data);

export const addProject = (payload: ProjectPayload) => agent.post<string>('/projects', payload).then((res) => res.data);

export const editProject = (projectId: string, payload: ProjectPayload) =>
  agent.put(`/projects/${projectId}`, payload).then((res) => res.data);

export const deleteProject = (projectId: string) => agent.delete(`/projects/${projectId}`).then((res) => res.data);
