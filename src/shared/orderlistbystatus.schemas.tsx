import { gql } from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';

import * as SchemaTypes from './api/schemas';
const defaultOptions = {} as const;
export type OrderListByStatusQueryVariables = SchemaTypes.Exact<{
  input: SchemaTypes.OrdersByStatusInput;
  limit: SchemaTypes.Scalars['Int']['input'];
  page: SchemaTypes.Scalars['Int']['input'];
}>;


export type OrderListByStatusQuery = { __typename?: 'Query', orderListByStatus: { __typename?: 'OrderList', items: Array<{ __typename?: 'Order', createdAt: string, exchangeRate?: { __typename?: 'ExchangeRate', actionType: SchemaTypes.ActionType; assetType: SchemaTypes.AssetType, currencyCode: string, } | null; exchangeRateId: string, id: string, quantity: string, status: SchemaTypes.OrderStatus, updatedAt: string, user?: { __typename?: 'User', userName: string } | null, userId: string, }>, meta: { __typename?: 'PaginationMeta', limit: number; page: number, total: number, } } };


export const OrderListByStatusDocument = gql`
    query OrderListByStatus($input: OrdersByStatusInput!, $page: Int!, $limit: Int!) {
  orderListByStatus(input: $input, page: $page, limit: $limit) {
    items {
      id
      createdAt
      updatedAt
      userId
      user {
        userName
      }
      exchangeRateId
      exchangeRate {
        currencyCode
        assetType
        actionType
      }
      quantity
      status
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
 * __useOrderListByStatusQuery__
 *
 * To run a query within a React component, call `useOrderListByStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderListByStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderListByStatusQuery({
 *   variables: {
 *      input: // value for 'input'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useOrderListByStatusQuery(baseOptions: ApolloReactHooks.useQuery.Options<OrderListByStatusQuery, OrderListByStatusQueryVariables> & ({ skip?: boolean; variables: OrderListByStatusQueryVariables; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<OrderListByStatusQuery, OrderListByStatusQueryVariables>(OrderListByStatusDocument, options);
      }
export function useOrderListByStatusLazyQuery(baseOptions?: ApolloReactHooks.useLazyQuery.Options<OrderListByStatusQuery, OrderListByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<OrderListByStatusQuery, OrderListByStatusQueryVariables>(OrderListByStatusDocument, options);
        }
export function useOrderListByStatusSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.useSuspenseQuery.Options<OrderListByStatusQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions} as ApolloReactHooks.SkipToken | ApolloReactHooks.useSuspenseQuery.Options<OrderListByStatusQueryVariables>
          return ApolloReactHooks.useSuspenseQuery<OrderListByStatusQuery, OrderListByStatusQueryVariables>(OrderListByStatusDocument, options);
        }
export type OrderListByStatusQueryHookResult = ReturnType<typeof useOrderListByStatusQuery>;
export type OrderListByStatusLazyQueryHookResult = ReturnType<typeof useOrderListByStatusLazyQuery>;
export type OrderListByStatusSuspenseQueryHookResult = ReturnType<typeof useOrderListByStatusSuspenseQuery>;