export declare class MDisruptor<K = any, V = any> {
    private ring;
    private index;
    constructor(initialCapacity?: number);
    get size(): number;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
    delete(key: K): boolean;
    clear(): void;
    entries(): [K, V][];
    private growIfNeeded;
}
//# sourceMappingURL=map_disruptor.d.ts.map