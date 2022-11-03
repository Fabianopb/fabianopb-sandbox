export type Role = 'portfolio_admin' | 'playstation_user';

export type User = {
  _id?: string;
  username: string;
  password: string;
  role: Role;
  psStoreHash?: string;
};
