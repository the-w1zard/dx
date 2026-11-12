
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

export class OTracer<V = any> {
	private lanes: Lane<V>[];
	private index = new Map<string, IndexEntry>();
	private dial = 0;
	public revolution = 0;
	private static readonly BLOCKED = new Set(["__proto__", "constructor", "prototype"]);

	constructor(
		private readonly laneCapacity = 256,
		private readonly dialSize = 7,
		private readonly skipEncode = false,
	) {
		this.lanes = Array.from({ length: dialSize }, () => new Lane<V>(laneCapacity));

		const handler: ProxyHandler<any> = {
			get: (_t, prop) => {
				if (typeof prop === "symbol") return (this as any)[prop];
				if (OTracer.BLOCKED.has(prop)) return undefined;
				return this.readKey(prop);
			},
			set: (_t, prop, value) => {
				if (typeof prop === "symbol") return false;
				if (OTracer.BLOCKED.has(prop)) {
					throw new TypeError(`[RAVEN] "${prop}" is not a writable key on this store.`);
				}
				this.writeKey(prop, value);
				return true;
			},
			has: (_t, prop) => {
				if (typeof prop === "symbol") return false;
				return this.readKey(prop as string) !== undefined;
			},
			deleteProperty: (_t, prop) => {
				if (typeof prop === "symbol") return false;
				return this.index.delete(prop as string);
			},
			ownKeys: () => [...this.index.keys()].filter((k) => this.readKey(k) !== undefined),
			getOwnPropertyDescriptor: (_t, prop) => {
				if (typeof prop === "symbol") return undefined;
				const value = this.readKey(prop as string);
				if (value === undefined) return undefined;
				return { value, writable: true, enumerable: true, configurable: true };
			},
		};

		// eslint-disable-next-line no-constructor-return
		return new Proxy(Object.create(null), handler);
	}

	private get activeLane(): Lane<V> {
		return this.lanes[this.dial];
	}

	private advanceDialIfFull(): void {
		if (!this.activeLane.isFull) return;
		this.revolution++;
		this.dial = (this.dial + 1) % this.dialSize;
		this.lanes[this.dial].reset();
		for (const [key, entry] of this.index) if (entry.lane === this.dial) this.index.delete(key);
	}

	private readKey(key: string): V | undefined {
		const entry = this.index.get(key);
		if (!entry) return undefined;
		const payload = this.lanes[entry.lane].readAt(entry.seq);
		if (payload === undefined) {
			this.index.delete(key);
			return undefined;
		}
		return this.skipEncode ? payload : decode(payload);
	}

	private writeKey(key: string, value: V): void {
		this.advanceDialIfFull();
		const payload = this.skipEncode ? value : encode(value);
		const seq = this.activeLane.write(key, payload);
		this.index.set(key, { lane: this.dial, seq });
	}
}
