export declare class M2RI<K = N> {
    #private;
    readonly stride: N;
    constructor(capacity?: number, stride?: number);
    get size(): N;
    get capacity(): N;
    get buffer(): Float64Array;
    get(pid: N): Float64Array | UD;
    has(pid: N): boolean;
    set(pid: N, v: Float64Array | ArrayLike<N>): this;
    delete(pid: N): boolean;
    clear(): void;
    /** copy a row in, no validation per component */
    write(pid: N, v: Float64Array | ArrayLike<N>): V;
    /** single component: row[c] = v */
    put(pid: N, c: N, v: N): V;
    /** single component: row[c] */
    at(pid: N, c: N): N;
    /** pid -> slot, or -1 */
    slotOf(pid: N): N;
    /** zero-copy row view you can write through */
    row(pid: N): F64 | UD;
    /** view over the live prefix of the whole table — feed straight to a shader/worker */
    live(): F64;
    keys(): MapIterator<K>;
    values(): MapIterator<F64>;
    entries(): MapIterator<[K, F64]>;
    [Symbol.iterator](): MapIterator<[K, F64]>;
    forEach(fn: (v: F64, k: K, m: M2RI<K>) => V, thisArg?: U): V;
    forEachRaw(fn: (pid: N, slot: N) => V): V;
}
export interface M2R<K> extends M2RI {
}
//# sourceMappingURL=map_rows.d.ts.map