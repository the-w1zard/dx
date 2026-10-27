export interface I2<T = A> extends Iterator<T> {
    n: I2<T>["next"];
    r: NonNullable<I2<T>["return"]>;
    f: NonNullable<I2<T>["throw"]>;

	toArray(): AR<T>;
	first(): T | UD;
	last(): T | UD;
	at(index: N): T | UD;
	peek(): T | UD;
	nextValue(): T | UD;
	nextOr(value: T): T;
	nextOrM(make: () => T): T;
	nextOrThrow(error?: Error): T;


	find(pred: (value: T, index: N) => B): T | UD;
	findIndex(pred: (value: T, index: N) => B): N;
	some(pred: (value: T, index: N) => B): B;
	every(pred: (value: T, index: N) => B): B;
	reduce<G>(fn: (acc: G, value: T, index: N) => G, initial: G): G;
	forEach(fn: (value: T, index: N) => void): void;

	count(): N;
	sum(fn?: (value: T) => N): N;
	join(separator?: S): S;
	partition(pred: (value: T, index: N) => B): [AR<T>, AR<T>];
	group<G>(fn: (value: T, index: N) => G): Map<G, AR<T>>;
	toSet(): Set<T>;
	toMap<K, V = T>(keyFn: (value: T, index: N) => K, valueFn?: (value: T, index: N) => V): Map<K, V>;

	isEmpty(): B;
	exhaust(): void;


	map<G>(fn: (value: T, index: N) => G): I2I<G>;
filter<S extends T>(pred: (value: T, index: N) => value is S): I2I<S>;
filter(pred: (value: T, index: N) => B): I2I<T>;
flatMap<G>(fn: (value: T, index: N) => Iterable<G> | Iterator<G>): I2I<G>;
flat<G>(this: I2I<Iterable<G> | Iterator<G>>): I2I<G>;
take(limit: N): I2I<T>;
drop(limit: N): I2I<T>;
unique<G = T>(fn?: (value: T, index: N) => G): I2I<T>;
chunk(size: N): I2I<AR<T>>;
zip<G>(other: Iterable<G> | Iterator<G>): I2I<[T, G]>;
concat(...others: (Iterable<T> | Iterator<T>)[]): I2I<T>;
enumerate(): I2I<[N, T]>;
clone(): I2I<T>;
}

export class I2I<T = A> implements I2<T> {
	private source: Iterator<T>;
	private index = 0;
	private buffer: T[] = [];
	private done = false;

	constructor(source: Iterable<T> | Iterator<T>) {
		this.source = Symbol.iterator in Object(source)
			? (source as Iterable<T>)[Symbol.iterator]()
			: source as Iterator<T>;
	}

	n = this.next;
	r = this.return;
	f = this.throw;

	next(): IteratorResult<T> {
		if (this.buffer.length) {
			this.index++;
			return { done: false, value: this.buffer.shift() as T };
		}

		if (this.done) return { done: true, value: undefined };

		const result = this.source.next();
		if (result.done) this.done = true;
		else this.index++;
		return result;
	}

	return(value?: A): IteratorResult<T> {
		this.done = true;
		this.buffer.length = 0;
		return this.source.return
			? this.source.return(value)
			: { done: true, value: value as T };
	}

	throw(error?: A): IteratorResult<T> {
		this.done = true;
		this.buffer.length = 0;
		if (this.source.throw) return this.source.throw(error);
		throw error;
	}

	[Symbol.iterator](): this {
		return this;
	}

	toArray(): AR<T> {
		return Array.from(this);
	}

	first(): T | UD {
		return this.next().value;
	}

	last(): T | UD {
		let result: T | UD;
		for (const value of this) result = value;
		return result!;
	}

	at(index: N): T | UD {
		if (index < 0) {
			const values = this.toArray();
			return values[values.length + index];
		}

		let i = 0;
		for (const value of this) {
			if (i++ === index) return value;
		}
		return undefined;
	}

	peek(): T | UD {
		if (!this.buffer.length && !this.done) {
			const result = this.source.next();
			if (result.done) this.done = true;
			else this.buffer.push(result.value);
		}
		return this.buffer[0];
	}

	nextValue(): T | UD {
		return this.next().value;
	}

	nextOr(value: T): T {
		const result = this.next();
		return result.done ? value : result.value;
	}

	nextOrM(make: () => T): T {
		const result = this.next();
		return result.done ? make() : result.value;
	}

	nextOrThrow(error: Error = new Error("Iterator exhausted")): T {
		const result = this.next();
		if (result.done) throw error;
		return result.value;
	}

	map<G>(fn: (value: T, index: N) => G): I2I<G> {
		const source = this;
		let index = 0;
		return new I2I<G>({
			next() {
				const result = source.next();
				return result.done ? result : { done: false, value: fn(result.value, index++) };
			},
			return: (value?: A): IteratorResult<G> => {
				source.return?.();
				return { done: true, value: value as G };
			},
		});
	}

	filter<S extends T>(pred: (value: T, index: N) => value is S): I2I<S>;
	filter(pred: (value: T, index: N) => B): I2I<T>;
	filter(pred: (value: T, index: N) => B): I2I<T> {
		const source = this;
		let index = 0;
		return new I2I<T>({
			next() {
				let result: IteratorResult<T>;
				while (!(result = source.next()).done) {
					if (pred(result.value, index++)) return result;
				}
				return result;
			},
			return: (value?: A) => source.return(value),
		});
	}

	flatMap<G>(fn: (value: T, index: N) => Iterable<G> | Iterator<G>): I2I<G> {
		const source = this;
		let index = 0;
		let inner: Iterator<G> | undefined;

		return new I2I<G>({
			next() {
				while (true) {
					if (inner) {
						const result = inner.next();
						if (!result.done) return result;
						inner = undefined;
					}

					const outer = source.next();
					if (outer.done) return { done: true, value: undefined };

					const mapped = fn(outer.value, index++);
					inner = Symbol.iterator in Object(mapped)
						? (mapped as Iterable<G>)[Symbol.iterator]()
						: mapped as Iterator<G>;
				}
			},
			return: (value?: A): IteratorResult<G> => {
				source.return?.();
				return { done: true, value: value as G };
			},
		});
	}

	flat<G>(this: I2I<Iterable<G> | Iterator<G>>): I2I<G> {
		return this.flatMap(value => value);
	}

	take(limit: N): I2I<T> {
		const source = this;
		let count = 0;
		return new I2I<T>({
			next() {
				if (count >= limit) return { done: true, value: undefined };
				const result = source.next();
				if (!result.done) count++;
				return result;
			},
			return: (value?: A) => source.return(value),
		});
	}

	drop(limit: N): I2I<T> {
		const source = this;
		let dropped = false;
		return new I2I<T>({
			next() {
				if (!dropped) {
					for (let i = 0; i < limit; i++) {
						if (source.next().done) return { done: true, value: undefined };
					}
					dropped = true;
				}
				return source.next();
			},
			return: (value?: A) => source.return(value),
		});
	}

	unique<G = T>(fn?: (value: T, index: N) => G): I2I<T> {
		const source = this;
		const seen = new Set<G>();
		let index = 0;
		return new I2I<T>({
			next() {
				let result: IteratorResult<T>;
				while (!(result = source.next()).done) {
					const key = fn ? fn(result.value, index++) : result.value as unknown as G;
					if (!seen.has(key)) {
						seen.add(key);
						return result;
					}
				}
				return result;
			},
			return: (value?: A) => source.return(value),
		});
	}

	chunk<G>(size: N): I2I<AR<T>> {
		if (!Number.isInteger(size) || size < 1) throw new RangeError("Chunk size must be a positive integer");
		const source = this;
		return new I2I<AR<T>>({
			next() {
				const chunk: T[] = [];
				while (chunk.length < size) {
					const result = source.next();
					if (result.done) break;
					chunk.push(result.value);
				}
				return chunk.length ? { done: false, value: chunk as AR<T> } : { done: true, value: undefined };
			},
			return: (value?: A): IteratorResult<AR<T>> => {
				source.return?.();
				return { done: true, value: value as AR<T> };
			},
		});
	}

	zip<G>(other: Iterable<G> | Iterator<G>): I2I<[T, G]> {
		const left = this;
		const right = new I2I(other);
		return new I2I<[T, G]>({
			next() {
				const a = left.next();
				const b = right.next();
				if (a.done || b.done) {
					left.return();
					right.return();
					return { done: true, value: undefined };
				}
				return { done: false, value: [a.value, b.value] };
			},
			return: (value?: A) => {
				left.return();
				right.return();
				return { done: true, value: value as [T, G] };
			},
		});
	}

	concat(...others: (Iterable<T> | Iterator<T>)[]): I2I<T> {
		const source = this;
		let current: Iterator<T> = source;
		let index = 0;
		return new I2I<T>({
			next() {
				while (true) {
					const result = current.next();
					if (!result.done) return result;
					if (index >= others.length) return { done: true, value: undefined };
					const other = others[index++];
					current = Symbol.iterator in Object(other)
						? (other as Iterable<T>)[Symbol.iterator]()
						: other as Iterator<T>;
				}
			},
			return: (value?: A) => {
				current.return?.(value);
				return { done: true, value: value as T };
			},
		});
	}

	enumerate<G>(): I2I<[N, T]> {
		const source = this;
		let index = 0;
		return new I2I<[N, T]>({
			next() {
				const result = source.next();
				return result.done ? result : { done: false, value: [index++, result.value] };
			},
			return: (value?: A): IteratorResult<[N, T]> => {
				source.return?.();
				return { done: true, value: value as [N, T] };
			},
		});
	}

	find(pred: (value: T, index: N) => B): T | UD {
		let index = 0;
		for (const value of this) if (pred(value, index++)) return value;
		return undefined;
	}

	findIndex(pred: (value: T, index: N) => B): N {
		let index = 0;
		for (const value of this) {
			if (pred(value, index)) return index;
			index++;
		}
		return -1 as N;
	}

	some(pred: (value: T, index: N) => B): B {
		let index = 0;
		for (const value of this) if (pred(value, index++)) return true;
		return false;
	}

	every(pred: (value: T, index: N) => B): B {
		let index = 0;
		for (const value of this) if (!pred(value, index++)) return false;
		return true;
	}

	reduce<G>(fn: (acc: G, value: T, index: N) => G, initial: G): G {
		let acc = initial;
		let index = 0;
		for (const value of this) acc = fn(acc, value, index++);
		return acc;
	}

	forEach(fn: (value: T, index: N) => void): void {
		let index = 0;
		for (const value of this) fn(value, index++);
	}

	count(): N {
		let count = 0;
		for (const _ of this) count++;
		return count as N;
	}

	sum(fn?: (value: T) => N): N {
		let sum = 0;
		for (const value of this) sum += fn ? fn(value) : value as N;
		return sum as N;
	}

	join(separator: S = ","): S {
		return this.toArray().join(separator) as S;
	}

	partition(pred: (value: T, index: N) => B): [AR<T>, AR<T>] {
		const yes: T[] = [];
		const no: T[] = [];
		let index = 0;
		for (const value of this) (pred(value, index++) ? yes : no).push(value);
		return [yes as AR<T>, no as AR<T>];
	}

	group<G>(fn: (value: T, index: N) => G): Map<G, AR<T>> {
		const out = new Map<G, T[]>();
		let index = 0;
		for (const value of this) {
			const key = fn(value, index++);
			let group = out.get(key);
			if (!group) out.set(key, group = []);
			group.push(value);
		}
		return out as Map<G, AR<T>>;
	}

	toSet(): Set<T> {
		return new Set(this);
	}

	toMap<K, V = T>(keyFn: (value: T, index: N) => K, valueFn?: (value: T, index: N) => V): Map<K, V> {
		const out = new Map<K, V>();
		let index = 0;
		for (const value of this) {
			out.set(keyFn(value, index), valueFn ? valueFn(value, index) : value as unknown as V);
			index++;
		}
		return out;
	}

	isEmpty(): B {
		return this.peek() === undefined;
	}

	exhaust(): void {
		for (const _ of this) {}
	}

	clone(): I2I<T> {
		return new I2I(this.toArray());
	}
}

globalThis.I2 = I2I;
