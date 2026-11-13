interface ScopeComponents {
    r: N;
    m: N;
    s: N;
}
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
    /**
     * Encodes a columnar batch (e.g., a spreadsheet column or database table chunk)
     * directly into a parallel SoA byte slab.
     */
    encodeBatch(ids: Int32Array, values: Float64Array): Uint8Array;
    /**
     * Decodes / Views the binary slab directly as SoA arenas
     * without creating individual JavaScript objects.
     */
    decodeBatchView(slab: Uint8Array): {
        ids: Int32Array;
        values: Float64Array;
    };
}
export declare class HIGH_PERFORMANCE_SOA_CODEC {
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
export declare class CONVERT_CHANNELS_AND_PIDS {
    /**
    const registry = new UnifiedRegistry(8192);
    const disruptor = new DisruptorSoA(8192);
    
    // 1. Register a Single String
    const pidSingle = registry.resolveSingle("user:logged_in");
    
    // 2. Register a Multi-Channel address
    const pidMulti = registry.resolveMulti("THE_WIZARD", "SAURON_MASTER", "SLAVE_01", "STATE_MUTATION");
    
    // 3. Publish both raw PIDs into the Disruptor (Hot path - 0 allocations)
    disruptor.publish(pidSingle, 1, 0);
    disruptor.publish(pidMulti, 99.5, 1);
    
    // 4. Consume and decode depending on what kind of PID it is
    while (disruptor.poll((pid, value, flag) => {
        // Check type lane or call decode based on your routing context
        if (registry.typeMap[pid] === 0) {
            const key = registry.decodeSingle(pid);
            console.log(`[SINGLE] Key: "${key}" | Value: ${value}`);
        } else {
            const scope = registry.decodeMulti(pid);
            console.log(`[MULTI] Channels: ${scope.r} > ${scope.m} > ${scope.s} > ${scope.k} | Value: ${value}`);
        }
    })) {
        // Drains ring buffer
    }
     */
    private stringToId;
    private idToString;
    private addressToPidMap;
    nextPid: number;
    readonly typeMap: Uint8Array;
    readonly channelMap: Int32Array;
    readonly subChannelMap: Int32Array;
    readonly tripChannelMap: Int32Array;
    readonly keyMap: Int32Array;
    readonly multiFlyweight: {
        r: string;
        m: string;
        s: string;
        k: string;
    };
    constructor(maxPids?: number);
    private intern;
    resolveSingle(key: string): number;
    resolveMulti(r: string, m: string, s: string, k?: string): number;
    decodeSingle(pid: number): string;
    decodeMulti(pid: number): typeof this.multiFlyweight;
}
export declare class INJECTION_CODEC {
    private ids;
    private names;
    private pids;
    private addresses;
    private nextId;
    readonly maxPids: N;
    readonly listeners: Array<A | UD>;
    readonly pidToHash: U32;
    nextAllocatedPid: number;
    readonly channelMap: I32;
    readonly subChannelMap: I32;
    readonly tripChannelMap: I32;
    readonly dirtyPids: I32;
    dirtyCount: number;
    _flushScheduled: boolean;
    constructor(maxPids?: number);
    private intern;
    /** Exact identity: encode address → pid (interned, no collisions). */
    encode(pid_key: S, sl: S, ms: S, rt: S): N;
    /** Exact decode: pid → address. */
    decode(pid: N): {
        k: S;
        s: S;
        m: S;
        r: S;
    };
    parseScopeKey(pid: N): ScopeComponents;
    markDirty(pid: N): V;
    subscribe(pid: N, fn: A): () => V;
    flushNotifications(): V;
    notifyHook(key: S): V;
    notifyPid(pid: N, value: N): V;
    releasePid(pid: N): V;
}
export {};
//# sourceMappingURL=soa_codec.d.ts.map