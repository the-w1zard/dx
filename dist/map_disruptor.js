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
export class MDisruptor {
    ring;
    index = new Map();
    constructor(initialCapacity = 256) {
        this.ring = new Disruptor(initialCapacity);
    }
    get size() { return this.index.size; }
    get(key) {
        const seq = this.index.get(key);
        if (seq === undefined)
            return undefined;
        const slot = this.ring.read(seq);
        if (!slot || slot.tombstone)
            return undefined;
        return decode(slot.payload);
    }
    has(key) {
        const seq = this.index.get(key);
        if (seq === undefined)
            return false;
        const slot = this.ring.read(seq);
        return !!slot && !slot.tombstone;
    }
    set(key, value) {
        this.growIfNeeded();
        // Evict-and-carry: whatever currently sits in the slot we're about
        // to claim gets relocated forward first if it's still a live key,
        // so a full ring never loses data on wraparound.
        while (true) {
            const occupant = this.ring.peekNext();
            const stillLive = occupant.sequence >= 0 && !occupant.tombstone && this.index.get(occupant.key) === occupant.sequence;
            if (!stillLive)
                break;
            const movedSeq = this.ring.publish(occupant.key, occupant.payload, false);
            this.index.set(occupant.key, movedSeq);
        }
        const seq = this.ring.publish(key, encode(value), false);
        this.index.set(key, seq);
        return this;
    }
    delete(key) {
        // No need to touch the ring at all — removing the index entry is
        // enough; the slot is reclaimed lazily the next time it's evicted.
        return this.index.delete(key);
    }
    clear() {
        this.index.clear();
    }
    entries() {
        const out = [];
        for (const key of this.index.keys()) {
            const v = this.get(key);
            if (v !== undefined)
                out.push([key, v]);
        }
        return out;
    }
    growIfNeeded() {
        if (this.index.size / this.ring.capacity < 0.75)
            return;
        const grown = new Disruptor(this.ring.capacity * 2);
        for (const [key] of this.index) {
            const v = this.get(key); // decode current value
            if (v === undefined)
                continue;
            const seq = grown.publish(key, encode(v), false);
            this.index.set(key, seq);
        }
        this.ring = grown;
    }
}
