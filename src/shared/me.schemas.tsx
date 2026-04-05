import { gql } from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';

import * as SchemaTypes from './api/schemas';
const defaultOptions = {} as const;
export type ExampleQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type ExampleQuery = { __typename?: 'Query', me: { __typename?: 'User', createdAt: string, email: string, id: string, role: string; updatedAt: string, userName: string, } };


export const ExampleQueryDocument = gql`
    query ExampleQuery {
  me {
    id
    createdAt
    updatedAt
    userName
    email
    role
  }
}
    `;

/**
 * __useExampleQuery__
 *
 * To run a query within a React component, call `useExampleQuery` and pass it any options that fit your needs.
 * When your component renders, `useExampleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExampleQuery({
 *   variables: {
 *   },
 * });
 */
export function useExampleQuery(baseOptions?: ApolloReactHooks.useQuery.Options<ExampleQuery, ExampleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ExampleQuery, ExampleQueryVariables>(ExampleQueryDocument, options);
      }
export function useExampleQueryLazyQuery(baseOptions?: ApolloReactHooks.useLazyQuery.Options<ExampleQuery, ExampleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ExampleQuery, ExampleQueryVariables>(ExampleQueryDocument, options);
        }
export function useExampleQuerySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.useSuspenseQuery.Options<ExampleQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions} as ApolloReactHooks.SkipToken | ApolloReactHooks.useSuspenseQuery.Options<ExampleQueryVariables>
          return ApolloReactHooks.useSuspenseQuery<ExampleQuery, ExampleQueryVariables>(ExampleQueryDocument, options);
        }
export type ExampleQueryHookResult = ReturnType<typeof useExampleQuery>;
export type ExampleQueryLazyQueryHookResult = ReturnType<typeof useExampleQueryLazyQuery>;
export type ExampleQuerySuspenseQueryHookResult = ReturnType<typeof useExampleQuerySuspenseQuery>;