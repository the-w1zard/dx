export declare class M2DI<Key = A, V = number> {
    #private;
    constructor(capacity?: number);
    get size(): N;
    get capacity(): N;
    /** live backing buffer: value of pid p is buffer[p], valid where live[p] === 1 */
    get buffer(): F64;
    get live(): U8;
    get(k: number): V | UD;
    has(k: number): boolean;
    set(k: number, v: V): this;
    delete(k: number): B;
    clear(): void;
    keys(): MapIterator<N>;
    values(): MapIterator<V>;
    entries(): MapIterator<[N, V]>;
    [Symbol.iterator](): MapIterator<[N, V]>;
    forEach(fn: (v: V, k: N, m: M<N, V>) => V, thisArg?: U): void;
    /** read by pid — no typeof guard: pids are numbers */
    g(pid: N): V | UD;
    /** write by pid */
    s(v: N, pid: N): this;
    getOr(pid: N, dflt?: number): N;
    /** pid += delta, returns the new value */
    add(pid: N, delta: N): N;
    in(pid: N): B;
    /** walk live pids without allocating an iterator */
    forEachRaw(fn: (pid: N, value: N) => V): void;
    /** values for a list of pids, NaN where absent */
    gather(pids: ArrayLike<N>, out?: Float64Array<ArrayBuffer>): Float64Array;
}
export interface M2D<K, V> extends M2DI<K, V> {
}
//# sourceMappingURL=map_dense.d.ts.map