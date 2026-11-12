export declare class OTracer<V = any> {
    private readonly laneCapacity;
    private readonly dialSize;
    private readonly skipEncode;
    private lanes;
    private index;
    private dial;
    revolution: number;
    private static readonly BLOCKED;
    constructor(laneCapacity?: number, dialSize?: number, skipEncode?: boolean);
    private get activeLane();
    private advanceDialIfFull;
    private readKey;
    private writeKey;
}
