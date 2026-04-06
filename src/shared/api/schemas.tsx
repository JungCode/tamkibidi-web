export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };

 
 

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  Boolean: { input: boolean; output: boolean };
  DateTime: { input: string; output: string };
  Float: { input: number; output: number };
  ID: { input: string; output: string };
  Int: { input: number; output: number };
  String: { input: string; output: string };
  UUID: { input: string; output: string };
};

export enum ActionType {
  Buy = 'BUY',
  Sell = 'SELL',
}

export enum AssetType {
  Money = 'MONEY',
  Skely = 'SKELY',
}

export type ChangeOrderStatusInput = {
  orderIds: Array<Scalars['String']['input']>;
  status: OrderStatus;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum OrderStatus {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
}

export type OrdersByStatusInput = {
  status: OrderStatus;
};

export type PlaceOrderInput = {
  exchangeRateId: Scalars['String']['input'];
  quantity: Scalars['String']['input'];
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type UpdateExchangeRateInput = {
  actionType?: InputMaybe<ActionType>;
  assetType?: InputMaybe<AssetType>;
  baseUnit?: InputMaybe<Scalars['String']['input']>;
  currencyCode?: InputMaybe<Scalars['String']['input']>;
  exchangeRate?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type UpdateInventoryInput = {
  assetType?: InputMaybe<AssetType>;
  id: Scalars['String']['input'];
  minThreshold?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['String']['input']>;
};
