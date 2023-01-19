import axios from 'axios';
import { getToken } from '../common/session';
import { WishlistItem } from '../../types/playstation';

type WishlistItemEditPayload = Omit<WishlistItem, '_id'>;

const agent = axios.create({ baseURL: '/api/v1/playstation' });

agent.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    // eslint-disable-next-line dot-notation
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const getPs4Games = () => agent.get<WishlistItem[]>('/wishlist').then((res) => res.data);

export const addPs4Game = (payload: { gameId: string; name: string; imageSrc?: string }) =>
  agent.post('/wishlist', payload);

export const editPsGame = (itemId: string, payload: WishlistItemEditPayload) =>
  agent.put(`/wishlist/${itemId}`, payload);
