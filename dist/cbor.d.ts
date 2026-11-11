export declare class CBORI {
    private readonly encoder;
    private readonly decoder;
    private ensureAvailable;
    private readUint;
    private encodeUint64;
    private encode;
    private encodeValue;
    private encodeUint;
    private decode;
    private decodeValue;
    encode_msg(msg: A): U8;
    decode_msg(raw: A): A;
}
