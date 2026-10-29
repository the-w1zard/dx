
export class WS2I<T extends WeakKey = A> extends WeakSet<T> implements WS2<T> {
	private readonly _tracked = new Set<T>();

	constructor(values?: readonly T[] | Iterable<T> | null) {
		super(values == null ? undefined : Array.from(values));
	}
	override add(value: T): this {
		return super.add(value);
	}

	override delete(value: T): boolean {
		this._tracked.delete(value);
		return super.delete(value);
	}

	override has(value: T): boolean {
		return super.has(value);
	}

	addIfAbsent(value: T): boolean {
		if (this.has(value)) return false;
		this.add(value);
		return true;
	}

	toggle(value: T): boolean {
		if (this.has(value)) {
			this.delete(value);
			return false;
		}
		this.add(value);
		return true;
	}

	deleteIfPresent(value: T): boolean {
		return this.delete(value);
	}

	hasAll(values: Iterable<T>): boolean {
		for (const value of values) {
			if (!this.has(value)) return false;
		}
		return true;
	}

	hasAny(values: Iterable<T>): boolean {
		for (const value of values) {
			if (this.has(value)) return true;
		}
		return false;
	}

	addAll(values: Iterable<T>): this {
		for (const value of values) this.add(value);
		return this;
	}

	deleteAll(values: Iterable<T>): N {
		let count = 0;
		for (const value of values) {
			if (this.delete(value)) count++;
		}
		return count as N;
	}

	replace(oldValue: T, newValue: T): boolean {
		if (!this.has(oldValue)) return false;
		this.delete(oldValue);
		this.add(newValue);
		return true;
	}

	track(value: T): this {
		this.add(value);
		this._tracked.add(value);
		return this;
	}

	untrack(value: T): boolean {
		return this._tracked.delete(value);
	}

	trackedKeys(): T[] {
		return Array.from(this._tracked);
	}

	forEachTracked(callback: (value: T, set: this) => void, thisArg?: A): void {
		this._tracked.forEach(value => {
			if (this.has(value)) callback.call(thisArg, value, this);
			else this._tracked.delete(value);
		});
	}

	clearTracked(): void {
		for (const value of this._tracked) super.delete(value);
		this._tracked.clear();
	}
}

globalThis.WS2 = WS2I as WS2C;
