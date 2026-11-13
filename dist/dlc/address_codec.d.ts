export declare class ADDRESS_CODEC {
    private ids;
    private names;
    private pids;
    private addresses;
    private nextId;
    private nextPid;
    private intern;
    encode(key: string, sl: string, ms: string, rt: string): number;
    decode(pid: number): {
        key: string;
        sl: string;
        ms: string;
        rt: string;
    };
}
