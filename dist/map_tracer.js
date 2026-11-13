const nextPow2 = (n) => 1 << Math.ceil(Math.log2(Math.max(2, n)));
class Disruptor {
    capacity;
    mask;
    buffer;
    cursor = -1;
    constructor(capacity) {
        this.capacity = capacity;
        const size = nextPow2(capacity);
        this.mask = size - 1;
        this.buffer = Array.from({ length: size }, () => ({ sequence: -1, key: undefined, payload: undefined, tombstone: false }));
    }
    /** The slot that WILL be claimed next — peek before you commit to it. */
    peekNext() {
        return this.buffer[(this.cursor + 1) & this.mask];
    }
    publish(key, payload, tombstone = false) {
        const seq = this.cursor + 1;
        const slot = this.buffer[seq & this.mask];
        slot.sequence = seq;
        slot.key = key;
        slot.payload = payload;
        slot.tombstone = tombstone;
        this.cursor = seq;
        return seq;
    }
    read(seq) {
        if (seq < 0 || seq > this.cursor)
            return undefined;
        const slot = this.buffer[seq & this.mask];
        return slot.sequence === seq ? slot : undefined;
    }
}
function assertEncodable(value) {
    if (typeof value === "function") {
        throw new TypeError("[RAVEN] state values must be plain data — functions can't be stored here.");
    }
}
function encode(value) {
    assertEncodable(value);
    if (value === null || typeof value !== "object")
        return value;
    return (typeof structuredClone === "function" ? structuredClone(value) : JSON.parse(JSON.stringify(value)));
}
function decode(value) {
    if (value === null || typeof value !== "object")
        return value;
    return (typeof structuredClone === "function" ? structuredClone(value) : JSON.parse(JSON.stringify(value)));
}
class Lane {
    capacity;
    ring;
    writes = 0;
    constructor(capacity) {
        this.capacity = capacity;
        this.ring = new Disruptor(capacity);
    }
    get isFull() { return this.writes >= this.capacity; }
    get pressure() { return this.writes / this.capacity; }
    write(key, value) {
        this.writes++;
        return this.ring.publish(key, value);
    }
    readAt(seq) {
        const slot = this.ring.read(seq);
        return slot && !slot.tombstone ? slot.payload : undefined;
    }
    /** Day 0 gets physically rewritten here — we don't tombstone the old
     *  ring, we just stop referencing it. The old Disruptor object (and
     *  everything it held) is garbage the moment nothing points at it. */
    reset() {
        this.writes = 0;
        this.ring = new Disruptor(this.capacity);
    }
}
export class MTracer {
    laneCapacity;
    dialSize;
    lanes;
    index = new Map();
    dial = 0;
    /** The tracer particle itself — ticks once per completed lap, forever.
     *  Nobody reads Date.now() anywhere in this class. */
    revolution = 0;
    constructor(laneCapacity = 256, dialSize = 7) {
        this.laneCapacity = laneCapacity;
        this.dialSize = dialSize;
        this.lanes = Array.from({ length: dialSize }, () => new Lane(laneCapacity));
    }
    get activeLane() { return this.lanes[this.dial]; }
    advanceDialIfFull() {
        if (!this.activeLane.isFull)
            return;
        this.revolution++;
        this.dial = (this.dial + 1) % this.dialSize;
        // We've swept back around to the lane that was "day 0". Reset it —
        // this is the rewrite — then drop any index entries still pointing
        // at it so get() can't hand back memory that no longer belongs to them.
        this.lanes[this.dial].reset();
        for (const [key, entry] of this.index) {
            if (entry.lane === this.dial)
                this.index.delete(key);
        }
    }
    set(key, value) {
        this.advanceDialIfFull();
        const seq = this.activeLane.write(key, encode(value));
        this.index.set(key, { lane: this.dial, seq });
    }
    get(key) {
        const entry = this.index.get(key);
        if (!entry)
            return undefined;
        const payload = this.lanes[entry.lane].readAt(entry.seq);
        if (payload === undefined) {
            this.index.delete(key);
            return undefined;
        }
        return decode(payload);
    }
    has(key) { return this.index.has(key) && this.get(key) !== undefined; }
    delete(key) { return this.index.delete(key); }
    clear() { this.index.clear(); this.lanes.forEach(l => l.reset()); this.dial = 0; }
    entries() {
        const out = [];
        for (const key of this.index.keys()) {
            const v = this.get(key);
            if (v !== undefined)
                out.push([key, v]);
        }
        return out;
    }
    /** Free backpressure: how close the active lane is to ticking the dial
     *  over. A producer driving this toward 1 while nobody's reading is
     *  exactly "queue depth" — except no timer instrumented it. */
    get pressure() { return this.activeLane.pressure; }
}
