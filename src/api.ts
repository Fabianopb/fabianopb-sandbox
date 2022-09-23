import axios from 'axios';

type Skill = {
  name: string;
  value: number;
};

export const getSkills = () => axios.get<Skill[]>('/api/v1/portfolio/skills').then((r) => r.data);
