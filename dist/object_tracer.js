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
    get isFull() {
        return this.writes >= this.capacity;
    }
    get pressure() {
        return this.writes / this.capacity;
    }
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
export class OTracer {
    laneCapacity;
    dialSize;
    skipEncode;
    lanes;
    index = new Map();
    dial = 0;
    revolution = 0;
    static BLOCKED = new Set(["__proto__", "constructor", "prototype"]);
    constructor(laneCapacity = 256, dialSize = 7, skipEncode = false) {
        this.laneCapacity = laneCapacity;
        this.dialSize = dialSize;
        this.skipEncode = skipEncode;
        this.lanes = Array.from({ length: dialSize }, () => new Lane(laneCapacity));
        const handler = {
            get: (_t, prop) => {
                if (typeof prop === "symbol")
                    return this[prop];
                if (OTracer.BLOCKED.has(prop))
                    return undefined;
                return this.readKey(prop);
            },
            set: (_t, prop, value) => {
                if (typeof prop === "symbol")
                    return false;
                if (OTracer.BLOCKED.has(prop)) {
                    throw new TypeError(`[RAVEN] "${prop}" is not a writable key on this store.`);
                }
                this.writeKey(prop, value);
                return true;
            },
            has: (_t, prop) => {
                if (typeof prop === "symbol")
                    return false;
                return this.readKey(prop) !== undefined;
            },
            deleteProperty: (_t, prop) => {
                if (typeof prop === "symbol")
                    return false;
                return this.index.delete(prop);
            },
            ownKeys: () => [...this.index.keys()].filter((k) => this.readKey(k) !== undefined),
            getOwnPropertyDescriptor: (_t, prop) => {
                if (typeof prop === "symbol")
                    return undefined;
                const value = this.readKey(prop);
                if (value === undefined)
                    return undefined;
                return { value, writable: true, enumerable: true, configurable: true };
            },
        };
        // eslint-disable-next-line no-constructor-return
        return new Proxy(Object.create(null), handler);
    }
    get activeLane() {
        return this.lanes[this.dial];
    }
    advanceDialIfFull() {
        if (!this.activeLane.isFull)
            return;
        this.revolution++;
        this.dial = (this.dial + 1) % this.dialSize;
        this.lanes[this.dial].reset();
        for (const [key, entry] of this.index)
            if (entry.lane === this.dial)
                this.index.delete(key);
    }
    readKey(key) {
        const entry = this.index.get(key);
        if (!entry)
            return undefined;
        const payload = this.lanes[entry.lane].readAt(entry.seq);
        if (payload === undefined) {
            this.index.delete(key);
            return undefined;
        }
        return this.skipEncode ? payload : decode(payload);
    }
    writeKey(key, value) {
        this.advanceDialIfFull();
        const payload = this.skipEncode ? value : encode(value);
        const seq = this.activeLane.write(key, payload);
        this.index.set(key, { lane: this.dial, seq });
    }
}
