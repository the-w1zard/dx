interface ScopeComponents {
    r: N;
    m: N;
    s: N;
}
export declare class INJECTION_CODEC {
    readonly maxPids: N;
    readonly listeners: Array<A | UD>;
    readonly pidToHash: U32;
    readonly hashToPidMap: Map<number, number>;
    nextAllocatedPid: number;
    readonly channelMap: I32;
    readonly subChannelMap: I32;
    readonly tripChannelMap: I32;
    readonly dirtyPids: I32;
    dirtyCount: number;
    _flushScheduled: boolean;
    freeList: N[];
    constructor(maxPids?: number);
    getScopeHashForPid(pid: N): N;
    getExistingPid(scopeHash: N): N;
    hashComponent(val: A, fallback: S): N;
    getScopeHash(key: S | SY, sl_reg?: A, ms_reg?: A, globalKey?: A): N;
    parseScopeKey(pid: N): ScopeComponents;
    allocateScopePid(scopeHash: N, key: A, sl_reg?: A, ms_reg?: A, globalKey?: A): N;
    markDirty(pid: N): V;
    subscribe(pid: N, fn: A): () => V;
    flushNotifications(): V;
    notifyHook(key: S): void;
    notifyPid(pid: N, value: N): V;
    releasePid(pid: N): V;
}
export {};
