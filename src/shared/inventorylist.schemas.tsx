import { gql } from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';

import * as SchemaTypes from './api/schemas';
const defaultOptions = {} as const;
export type InventoryListQueryVariables = SchemaTypes.Exact<{
  limit: SchemaTypes.Scalars['Int']['input'];
  page: SchemaTypes.Scalars['Int']['input'];
}>;


export type InventoryListQuery = { __typename?: 'Query', inventoryList: { __typename?: 'InventoryList', items: Array<{ __typename?: 'Inventory', assetType: SchemaTypes.AssetType, createdAt: string, id: string, minThreshold: string, quantity: string; updatedAt: string, }>, meta: { __typename?: 'PaginationMeta', limit: number; page: number, total: number, } } };


export const InventoryListDocument = gql`
    query InventoryList($page: Int!, $limit: Int!) {
  inventoryList(page: $page, limit: $limit) {
    items {
      id
      createdAt
      updatedAt
      assetType
      minThreshold
      quantity
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
 * __useInventoryListQuery__
 *
 * To run a query within a React component, call `useInventoryListQuery` and pass it any options that fit your needs.
 * When your component renders, `useInventoryListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInventoryListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useInventoryListQuery(baseOptions: ApolloReactHooks.useQuery.Options<InventoryListQuery, InventoryListQueryVariables> & ({ skip?: boolean; variables: InventoryListQueryVariables; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<InventoryListQuery, InventoryListQueryVariables>(InventoryListDocument, options);
      }
export function useInventoryListLazyQuery(baseOptions?: ApolloReactHooks.useLazyQuery.Options<InventoryListQuery, InventoryListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<InventoryListQuery, InventoryListQueryVariables>(InventoryListDocument, options);
        }
export function useInventoryListSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.useSuspenseQuery.Options<InventoryListQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions} as ApolloReactHooks.SkipToken | ApolloReactHooks.useSuspenseQuery.Options<InventoryListQueryVariables>
          return ApolloReactHooks.useSuspenseQuery<InventoryListQuery, InventoryListQueryVariables>(InventoryListDocument, options);
        }
export type InventoryListQueryHookResult = ReturnType<typeof useInventoryListQuery>;
export type InventoryListLazyQueryHookResult = ReturnType<typeof useInventoryListLazyQuery>;
export type InventoryListSuspenseQueryHookResult = ReturnType<typeof useInventoryListSuspenseQuery>;