
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
	get isFull(): boolean {
		return this.writes >= this.capacity;
	}
	get pressure(): number {
		return this.writes / this.capacity;
	}
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
interface IndexEntry {
	lane: number;
	seq: number;
}

export class STracer<V = any> {
	private lanes: Lane<true>[];
	private index = new Map<V, IndexEntry>(); // member -> location, SameValueZero like native Set
	private dial = 0;
	public revolution = 0;

	constructor(
		private readonly laneCapacity = 8192,
		private readonly dialSize = 7,
	) {
		this.lanes = Array.from({ length: dialSize }, () => new Lane<true>(laneCapacity));
	}

	private get activeLane(): Lane<true> {
		return this.lanes[this.dial];
	}

	private advanceDialIfFull(): void {
		if (!this.activeLane.isFull) return;
		this.revolution++;
		this.dial = (this.dial + 1) % this.dialSize;
		this.lanes[this.dial].reset();
		for (const [member, entry] of this.index) if (entry.lane === this.dial) this.index.delete(member);
	}

	add(value: V): this {
		if (this.index.has(value)) return this; // Set semantics: no dupes, no wasted slot
		this.advanceDialIfFull();
		const seq = this.activeLane.write(value, true); // no encode() — member is never cloned
		this.index.set(value, { lane: this.dial, seq });
		return this;
	}

	has(value: V): boolean {
		const entry = this.index.get(value);
		return !!entry && this.lanes[entry.lane].readAt(entry.seq) !== undefined;
	}

	delete(value: V): boolean {
		return this.index.delete(value);
	}
	clear(): void {
		this.index.clear();
		this.lanes.forEach((l) => l.reset());
		this.dial = 0;
	}
	get size(): number {
		return this.index.size;
	}

	forEach(cb: (value: V) => void): void {
		for (const member of this.index.keys()) if (this.has(member)) cb(member);
	}

	[Symbol.iterator](): Iterator<V> {
		const live: V[] = [];
		for (const member of this.index.keys()) if (this.has(member)) live.push(member);
		return live[Symbol.iterator]();
	}

	get pressure(): number {
		return this.activeLane.pressure;
	}
}
