import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

let client: ApolloClient | undefined;

export function getApolloClient(): ApolloClient {
  if (client) return client;
  client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? '/graphql',
    }),
  });
  return client;
}
