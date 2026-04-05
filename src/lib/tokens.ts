const ACCESS_TOKEN_KEY = 'txb_access';
const REFRESH_TOKEN_KEY = 'txb_refresh';

const isClient = typeof window !== 'undefined';

export const tokens = {
  clear(): void {
    if (!isClient) return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  getAccess(): string | null {
    if (!isClient) return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  getRefresh(): string | null {
    if (!isClient) return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  set(accessToken: string, refreshToken: string): void {
    if (!isClient) return;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
};
