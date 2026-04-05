'use client';

import { createContext, useCallback, useContext, useState } from 'react';

import { MeQuery, useMeQuery } from '../shared/me.schemas';
import { tokens } from './tokens';

type User = MeQuery['me'];

interface AuthContextValue {
  isLoading: boolean;
  /** Call after login/register to make the context re-read the token and fetch the user. */
  refreshAuth: () => void;
  role: string | null;
  user: User | null;
}

const AuthContext = createContext<AuthContextValue>({
  isLoading: true,
  refreshAuth: () => {},
  role: null,
  user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Lazy initializer: reads token synchronously on mount — no effect needed.
  const [hasToken, setHasToken] = useState(() => !!tokens.getAccess());

  const { data, loading, refetch } = useMeQuery({
    fetchPolicy: 'network-only',
    skip: !hasToken,
  });

  const refreshAuth = useCallback(() => {
    setHasToken(!!tokens.getAccess());
    if (tokens.getAccess()) {
      // If the query was already issued once, force a re-fetch;
      // otherwise flipping hasToken to true will fire it automatically.
      refetch();
    }
  }, [refetch]);

  return (
    <AuthContext.Provider
      value={{
        isLoading: hasToken ? loading : false,
        refreshAuth,
        role: data?.me?.role ?? null,
        user: data?.me ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useIsAdmin() {
  const { role } = useAuth();
  return role === 'admin';
}
