import axios from 'axios';

export const getTest = () => axios.get<string>('/api/v1/hello').then(r => r.data);