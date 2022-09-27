import jwtDecode from 'jwt-decode';

export const getToken = () => localStorage.getItem('portfolio_token');

export const setSession = (token: string) => {
  localStorage.setItem('portfolio_token', token);
};

export const clearSession = () => {
  localStorage.removeItem('portfolio_token');
};

export const isSessionValid = () => {
  const token = localStorage.getItem('portfolio_token');
  if (!token) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(token);
  const now = new Date();
  if (now.valueOf() > decoded.exp * 1000) {
    clearSession();
    return false;
  }
  return true;
};
