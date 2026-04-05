'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuth } from '../../src/lib/auth-context';
import { tokens } from '../../src/lib/tokens';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoading, refreshAuth, user } = useAuth();
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const token = tokens.getAccess();
    setHasToken(!!token);
    if (!token) {
      router.replace('/login');
    } else {
      // Ensure AuthProvider has picked up the new token (e.g. right after login)
      refreshAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Query settled with no user — token is genuinely invalid
    if (hasToken && !isLoading && !user) {
      tokens.clear();
      router.replace('/login');
    }
  }, [isLoading, user, hasToken, router]);

  // Waiting for client hydration or the me query
  if (hasToken === null || (hasToken && (isLoading || !user))) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#111318]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#5865f2] border-t-transparent" />
          <p className="text-sm font-bold tracking-widest text-[#8f8fa0] uppercase">
            Loading…
          </p>
        </div>
      </div>
    );
  }

  // hasToken is false — redirect is in flight
  if (!hasToken) return null;

  return <>{children}</>;
}
