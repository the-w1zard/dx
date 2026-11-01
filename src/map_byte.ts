type F64 = Float64Array;
type V128 = N | F64;   // a "value" is either scalar (stride=1) or a stride-length Float64 view

type Derived = {
	deps: AR<N>;
	fn: (...vals: AR<V128>) => V128;
	dirty: B;
	has: B;
	value?: V128;
};

export type M2BEvent = {
	op: "set" | "upd" | "del" | "dirty";
	pid: N;
	v?: V128;
	prev?: V128;
	has: B;
	batch?: B;
};
type Sub = (e: M2BEvent) => V;

const sameValue128 = (a: V128 | UD, b: V128 | UD): B => {
	if (a === b) return true;
	if (a instanceof Float64Array && b instanceof Float64Array) {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) if (!Object.is(a[i], b[i])) return false;
		return true;
	}
	return Object.is(a, b);
};

export class M2BI {
	readonly cap: N;
	readonly stride: N;

	readonly pidToSlot: I32;
	readonly slotToPid: I32;
	readonly vals: F64;

	#size = 0;
	#subs?: Set<Sub>;
	#hist?: AR<M2BEvent>;
	#histLimit = 0;
	#strict = false;
	#iterating = 0;
	#batching = 0;
	#pending?: Map<N, M2BEvent>;
	#derived?: Map<N, Derived>;
	#dependents?: Map<N, Set<N>>;

	constructor(maxParticles: N, stride: N = 1, seed?: I<readonly [N, V128]>) {
		this.cap = maxParticles;
		this.stride = stride;
		this.pidToSlot = new Int32Array(maxParticles).fill(-1);
		this.slotToPid = new Int32Array(maxParticles).fill(-1);
		this.vals = new Float64Array(maxParticles * stride);
		if (seed) for (const [pid, v] of seed) this.s(v, pid);
	}

	get size(): N { return this.#size; }

	// ---------------------------------------------------------------- internals
	#emit(e: M2BEvent): V {
		if (this.#batching > 0) {
			this.#pending ??= new Map();
			const pending = this.#pending.get(e.pid);
			this.#pending.set(e.pid, pending ? { ...e, prev: pending.prev, batch: true } : { ...e, batch: true });
			return;
		}
		this.#record(e);
		this.#subs?.forEach((sub) => { try { sub(e); } catch (err: A) { process.emitWarning(err); } });
	}
	#record(e: M2BEvent): V {
		if (!this.#hist) return;
		this.#hist.push(e);
		if (this.#hist.length > this.#histLimit) this.#hist.splice(0, this.#hist.length - this.#histLimit);
	}
	#invalidate(pid: N): V {
		const deps = this.#dependents?.get(pid);
		if (!deps) return;
		for (const dk of deps) {
			const d = this.#derived?.get(dk);
			if (!d || d.dirty) continue;
			d.dirty = true;
			this.#emit({ op: "dirty", pid: dk, has: d.has });
		}
	}
	#computeDerived(pid: N, d: Derived): V128 {
		const vals = d.deps.map((dep) => this.g(dep) as V128);
		const next = d.fn(...vals);
		const had = d.has;
		const prev = d.value;
		d.value = next; d.has = true; d.dirty = false;
		if (!had || !sameValue128(prev, next)) {
			this.#emit({ op: had ? "upd" : "set", pid, v: next, prev, has: true });
		}
		return next;
	}
	#assertNotIterating(op: S): V {
		if (this.#strict && this.#iterating > 0) {
			throw new Error(`M2BI.${op}() during iteration. Snapshot keys first, or disable $strict().`);
		}
	}
	#readSlot(slot: N): V128 {
		return this.stride === 1 ? this.vals[slot] : this.vals.subarray(slot * this.stride, slot * this.stride + this.stride);
	}
	#writeSlot(slot: N, v: V128): V {
		if (this.stride === 1) this.vals[slot] = v as N;
		else this.vals.set(v as F64, slot * this.stride);
	}
	#fresh(): M2BI { return new M2BI(this.cap, this.stride); } //                     [sibling-store factory]

	// ---------------------------------------------------------------- subs / batch
	public on(fn: Sub): () => V { (this.#subs ??= new Set()).add(fn); return () => this.off(fn); } //      [ON]
	public off(fn: Sub): V { this.#subs?.delete(fn); } //                                                  [OFF]
	public batch(fn: () => V): this { //                                                                 [BATCH]
		this.#batching++;
		this.#pending ??= new Map();
		try { fn(); }
		finally {
			this.#batching--;
			if (this.#batching === 0) {
				const events = [...this.#pending.values()];
				this.#pending = undefined;
				for (const e of events) { this.#record(e); this.#subs?.forEach(sub => sub(e)); }
			}
		}
		return this;
	}

	// ---------------------------------------------------------------- core CRUD
	public s(v: V128, pid: N): this { //                                                                    [SET]
		this.#assertNotIterating("s");
		let slot = this.pidToSlot[pid];
		const has = slot !== -1;
		const prev = has ? this.#readSlot(slot) : undefined;
		if (!has) {
			slot = this.#size;
			this.pidToSlot[pid] = slot;
			this.slotToPid[slot] = pid;
			this.#size++;
		}
		this.#writeSlot(slot, v);
		this.#invalidate(pid);
		this.#emit({ op: has ? "upd" : "set", pid, v, prev, has });
		return this;
	}
	public mutate(pid: N, fn: (old: V128, has: true) => V128): V128 | UD { //                            [MUTATE]
		this.#assertNotIterating("mutate");
		if (!this.h(pid)) return undefined;
		const next = fn(this.g(pid) as V128, true);
		this.s(next, pid);
		return next;
	}
	public d(pid: N): B { //                                                                             [DELETE]
		this.#assertNotIterating("delete");
		const slot = this.pidToSlot[pid];
		if (slot === -1) return false;
		const prev = this.#readSlot(slot);
		const lastSlot = this.#size - 1;
		const lastPid = this.slotToPid[lastSlot];
		if (slot !== lastSlot) {
			this.#writeSlot(slot, this.#readSlot(lastSlot));
			this.slotToPid[slot] = lastPid;
			this.pidToSlot[lastPid] = slot;
		}
		this.pidToSlot[pid] = -1;
		this.slotToPid[lastSlot] = -1;
		this.#size--;
		this.#invalidate(pid);
		this.#emit({ op: "del", pid, prev, has: false });
		return true;
	}
	public c(): V { //                                                                                     [CLEAR]
		this.#assertNotIterating("clear");
		for (let i = this.#size - 1; i >= 0; i--) {
			const pid = this.slotToPid[i];
			const prev = this.#readSlot(i);
			this.pidToSlot[pid] = -1;
			this.slotToPid[i] = -1;
			this.#invalidate(pid);
			this.#emit({ op: "del", pid, prev, has: false });
		}
		this.#size = 0;
	}
	public dv(pid: N, deps: AR<N>, fn: (...vals: AR<V128>) => V128): this { //                          [DERIVED]
		(this.#derived ??= new Map()).set(pid, { deps, fn, dirty: true, has: false });
		for (const dep of deps) {
			const set = (this.#dependents ??= new Map());
			if (!set.has(dep)) set.set(dep, new Set());
			set.get(dep)!.add(pid);
		}
		return this;
	}
	public dirty(...pids: AR<N>): this { //                                                                [DIRTY]
		for (const pid of pids) {
			const d = this.#derived?.get(pid);
			if (d && !d.dirty) { d.dirty = true; this.#emit({ op: "dirty", pid, has: d.has }); }
		}
		return this;
	}
	public g(pid: N): V128 | UD { //                                                                         [GET]
		const d = this.#derived?.get(pid);
		if (d) return d.dirty || !d.has ? this.#computeDerived(pid, d) : d.value!;
		const slot = this.pidToSlot[pid];
		return slot === -1 ? undefined : this.#readSlot(slot);
	}
	public h(pid: N): B { //                                                                                [HAS]
		const d = this.#derived?.get(pid);
		if (d) { if (d.dirty || !d.has) this.#computeDerived(pid, d); return true; }
		return this.pidToSlot[pid] !== -1;
	}

	// ---------------------------------------------------------------- debug
	public $debug(limit: N = 256): this { this.#hist ??= []; this.#histLimit = limit; return this; } //  [$DEBUG]
	public $strict(): this { this.#strict = true; return this; } //                                     [$STRICT]
	public $history(): AR<M2BEvent> { return this.#hist ? [...this.#hist] : []; } //                    [$HISTORY]
	public $why(pid: N): M2BEvent | UD { //                                                                [$WHY]
		if (!this.#hist) return undefined;
		for (let i = this.#hist.length - 1; i >= 0; i--) if (this.#hist[i].pid === pid) return this.#hist[i];
		return undefined;
	}
	public $diff(other: M2BI) { //                                                                        [$DIFF]
		const add: AR<[N, V128]> = [];
		const del: AR<N> = [];
		const chg: AR<[N, V128, V128]> = [];
		for (const [pid, v] of this) {
			if (!other.has(pid)) add.push([pid, v]);
			else if (!sameValue128(other.get(pid), v)) chg.push([pid, v, other.get(pid)!]);
		}
		for (const pid of other.keys()) if (!this.has(pid)) del.push(pid);
		return { add, del, chg };
	}

	// ---------------------------------------------------------------- iteration (dense slots, no hashing)
	public *entries(): Generator<[N, V128]> { //                                                       [*ENTRIES]
		this.#iterating++;
		try { for (let i = 0; i < this.#size; i++) yield [this.slotToPid[i], this.#readSlot(i)]; }
		finally { this.#iterating--; }
	}
	public *keys(): Generator<N> { //                                                                      [*KEYS]
		this.#iterating++;
		try { for (let i = 0; i < this.#size; i++) yield this.slotToPid[i]; }
		finally { this.#iterating--; }
	}
	public *values(): Generator<V128> { //                                                              [*VALUES]
		this.#iterating++;
		try { for (let i = 0; i < this.#size; i++) yield this.#readSlot(i); }
		finally { this.#iterating--; }
	}
	public [Symbol.iterator](): Generator<[N, V128]> { return this.entries(); }

	// ---------------------------------------------------------------- alias / has/has-not helpers
	public has = this.h; //                                                                             [has alias]
	public get = this.g; //                                                                             [get alias]
	public delete = this.d; //                                                                        [delete alias]
	public clear = this.c; //                                                                           [clear alias]
	public f = this.forEach.bind(this); //                                                            [FOR EACH]
	public forEach(fn: (v: V128, pid: N, map: this) => V): V { for (const [pid, v] of this) fn(v, pid, this); }

	// ---------------------------------------------------------------- sugar
	public swap(value: V128, pid: N): V128 | UD { //                                                       [SWAP]
		const previous = this.has(pid) ? this.get(pid) : value;
		this.s(value, pid);
		return previous;
	}
	public take(pid: N): V128 | UD { const value = this.g(pid); this.d(pid); return value; } //             [TAKE]
	public peek(pid: N): V128 | false { return this.h(pid) ? (this.g(pid) as V128) : false; } //            [PEEK]
	public getOrI(value: V128, pid: N): V128 { //                                                        [GETORI]
		if (this.h(pid)) return this.g(pid) as V128;
		this.s(value, pid);
		return value;
	}
	public getOrM(make: () => V128, pid: N): V128 { //                                                   [GETORM]
		if (this.h(pid)) return this.g(pid) as V128;
		const value = make();
		this.s(value, pid);
		return value;
	}
	public update(pid: N, fn: (old: V128, has: B) => V128, initial?: V128): V128 { //                    [UPDATE]
		const has = this.h(pid);
		const old = has ? (this.g(pid) as V128) : (initial === undefined ? (0 as V128) : initial);
		const next = fn(old, has);
		this.s(next, pid);
		return next;
	}
	public setIfAbsent(value: V128, pid: N): B { //                                                [SETIFABSENT]
		if (this.h(pid)) return false;
		this.s(value, pid);
		return true;
	}
	public setIfPresent(value: V128, pid: N): B { //                                              [SETIFPRESENT]
		if (!this.h(pid)) return false;
		this.s(value, pid);
		return true;
	}
	public replace(value: V128, pid: N): B { return this.setIfPresent(value, pid); } //                 [REPLACE]
	public inc(pid: N, by: N = 1): N { //                                                                   [INC]
		return this.update(pid, (old) => (((old as N) ?? 0) + by) as V128, 0) as N;
	}
	public touch(pid: N): B { return this.setIfAbsent(0 as V128, pid); } //                            [SWTOUCHAP]

	// ---------------------------------------------------------------- transforms (produce new M2BI, same cap/stride)
	public mapValues(fn: (v: V128, pid: N) => V128): M2BI { //                                         [MAPVALUES]
		const out = this.#fresh();
		for (const [pid, v] of this) out.s(fn(v, pid), pid);
		return out;
	}
	public mapKeys(fn: (v: V128, pid: N) => N): M2BI { //                                                [MAPKEYS]
		const out = this.#fresh(); // target pids must still fit within cap
		for (const [pid, v] of this) out.s(v, fn(v, pid));
		return out;
	}
	public filterKV(pred: (v: V128, pid: N) => B): this { //                                           [FILTERKV]
		for (const pid of [...this.keys()]) if (!pred(this.g(pid) as V128, pid)) this.d(pid);
		return this;
	}
	public filterKeys(pred: (v: V128, pid: N) => B): this { return this.filterKV(pred); } //          [FILTERKEYS]
	public partition(pred: (v: V128, pid: N) => B): [M2BI, M2BI] { //                                   [PARTITION]
		const yes = this.#fresh(), no = this.#fresh();
		for (const [pid, v] of this) (pred(v, pid) ? yes : no).s(v, pid);
		return [yes, no];
	}
	public find(pred: (v: V128, pid: N) => B): [N, V128] | UD { //                                          [FIND]
		for (const [pid, v] of this) if (pred(v, pid)) return [pid, v];
		return undefined;
	}
	public findKey(pred: (v: V128, pid: N) => B): N | UD { //                                           [FINDKEY]
		for (const [pid, v] of this) if (pred(v, pid)) return pid;
		return undefined;
	}
	public findValue(pred: (v: V128, pid: N) => B): V128 | UD { //                                    [FINDVALUE]
		for (const [pid, v] of this) if (pred(v, pid)) return v;
		return undefined;
	}
	public some(pred: (v: V128, pid: N) => B): B { //                                                       [SOME]
		for (const [pid, v] of this) if (pred(v, pid)) return true;
		return false;
	}
	public every(pred: (v: V128, pid: N) => B): B { //                                                     [EVERY]
		for (const [pid, v] of this) if (!pred(v, pid)) return false;
		return true;
	}
	public reduce<G>(fn: (acc: G, v: V128, pid: N) => G, initial: G): G { //                              [REDUCE]
		let acc = initial;
		for (const [pid, v] of this) acc = fn(acc, v, pid);
		return acc;
	}
	public forEachKV(fn: (v: V128, pid: N, map: this) => V): V { for (const [pid, v] of this) fn(v, pid, this); } // [FOREACH]
	public invert(): M2<V128, N> { //                                                                     [INVERT]
		const out = new Map<S, N>(); // values aren't valid pids/Int32 slots in general -> plain Map, not M2BI
		for (const [pid, v] of this) out.set(this.stride === 1 ? String(v) : Array.from(v as F64).join(","), pid);
		return out as A;
	}
	public unique(fn?: (v: V128, pid: N) => N): M2BI { //                                                   [UNIQUE]
		const out = this.#fresh();
		const seen = new Set<S>();
		for (const [pid, v] of this) {
			const keyFor = fn ? fn(v, pid) : pid;
			const dedupeKey = this.stride === 1 ? String(v) : Array.from(v as F64).join(",");
			if (!seen.has(dedupeKey)) { seen.add(dedupeKey); out.s(v, keyFor); }
		}
		return out;
	}
	public pick(pids: Iterable<N>): M2BI { //                                                                [PICK]
		const out = this.#fresh();
		for (const pid of pids) if (this.h(pid)) out.s(this.g(pid) as V128, pid);
		return out;
	}
	public omit(pids: Iterable<N>): M2BI { //                                                                [OMIT]
		const omitted = new Set(pids);
		const out = this.#fresh();
		for (const [pid, v] of this) if (!omitted.has(pid)) out.s(v, pid);
		return out;
	}
	public merge(other: Iterable<readonly [N, V128]>): this { //                                           [MERGE]
		for (const [pid, v] of other) this.s(v, pid);
		return this;
	}
	public clearAndSet(entries: Iterable<readonly [N, V128]>): this { //                            [CLEARANDSET]
		return this.batch(() => { this.clear(); for (const [pid, v] of entries) this.s(v, pid); });
	}
	public toObject(): OB<V128> { //                                                                  [TOPOBJECT]
		const out = {} as OB<V128>;
		for (const [pid, v] of this) out[pid as unknown as S] = v;
		return out;
	}
	public toValues(): AR<V128> { return [...this.values()]; } //                                       [TOVALUES]
	public toKeys(): AR<N> { return [...this.keys()]; } //                                                [TOKEYS]
	public toArray(): AR<[N, V128]> { return [...this.entries()]; } //                                   [TOARRAY]
	public group<G>(fn: (v: V128, pid: N) => G): Map<G, AR<V128>> { //                                     [GROUP]
		const out = new Map<G, AR<V128>>();
		for (const [pid, v] of this) {
			const k = fn(v, pid);
			if (!out.has(k)) out.set(k, []);
			out.get(k)!.push(v);
		}
		return out;
	}
	public clone(): this { //                                                                              [CLONE]
		return new M2BI(this.cap, this.stride, this.entries()) as this;
	}
	public equals(other: M2BI): B { //                                                                     [EQUALS]
		if (other === this) return true;
		if (this.size !== other.size) return false;
		for (const [pid, v] of this) if (!other.has(pid) || !sameValue128(other.get(pid), v)) return false;
		return true;
	}

	// ---------------------------------------------------------------- statics
	static fromObject(obj: Record<N, V128>, maxParticles: N, stride: N = 1): M2BI { //                  [FROMOBBJ]
		return new M2BI(maxParticles, stride, Object.entries(obj).map(([k, v]) => [Number(k), v] as [N, V128]));
	}
	static fromEntries(entries: I<readonly [N, V128]>, maxParticles: N, stride: N = 1): M2BI { //    [FROMENTIRES]
		return new M2BI(maxParticles, stride, entries);
	}
	static from(map: RM<N, V128>, maxParticles: N, stride: N = 1): M2BI { //                                [FROM]
		return new M2BI(maxParticles, stride, map as A);
	}
}

globalThis.M2B = M2BI;
