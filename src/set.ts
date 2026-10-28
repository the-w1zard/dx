import { M2I } from "./map";

export interface SET2<T = A> extends Set<T> {
	s(value: T): this;
	take(value: T): T | UD;
	peek(value: T): T | false;
	toggle(value: T): B;
	first(): T | UD;
	last(): T | UD;

	union(other: Iterable<T>): SET2I<T>;
	intersection(other: Iterable<T>): SET2I<T>;
	difference(other: Iterable<T>): SET2I<T>;
	symmetricDifference(other: Iterable<T>): SET2I<T>;
	isSubsetOf(other: Iterable<T>): B;
	isSupersetOf(other: Iterable<T>): B;
	isDisjointFrom(other: Iterable<T>): B;
	equals(other: Iterable<T>): B;

	filter(fn: (v: T, set: this) => B): SET2I<T>;
	map<R>(fn: (v: T, set: this) => R): SET2I<R>;
	partition(fn: (v: T, set: this) => B): [SET2I<T>, SET2I<T>];
	differenceBy<K>(other: Iterable<T>, fn: (v: T) => K): SET2I<T>;
	uniqueBy<K>(fn: (v: T) => K): SET2I<T>;
	find(fn: (v: T, set: this) => B): T | UD;
	every(fn: (v: T, set: this) => B): B;
	some(fn: (v: T, set: this) => B): B;
	reduce<R>(fn: (acc: R, v: T, set: this) => R, initial: R): R;

	addAll(values: Iterable<T>): this;
	deleteAll(values: Iterable<T>): N;
	retainAll(values: Iterable<T>): this;
	update(values: Iterable<T>): this;
	replace(values: Iterable<T>): this;
	swap(a: T, b: T): B;

	clone(): this;
	toArray(): T[];
	toMap<K, R>(fn: (v: T) => readonly [K, R]): M2I<K, R>;
	toObject(fn?: (v: T) => S): OB<T>;
	toJSON(): T[];

}

export class SET2I<T = A> extends Set<T> implements SET2<T> {
	s = this.add;

	take(value: T): T | UD {
		if (!this.delete(value)) return undefined as UD;
		return value;
	}

	peek(value: T): T | false {
		return this.has(value) ? value : false;
	}

	toggle(value: T): B {
		if (this.has(value)) {
			this.delete(value);
			return false;
		}
		this.add(value);
		return true;
	}

	first(): T | UD {
		const result = this.values().next();
		return result.done ? undefined as UD : result.value;
	}

	last(): T | UD {
		let result: T | UD = undefined as UD;
		for (const value of this) result = value;
		return result;
	}

	union(other: Iterable<T>): SET2I<T> {
		const out = new SET2I(this);
		for (const value of other) out.add(value);
		return out;
	}

	intersection(other: Iterable<T>): SET2I<T> {
		const values = new Set(other);
		const out = new SET2I<T>();
		for (const value of this) if (values.has(value)) out.add(value);
		return out;
	}

	difference(other: Iterable<T>): SET2I<T> {
		const values = new Set(other);
		const out = new SET2I<T>();
		for (const value of this) if (!values.has(value)) out.add(value);
		return out;
	}

	symmetricDifference(other: Iterable<T>): SET2I<T> {
		const values = new Set(other);
		const out = new SET2I<T>();

		for (const value of this) if (!values.has(value)) out.add(value);
		for (const value of values) if (!this.has(value)) out.add(value);

		return out;
	}

	isSubsetOf(other: Iterable<T>): B {
		const values = new Set(other);
		for (const value of this) if (!values.has(value)) return false;
		return true;
	}

	isSupersetOf(other: Iterable<T>): B {
		for (const value of other) if (!this.has(value)) return false;
		return true;
	}

	isDisjointFrom(other: Iterable<T>): B {
		const values = new Set(other);
		for (const value of this) if (values.has(value)) return false;
		return true;
	}

	equals(other: Iterable<T>): B {
		const values = new Set(other);
		return this.size === values.size && this.isSubsetOf(values);
	}

	filter(fn: (v: T, set: this) => B): SET2I<T> {
		const out = new SET2I<T>();
		for (const value of this) if (fn(value, this)) out.add(value);
		return out;
	}

	map<R>(fn: (v: T, set: this) => R): SET2I<R> {
		const out = new SET2I<R>();
		for (const value of this) out.add(fn(value, this));
		return out;
	}

	partition(fn: (v: T, set: this) => B): [SET2I<T>, SET2I<T>] {
		const yes = new SET2I<T>();
		const no = new SET2I<T>();

		for (const value of this) {
			(fn(value, this) ? yes : no).add(value);
		}

		return [yes, no];
	}

	differenceBy<K>(other: Iterable<T>, fn: (v: T) => K): SET2I<T> {
		const keys = new Set<K>();
		for (const value of other) keys.add(fn(value));

		const out = new SET2I<T>();
		for (const value of this) if (!keys.has(fn(value))) out.add(value);
		return out;
	}

	uniqueBy<K>(fn: (v: T) => K): SET2I<T> {
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

	find(fn: (v: T, set: this) => B): T | UD {
		for (const value of this) if (fn(value, this)) return value;
		return undefined as UD;
	}

	every(fn: (v: T, set: this) => B): B {
		for (const value of this) if (!fn(value, this)) return false;
		return true;
	}

	some(fn: (v: T, set: this) => B): B {
		for (const value of this) if (fn(value, this)) return true;
		return false;
	}

	reduce<R>(fn: (acc: R, v: T, set: this) => R, initial: R): R {
		let result = initial;
		for (const value of this) result = fn(result, value, this);
		return result;
	}

	addAll(values: Iterable<T>): this {
		for (const value of values) this.add(value);
		return this;
	}

	deleteAll(values: Iterable<T>): N {
		let count = 0;
		for (const value of values) if (this.delete(value)) count++;
		return count as N;
	}

	retainAll(values: Iterable<T>): this {
		const keep = new Set(values);
		for (const value of this) if (!keep.has(value)) this.delete(value);
		return this;
	}

	update(values: Iterable<T>): this {
		return this.addAll(values);
	}

	replace(values: Iterable<T>): this {
		const replacement = new Set(values);
		this.clear();
		for (const value of replacement) this.add(value);
		return this;
	}

	swap(a: T, b: T): B {
		if (!this.has(a)) return false;
		this.delete(a);
		this.add(b);
		return true;
	}

	clone(): this {
		return new SET2I(this) as this;
	}

	toArray(): T[] {
		return [...this];
	}

	toMap<K, R>(fn: (v: T) => readonly [K, R]): M2I<K, R> {
		const out = new M2<K, R>();
		for (const value of this) {
			const [key, result] = fn(value);
			out.set(key, result);
		}
		return out;
	}

	toObject(fn?: (v: T) => S): OB<T> {
		const out = {} as OB<T>;
		for (const value of this) {
			out[(fn ? fn(value) : String(value)) as S] = value;
		}
		return out;
	}

	toJSON(): T[] {
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
