import { gql } from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';

import * as SchemaTypes from './api/schemas';
const defaultOptions = {} as const;
export type EditExchangeRateMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.UpdateExchangeRateInput;
}>;


export type EditExchangeRateMutation = { __typename?: 'Mutation', editExchangeRate: { __typename?: 'ExchangeRate', actionType: SchemaTypes.ActionType, assetType: SchemaTypes.AssetType, baseUnit: string, createdAt: string, currencyCode: string, exchangeRate: string; id: string, updatedAt: string, } };


export const EditExchangeRateDocument = gql`
    mutation EditExchangeRate($input: UpdateExchangeRateInput!) {
  editExchangeRate(input: $input) {
    id
    createdAt
    updatedAt
    assetType
    actionType
    baseUnit
    currencyCode
    exchangeRate
  }
}
    `;

/**
 * __useEditExchangeRateMutation__
 *
 * To run a mutation, you first call `useEditExchangeRateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditExchangeRateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editExchangeRateMutation, { data, loading, error }] = useEditExchangeRateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditExchangeRateMutation(baseOptions?: ApolloReactHooks.useMutation.Options<EditExchangeRateMutation, EditExchangeRateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditExchangeRateMutation, EditExchangeRateMutationVariables>(EditExchangeRateDocument, options);
      }
export type EditExchangeRateMutationHookResult = ReturnType<typeof useEditExchangeRateMutation>;