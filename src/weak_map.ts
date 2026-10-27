export interface WM2<H extends WeakKey = A, T = A> extends WeakMap<H, T> {
	g: typeof WeakMap.prototype.get;
	h: typeof WeakMap.prototype.has;
	d: typeof WeakMap.prototype.delete;
	s(k: H, v: T | (() => T)): this;

	swap(key: H, value: T): T | UD;
	take(key: H): T | UD;
	getAndDelete(key: H): T | UD;
	peek(key: H): T | false;

	getOrI(key: H, value: T): T;
	getOrM(key: H, make: () => T): T;
	getOr<G>(key: H, fallback: G): T | G;
	getOrThrow(key: H, error?: Error): T;
	getOrCreate(key: H, make: () => T): T;
	ensure(key: H, make: () => T): T;

	update(key: H, fn: (old: T, has: B) => T, initial: T): T;
	setIfAbsent(key: H, value: T): B;
	setIfPresent(key: H, value: T): B;
	hasOrSet(key: H, value: T): B;
	replace(key: H, value: T): B;
	touch(key: H): B;

	/** Registry-backed methods retain strong references to keys and can prevent garbage collection. */
	readonly tracked?: B;
	readonly trackedSize?: N;
	track(key: H): this;
	untrack(key: H): B;
	trackedKeys(): AR<H>;
	trackedValues(): AR<T>;
	trackedEntries(): AR<[H, T]>;
	forEachTracked(fn: (value: T, key: H, map: this) => void): void;
	clearTracked(): void;
}

export class WM2I<H extends WeakKey = A, T = A> extends WeakMap<H, T> implements WM2<H, T> {
	g = this.get;
	h = this.has;
	d = this.delete;

	private _tracked?: Set<H>;

	s(k: H, v: T | (() => T)): this {
		const n = typeof v === "function" ? (v as () => T)() : v;
		super.set(k, n);
		return this;
	}

	swap(key: H, value: T): T | UD {
		const previous = this.h(key) ? this.g(key) : undefined;
		this.s(key, value);
		return previous as T | UD;
	}

	take(key: H): T | UD {
		const value = this.g(key);
		this.d(key);
		return value;
	}

	getAndDelete(key: H): T | UD {
		return this.take(key);
	}

	peek(key: H): T | false {
		return this.h(key) ? (this.g(key) as T) : false;
	}

	getOrI(key: H, value: T): T {
		if (this.h(key)) return this.g(key) as T;
		this.s(key, value);
		return value;
	}

	getOrM(key: H, make: () => T): T {
		if (this.h(key)) return this.g(key) as T;
		const value = make();
		this.s(key, value);
		return value;
	}

	getOr<G>(key: H, fallback: G): T | G {
		return this.h(key) ? (this.g(key) as T) : fallback;
	}

	getOrThrow(key: H, error: Error = new Error("WeakMap key not found")): T {
		if (!this.h(key)) throw error;
		return this.g(key) as T;
	}

	getOrCreate(key: H, make: () => T): T {
		return this.getOrM(key, make);
	}

	ensure(key: H, make: () => T): T {
		return this.getOrM(key, make);
	}

	update(key: H, fn: (old: T, has: B) => T, initial: T): T {
		const has = this.h(key);
		const value = fn(has ? (this.g(key) as T) : initial, has);
		this.s(key, value);
		return value;
	}

	setIfAbsent(key: H, value: T): B {
		if (this.h(key)) return false;
		this.s(key, value);
		return true;
	}

	setIfPresent(key: H, value: T): B {
		if (!this.h(key)) return false;
		this.s(key, value);
		return true;
	}

	hasOrSet(key: H, value: T): B {
		if (this.h(key)) return true;
		this.s(key, value);
		return false;
	}

	replace(key: H, value: T): B {
		return this.setIfPresent(key, value);
	}

	touch(key: H): B {
		return this.setIfAbsent(key, undefined as unknown as T);
	}

	get tracked(): B {
		return this._tracked !== undefined;
	}

	get trackedSize(): N {
		return this._tracked?.size ?? 0;
	}

	track(key: H): this {
		(this._tracked ??= new Set()).add(key);
		return this;
	}

	untrack(key: H): B {
		return this._tracked?.delete(key) ?? false;
	}

	trackedKeys(): AR<H> {
		return this._tracked ? Array.from(this._tracked) : [];
	}

	trackedValues(): AR<T> {
		const out: T[] = [];
		if (this._tracked) {
			for (const key of this._tracked) {
				if (this.h(key)) out.push(this.g(key) as T);
			}
		}
		return out as AR<T>;
	}

	trackedEntries(): AR<[H, T]> {
		const out: [H, T][] = [];
		if (this._tracked) {
			for (const key of this._tracked) {
				if (this.h(key)) out.push([key, this.g(key) as T]);
			}
		}
		return out as AR<[H, T]>;
	}

	forEachTracked(fn: (value: T, key: H, map: this) => void): void {
		if (this._tracked) {
			for (const key of this._tracked) {
				if (this.h(key)) fn(this.g(key) as T, key, this);
			}
		}
	}

	clearTracked(): void {
		if (this._tracked) {
			for (const key of this._tracked) this.d(key);
			this._tracked.clear();
		}
	}
}

globalThis.WM2 = WM2I;
