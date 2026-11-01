export class SET2BI {
	readonly cap: N;
	readonly flags: Uint8Array;   // [pid] -> 0/1, O(1) has()
	readonly slots: I32;          // [idx] -> pid, dense, for iteration
	readonly pidToIdx: I32;       // [pid] -> idx into slots, -1 = absent

	#size = 0;

	constructor(maxParticles: N = 8192, seed?: Iterable<N>) {
		this.cap = maxParticles;
		this.flags = new Uint8Array(maxParticles);
		this.slots = new Int32Array(maxParticles).fill(-1);
		this.pidToIdx = new Int32Array(maxParticles).fill(-1);
		if (seed) for (const pid of seed) this.add(pid);
	}

	get size(): N { return this.#size; }

	// ---------------------------------------------------------------- core
	public s = this.add.bind(this); //                                                                    [s alias]
	public add(pid: N): this { //                                                                           [ADD]
		if (this.flags[pid] === 0) {
			this.flags[pid] = 1;
			const idx = this.#size;
			this.slots[idx] = pid;
			this.pidToIdx[pid] = idx;
			this.#size++;
		}
		return this;
	}
	public has(pid: N): B { return this.flags[pid] === 1; } //                                              [HAS]
	public delete(pid: N): B { //                                                                        [DELETE]
		if (this.flags[pid] !== 1) return false;
		this.flags[pid] = 0;
		const idx = this.pidToIdx[pid];
		const lastIdx = this.#size - 1;
		const lastPid = this.slots[lastIdx];
		if (idx !== lastIdx) {
			this.slots[idx] = lastPid;
			this.pidToIdx[lastPid] = idx;
		}
		this.slots[lastIdx] = -1;
		this.pidToIdx[pid] = -1;
		this.#size--;
		return true;
	}
	public clear(): V { //                                                                                [CLEAR]
		for (let i = 0; i < this.#size; i++) this.flags[this.slots[i]] = 0;
		this.slots.fill(-1, 0, this.#size);
		this.pidToIdx.fill(-1); // cheap enough; or loop same range if cap is huge
		this.#size = 0;
	}

	// ---------------------------------------------------------------- iteration
	public *[Symbol.iterator](): Generator<N> { for (let i = 0; i < this.#size; i++) yield this.slots[i]; }
	public values(): Generator<N> { return this[Symbol.iterator](); }
	public keys(): Generator<N> { return this[Symbol.iterator](); }
	public *entries(): Generator<[N, N]> { for (let i = 0; i < this.#size; i++) yield [this.slots[i], this.slots[i]]; }

	// ---------------------------------------------------------------- sugar
	public take(pid: N): N | UD { return this.delete(pid) ? pid : undefined; } //                          [TAKE]
	public peek(pid: N): N | false { return this.has(pid) ? pid : false; } //                              [PEEK]
	public toggle(pid: N): B { //                                                                        [TOGGLE]
		if (this.has(pid)) { this.delete(pid); return false; }
		this.add(pid);
		return true;
	}
	public first(): N | UD { return this.#size === 0 ? undefined : this.slots[0]; } //                    [FIRST]
	public last(): N | UD { return this.#size === 0 ? undefined : this.slots[this.#size - 1]; } //         [LAST]

	// ---------------------------------------------------------------- set algebra (-> new SET2BI, same cap)
	public union(other: Iterable<N>): SET2BI { //                                                        [UNION]
		const out = new SET2BI(this.cap, this);
		for (const pid of other) out.add(pid);
		return out;
	}
	public intersection(other: Iterable<N>): SET2BI { //                                           [INTERSECTION]
		const probe = new SET2BI(this.cap, other);
		const out = new SET2BI(this.cap);
		for (const pid of this) if (probe.has(pid)) out.add(pid);
		return out;
	}
	public difference(other: Iterable<N>): SET2BI { //                                               [DIFFERENCE]
		const probe = new SET2BI(this.cap, other);
		const out = new SET2BI(this.cap);
		for (const pid of this) if (!probe.has(pid)) out.add(pid);
		return out;
	}
	public symmetricDifference(other: Iterable<N>): SET2BI { //                                [SYMMETRICDIFFERENCE]
		const probe = new SET2BI(this.cap, other);
		const out = new SET2BI(this.cap);
		for (const pid of this) if (!probe.has(pid)) out.add(pid);
		for (const pid of probe) if (!this.has(pid)) out.add(pid);
		return out;
	}
	public isSubsetOf(other: Iterable<N>): B { //                                                   [ISSUBSETOF]
		const probe = new SET2BI(this.cap, other);
		for (const pid of this) if (!probe.has(pid)) return false;
		return true;
	}
	public isSupersetOf(other: Iterable<N>): B { //                                                [ISSUPERSETOF]
		for (const pid of other) if (!this.has(pid)) return false;
		return true;
	}
	public isDisjointFrom(other: Iterable<N>): B { //                                               [ISDISJOINT]
		for (const pid of other) if (this.has(pid)) return false;
		return true;
	}
	public equals(other: Iterable<N>): B { //                                                          [EQUALS]
		const probe = new SET2BI(this.cap, other);
		return this.#size === probe.size && this.isSubsetOf(probe);
	}

	// ---------------------------------------------------------------- functional
	public filter(fn: (pid: N, set: this) => B): SET2BI { //                                            [FILTER]
		const out = new SET2BI(this.cap);
		for (const pid of this) if (fn(pid, this)) out.add(pid);
		return out;
	}
	public map(fn: (pid: N, set: this) => N): SET2BI { //                                                   [MAP]
		const out = new SET2BI(this.cap); // fn must still yield in-range pids
		for (const pid of this) out.add(fn(pid, this));
		return out;
	}
	public partition(fn: (pid: N, set: this) => B): [SET2BI, SET2BI] { //                             [PARTITION]
		const yes = new SET2BI(this.cap), no = new SET2BI(this.cap);
		for (const pid of this) (fn(pid, this) ? yes : no).add(pid);
		return [yes, no];
	}
	public differenceBy<G>(other: Iterable<N>, fn: (pid: N) => G): SET2BI { //                        [DIFFERENCEBY]
		const keys = new Set<G>();
		for (const pid of other) keys.add(fn(pid));
		const out = new SET2BI(this.cap);
		for (const pid of this) if (!keys.has(fn(pid))) out.add(pid);
		return out;
	}
	public uniqueBy<G>(fn: (pid: N) => G): SET2BI { //                                                   [UNIQUEBY]
		const keys = new Set<G>();
		const out = new SET2BI(this.cap);
		for (const pid of this) {
			const key = fn(pid);
			if (keys.has(key)) continue;
			keys.add(key);
			out.add(pid);
		}
		return out;
	}
	public find(fn: (pid: N, set: this) => B): N | UD { //                                                  [FIND]
		for (const pid of this) if (fn(pid, this)) return pid;
		return undefined;
	}
	public every(fn: (pid: N, set: this) => B): B { //                                                     [EVERY]
		for (const pid of this) if (!fn(pid, this)) return false;
		return true;
	}
	public some(fn: (pid: N, set: this) => B): B { //                                                       [SOME]
		for (const pid of this) if (fn(pid, this)) return true;
		return false;
	}
	public reduce<G>(fn: (acc: G, pid: N, set: this) => G, initial: G): G { //                            [REDUCE]
		let result = initial;
		for (const pid of this) result = fn(result, pid, this);
		return result;
	}

	// ---------------------------------------------------------------- bulk mutation
	public addAll(pids: Iterable<N>): this { for (const pid of pids) this.add(pid); return this; } //    [ADDALL]
	public deleteAll(pids: Iterable<N>): N { //                                                        [DELETEALL]
		let count = 0;
		for (const pid of pids) if (this.delete(pid)) count++;
		return count;
	}
	public retainAll(pids: Iterable<N>): this { //                                                     [RETAINALL]
		const keep = new SET2BI(this.cap, pids);
		for (const pid of [...this]) if (!keep.has(pid)) this.delete(pid);
		return this;
	}
	public update(pids: Iterable<N>): this { return this.addAll(pids); } //                              [UPDATE]
	public replace(pids: Iterable<N>): this { //                                                        [REPLACE]
		this.clear();
		for (const pid of pids) this.add(pid);
		return this;
	}
	public swap(a: N, b: N): B { //                                                                        [SWAP]
		if (!this.has(a)) return false;
		this.delete(a);
		this.add(b);
		return true;
	}

	// ---------------------------------------------------------------- export
	public clone(): SET2BI { return new SET2BI(this.cap, this); } //                                     [CLONE]
	public toArray(): AR<N> { return [...this]; } //                                                   [TOARRAY]
	public toMap<K, T>(fn: (pid: N) => [K, T]): Map<K, T> { //                                            [TOMAP]
		const out = new Map<K, T>();
		for (const pid of this) { const [key, result] = fn(pid); out.set(key, result); }
		return out;
	}
	public toObject(fn?: (pid: N) => S): OB<N> { //                                                    [TOOBJECT]
		const out = {} as OB<N>;
		for (const pid of this) out[fn ? fn(pid) : String(pid)] = pid;
		return out;
	}
	public toJSON(): AR<N> { return this.toArray(); } //                                                 [TOJSON]

	static fromArray(pids: AR<N>, maxParticles?: N): SET2BI { //                                      [FROMARRAY]
		return new SET2BI(maxParticles ?? Math.max(...pids, 0) + 1, pids);
	}
	static fromObject(obj: Record<S, N>, maxParticles?: N): SET2BI { //                               [FROMOBJECT]
		return SET2BI.fromArray(Object.values(obj), maxParticles);
	}
	static fromEntries(entries: I<readonly [A, N]>, maxParticles?: N): SET2BI { //                    [FROMENTIRES]
		const pids: AR<N> = [];
		for (const [, pid] of entries) pids.push(pid);
		return SET2BI.fromArray(pids, maxParticles);
	}
	static from(pids: Iterable<N>, maxParticles?: N): SET2BI { //                                          [FROM]
		return new SET2BI(maxParticles ?? 8192, pids);
	}
}

globalThis.SET2B = SET2BI;

