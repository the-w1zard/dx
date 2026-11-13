export declare class M2BINI<K = N, V = N> {
    #private;
    constructor(capacity?: number);
    get size(): number;
    get capacity(): number;
    /** live backing buffer: floating-point value of slot i is buffer[i] */
    get buffer(): Float64Array;
    get(k: K): V | undefined;
    has(k: K): boolean;
    set(k: K, v: V): this;
    delete(k: K): boolean;
    clear(): void;
    keys(): MapIterator<K>;
    values(): MapIterator<V>;
    entries(): MapIterator<[K, V]>;
    [Symbol.iterator](): MapIterator<[K, V]>;
    forEach(fn: (v: V, k: K, m: M2BINI<K, V>) => V, thisArg?: unknown): void;
    /** read by pid */
    g(pid: number): V | undefined;
    /** write by pid */
    s(v: number, pid: number): this;
    /** read with fallback — the accumulator primitive */
    getOr(pid: number, dflt?: number): number;
    /** pid += delta, returns the new value */
    add(pid: number, delta: number): number;
    in(pid: number): boolean;
    d(pid: number): boolean;
    /** walk (pid, slot) without allocating an iterator */
    forEachRaw(fn: (pid: number, slot: number) => void): void;
    /** values for a list of pids, NaN where absent */
    gather(pids: ArrayLike<number>, out?: Float64Array<ArrayBuffer>): Float64Array;
}
export interface M2BIN<K, V> extends M2BINI {
}
//# sourceMappingURL=map_bin.d.ts.map