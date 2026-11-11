export declare class MTracer<K = any, V = any> {
    private readonly laneCapacity;
    private readonly dialSize;
    private lanes;
    private index;
    private dial;
    /** The tracer particle itself — ticks once per completed lap, forever.
     *  Nobody reads Date.now() anywhere in this class. */
    revolution: number;
    constructor(laneCapacity?: number, dialSize?: number);
    private get activeLane();
    private advanceDialIfFull;
    set(key: K, value: V): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    delete(key: K): boolean;
    clear(): void;
    entries(): [K, V][];
    /** Free backpressure: how close the active lane is to ticking the dial
     *  over. A producer driving this toward 1 while nobody's reading is
     *  exactly "queue depth" — except no timer instrumented it. */
    get pressure(): number;
}
