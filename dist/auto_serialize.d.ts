export declare const SKIP: unique symbol;
export interface CustomCodecResult {
    type: string;
    value: unknown;
}
export type CustomEncoder = (value: unknown, encodeChild: (v: unknown) => unknown) => CustomCodecResult | typeof SKIP;
export type CustomDecoder = (type: string, value: unknown, decodeChild: (v: unknown) => unknown) => unknown | typeof SKIP;
export interface SerFormatConfig {
    date?: boolean;
    bigint?: boolean;
    regexp?: boolean;
    error?: boolean;
    specialNumber?: boolean;
    undefined?: boolean;
    typedArray?: boolean;
    url?: boolean;
    map?: boolean;
    set?: boolean;
    array?: boolean;
    object?: boolean;
    string?: boolean;
    number?: boolean;
    boolean?: boolean;
}
declare class SERI {
    private config;
    private customEncoder?;
    constructor(config?: SerFormatConfig, customEncoder?: CustomEncoder);
    encodeJSONEnvelope(envelope: unknown): Uint8Array;
    ser(value: unknown): string;
    private _encode;
}
export { SERI };
export declare const ser: SERI;
declare class DESERI {
    private config;
    private customDecoder?;
    constructor(config?: SerFormatConfig, customDecoder?: CustomDecoder);
    decodeJSONEnvelope(bytes: Uint8Array): unknown;
    deser(raw: unknown): unknown;
    private _decode;
}
export { DESERI };
export declare const deser: DESERI;
/**
const usersEncoder: CustomEncoder = (value, encodeChild) => {
 if (value instanceof User) {
   return { type: 'User', value: { id: value.id, name: encodeChild(value.name) } };
 }
 return SKIP; // not mine, let the built-ins handle it
};

const usersDecoder: CustomDecoder = (type, value, decodeChild) => {
 if (type === 'User') return new User(value.id, decodeChild(value.name));
 return SKIP;
};

export const ser = new SERI({ date: false, string: false, set: false, array: false }, usersEncoder);
export const deser = new DESERI({ date: false, string: false, set: false, array: false }, usersDecoder); */
