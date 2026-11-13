export type AVROField = {
    name: S;
    type: AVROSchema;
};
export type AVROSchema = S | AVROSchema[] | {
    type: S | AVROSchema[];
    name?: S;
    namespace?: S;
    fields?: AVROField[];
    items?: AVROSchema;
    values?: AVROSchema;
    symbols?: AR<S>;
    size?: N;
};
export type AVROValue = any;
export interface IAVROWriter {
    readonly offset: number;
    byte(v: number): this;
    bytes(v: Uint8Array): this;
    long(value: number | bigint): this;
    int(value: number): this;
    float(value: number): this;
    double(value: number): this;
    finish(): Uint8Array;
}
export declare class AVROWriter implements IAVROWriter {
    private buf;
    private pos;
    private ensure;
    get offset(): number;
    byte: (v: number) => this;
    bytes: (v: Uint8Array) => this;
    long: (value: number | bigint) => this;
    int: (value: number) => this;
    float: (value: number) => this;
    double: (value: number) => this;
    finish: () => Uint8Array;
}
export interface IAVROReader {
    byte(): number;
    bytes(length: number): Uint8Array;
    long(): number | bigint;
    int(): number;
    float(): number;
    double(): number;
    done(): boolean;
}
export declare class AVROReader implements IAVROReader {
    private readonly buf;
    private pos;
    private readonly view;
    constructor(buf: Uint8Array);
    private ensure;
    byte(): number;
    bytes(length: number): Uint8Array;
    long(): number | bigint;
    int(): number;
    float(): number;
    double(): number;
    done(): boolean;
}
export declare const AVRO_ERROR_SCHEMA: AVROSchema;
export declare class BINARY_AVRO {
    #private;
    private readonly encoder;
    private readonly decoder;
    private readonly schema;
    private readonly names;
    private readonly errorSchema;
    private readonly wireSchema;
    constructor(schema: AVROSchema);
    encode_msg(msg: AVROValue): Uint8Array;
    decode_msg(raw: unknown): AVROValue;
}
export declare const AVROI: BINARY_AVRO;
//# sourceMappingURL=avro.d.ts.map