type Slot<P> = { sequence: number; key: unknown; payload: P | undefined; tombstone: boolean };
const nextPow2 = (n: number) => 1 << Math.ceil(Math.log2(Math.max(2, n)));
class Disruptor<P> {
	private readonly mask: number;
	private readonly buffer: Slot<P>[];
	public cursor = -1;

	constructor(public readonly capacity: number) {
		const size = nextPow2(capacity);
		this.mask = size - 1;
		this.buffer = Array.from({ length: size }, () => ({ sequence: -1, key: undefined, payload: undefined, tombstone: false }));
	}

	/** The slot that WILL be claimed next — peek before you commit to it. */
	peekNext(): Slot<P> {
		return this.buffer[(this.cursor + 1) & this.mask];
	}

	publish(key: unknown, payload: P | undefined, tombstone = false): number {
		const seq = this.cursor + 1;
		const slot = this.buffer[seq & this.mask];
		slot.sequence = seq;
		slot.key = key;
		slot.payload = payload;
		slot.tombstone = tombstone;
		this.cursor = seq;
		return seq;
	}

	read(seq: number): Slot<P> | undefined {
		if (seq < 0 || seq > this.cursor) return undefined;
		const slot = this.buffer[seq & this.mask];
		return slot.sequence === seq ? slot : undefined;
	}
}
function assertEncodable(value: unknown): void {
	if (typeof value === "function") {
		throw new TypeError("[RAVEN] state values must be plain data — functions can't be stored here.");
	}
}
function encode<T>(value: T): T {
	assertEncodable(value);
	if (value === null || typeof value !== "object") return value;
	return (typeof structuredClone === "function" ? structuredClone(value) : JSON.parse(JSON.stringify(value))) as T;
}
function decode<T>(value: T): T {
	if (value === null || typeof value !== "object") return value;
	return (typeof structuredClone === "function" ? structuredClone(value) : JSON.parse(JSON.stringify(value))) as T;
}
class Lane<V> {
	private ring: Disruptor<V>;
	private writes = 0;
	constructor(public readonly capacity: number) {
		this.ring = new Disruptor<V>(capacity);
	}
	get isFull(): boolean { return this.writes >= this.capacity; }
	get pressure(): number { return this.writes / this.capacity; }
	write(key: unknown, value: V): number {
		this.writes++;
		return this.ring.publish(key, value);
	}
	readAt(seq: number): V | undefined {
		const slot = this.ring.read(seq);
		return slot && !slot.tombstone ? slot.payload : undefined;
	}
	/** Day 0 gets physically rewritten here — we don't tombstone the old
	 *  ring, we just stop referencing it. The old Disruptor object (and
	 *  everything it held) is garbage the moment nothing points at it. */
	reset(): void {
		this.writes = 0;
		this.ring = new Disruptor<V>(this.capacity);
	}
}
interface IndexEntry { lane: number; seq: number; }
export class MTracer<K = any, V = any> {
	private lanes: Lane<V>[];
	private index = new Map<K, IndexEntry>();
	private dial = 0;

	/** The tracer particle itself — ticks once per completed lap, forever.
	 *  Nobody reads Date.now() anywhere in this class. */
	public revolution = 0;

	constructor(
		private readonly laneCapacity = 256,
		private readonly dialSize = 7, // the "7 day" window — your dial
	) {
		this.lanes = Array.from({ length: dialSize }, () => new Lane<V>(laneCapacity));
	}

	private get activeLane(): Lane<V> { return this.lanes[this.dial]; }

	private advanceDialIfFull(): void {
		if (!this.activeLane.isFull) return;
		this.revolution++;
		this.dial = (this.dial + 1) % this.dialSize;
		// We've swept back around to the lane that was "day 0". Reset it —
		// this is the rewrite — then drop any index entries still pointing
		// at it so get() can't hand back memory that no longer belongs to them.
		this.lanes[this.dial].reset();
		for (const [key, entry] of this.index) {
			if (entry.lane === this.dial) this.index.delete(key);
		}
	}

	set(key: K, value: V): void {
		this.advanceDialIfFull();
		const seq = this.activeLane.write(key, encode(value));
		this.index.set(key, { lane: this.dial, seq });
	}

	get(key: K): V | undefined {
		const entry = this.index.get(key);
		if (!entry) return undefined;
		const payload = this.lanes[entry.lane].readAt(entry.seq);
		if (payload === undefined) { this.index.delete(key); return undefined; }
		return decode(payload);
	}

	has(key: K): boolean { return this.index.has(key) && this.get(key) !== undefined; }
	delete(key: K): boolean { return this.index.delete(key); }
	clear(): void { this.index.clear(); this.lanes.forEach(l => l.reset()); this.dial = 0; }
	entries(): [K, V][] {
		const out: [K, V][] = [];
		for (const key of this.index.keys()) {
			const v = this.get(key);
			if (v !== undefined) out.push([key, v]);
		}
		return out;
	}

	/** Free backpressure: how close the active lane is to ticking the dial
	 *  over. A producer driving this toward 1 while nobody's reading is
	 *  exactly "queue depth" — except no timer instrumented it. */
	get pressure(): number { return this.activeLane.pressure; }
}
