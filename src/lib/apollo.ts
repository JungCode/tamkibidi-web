import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';

import { tokens } from './tokens';

function handleUnauthenticated() {
  tokens.clear();
  if (
    typeof window !== 'undefined' &&
    !window.location.pathname.startsWith('/login')
  ) {
    window.location.replace('/login');
  }
}

const authLink = new ApolloLink((operation, forward) => {
  const token = tokens.getAccess();
  if (token) {
    operation.setContext(
      ({ headers = {} }: { headers?: Record<string, string> }) => ({
        headers: {
          ...headers,
          'apollo-require-preflight': 'true',
          Authorization: `Bearer ${token}`,
        },
      }),
    );
  }
  return forward(operation);
});

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    for (const gqlErr of error.errors) {
      const code = (
        gqlErr.extensions?.code as string | undefined
      )?.toUpperCase();
      if (
        code === 'UNAUTHENTICATED' ||
        code === 'UNAUTHORIZED' ||
        code === '401'
      ) {
        handleUnauthenticated();
        return;
      }
    }
  } else if (
    error &&
    'statusCode' in error &&
    (error as unknown as { statusCode: number }).statusCode === 401
  ) {
    handleUnauthenticated();
  }
});

let client: ApolloClient | undefined;

export function getApolloClient(): ApolloClient {
  if (client) return client;
  client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      errorLink,
      authLink,
      new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? '/graphql',
      }),
    ]),
  });
  return client;
}
