export interface U82<T = A> extends Array<T> {
	// Native Array API
	at(index: N): T | undefined;
	concat(...items: (T | ConcatArray<T>)[]): T[];
	copyWithin(target: N, start: N, end?: N): this;
	fill(value: T, start?: N, end?: N): this;
	find<S extends T>(
		predicate: (value: T, index: N, obj: T[]) => value is S,
		thisArg?: A,
	): S | undefined;
	find(predicate: (value: T, index: N, obj: T[]) => unknown, thisArg?: A): T | undefined;
	findIndex(predicate: (value: T, index: N, obj: T[]) => unknown, thisArg?: A): N;
	findLast<S extends T>(
		predicate: (value: T, index: N, obj: T[]) => value is S,
		thisArg?: A,
	): S | undefined;
	findLast(predicate: (value: T, index: N, obj: T[]) => unknown, thisArg?: A): T | undefined;
	findLastIndex(predicate: (value: T, index: N, obj: T[]) => unknown, thisArg?: A): N;
	flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
	flatMap<U, This = undefined>(
		callback: (this: This, value: T, index: N, array: T[]) => U | readonly U[],
		thisArg?: This,
	): U[];
	forEach(callback: (value: T, index: N, array: T[]) => void, thisArg?: A): void;
	includes(searchElement: T, fromIndex?: N): boolean;
	indexOf(searchElement: T, fromIndex?: N): N;
	join(separator?: string): string;
	lastIndexOf(searchElement: T, fromIndex?: N): N;
	map<U>(callback: (value: T, index: N, array: T[]) => U, thisArg?: A): U[];
	pop(): T | undefined;
	push(...items: T[]): N;
	reduce(callback: (previousValue: T, currentValue: T, currentIndex: N, array: T[]) => T): T;
	reduce<U>(callback: (previousValue: U, currentValue: T, currentIndex: N, array: T[]) => U, initialValue: U): U;
	reduceRight(callback: (previousValue: T, currentValue: T, currentIndex: N, array: T[]) => T): T;
	reduceRight<U>(
		callback: (previousValue: U, currentValue: T, currentIndex: N, array: T[]) => U,
		initialValue: U,
	): U;
	reverse(): T[];
	shift(): T | undefined;
	slice(start?: N, end?: N): T[];
	some(predicate: (value: T, index: N, array: T[]) => unknown, thisArg?: A): boolean;
	sort(compareFn?: (a: T, b: T) => N): this;
	splice(start: N, deleteCount?: N): T[];
	splice(start: N, deleteCount: N, ...items: T[]): T[];
	toReversed(): T[];
	toSorted(compareFn?: (a: T, b: T) => N): T[];
	toSpliced(start: N, deleteCount: N, ...items: T[]): T[];
	unshift(...items: T[]): N;
	with(index: N, value: T): T[];
	entries(): ArrayIterator<[N, T]>;
	keys(): ArrayIterator<N>;
	values(): ArrayIterator<T>;
	[Symbol.iterator](): ArrayIterator<T>;
	[Symbol.unscopables]: A;

	// Enhanced helpers
	first(): T | undefined;
	last(): T | undefined;
	second(): T | undefined;
	third(): T | undefined;
	random(): T | undefined;
	isEmpty(): boolean;
	isNotEmpty(): boolean;
	isNotEmptyAndDefined(): boolean;
	clear(): this;
	shuffle(): this;
	count(predicate?: (value: T, index: N, array: T[]) => unknown): N;

	sum(this: U82I<number>): number;
	average(this: U82I<number>): number;
	min(this: U82I<number>): number | undefined;
	max(this: U82I<number>): number | undefined;

	groupBy<K extends PropertyKey>(keyFn: (value: T, index: N) => K): Map<K, U82I<T>>;
	keyBy<K extends PropertyKey>(keyFn: (value: T, index: N) => K): Map<K, T>;
	partition(predicate: (value: T, index: N, array: T[]) => unknown): [U82I<T>, U82I<T>];
	difference(other: Iterable<T>): U82I<T>;
	intersection(other: Iterable<T>): U82I<T>;
	union(other: Iterable<T>): U82I<T>;
	symmetricDifference(other: Iterable<T>): U82I<T>;
	take(count: N): U82I<T>;
	takeLast(count: N): U82I<T>;
	drop(count: N): U82I<T>;
	dropLast(count: N): U82I<T>;
	pluck<K extends keyof T>(key: K): U82I<T[K]>;
	flattenDeep(): U82I<A>;
	insert(index: N, ...items: T[]): this;
	removeAt(index: N): T | undefined;
	remove(value: T): boolean;
	removeWhere(predicate: (value: T, index: N, array: T[]) => unknown): this;
	replace(oldValue: T, newValue: T): boolean;
	move(from: N, to: N): this;
	swap(i: N, j: N): this;
	shuffleInPlace(): this;
	pick(count?: N): U82I<T>;
	toSet(): Set<T>;
	toMap<K extends PropertyKey>(keyFn: (value: T, index: N) => K): Map<K, T>;
	equals(other: readonly T[]): boolean;
	startsWith(other: readonly T[]): boolean;
	endsWith(other: readonly T[]): boolean;
	isSorted(compareFn?: (a: T, b: T) => N): boolean;
	frequencies(): Map<T, N>;

	clone(): U82I<T>;
	unique(): U82I<T>;
	compact(): U82I<NonNullable<T>>;
	chunk(size: N): U82I<U82I<T>>;
	flatten<D extends N = 1>(depth?: D): U82I<A>;
	sample(count?: N): U82I<T>;
}

export class U82I<T = A> extends Array<T> implements U82<T> {
	constructor(...items: T[]) {
		super(...items);
		Object.setPrototypeOf(this, new.target.prototype);
	}

	static get [Symbol.species](): ArrayConstructor {
		return Array;
	}

	static override from<T>(arrayLike: ArrayLike<T>): U82I<T>;
	static override from<T, U>(
		arrayLike: ArrayLike<T>,
		mapFn: (value: T, index: number) => U,
		thisArg?: A,
	): U82I<U>;
	static override from<T>(iterable: Iterable<T> | ArrayLike<T>): U82I<T>;
	static override from<T, U>(
		iterable: Iterable<T> | ArrayLike<T>,
		mapFn?: (value: T, index: number) => U,
		thisArg?: A,
	): U82I<T | U> {
		const values: T[] =
			Symbol.iterator in Object(iterable)
				? Array.from(iterable as Iterable<T>)
				: Array.from(iterable as ArrayLike<T>);

		const result: (T | U)[] = mapFn
			? values.map((value, index) => mapFn.call(thisArg, value, index))
			: values;

		return new U82I<T | U>(...result);
	}

	static override of<T>(...items: T[]): U82I<T> {
		return new U82I(...items);
	}

	first(): T | undefined {
		return this[0];
	}

	last(): T | undefined {
		return this[this.length - 1];
	}

	second(): T | undefined {
		return this[1];
	}

	third(): T | undefined {
		return this[2];
	}

	random(): T | undefined {
		return this.length ? this[Math.floor(Math.random() * this.length)] : undefined;
	}

	isEmpty(): boolean {
		return this.length === 0;
	}

	isNotEmpty(): boolean {
		return this.length > 0;
	}

	isNotEmptyAndDefined(): boolean {
		return this.some(value => value !== undefined && value !== null);
	}

	clear(): this {
		this.length = 0;
		return this;
	}

	clone(): U82I<T> {
		return new U82I(...this);
	}

	unique(): U82I<T> {
		return new U82I(...new Set(this));
	}

	compact(): U82I<NonNullable<T>> {
		return new U82I(...this.filter((value): value is NonNullable<T> => value != null));
	}

	chunk(size: N): U82I<U82I<T>> {
		if (size <= 0) throw new RangeError("Chunk size must be greater than zero");

		const result = new U82I<U82I<T>>();

		for (let i = 0; i < this.length; i += size) {
			result.push(new U82I(...this.slice(i, i + size)));
		}

		return result;
	}

	flatten<D extends N = 1>(depth?: D): U82I<A> {
		return new U82I(...(this.flat(depth) as A[]));
	}

	shuffle(): this {
		return this.shuffleInPlace();
	}

	sample(count = 1 as N): U82I<T> {
		return this.pick(count);
	}

	count(predicate?: (value: T, index: N, array: T[]) => unknown): N {
		return (predicate ? this.filter(predicate).length : this.length) as N;
	}

	sum(this: U82I<number>): number {
		return this.reduce((total, value) => total + value, 0);
	}

	average(this: U82I<number>): number {
		return this.length ? this.sum() / this.length : 0;
	}

	min(this: U82I<number>): number | undefined {
		return this.length ? Math.min(...this) : undefined;
	}

	max(this: U82I<number>): number | undefined {
		return this.length ? Math.max(...this) : undefined;
	}

	groupBy<K extends PropertyKey>(keyFn: (value: T, index: N) => K): Map<K, U82I<T>> {
		const result = new Map<K, U82I<T>>();

		this.forEach((value, index) => {
			const key = keyFn(value, index as N);

			if (!result.has(key)) result.set(key, new U82I<T>());
			result.get(key)!.push(value);
		});

		return result;
	}

	keyBy<K extends PropertyKey>(keyFn: (value: T, index: N) => K): Map<K, T> {
		const result = new Map<K, T>();

		this.forEach((value, index) => result.set(keyFn(value, index as N), value));

		return result;
	}

	partition(predicate: (value: T, index: N, array: T[]) => unknown): [U82I<T>, U82I<T>] {
		const yes = new U82I<T>();
		const no = new U82I<T>();

		this.forEach((value, index, array) => {
			(predicate(value, index as N, array) ? yes : no).push(value);
		});

		return [yes, no];
	}

	difference(other: Iterable<T>): U82I<T> {
		const values = new Set(other);
		return new U82I(...this.filter(value => !values.has(value)));
	}

	intersection(other: Iterable<T>): U82I<T> {
		const values = new Set(other);
		return new U82I(...this.filter(value => values.has(value)));
	}

	union(other: Iterable<T>): U82I<T> {
		return new U82I(...new Set([...this, ...other]));
	}

	symmetricDifference(other: Iterable<T>): U82I<T> {
		const values = new Set(other);
		const own = new Set(this);

		return new U82I(
			...[...this.filter(value => !values.has(value)), ...Array.from(values).filter(value => !own.has(value))],
		);
	}

	take(count: N): U82I<T> {
		return new U82I(...this.slice(0, Math.max(0, count)));
	}

	takeLast(count: N): U82I<T> {
		return new U82I(...this.slice(-Math.max(0, count)));
	}

	drop(count: N): U82I<T> {
		return new U82I(...this.slice(Math.max(0, count)));
	}

	dropLast(count: N): U82I<T> {
		return new U82I(...this.slice(0, Math.max(0, this.length - count)));
	}

	pluck<K extends keyof T>(key: K): U82I<T[K]> {
		return new U82I(...this.map(value => value[key]));
	}

	flattenDeep(): U82I<A> {
		return new U82I(...(this.flat(Infinity) as A[]));
	}

	insert(index: N, ...items: T[]): this {
		this.splice(index, 0, ...items);
		return this;
	}

	removeAt(index: N): T | undefined {
		if (index < 0 || index >= this.length) return undefined;
		return this.splice(index, 1)[0];
	}

	remove(value: T): boolean {
		const index = this.indexOf(value);

		if (index === -1) return false;

		this.splice(index, 1);
		return true;
	}

	removeWhere(predicate: (value: T, index: N, array: T[]) => unknown): this {
		for (let i = this.length - 1; i >= 0; i--) {
			if (predicate(this[i], i as N, this)) this.splice(i, 1);
		}

		return this;
	}

	replace(oldValue: T, newValue: T): boolean {
		const index = this.indexOf(oldValue);

		if (index === -1) return false;

		this[index] = newValue;
		return true;
	}

	move(from: N, to: N): this {
		if (from < 0 || from >= this.length || to < 0 || to >= this.length) return this;

		const [value] = this.splice(from, 1);
		this.splice(to, 0, value);

		return this;
	}

	swap(i: N, j: N): this {
		if (i < 0 || j < 0 || i >= this.length || j >= this.length) return this;

		[this[i], this[j]] = [this[j], this[i]];

		return this;
	}

	shuffleInPlace(): this {
		for (let i = this.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this[i], this[j]] = [this[j], this[i]];
		}

		return this;
	}

	pick(count = 1 as N): U82I<T> {
		const values = [...this];
		const result = new U82I<T>();

		for (let i = 0; i < Math.min(Math.max(0, count), values.length); i++) {
			const j = Math.floor(Math.random() * values.length);
			result.push(values.splice(j, 1)[0]);
		}

		return result;
	}

	toSet(): Set<T> {
		return new Set(this);
	}

	toMap<K extends PropertyKey>(keyFn: (value: T, index: N) => K): Map<K, T> {
		return this.keyBy(keyFn);
	}

	equals(other: readonly T[]): boolean {
		return this.length === other.length && this.every((value, index) => Object.is(value, other[index]));
	}

	startsWith(other: readonly T[]): boolean {
		return other.length <= this.length && other.every((value, index) => Object.is(this[index], value));
	}

	endsWith(other: readonly T[]): boolean {
		return (
			other.length <= this.length &&
			other.every((value, index) => Object.is(this[this.length - other.length + index], value))
		);
	}

	isSorted(compareFn: (a: T, b: T) => N = ((a, b) => (a < b ? -1 : a > b ? 1 : 0) as N)): boolean {
		for (let i = 1; i < this.length; i++) {
			if (compareFn(this[i - 1], this[i]) > 0) return false;
		}

		return true;
	}

	frequencies(): Map<T, N> {
		const result = new Map<T, N>();

		for (const value of this) {
			result.set(value, ((result.get(value) ?? 0) + 1) as N);
		}

		return result;
	}
	findLast<S extends T>(
		predicate: (value: T, index: N, obj: T[]) => value is S,
		thisArg?: A,
	): S | undefined;
	findLast(
		predicate: (value: T, index: N, obj: T[]) => unknown,
		thisArg?: A,
	): T | undefined {
		for (let i = this.length - 1; i >= 0; i--) {
			if (predicate.call(thisArg, this[i], i as N, this)) return this[i];
		}
		return undefined;
	}
	
	findLastIndex(predicate: (value: T, index: N, obj: T[]) => unknown, thisArg?: A): N {
		for (let i = this.length - 1; i >= 0; i--) {
			if (predicate.call(thisArg, this[i], i as N, this)) return i as N;
		}
		return -1 as N;
	}
	
	toReversed(): T[] {
		return [...this].reverse();
	}
	
	toSorted(compareFn?: (a: T, b: T) => N): T[] {
		return [...this].sort(compareFn);
	}
	
	toSpliced(start: N, deleteCount: N, ...items: T[]): T[] {
		const result = [...this];
		result.splice(start, deleteCount, ...items);
		return result;
	}
	
	with(index: N, value: T): T[] {
		const result = [...this];
		const actualIndex = index < 0 ? result.length + index : index;
	
		if (actualIndex < 0 || actualIndex >= result.length) {
			throw new RangeError("Invalid index");
		}
	
		result[actualIndex] = value;
		return result;
	}
}

globalThis.U82 = U82I;
