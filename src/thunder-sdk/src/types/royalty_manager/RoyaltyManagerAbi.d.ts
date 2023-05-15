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

export type IdentityInput = Enum<{ Address: AddressInput; ContractId: ContractIdInput }>;
export type IdentityOutput = Enum<{ Address: AddressOutput; ContractId: ContractIdOutput }>;

export type AddressInput = { value: string };
export type AddressOutput = AddressInput;
export type ContractIdInput = { value: string };
export type ContractIdOutput = ContractIdInput;
export type OwnershipRenouncedInput = { previous_owner: IdentityInput };
export type OwnershipRenouncedOutput = { previous_owner: IdentityOutput };
export type OwnershipSetInput = { new_owner: IdentityInput };
export type OwnershipSetOutput = { new_owner: IdentityOutput };
export type OwnershipTransferredInput = { new_owner: IdentityInput; previous_owner: IdentityInput };
export type OwnershipTransferredOutput = { new_owner: IdentityOutput; previous_owner: IdentityOutput };
export type RoyaltyInfoInput = { collection: ContractIdInput; receiver: IdentityInput; fee: BigNumberish };
export type RoyaltyInfoOutput = { collection: ContractIdOutput; receiver: IdentityOutput; fee: BN };
export type RoyaltyRegistryEventInput = { royalty_info: RoyaltyInfoInput };
export type RoyaltyRegistryEventOutput = { royalty_info: RoyaltyInfoOutput };

interface RoyaltyManagerAbiInterface extends Interface {
  functions: {
    get_royalty_fee_limit: FunctionFragment;
    get_royalty_info: FunctionFragment;
    initialize: FunctionFragment;
    owner: FunctionFragment;
    register_royalty_info: FunctionFragment;
    renounce_ownership: FunctionFragment;
    set_royalty_fee_limit: FunctionFragment;
    transfer_ownership: FunctionFragment;
  };

  encodeFunctionData(functionFragment: "get_royalty_fee_limit", values: []): Uint8Array;
  encodeFunctionData(functionFragment: "get_royalty_info", values: [ContractIdInput]): Uint8Array;
  encodeFunctionData(functionFragment: "initialize", values: []): Uint8Array;
  encodeFunctionData(functionFragment: "owner", values: []): Uint8Array;
  encodeFunctionData(functionFragment: "register_royalty_info", values: [ContractIdInput, IdentityInput, BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: "renounce_ownership", values: []): Uint8Array;
  encodeFunctionData(functionFragment: "set_royalty_fee_limit", values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: "transfer_ownership", values: [IdentityInput]): Uint8Array;

  decodeFunctionData(functionFragment: "get_royalty_fee_limit", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "get_royalty_info", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "initialize", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "owner", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "register_royalty_info", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "renounce_ownership", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "set_royalty_fee_limit", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "transfer_ownership", data: BytesLike): DecodedValue;
}

export class RoyaltyManagerAbi extends Contract {
  interface: RoyaltyManagerAbiInterface;
  functions: {
    get_royalty_fee_limit: InvokeFunction<[], BN>;
    get_royalty_info: InvokeFunction<[collection: ContractIdInput], Option<RoyaltyInfoOutput>>;
    initialize: InvokeFunction<[], void>;
    owner: InvokeFunction<[], Option<IdentityOutput>>;
    register_royalty_info: InvokeFunction<[collection: ContractIdInput, receiver: IdentityInput, fee: BigNumberish], void>;
    renounce_ownership: InvokeFunction<[], void>;
    set_royalty_fee_limit: InvokeFunction<[new_fee_limit: BigNumberish], void>;
    transfer_ownership: InvokeFunction<[new_owner: IdentityInput], void>;
  };
}
