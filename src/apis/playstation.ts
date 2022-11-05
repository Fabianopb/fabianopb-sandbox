import axios from 'axios';

const agent = axios.create({ baseURL: '/api/v1/playstation' });

export const getPs4Games = (gameId: string) => agent.get(`ps-store/${gameId}`).then((res) => res.data);
