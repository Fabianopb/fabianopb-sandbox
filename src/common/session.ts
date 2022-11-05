import jwtDecode from 'jwt-decode';

const TOKEN_STORAGE_KEY = 'fabianopb_token';

export const getToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export const setSession = (token: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const isSessionValid = () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
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
