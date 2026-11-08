export declare class B2BI {
    readonly flags: Uint8Array;
    constructor(maxParticles?: number); /** Set a boolean flag for a PID. O(1) time complexity. */
    set(pid: number, value: boolean): void;
    true(pid: number, value: boolean): void;
    false(pid: number, value: boolean): void;
    /** Get the boolean state for a PID. O(1) time complexity. */
    get(pid: number): boolean;
    /** Toggle the boolean state for a PID. O(1) time complexity. */
    toggle(pid: number): boolean; /** Clear all flags instantly without reallocating memory. */
    clear(): void;
}
