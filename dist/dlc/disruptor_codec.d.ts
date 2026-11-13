interface ScopeComponents {
    r: N;
    m: N;
    s: N;
}
export declare class SITH_DISRUPTOR_CODEC {
    private ids;
    private pids;
    private addresses;
    readonly hashToPidMap: Map<number, number>;
    _flushScheduled: boolean;
    private names;
    private nextId;
    readonly maxPids: N;
    readonly listeners: AR<A | UD>;
    readonly pidToHash: U32;
    nextAllocatedPid: number;
    readonly channelMap: I32;
    readonly subChannelMap: I32;
    readonly tripChannelMap: I32;
    readonly dirtyPids: I32;
    dirtyCount: number;
    freeList: N[];
    THE_WIZARD_ROOT_REG: string;
    SAURON_MASTER_REG: string;
    SAURON_SLAVE_REG: string;
    constructor(maxPids: number | undefined, THE_WIZARD_ROOT_REG: S, SAURON_MASTER_REG: S, SAURON_SLAVE_REG: S);
    getScopeHashForPid(pid: N): N;
    getExistingPid(scopeHash: N): N;
    hashComponent(val: A, fallback: S): N;
    getScopeHash(key: S | SY, sl_reg?: A, ms_reg?: A, globalKey?: A): N;
    allocateScopePid(scopeHash: N, key: A, sl_reg?: A, ms_reg?: A, globalKey?: A): N;
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
