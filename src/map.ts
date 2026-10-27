export interface M2<H = A, T = A> extends Map<H, T> {
	g: typeof Map.prototype.get;
	h: typeof Map.prototype.has;
	d: typeof Map.prototype.delete;
	s(k: H, v: T | (() => T)): this;

	swap(key: H, value: T): T | UD;
	take(key: H): T | UD;
	peek(key: H): T | false;
	getOrI(key: H, value: T): T;
	getOrM(key: H, make: () => T): T;
	update(key: H, fn: (old: T, has: B) => T, initial: T): T;
	setIfAbsent(key: H, value: T): B;
	setIfPresent(key: H, value: T): B;
	replace(key: H, value: T): B;
	inc(key: H, by?: N): N;
	touch(key: H): B;

	mapValues<G>(fn: (v: T, k: H) => G): M2<H, G>;
	mapKeys<G>(fn: (v: T, k: H) => G): M2<G, T>;
	filterKV(pred: (v: T, k: H) => B): this;
	filterKeys(pred: (k: H, v: T) => B): this;
	partition(pred: (v: T, k: H) => B): [M2<H, T>, M2<H, T>];
	find(pred: (v: T, k: H) => B): [H, T] | UD;
	findKey(pred: (v: T, k: H) => B): H | UD;
	findValue(pred: (v: T, k: H) => B): T | UD;
	some(pred: (v: T, k: H) => B): B;
	every(pred: (v: T, k: H) => B): B;
	reduce<G>(fn: (acc: G, v: T, k: H) => G, initial: G): G;
	forEachKV(fn: (v: T, k: H, map: this) => void): void;

	invert(): M2<T, H>;
	group<G>(fn: (v: T, k: H) => G): M2<G, AR<T>>;
	unique<G>(fn?: (v: T, k: H) => G): M2<G, T>;
	pick(keys: Iterable<H>): M2<H, T>;
	omit(keys: Iterable<H>): M2<H, T>;
	merge(other: Iterable<readonly [H, T]>): this;
	clearAndSet(entries: Iterable<readonly [H, T]>): this;

	toObject(): OB<T>;
	toArray(): AR<[H, T]>;
	toKeys(): AR<H>;
	toValues(): AR<T>;
	clone(): this;
	equals(other: Map<H, T>): B;

}

export class M2I<H = A, T = A> extends Map<H, T> implements M2<H, T> {
	g = this.get;
	h = this.has;
	d = this.delete;

	s(k: H, v: T | (() => T)): this {
		const n = typeof v === "function" ? (v as () => T)() : v;
		return super.set(k, n);
	}

	swap(key: H, value: T): T | UD {
		const previous = this.has(key) ? this.get(key) : undefined;
		this.s(key, value);
		return previous as T | UD;
	}

	take(k: H): T | UD {
		const value = this.g(k);
		this.d(k);
		return value;
	}

	peek(k: H): T | false {
		return this.h(k) ? (this.g(k) as T) : false;
	}

	getOrI(k: H, value: T): T {
		if (this.h(k)) return this.g(k) as T;
		this.s(k, value);
		return value;
	}

	getOrM(k: H, make: () => T): T {
		if (this.h(k)) return this.g(k) as T;
		const value = make();
		this.s(k, value);
		return value;
	}

	update(k: H, fn: (old: T, has: B) => T, initial: T): T {
		const has = this.h(k);
		const value = fn(has ? (this.g(k) as T) : initial, has);
		this.s(k, value);
		return value;
	}

	setIfAbsent(k: H, value: T): B {
		if (this.h(k)) return false;
		this.s(k, value);
		return true;
	}

	setIfPresent(k: H, value: T): B {
		if (!this.h(k)) return false;
		this.s(k, value);
		return true;
	}

	replace(k: H, value: T): B {
		return this.setIfPresent(k, value);
	}

	inc(key: H, by: N = 1): N {
		return this.update(
			key,
			(old) => (((old ?? 0) as N) + by) as unknown as T,
			0 as unknown as T,
		) as N;
	}

	touch(k: H): B {
		return this.setIfAbsent(k, undefined as unknown as T);
	}

	mapValues<G>(fn: (v: T, k: H) => G): M2<H, G> {
		const out = new M2I<H, G>();
		for (const [k, v] of this) out.set(k, fn(v, k));
		return out;
	}

	mapKeys<G>(fn: (v: T, k: H) => G): M2<G, T> {
		const out = new M2I<G, T>();
		for (const [k, v] of this) out.set(fn(v, k), v);
		return out;
	}

	filterKV(pred: (v: T, k: H) => B): this {
		for (const [k, v] of this) {
			if (!pred(v, k)) this.d(k);
		}
		return this;
	}

	filterKeys(pred: (k: H, v: T) => B): this {
		for (const [k, v] of this) {
			if (!pred(k, v)) this.d(k);
		}
		return this;
	}

	partition(pred: (v: T, k: H) => B): [M2<H, T>, M2<H, T>] {
		const yes = new M2I<H, T>();
		const no = new M2I<H, T>();

		for (const [k, v] of this) {
			(pred(v, k) ? yes : no).set(k, v);
		}

		return [yes, no];
	}

	find(pred: (v: T, k: H) => B): [H, T] | UD {
		for (const [k, v] of this) {
			if (pred(v, k)) return [k, v];
		}
		return undefined;
	}

	findKey(pred: (v: T, k: H) => B): H | UD {
		for (const [k, v] of this) {
			if (pred(v, k)) return k;
		}
		return undefined;
	}

	findValue(pred: (v: T, k: H) => B): T | UD {
		for (const [k, v] of this) {
			if (pred(v, k)) return v;
		}
		return undefined;
	}

	some(pred: (v: T, k: H) => B): B {
		for (const [k, v] of this) {
			if (pred(v, k)) return true;
		}
		return false;
	}

	every(pred: (v: T, k: H) => B): B {
		for (const [k, v] of this) {
			if (!pred(v, k)) return false;
		}
		return true;
	}

	reduce<G>(fn: (acc: G, v: T, k: H) => G, initial: G): G {
		let acc = initial;
		for (const [k, v] of this) acc = fn(acc, v, k);
		return acc;
	}

	forEachKV(fn: (v: T, k: H, map: this) => void): void {
		for (const [k, v] of this) fn(v, k, this);
	}

	invert(): M2<T, H> {
		const out = new M2I<T, H>();
		for (const [k, v] of this) out.set(v, k);
		return out;
	}

	group<G>(fn: (v: T, k: H) => G): M2<G, AR<T>> {
		const out = new M2I<G, AR<T>>();
		for (const [k, v] of this) {
			out.getOrM(fn(v, k), () => []).push(v);
		}
		return out;
	}

	unique<G>(fn?: (v: T, k: H) => G): M2<G, T> {
		const out = new M2I<G, T>();
		for (const [k, v] of this) {
			const key = (fn ? fn(v, k) : v) as unknown as G;
			if (!out.has(key)) out.set(key, v);
		}
		return out;
	}

	pick(keys: Iterable<H>): M2<H, T> {
		const out = new M2I<H, T>();
		for (const k of keys) {
			if (this.has(k)) out.set(k, this.get(k) as T);
		}
		return out;
	}

	omit(keys: Iterable<H>): M2<H, T> {
		const omitted = new Set(keys);
		const out = new M2I<H, T>();
		for (const [k, v] of this) {
			if (!omitted.has(k)) out.set(k, v);
		}
		return out;
	}

	merge(other: Iterable<readonly [H, T]>): this {
		for (const [k, v] of other) this.set(k, v);
		return this;
	}

	clearAndSet(entries: Iterable<readonly [H, T]>): this {
		const snapshot = Array.from(entries);
		this.clear();
		for (const [k, v] of snapshot) this.set(k, v);
		return this;
	}

	toObject(): OB<T> {
		const out = {} as OB<T>;
		for (const [k, v] of this) out[k as S] = v;
		return out;
	}

	toArray(): AR<[H, T]> {
		return Array.from(this.entries());
	}

	toKeys(): AR<H> {
		return Array.from(this.keys());
	}

	toValues(): AR<T> {
		return Array.from(this.values());
	}

	clone(): this {
		return new M2(this) as this;
	}

	equals(other: Map<H, T>): B {
		if (other === this) return true;
		if (this.size !== other.size) return false;

		for (const [k, v] of this) {
			if (!other.has(k) || !Object.is(other.get(k), v)) return false;
		}

		return true;
	}

	static fromObject<X extends Record<S, A>>(obj: X): M2I<S, X[keyof X]> {
		return new M2(Object.entries(obj) as AR<[S, X[keyof X]]>);
	}

	static fromEntries<H, T>(entries: I<readonly [H, T]>): M2I<H, T> {
		return new M2(entries);
	}

	static from<H, T>(map: RM<H, T>): M2I<H, T> {
		return new M2(map);
	}
}

globalThis.M2 = M2I;
