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
export type SideInput = Enum<{ Buy: []; Sell: [] }>;
export type SideOutput = SideInput;

export type AddressInput = { value: string };
export type AddressOutput = AddressInput;
export type ContractIdInput = { value: string };
export type ContractIdOutput = ContractIdInput;
export type ExecutionResultInput = { is_executable: boolean; collection: ContractIdInput; token_id: BigNumberish; amount: BigNumberish; payment_asset: ContractIdInput };
export type ExecutionResultOutput = { is_executable: boolean; collection: ContractIdOutput; token_id: BN; amount: BN; payment_asset: ContractIdOutput };
export type ExtraParamsInput = { extra_address_param: AddressInput; extra_contract_param: ContractIdInput; extra_u64_param: BigNumberish };
export type ExtraParamsOutput = { extra_address_param: AddressOutput; extra_contract_param: ContractIdOutput; extra_u64_param: BN };
export type MakerOrderInput = {
  side: SideInput;
  maker: AddressInput;
  collection: ContractIdInput;
  token_id: BigNumberish;
  price: BigNumberish;
  amount: BigNumberish;
  nonce: BigNumberish;
  strategy: ContractIdInput;
  payment_asset: ContractIdInput;
  start_time: BigNumberish;
  end_time: BigNumberish;
  extra_params: ExtraParamsInput;
};
export type MakerOrderOutput = {
  side: SideOutput;
  maker: AddressOutput;
  collection: ContractIdOutput;
  token_id: BN;
  price: BN;
  amount: BN;
  nonce: BN;
  strategy: ContractIdOutput;
  payment_asset: ContractIdOutput;
  start_time: BN;
  end_time: BN;
  extra_params: ExtraParamsOutput;
};
export type OwnershipRenouncedInput = { previous_owner: IdentityInput };
export type OwnershipRenouncedOutput = { previous_owner: IdentityOutput };
export type OwnershipSetInput = { new_owner: IdentityInput };
export type OwnershipSetOutput = { new_owner: IdentityOutput };
export type OwnershipTransferredInput = { new_owner: IdentityInput; previous_owner: IdentityInput };
export type OwnershipTransferredOutput = { new_owner: IdentityOutput; previous_owner: IdentityOutput };
export type TakerOrderInput = {
  side: SideInput;
  taker: AddressInput;
  maker: AddressInput;
  nonce: BigNumberish;
  price: BigNumberish;
  token_id: BigNumberish;
  collection: ContractIdInput;
  strategy: ContractIdInput;
  extra_params: ExtraParamsInput;
};
export type TakerOrderOutput = {
  side: SideOutput;
  taker: AddressOutput;
  maker: AddressOutput;
  nonce: BN;
  price: BN;
  token_id: BN;
  collection: ContractIdOutput;
  strategy: ContractIdOutput;
  extra_params: ExtraParamsOutput;
};

interface StrategyFixedPriceSaleAbiInterface extends Interface {
  functions: {
    cancel_all_orders: FunctionFragment;
    cancel_all_orders_by_side: FunctionFragment;
    cancel_order: FunctionFragment;
    execute_order: FunctionFragment;
    get_exchange: FunctionFragment;
    get_maker_order_of_user: FunctionFragment;
    get_min_order_nonce_of_user: FunctionFragment;
    get_order_nonce_of_user: FunctionFragment;
    get_protocol_fee: FunctionFragment;
    initialize: FunctionFragment;
    is_valid_order: FunctionFragment;
    owner: FunctionFragment;
    place_order: FunctionFragment;
    renounce_ownership: FunctionFragment;
    set_protocol_fee: FunctionFragment;
    transfer_ownership: FunctionFragment;
  };

  encodeFunctionData(functionFragment: "cancel_all_orders", values: [AddressInput]): Uint8Array;
  encodeFunctionData(functionFragment: "cancel_all_orders_by_side", values: [AddressInput, SideInput]): Uint8Array;
  encodeFunctionData(functionFragment: "cancel_order", values: [AddressInput, BigNumberish, SideInput]): Uint8Array;
  encodeFunctionData(functionFragment: "execute_order", values: [TakerOrderInput]): Uint8Array;
  encodeFunctionData(functionFragment: "get_exchange", values: []): Uint8Array;
  encodeFunctionData(functionFragment: "get_maker_order_of_user", values: [AddressInput, BigNumberish, SideInput]): Uint8Array;
  encodeFunctionData(functionFragment: "get_min_order_nonce_of_user", values: [AddressInput, SideInput]): Uint8Array;
  encodeFunctionData(functionFragment: "get_order_nonce_of_user", values: [AddressInput, SideInput]): Uint8Array;
  encodeFunctionData(functionFragment: "get_protocol_fee", values: []): Uint8Array;
  encodeFunctionData(functionFragment: "initialize", values: [ContractIdInput]): Uint8Array;
  encodeFunctionData(functionFragment: "is_valid_order", values: [AddressInput, BigNumberish, SideInput]): Uint8Array;
  encodeFunctionData(functionFragment: "owner", values: []): Uint8Array;
  encodeFunctionData(functionFragment: "place_order", values: [MakerOrderInput]): Uint8Array;
  encodeFunctionData(functionFragment: "renounce_ownership", values: []): Uint8Array;
  encodeFunctionData(functionFragment: "set_protocol_fee", values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: "transfer_ownership", values: [IdentityInput]): Uint8Array;

  decodeFunctionData(functionFragment: "cancel_all_orders", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "cancel_all_orders_by_side", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "cancel_order", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "execute_order", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "get_exchange", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "get_maker_order_of_user", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "get_min_order_nonce_of_user", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "get_order_nonce_of_user", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "get_protocol_fee", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "initialize", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "is_valid_order", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "owner", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "place_order", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "renounce_ownership", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "set_protocol_fee", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "transfer_ownership", data: BytesLike): DecodedValue;
}

export class StrategyFixedPriceSaleAbi extends Contract {
  interface: StrategyFixedPriceSaleAbiInterface;
  functions: {
    cancel_all_orders: InvokeFunction<[maker: AddressInput], void>;
    cancel_all_orders_by_side: InvokeFunction<[maker: AddressInput, side: SideInput], void>;
    cancel_order: InvokeFunction<[maker: AddressInput, nonce: BigNumberish, side: SideInput], void>;
    execute_order: InvokeFunction<[order: TakerOrderInput], ExecutionResultOutput>;
    get_exchange: InvokeFunction<[], ContractIdOutput>;
    get_maker_order_of_user: InvokeFunction<[user: AddressInput, nonce: BigNumberish, side: SideInput], Option<MakerOrderOutput>>;
    get_min_order_nonce_of_user: InvokeFunction<[user: AddressInput, side: SideInput], BN>;
    get_order_nonce_of_user: InvokeFunction<[user: AddressInput, side: SideInput], BN>;
    get_protocol_fee: InvokeFunction<[], BN>;
    initialize: InvokeFunction<[exchange: ContractIdInput], void>;
    is_valid_order: InvokeFunction<[maker: AddressInput, nonce: BigNumberish, side: SideInput], boolean>;
    owner: InvokeFunction<[], Option<IdentityOutput>>;
    place_order: InvokeFunction<[order: MakerOrderInput], void>;
    renounce_ownership: InvokeFunction<[], void>;
    set_protocol_fee: InvokeFunction<[fee: BigNumberish], void>;
    transfer_ownership: InvokeFunction<[new_owner: IdentityInput], void>;
  };
}
