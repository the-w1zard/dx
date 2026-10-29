import { M2I } from "./map";

export class SET2I<T = A> extends Set<T> implements SET2<T> {
	public s = this.add;
	public take(value: T): T | UD {
		if (!this.delete(value)) return undefined as UD;
		return value;
	}
	public peek(value: T): T | false { return this.has(value) ? value : false;	}
	public toggle(value: T): B {
		if (this.has(value)) {
			this.delete(value);
			return false;
		}
		this.add(value);
		return true;
	}
	public first(): T | UD {
		const result = this.values().next();
		return result.done ? undefined as UD : result.value;
	}
	public last(): T | UD {
		let result: T | UD = undefined as UD;
		for (const value of this) result = value;
		return result;
	}
	public union(other: Iterable<T>): SET2I<T> {
		const out = new SET2I(this);
		for (const value of other) out.add(value);
		return out;
	}
	public intersection(other: Iterable<T>): SET2I<T> {
		const values = new Set(other);
		const out = new SET2I<T>();
		for (const value of this) if (values.has(value)) out.add(value);
		return out;
	}
	public difference(other: Iterable<T>): SET2I<T> {
		const values = new Set(other);
		const out = new SET2I<T>();
		for (const value of this) if (!values.has(value)) out.add(value);
		return out;
	}
	public symmetricDifference(other: Iterable<T>): SET2I<T> {
		const values = new Set(other);
		const out = new SET2I<T>();

		for (const value of this) if (!values.has(value)) out.add(value);
		for (const value of values) if (!this.has(value)) out.add(value);

		return out;
	}
	public isSubsetOf(other: Iterable<T>): B {
		const values = new Set(other);
		for (const value of this) if (!values.has(value)) return false;
		return true;
	}
	public isSupersetOf(other: Iterable<T>): B {
		for (const value of other) if (!this.has(value)) return false;
		return true;
	}
	public isDisjointFrom(other: Iterable<T>): B {
		const values = new Set(other);
		for (const value of this) if (values.has(value)) return false;
		return true;
	}
	public equals(other: Iterable<T>): B {
		const values = new Set(other);
		return this.size === values.size && this.isSubsetOf(values);
	}
	public filter(fn: (v: T, set: this) => B): SET2I<T> {
		const out = new SET2I<T>();
		for (const value of this) if (fn(value, this)) out.add(value);
		return out;
	}
	public map<R>(fn: (v: T, set: this) => R): SET2I<R> {
		const out = new SET2I<R>();
		for (const value of this) out.add(fn(value, this));
		return out;
	}
	public partition(fn: (v: T, set: this) => B): [SET2I<T>, SET2I<T>] {
		const yes = new SET2I<T>();
		const no = new SET2I<T>();

		for (const value of this) {
			(fn(value, this) ? yes : no).add(value);
		}

		return [yes, no];
	}
	public differenceBy<K>(other: Iterable<T>, fn: (v: T) => K): SET2I<T> {
		const keys = new Set<K>();
		for (const value of other) keys.add(fn(value));

		const out = new SET2I<T>();
		for (const value of this) if (!keys.has(fn(value))) out.add(value);
		return out;
	}
	public uniqueBy<K>(fn: (v: T) => K): SET2I<T> {
		const keys = new Set<K>();
		const out = new SET2I<T>();

		for (const value of this) {
			const key = fn(value);
			if (keys.has(key)) continue;
			keys.add(key);
			out.add(value);
		}

		return out;
	}
	public find(fn: (v: T, set: this) => B): T | UD {
		for (const value of this) if (fn(value, this)) return value;
		return undefined as UD;
	}
	public every(fn: (v: T, set: this) => B): B {
		for (const value of this) if (!fn(value, this)) return false;
		return true;
	}
	public some(fn: (v: T, set: this) => B): B {
		for (const value of this) if (fn(value, this)) return true;
		return false;
	}
	public reduce<R>(fn: (acc: R, v: T, set: this) => R, initial: R): R {
		let result = initial;
		for (const value of this) result = fn(result, value, this);
		return result;
	}
	public addAll(values: Iterable<T>): this {
		for (const value of values) this.add(value);
		return this;
	}
	public deleteAll(values: Iterable<T>): N {
		let count = 0;
		for (const value of values) if (this.delete(value)) count++;
		return count as N;
	}
	public retainAll(values: Iterable<T>): this {
		const keep = new Set(values);
		for (const value of this) if (!keep.has(value)) this.delete(value);
		return this;
	}
	public update(values: Iterable<T>): this {
		return this.addAll(values);
	}
	public replace(values: Iterable<T>): this {
		const replacement = new Set(values);
		this.clear();
		for (const value of replacement) this.add(value);
		return this;
	}
	public swap(a: T, b: T): B {
		if (!this.has(a)) return false;
		this.delete(a);
		this.add(b);
		return true;
	}
	public clone(): this {
		return new SET2I(this) as this;
	}
	public toArray(): T[] {
		return [...this];
	}
	public toMap<K, R>(fn: (v: T) => readonly [K, R]): M2I<K, R> {
		const out = new M2<K, R>();
		for (const value of this) {
			const [key, result] = fn(value);
			out.set(key, result);
		}
		return out;
	}
	public toObject(fn?: (v: T) => S): OB<T> {
		const out = {} as OB<T>;
		for (const value of this) {
			out[(fn ? fn(value) : String(value)) as S] = value;
		}
		return out;
	}
	public toJSON(): T[] {
		return this.toArray();
	}
	static fromArray<T>(values: T[]): SET2I<T> {
		return new SET2I(values);
	}
	static fromObject<O extends Record<string, A>>(obj: O): SET2I<O[keyof O]> {
		return new SET2I(Object.values(obj) as O[keyof O][]);
	}
	static fromEntries<T>(entries: Iterable<readonly [unknown, T]>): SET2I<T> {
		const out = new SET2I<T>();
		for (const [, value] of entries) out.add(value);
		return out;
	}
	static from<T>(values: Iterable<T>): SET2I<T> {
		return new SET2I(values);
	}
}

globalThis.SET2 = SET2I;
