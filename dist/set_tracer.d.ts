export declare class STracer<V = any> {
    private readonly laneCapacity;
    private readonly dialSize;
    private lanes;
    private index;
    private dial;
    revolution: number;
    constructor(laneCapacity?: number, dialSize?: number);
    private get activeLane();
    private advanceDialIfFull;
    add(value: V): this;
    has(value: V): boolean;
    delete(value: V): boolean;
    clear(): void;
    get size(): number;
    forEach(cb: (value: V) => void): void;
    [Symbol.iterator](): Iterator<V>;
    get pressure(): number;
}
//# sourceMappingURL=set_tracer.d.ts.map