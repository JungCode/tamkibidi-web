import { gql } from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';

import * as SchemaTypes from './api/schemas';
const defaultOptions = {} as const;
export type ExchangeRateListQueryVariables = SchemaTypes.Exact<{
  limit: SchemaTypes.Scalars['Int']['input'];
  page: SchemaTypes.Scalars['Int']['input'];
}>;


export type ExchangeRateListQuery = { __typename?: 'Query', exchangeRateList: { __typename?: 'ExchangeRateList', items: Array<{ __typename?: 'ExchangeRate', actionType: SchemaTypes.ActionType, assetType: SchemaTypes.AssetType, baseUnit: string, createdAt: string, currencyCode: string, exchangeRate: string; id: string, updatedAt: string, }>, meta: { __typename?: 'PaginationMeta', limit: number; page: number, total: number, } } };


export const ExchangeRateListDocument = gql`
    query ExchangeRateList($page: Int!, $limit: Int!) {
  exchangeRateList(page: $page, limit: $limit) {
    items {
      id
      createdAt
      updatedAt
      assetType
      actionType
      baseUnit
      currencyCode
      exchangeRate
    }
    meta {
      total
      page
      limit
    }
  }
}
    `;

/**
 * __useExchangeRateListQuery__
 *
 * To run a query within a React component, call `useExchangeRateListQuery` and pass it any options that fit your needs.
 * When your component renders, `useExchangeRateListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExchangeRateListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useExchangeRateListQuery(baseOptions: ApolloReactHooks.useQuery.Options<ExchangeRateListQuery, ExchangeRateListQueryVariables> & ({ skip?: boolean; variables: ExchangeRateListQueryVariables; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ExchangeRateListQuery, ExchangeRateListQueryVariables>(ExchangeRateListDocument, options);
      }
export function useExchangeRateListLazyQuery(baseOptions?: ApolloReactHooks.useLazyQuery.Options<ExchangeRateListQuery, ExchangeRateListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ExchangeRateListQuery, ExchangeRateListQueryVariables>(ExchangeRateListDocument, options);
        }
export function useExchangeRateListSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.useSuspenseQuery.Options<ExchangeRateListQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions} as ApolloReactHooks.SkipToken | ApolloReactHooks.useSuspenseQuery.Options<ExchangeRateListQueryVariables>
          return ApolloReactHooks.useSuspenseQuery<ExchangeRateListQuery, ExchangeRateListQueryVariables>(ExchangeRateListDocument, options);
        }
export type ExchangeRateListQueryHookResult = ReturnType<typeof useExchangeRateListQuery>;
export type ExchangeRateListLazyQueryHookResult = ReturnType<typeof useExchangeRateListLazyQuery>;
export type ExchangeRateListSuspenseQueryHookResult = ReturnType<typeof useExchangeRateListSuspenseQuery>;