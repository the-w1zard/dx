/*  ==========================================================================================================================
    SITH - PURE BINARY BYTE_BOOL
    Replaces boolean properties and boolean maps with a zero-allocation, PID-indexed Uint8Array lane.
    ================================================================================================================    ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [BYTE_BOOL] */

export class B2BI {
    public readonly flags: Uint8Array;
    constructor(maxParticles: number = 8192) {
        this.flags = new Uint8Array(maxParticles);
    }/** Set a boolean flag for a PID. O(1) time complexity. */
    public set(pid: number, value: boolean): void { this.flags[pid] = value ? 1 : 0; }
    public true(pid: number, value: boolean) { this.flags[pid] = 1 }
    public false(pid: number, value: boolean) { this.flags[pid] = 0 }
    /** Get the boolean state for a PID. O(1) time complexity. */
    public get(pid: number): boolean { return this.flags[pid] === 1; }
    /** Toggle the boolean state for a PID. O(1) time complexity. */
    public toggle(pid: number): boolean {
        this.flags[pid] = this.flags[pid] === 1 ? 0 : 1;
        return this.flags[pid] === 1;
    }/** Clear all flags instantly without reallocating memory. */
    public clear(): void { this.flags.fill(0);    }
}
globalThis.B2B = B2BI;
