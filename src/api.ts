import axios from 'axios';

type Example = {
  id: string;
  name: string;
  value: number;
};

export const getTest = () => axios.get<string>('/api/v1/hello').then((r) => r.data);

export const getExamples = () => axios.get<Example[]>('/api/v1/examples').then((r) => r.data);
