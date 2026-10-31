export const rv = <T>(v: UF<T>): T => typeof v === "function" ? (v as () => T)() : v;
export const sameValue = (a: A, b: A): B =>    Object.is(a, b) || (a instanceof Date && b instanceof Date && +a === +b);


export class M2I<H = A, T = A> extends Map<H, T> implements M2<H, T> {
	// public g = this.get;
	// public h = this.has;
	// public d = this.delete;
	// public c = this.clear
	public f = this.forEach;//                                                     [FOR EACH]

	#subs?: Set<Sub<H, T>>;
	#hist?: AR<M2Event<H, T>>;
	#histLimit = 0;
	#strict = false;
	#iterating = 0;
	#batching = 0;
	#pending?: M2I<H, M2Event<H, T>>;
	#derived?: M2I<H, Derived<H, T>>;
	#dependents?: M2I<H, Set<H>>;
	#emit(e: M2Event<H, T>): V {
		if (this.#batching > 0) {
			// coalesce: last write per key wins, keep prev from first event
			const pending = this.#pending!.get(e.k);
			this.#pending!.set(
				e.k,
				pending ? { ...e, prev: pending.prev, batch: true } : { ...e, batch: true },
			);
			return;
		}
	
		this.#record(e);
		this.#subs?.forEach((sub) => {
			try { sub(e); } catch (err: A) { process.emitWarning(err); }
		});
	}
	#record(e: M2Event<H, T>): V {
		if (!this.#hist) return;

		this.#hist.push(e);

		if (this.#hist.length > this.#histLimit) {
			this.#hist.splice(0, this.#hist.length - this.#histLimit);
		}
	}
	#invalidate(k: H): V {
		const deps = this.#dependents?.get(k);
		if (!deps) return;

		for (const dk of deps) {
			const d = this.#derived?.get(dk);
			if (!d || d.dirty) continue;

			d.dirty = true;
			this.#emit({ op: "dirty", k: dk, has: d.has });
		}
	}
	#computeDerived(k: H, d: Derived<H, T>): T {
		const vals = d.deps.map((dep) => this.g(dep) as T);
		const next = d.fn(...vals);

		const had = d.has;
		const prev = d.value;

		d.value = next;
		d.has = true;
		d.dirty = false;

		if (!had || !sameValue(prev, next)) {
			this.#emit({
				op: had ? "upd" : "set",
				k,
				v: next,
				prev: prev as T,
				has: true,
			});
		}

		return next;
	}
	#assertNotIterating(op: S): V {
		if (this.#strict && this.#iterating > 0) {
			throw new Error(`M2.${op}() during iteration. Use filterKV(), collect keys first, or disable $strict().`);
		}
	}
	public [Symbol.iterator](): MapIterator<[H, T]> {return this.entries();	}
	public on(fn: Sub<H, T>): () => V {//                                                [ON]
		(this.#subs ??= new Set()).add(fn);
		return () => this.off(fn);
	}
	public off(fn: Sub<H, T>): V {//                                                    [OFF]
		this.#subs?.delete(fn);
	} 
	public batch(fn: () => V): this {//                                               [BATCH]
		this.#batching++;
		this.#pending ??= new M2I<H, M2Event<H, T>>();
	
		try {
			fn();
		} finally {
			this.#batching--;
	
			if (this.#batching === 0) {
				const events = [...this.#pending.values()];
				this.#pending = undefined;
	
				for (const e of events) {
					this.#record(e);
					this.#subs?.forEach(sub => sub(e));
				}
			}
		}
	
		return this;
	}
	public s(v: UF<T>, k: H): this {//                                                  [SET]
		this.#assertNotIterating("s");

		const next = rv(v);
		const has = this.h(k);
		const prev = has ? this.g(k) : undefined;

		super.set(k, next);

		this.#invalidate(k);
		this.#emit({
			op: "set",
			k,
			v: next,
			prev: prev as T,
			has,
		});

		return this;
	}
	public mutate(k: H, fn: (old: T, has: true) => T): T | UD {//                    [MUTATE]
		this.#assertNotIterating("mutate");
	
		if (!this.h(k)) return undefined;
	
		const old = this.g(k) as T;
		const next = fn(old, true);
	
		this.s(next, k);
		return next;
	}
	public d(k: H): B {//                                                            [DELETE]
		this.#assertNotIterating("delete");

		if (!this.h(k)) return false;

		const prev = this.g(k) as T;
		const out = super.delete(k);

		this.#invalidate(k);
		this.#emit({
			op: "del",
			k,
			prev,
			has: false,
		});

		return out;
	}
	public c(): V {//                                                                 [CLEAR]
		
		this.#assertNotIterating("clear");

		const entries = [...this.entries()];
		super.clear();

		for (const [k, prev] of entries) {
			this.#invalidate(k);
			this.#emit({ op: "del", k, prev, has: false });
		}
	}
	public dv(k: H, deps: AR<H>, fn: (...vals: AR<T>) => T): this {//              [DERRIVED]
		
		(this.#derived ??= new M2I<H, Derived<H, T>>())
    .set(k, {
        deps,
        fn,
        dirty: true,
        has: false,
    });

		for (const dep of deps) {
			(this.#dependents ??= new M2I<H, Set<H>>())
    .getOrM(() => new Set(), dep)
    .add(k);
		}

		return this;
	}
	public dirty(...keys: AR<H>): this {//                                            [DIRTY]
		
		for (const k of keys) {
			const d = this.#derived?.get(k);

			if (d && !d.dirty) {
				d.dirty = true;
				this.#emit({ op: "dirty", k, has: d.has });
			}
		}

		return this;
	}
	public g(k: H): T | UD {//                                                         [GET]
		
		const d = this.#derived?.get(k);

		if (d) {
			if (d.dirty || !d.has) return this.#computeDerived(k, d);
			return d.value;
		}

		return super.get(k);
	}
	public h(k: H): B {//                                                              [HAS]
		
		const d = this.#derived?.get(k);

		if (d) {
			if (d.dirty || !d.has) this.#computeDerived(k, d);
			return true;
		}

		return super.has(k);
	}
	public $debug(limit: N = 256): this {//                                          [$DEBUG]
		this.#hist ??= [];
		this.#histLimit = limit;
		return this;
	}
	public $strict(): this {//                                                      [$STRICT]
		this.#strict = true;
		return this;
	}
	public $history(): AR<M2Event<H, T>> {//                                       [$HISTORY]
		return this.#hist ? [...this.#hist] : [];
	}
	public $why(k: H): M2Event<H, T> | UD {//                                          [$WHY]
		if (!this.#hist) return undefined;

		for (let i = this.#hist.length - 1; i >= 0; i--) {
			if (Object.is(this.#hist[i].k, k)) return this.#hist[i];
		}

		return undefined;
	}
	public $diff(other: M2I<H, T>) {//                                                [$DIFF]
		const add: AR<[H, T]> = [];
		const del: AR<H> = [];
		const chg: AR<[H, T, T]> = [];

		for (const [k, v] of this) {
			if (!other.has(k)) {
				add.push([k, v]);
			} else if (!Object.is(other.get(k), v)) {
				chg.push([k, v, other.get(k) as T]);
			}
		}

		for (const k of other.keys()) {
			if (!this.has(k)) del.push(k);
		}

		return { add, del, chg };
	}
	public *entries(): MapIterator<[H, T]> {//                                     [*ENTRIES]
		this.#iterating++;

		try {
			for (const entry of super.entries()) yield entry;
		} finally {
			this.#iterating--;
		}
	}
	public *keys(): MapIterator<H> {//                                                [*KEYS]
		this.#iterating++;

		try {
			for (const k of super.keys()) yield k;
		} finally {
			this.#iterating--;
		}
	}
	public *values(): MapIterator<T> {//                                            [*VALUES]
		this.#iterating++;

		try {
			for (const v of super.values()) yield v;
		} finally {
			this.#iterating--;
		}
	}
	public swap(value: UF<T>, key: H): T | UD {//                                      [SWAP]
		const next = rv(value);
		const previous = this.has(key) ? this.get(key) : next;
		this.s(next, key);
		return previous as T | UD;
	}
	public take(k: H): T | UD {//                                                      [TAKE]
		const value = this.g(k);
		this.d(k);
		return value;
	}
	public peek(k: H): T | false {//                                                   [PEEK]
		return this.h(k) ? (this.g(k) as T) : false;
	}
	public getOrI(value:UF<T>, k: H): T {//                                          [GETORI]
		if (this.h(k)) return this.g(k) as T;
		const next = rv(value);
		this.s(next, k);
		return next;
	}
	public getOrM(make: () => T, k: H): T {//                                        [GETORM]
		if (this.h(k)) return this.g(k) as T;
		const value = make();
		this.s(value, k);
		return value;
	}
	public update(k: H, fn: (old: T, has: B) => T, initial?: UF<T>): T {//           [UPDATE]
		const has = this.h(k);
	
		const old = has
			? (this.g(k) as T)
			: initial === undefined
				? undefined as T
				: rv(initial);
	
		const next = rv(fn(old, has));
	
		this.s(next, k);
		return next;
	}
	public setIfAbsent(value: UF<T>, k: H): B {//                               [SETIFABSENT]
		if (this.h(k)) return false;
		const next = rv(value);
		this.s(next, k);
		return true;
	}
	public setIfPresent(value: UF<T>, k: H): B {//                             [SETIFPRESENT]
		if (!this.h(k)) return false;
		const next = rv(value);
		this.s(next, k);
		return true;
	}
	public replace(value: UF<T>, k: H): B {//                                       [REPLACE]
		const next = rv(value);
		return this.setIfPresent(next, k);
	}
	public inc(key: H, by: N = 1): N {//                                                [INC]
		return this.update(key, (old) => (((old ?? 0) as N) + by) as unknown as T, 0 as unknown as T) as N;
	}
	public touch(k: H): B {//                                                     [SWTOUCHAP]
		return this.setIfAbsent(undefined as unknown as T, k);
	}
	public mapValues<G>(fn: (v: T, k: H) => G): M2<H, G> {//                      [MAPVALUES]
		const out = new M2I<H, G>();
		for (const [k, v] of this) out.s(fn(v, k), k);
		return out;
	}
	public mapKeys<G>(fn: (v: T, k: H) => G): M2<G, T> {//                          [MAPKEYS]
		const out = new M2I<G, T>();
		for (const [k, v] of this) out.s(v, fn(v, k));
		return out;
	}
	public filterKV(pred: (v: T, k: H) => B): this {//                             [FILTERKV]
		for (const [k, v] of this) {
			if (!pred(v, k)) this.d(k);
		}
		return this;
	}
	public filterKeys(pred: (v: T, k: H) => B): this {//                         [FILTERKEYS]
		return this.filterKV(pred);
	}
	public partition(pred: (v: T, k: H) => B): [M2<H, T>, M2<H, T>] {//           [PARTITION]
		const yes = new M2I<H, T>();
		const no = new M2I<H, T>();

		for (const [k, v] of this) {
			(pred(v, k) ? yes : no).s(v, k);
		}

		return [yes, no];
	}
	public find(pred: (v: T, k: H) => B): [H, T] | UD {//                              [FIND]
		for (const [k, v] of this) {
			if (pred(v, k)) return [k, v];
		}
		return undefined;
	}
	public findKey(pred: (v: T, k: H) => B): H | UD {//                             [FINDKEY]
		for (const [k, v] of this) {
			if (pred(v, k)) return k;
		}
		return undefined;
	}
	public findValue(pred: (v: T, k: H) => B): T | UD {//                         [FINDVALUE]
		for (const [k, v] of this) {
			if (pred(v, k)) return v;
		}
		return undefined;
	}
	public some(pred: (v: T, k: H) => B): B {//                                        [SOME]
		for (const [k, v] of this) {
			if (pred(v, k)) return true;
		}
		return false;
	}
	public every(pred: (v: T, k: H) => B): B {//                                      [EVERY]
		for (const [k, v] of this) {
			if (!pred(v, k)) return false;
		}
		return true;
	}
	public reduce<G>(fn: (acc: G, v: T, k: H) => G, initial: G): G {//               [REDUCE]
		let acc = initial;
		for (const [k, v] of this) acc = fn(acc, v, k);
		return acc;
	}
	public forEachKV(fn: (v: T, k: H, map: this) => void): void {//                 [FOREACH]
		for (const [k, v] of this) fn(v, k, this);
	}
	public invert(): M2<T, H> {//                                                    [INVERT]
		const out = new M2I<T, H>();
		for (const [k, v] of this) out.s(k, v);
		return out;
	}
	public unique<G>(fn?: (v: T, k: H) => G): M2<G, T> {//                           [UNIQUE]
		const out = new M2I<G, T>();
		for (const [k, v] of this) {
			const key = (fn ? fn(v, k) : v) as unknown as G;
			if (!out.h(key)) out.s(v, key);
		}
		return out;
	}
	public pick(keys: Iterable<H>): M2<H, T> {//                                       [PICK]
		const out = new M2I<H, T>();
		for (const k of keys) {
			if (this.h(k)) out.s(this.g(k) as T, k);
		}
		return out;
	}
	public omit(keys: Iterable<H>): M2<H, T> {//                                       [EMIT]
		const omitted = new Set(keys);
		const out = new M2I<H, T>();
		for (const [k, v] of this) {
			if (!omitted.has(k)) out.s(v, k);
		}
		return out;
	}
	public merge(other: Iterable<readonly [H, T]>): this {//                          [MERGE]
		for (const [k, v] of other){
		const n = rv(v);
			 this.s(n, k);
			}
		return this;
	}
	public clearAndSet(entries: Iterable<readonly [H, T]>): this {//            [CLEARANDSET]
		return this.batch(() => {
			this.clear();

			for (const [k, v] of entries) {
		const n = rv(v);
				this.s(n, k);
			}
		});
	}
	public toObject(): OB<T> {//                                                  [TOPOBJECT]
		const out = {} as OB<T>;
		for (const [k, v] of this) out[k as S] = v;
		return out;
	}
	public toValues(): A2I<T> { return A2.from(this.values()); }//                 [TOVALUES]
	public toKeys(): A2I<H> { return A2.from(this.keys()); }//                       [TOKEYS]
	public toArray(): A2I<[H, T]> { return A2.from(this.entries()); }//             [TOARRAY]
	public group<G>(fn: (v: T, k: H) => G): M2<G, A2<T>> {//                          [GROUP]
		const out = new M2I<G, A2<T>>();
		for (const [k, v] of this) out.getOrM(() => new A2<T>(), fn(v, k)).push(v);
		return out;
	}
	public clone(): this {//                                                          [CLONE]
		return new M2I(this) as this;
	}
	public equals(other: M2I<H, T>): B {//                                           [EQUALS]
		if (other === this) return true;
		if (this.size !== other.size) return false;

		for (const [k, v] of this) {
			if (!other.has(k) || !sameValue(other.get(k), v)) return false;
		}

		return true;
	}
	static fromObject<X extends Record<S, A>>(obj: X): M2I<S, X[keyof X]> {//      [FROMOBBJ]
		return new M2I(Object.entries(obj) as AR<[S, X[keyof X]]>);
	}
	static fromEntries<H, T>(entries: I<readonly [H, T]>): M2I<H, T> {//        [FROMENTIRES]
		return new M2I(entries);
	}
	static from<H, T>(map: RM<H, T>): M2I<H, T> {//                                    [FROM]
		return new M2I(map);
	}
}

globalThis.M2 = M2I;

/*  ====================================================================================================
    
    ============================================================= ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [STORE] */

