import { gql } from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';

import * as SchemaTypes from './api/schemas';
const defaultOptions = {} as const;
export type ChangeOrderStatusMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.ChangeOrderStatusInput;
}>;


export type ChangeOrderStatusMutation = { __typename?: 'Mutation', changeOrderStatus: Array<{ __typename?: 'Order', createdAt: string, exchangeRateId: string, id: string, quantity: string, status: SchemaTypes.OrderStatus; updatedAt: string, userId: string, }> };


export const ChangeOrderStatusDocument = gql`
    mutation ChangeOrderStatus($input: ChangeOrderStatusInput!) {
  changeOrderStatus(input: $input) {
    id
    createdAt
    updatedAt
    userId
    exchangeRateId
    quantity
    status
  }
}
    `;

/**
 * __useChangeOrderStatusMutation__
 *
 * To run a mutation, you first call `useChangeOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeOrderStatusMutation, { data, loading, error }] = useChangeOrderStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeOrderStatusMutation(baseOptions?: ApolloReactHooks.useMutation.Options<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>(ChangeOrderStatusDocument, options);
      }
export type ChangeOrderStatusMutationHookResult = ReturnType<typeof useChangeOrderStatusMutation>;