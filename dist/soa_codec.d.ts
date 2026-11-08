export declare class SOA_CODEC {
    readonly maxPids: number;
    readonly channelMap: Int32Array;
    readonly subChannelMap: Int32Array;
    readonly tripChannelMap: Int32Array;
    readonly keyMap: Int32Array;
    readonly listeners: Array<((pid: number, val?: number) => void) | undefined>;
    nextPid: number;
    constructor(maxPids?: number);
    allocatePid(rId: number, mId: number, sId: number, kId: number): number;
}
export declare const soa_codeci: SOA_CODEC;
