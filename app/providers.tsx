'use client';

import { ApolloProvider } from '@apollo/client/react';
import { Toaster } from 'sonner';

import { getApolloClient } from '../src/lib/apollo';
import { AuthProvider } from '../src/lib/auth-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={getApolloClient()}>
      <AuthProvider>
        {children}
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: '#1d2024',
              border: '1px solid rgba(88,101,242,0.2)',
              color: '#e2e2e8',
            },
          }}
        />
      </AuthProvider>
    </ApolloProvider>
  );
}
