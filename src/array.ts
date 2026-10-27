
export interface A2<T = A> extends Array<T> {
    first(): T | UD;
    last(): T | UD;
    isEmpty(): B;
    isNotEmpty(): B;

    clear(): this;
    clone(): A2<T>;
    unique(): A2<T>;
    compact(): A2<NonNullable<T>>;

    take(count: N): A2<T>;
    takeLast(count: N): A2<T>;
    drop(count: N): A2<T>;
    dropLast(count: N): A2<T>;
    chunk(size: N): A2<A2<T>>;
    flatten<X>(depth?: N): A2<X>;
    flatMap<U>(callback: (value: T, index: N, array: this) => U | readonly U[]): A2<U>;

    distinctBy<K>(callback: (value: T, index: N) => K): A2<T>;
    groupBy<K extends PropertyKey>(callback: (value: T, index: N) => K): Map<K, A2<T>>;
    partition(callback: (value: T, index: N) => B): [A2<T>, A2<T>];

    insert(index: N, ...items: T[]): this;
    removeAt(index: N): T | UD;
    remove(value: T): B;
    removeAll(value: T): N;
    replaceAt(index: N, value: T): T | UD;
    move(from: N, to: N): this;
    swap(first: N, second: N): this;

    sample(): T | UD;
    shuffle(): this;
    countBy(callback: (value: T, index: N) => B): N;
    sum(callback?: (value: T, index: N) => N): N;
    average(callback?: (value: T, index: N) => N): N;
    min(callback?: (value: T, index: N) => N): T | UD;
    max(callback?: (value: T, index: N) => N): T | UD;

    equals(array: readonly T[]): B;
    includesAll(values: readonly T[]): B;
    intersects(values: readonly T[]): B;
}

export class A2I<T = A> extends Array<T> implements A2<T> {
    constructor(...items: T[]) {
        super(...items);
        Object.setPrototypeOf(this, new.target.prototype);
    }

    static get [Symbol.species](): ArrayConstructor {
        return Array;
    }

    static from<T>(arrayLike: ArrayLike<T> | Iterable<T>): A2<T> {
        return new A2I<T>(...Array.from(arrayLike));
    }

    static of<T>(...items: T[]): A2<T> {
        return new A2I<T>(...items);
    }

    first(): T | UD {
        return this[0];
    }

    last(): T | UD {
        return this[this.length - 1];
    }

    isEmpty(): B {
        return this.length === 0;
    }

    isNotEmpty(): B {
        return this.length !== 0;
    }

    clear(): this {
        this.length = 0;
        return this;
    }

    clone(): A2<T> {
        return new A2I<T>(...this);
    }

    unique(): A2<T> {
        return new A2I<T>(...new Set(this));
    }

    compact(): A2<NonNullable<T>> {
        return new A2<NonNullable<T>>(
            ...this.filter((value): value is NonNullable<T> => value != null)
        );
    }

    take(count: N): A2<T> {
        return new A2I<T>(...this.slice(0, Math.max(0, count)));
    }

    takeLast(count: N): A2<T> {
        return new A2I<T>(...this.slice(Math.max(0, this.length - Math.max(0, count))));
    }

    drop(count: N): A2<T> {
        return new A2I<T>(...this.slice(Math.max(0, count)));
    }

    dropLast(count: N): A2<T> {
        return new A2I<T>(...this.slice(0, Math.max(0, this.length - Math.max(0, count))));
    }

    chunk(size: N): A2<A2<T>> {
        if (!Number.isInteger(size) || size < 1) {
            throw new RangeError("Chunk size must be a positive integer.");
        }

        const result = new A2<A2<T>>();

        for (let i = 0; i < this.length; i += size) {
            result.push(new A2I<T>(...this.slice(i, i + size)));
        }

        return result;
    }

    flatten<X>(depth: N = Infinity): A2<X> {
        return new A2<X>(...this.flat(depth) as X[]);
    }

    flatMap<U>(callback: (value: T, index: N, array: this) => U | readonly U[]): A2<U> {
        return new A2<U>(
            ...this.flatMap((value, index) => callback(value, index as N, this))
        );
    }

    distinctBy<K>(callback: (value: T, index: N) => K): A2<T> {
        const seen = new Set<K>();
        const result = new A2I<T>();

        this.forEach((value, index) => {
            const key = callback(value, index as N);

            if (!seen.has(key)) {
                seen.add(key);
                result.push(value);
            }
        });

        return result;
    }

    groupBy<K extends PropertyKey>(callback: (value: T, index: N) => K): Map<K, A2<T>> {
        const result = new Map<K, A2<T>>();

        this.forEach((value, index) => {
            const key = callback(value, index as N);
            let group = result.get(key);

            if (!group) {
                group = new A2I<T>();
                result.set(key, group);
            }

            group.push(value);
        });

        return result;
    }

    partition(callback: (value: T, index: N) => B): [A2<T>, A2<T>] {
        const yes = new A2I<T>();
        const no = new A2I<T>();

        this.forEach((value, index) => {
            (callback(value, index as N) ? yes : no).push(value);
        });

        return [yes, no];
    }

    insert(index: N, ...items: T[]): this {
        this.splice(index, 0, ...items);
        return this;
    }

    removeAt(index: N): T | UD {
        const normalized = index < 0 ? this.length + index : index;

        if (normalized < 0 || normalized >= this.length) {
            return undefined;
        }

        return this.splice(normalized, 1)[0];
    }

    remove(value: T): B {
        const index = this.indexOf(value);

        if (index === -1) {
            return false;
        }

        this.splice(index, 1);
        return true;
    }

    removeAll(value: T): N {
        let removed = 0;

        for (let i = this.length - 1; i >= 0; i--) {
            if (Object.is(this[i], value)) {
                this.splice(i, 1);
                removed++;
            }
        }

        return removed as N;
    }

    replaceAt(index: N, value: T): T | UD {
        const normalized = index < 0 ? this.length + index : index;

        if (normalized < 0 || normalized >= this.length) {
            return undefined;
        }

        const previous = this[normalized];
        this[normalized] = value;
        return previous;
    }

    move(from: N, to: N): this {
        const source = from < 0 ? this.length + from : from;
        const target = to < 0 ? this.length + to : to;

        if (
            source < 0 || source >= this.length ||
            target < 0 || target >= this.length ||
            source === target
        ) {
            return this;
        }

        const [item] = this.splice(source, 1);
        this.splice(target, 0, item);
        return this;
    }

    swap(first: N, second: N): this {
        const a = first < 0 ? this.length + first : first;
        const b = second < 0 ? this.length + second : second;

        if (
            a < 0 || a >= this.length ||
            b < 0 || b >= this.length
        ) {
            return this;
        }

        [this[a], this[b]] = [this[b], this[a]];
        return this;
    }

    sample(): T | UD {
        if (this.length === 0) {
            return undefined;
        }

        return this[Math.floor(Math.random() * this.length)];
    }

    shuffle(): this {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }

        return this;
    }

    countBy(callback: (value: T, index: N) => B): N {
        let count = 0;

        this.forEach((value, index) => {
            if (callback(value, index as N)) count++;
        });

        return count as N;
    }

    sum(callback?: (value: T, index: N) => N): N {
        let total = 0;

        this.forEach((value, index) => {
            total += callback ? callback(value, index as N) : Number(value);
        });

        return total as N;
    }

    average(callback?: (value: T, index: N) => N): N {
        return (this.length === 0 ? NaN : this.sum(callback) / this.length) as N;
    }

    min(callback?: (value: T, index: N) => N): T | UD {
        if (this.length === 0) return undefined;

        return this.reduce((best, value, index) => {
            const current = callback ? callback(value, index as N) : Number(value);
            const bestValue = callback ? callback(best, this.indexOf(best) as N) : Number(best);

            return current < bestValue ? value : best;
        });
    }

    max(callback?: (value: T, index: N) => N): T | UD {
        if (this.length === 0) return undefined;

        return this.reduce((best, value, index) => {
            const current = callback ? callback(value, index as N) : Number(value);
            const bestValue = callback ? callback(best, this.indexOf(best) as N) : Number(best);

            return current > bestValue ? value : best;
        });
    }

    equals(array: readonly T[]): B {
        return this.length === array.length &&
            this.every((value, index) => Object.is(value, array[index]));
    }

    includesAll(values: readonly T[]): B {
        return values.every(value => this.includes(value));
    }

    intersects(values: readonly T[]): B {
        return values.some(value => this.includes(value));
    }
}

globalThis.A2 = A2I;
