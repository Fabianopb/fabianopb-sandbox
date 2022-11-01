export type Role = 'portfolio_admin';

export type User = {
  _id?: string;
  username: string;
  password: string;
  role: Role;
};
