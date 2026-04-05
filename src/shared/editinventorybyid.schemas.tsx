import { gql } from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';

import * as SchemaTypes from './api/schemas';
const defaultOptions = {} as const;
export type EditInventoryByIdMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.UpdateInventoryInput;
}>;


export type EditInventoryByIdMutation = { __typename?: 'Mutation', editInventoryById: { __typename?: 'Inventory', assetType: SchemaTypes.AssetType, createdAt: string, id: string, minThreshold: string, quantity: string; updatedAt: string, } };


export const EditInventoryByIdDocument = gql`
    mutation EditInventoryById($input: UpdateInventoryInput!) {
  editInventoryById(input: $input) {
    id
    createdAt
    updatedAt
    assetType
    minThreshold
    quantity
  }
}
    `;

/**
 * __useEditInventoryByIdMutation__
 *
 * To run a mutation, you first call `useEditInventoryByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditInventoryByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editInventoryByIdMutation, { data, loading, error }] = useEditInventoryByIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditInventoryByIdMutation(baseOptions?: ApolloReactHooks.useMutation.Options<EditInventoryByIdMutation, EditInventoryByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditInventoryByIdMutation, EditInventoryByIdMutationVariables>(EditInventoryByIdDocument, options);
      }
export type EditInventoryByIdMutationHookResult = ReturnType<typeof useEditInventoryByIdMutation>;