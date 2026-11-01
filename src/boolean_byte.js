/*  ==========================================================================================================================
    SITH - PURE BINARY BYTE_BOOL
    Replaces boolean properties and boolean maps with a zero-allocation, PID-indexed Uint8Array lane.
    ================================================================================================================    ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [BYTE_BOOL] */
export class B2BI {
    flags;
    constructor(maxParticles = 8192) {
        this.flags = new Uint8Array(maxParticles);
    } /** Set a boolean flag for a PID. O(1) time complexity. */
    set(pid, value) { this.flags[pid] = value ? 1 : 0; }
    true(pid, value) { this.flags[pid] = 1; }
    false(pid, value) { this.flags[pid] = 0; }
    /** Get the boolean state for a PID. O(1) time complexity. */
    get(pid) { return this.flags[pid] === 1; }
    /** Toggle the boolean state for a PID. O(1) time complexity. */
    toggle(pid) {
        this.flags[pid] = this.flags[pid] === 1 ? 0 : 1;
        return this.flags[pid] === 1;
    } /** Clear all flags instantly without reallocating memory. */
    clear() { this.flags.fill(0); }
}
globalThis.B2B = B2BI;
