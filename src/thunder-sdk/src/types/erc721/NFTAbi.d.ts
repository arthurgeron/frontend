/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.38.1
  Forc version: 0.35.5
  Fuel-Core version: 0.17.3
*/

import type { BigNumberish, BN, BytesLike, Contract, DecodedValue, FunctionFragment, Interface, InvokeFunction } from "fuels";

import type { Option, Enum } from "./common";

export type AccessErrorInput = Enum<{ SenderCannotSetAccessControl: []; SenderNotAdmin: []; SenderNotOwner: []; SenderNotOwnerOrApproved: [] }>;
export type AccessErrorOutput = AccessErrorInput;
export type IdentityInput = Enum<{ Address: AddressInput; ContractId: ContractIdInput }>;
export type IdentityOutput = Enum<{ Address: AddressOutput; ContractId: ContractIdOutput }>;
export type InputErrorInput = Enum<{ AdminDoesNotExist: []; ApprovedDoesNotExist: []; NotEnoughTokensToMint: []; OwnerDoesNotExist: []; TokenDoesNotExist: []; TokenSupplyCannotBeZero: [] }>;
export type InputErrorOutput = InputErrorInput;

export type AddressInput = { value: string };
export type AddressOutput = AddressInput;
export type ApprovalEventInput = { approved: Option<IdentityInput>; owner: IdentityInput; token_id: BigNumberish };
export type ApprovalEventOutput = { approved: Option<IdentityOutput>; owner: IdentityOutput; token_id: BN };
export type ContractIdInput = { value: string };
export type ContractIdOutput = ContractIdInput;
export type MintEventInput = { owner: IdentityInput; token_id: BigNumberish };
export type MintEventOutput = { owner: IdentityOutput; token_id: BN };
export type OperatorEventInput = { approved: boolean; operator: IdentityInput; owner: IdentityInput };
export type OperatorEventOutput = { approved: boolean; operator: IdentityOutput; owner: IdentityOutput };
export type OwnershipSetInput = { new_owner: IdentityInput };
export type OwnershipSetOutput = { new_owner: IdentityOutput };
export type TokenMetaDataInput = { name: string; symbol: string; token_uri: [string, BigNumberish] };
export type TokenMetaDataOutput = { name: string; symbol: string; token_uri: [string, BN] };
export type TransferEventInput = { from: IdentityInput; sender: IdentityInput; to: IdentityInput; token_id: BigNumberish };
export type TransferEventOutput = { from: IdentityOutput; sender: IdentityOutput; to: IdentityOutput; token_id: BN };

interface NFTAbiInterface extends Interface {
  functions: {
    approve: FunctionFragment;
    approved: FunctionFragment;
    balance_of: FunctionFragment;
    initialize: FunctionFragment;
    is_approved_for_all: FunctionFragment;
    max_supply: FunctionFragment;
    metadata: FunctionFragment;
    mint: FunctionFragment;
    owner: FunctionFragment;
    owner_of: FunctionFragment;
    set_approval_for_all: FunctionFragment;
    supports_interface: FunctionFragment;
    total_supply: FunctionFragment;
    transfer: FunctionFragment;
  };

  encodeFunctionData(functionFragment: "approve", values: [Option<IdentityInput>, BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: "approved", values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: "balance_of", values: [IdentityInput]): Uint8Array;
  encodeFunctionData(functionFragment: "initialize", values: [BigNumberish, ContractIdInput]): Uint8Array;
  encodeFunctionData(functionFragment: "is_approved_for_all", values: [IdentityInput, IdentityInput]): Uint8Array;
  encodeFunctionData(functionFragment: "max_supply", values: []): Uint8Array;
  encodeFunctionData(functionFragment: "metadata", values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: "mint", values: [BigNumberish, IdentityInput]): Uint8Array;
  encodeFunctionData(functionFragment: "owner", values: []): Uint8Array;
  encodeFunctionData(functionFragment: "owner_of", values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: "set_approval_for_all", values: [boolean, IdentityInput]): Uint8Array;
  encodeFunctionData(functionFragment: "supports_interface", values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: "total_supply", values: []): Uint8Array;
  encodeFunctionData(functionFragment: "transfer", values: [IdentityInput, BigNumberish]): Uint8Array;

  decodeFunctionData(functionFragment: "approve", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "approved", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "balance_of", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "initialize", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "is_approved_for_all", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "max_supply", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "metadata", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "mint", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "owner", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "owner_of", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "set_approval_for_all", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "supports_interface", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "total_supply", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "transfer", data: BytesLike): DecodedValue;
}

export class NFTAbi extends Contract {
  interface: NFTAbiInterface;
  functions: {
    approve: InvokeFunction<[to: Option<IdentityInput>, token_id: BigNumberish], void>;
    approved: InvokeFunction<[token_id: BigNumberish], Option<IdentityOutput>>;
    balance_of: InvokeFunction<[user: IdentityInput], BN>;
    initialize: InvokeFunction<[max_supply: BigNumberish, transfer_manager: ContractIdInput], void>;
    is_approved_for_all: InvokeFunction<[operator: IdentityInput, user: IdentityInput], boolean>;
    max_supply: InvokeFunction<[], BN>;
    metadata: InvokeFunction<[token_id: BigNumberish], TokenMetaDataOutput>;
    mint: InvokeFunction<[amount: BigNumberish, to: IdentityInput], void>;
    owner: InvokeFunction<[], Option<IdentityOutput>>;
    owner_of: InvokeFunction<[token_id: BigNumberish], Option<IdentityOutput>>;
    set_approval_for_all: InvokeFunction<[approve: boolean, operator: IdentityInput], void>;
    supports_interface: InvokeFunction<[interface_id: BigNumberish], boolean>;
    total_supply: InvokeFunction<[], BN>;
    transfer: InvokeFunction<[to: IdentityInput, token_id: BigNumberish], void>;
  };
}
