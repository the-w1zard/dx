export class I2I {
    source;
    index = 0;
    buffer = [];
    done = false;
    constructor(source) {
        this.source = Symbol.iterator in Object(source)
            ? source[Symbol.iterator]()
            : source;
    }
    n = this.next;
    r = this.return;
    f = this.throw;
    next() {
        if (this.buffer.length) {
            this.index++;
            return { done: false, value: this.buffer.shift() };
        }
        if (this.done)
            return { done: true, value: undefined };
        const result = this.source.next();
        if (result.done)
            this.done = true;
        else
            this.index++;
        return result;
    }
    return(value) {
        this.done = true;
        this.buffer.length = 0;
        return this.source.return
            ? this.source.return(value)
            : { done: true, value: value };
    }
    throw(error) {
        this.done = true;
        this.buffer.length = 0;
        if (this.source.throw)
            return this.source.throw(error);
        throw error;
    }
    [Symbol.iterator]() {
        return this;
    }
    toArray() {
        return Array.from(this);
    }
    first() {
        return this.next().value;
    }
    last() {
        let result;
        for (const value of this)
            result = value;
        return result;
    }
    at(index) {
        if (index < 0) {
            const values = this.toArray();
            return values[values.length + index];
        }
        let i = 0;
        for (const value of this) {
            if (i++ === index)
                return value;
        }
        return undefined;
    }
    peek() {
        if (!this.buffer.length && !this.done) {
            const result = this.source.next();
            if (result.done)
                this.done = true;
            else
                this.buffer.push(result.value);
        }
        return this.buffer[0];
    }
    nextValue() {
        return this.next().value;
    }
    nextOr(value) {
        const result = this.next();
        return result.done ? value : result.value;
    }
    nextOrM(make) {
        const result = this.next();
        return result.done ? make() : result.value;
    }
    nextOrThrow(error = new Error("Iterator exhausted")) {
        const result = this.next();
        if (result.done)
            throw error;
        return result.value;
    }
    map(fn) {
        const source = this;
        let index = 0;
        return new I2I({
            next() {
                const result = source.next();
                return result.done ? result : { done: false, value: fn(result.value, index++) };
            },
            return: (value) => {
                source.return?.();
                return { done: true, value: value };
            },
        });
    }
    filter(pred) {
        const source = this;
        let index = 0;
        return new I2I({
            next() {
                let result;
                while (!(result = source.next()).done) {
                    if (pred(result.value, index++))
                        return result;
                }
                return result;
            },
            return: (value) => source.return(value),
        });
    }
    flatMap(fn) {
        const source = this;
        let index = 0;
        let inner;
        return new I2I({
            next() {
                while (true) {
                    if (inner) {
                        const result = inner.next();
                        if (!result.done)
                            return result;
                        inner = undefined;
                    }
                    const outer = source.next();
                    if (outer.done)
                        return { done: true, value: undefined };
                    const mapped = fn(outer.value, index++);
                    inner = Symbol.iterator in Object(mapped)
                        ? mapped[Symbol.iterator]()
                        : mapped;
                }
            },
            return: (value) => {
                source.return?.();
                return { done: true, value: value };
            },
        });
    }
    flat() {
        return this.flatMap(value => value);
    }
    take(limit) {
        const source = this;
        let count = 0;
        return new I2I({
            next() {
                if (count >= limit)
                    return { done: true, value: undefined };
                const result = source.next();
                if (!result.done)
                    count++;
                return result;
            },
            return: (value) => source.return(value),
        });
    }
    drop(limit) {
        const source = this;
        let dropped = false;
        return new I2I({
            next() {
                if (!dropped) {
                    for (let i = 0; i < limit; i++) {
                        if (source.next().done)
                            return { done: true, value: undefined };
                    }
                    dropped = true;
                }
                return source.next();
            },
            return: (value) => source.return(value),
        });
    }
    unique(fn) {
        const source = this;
        const seen = new Set();
        let index = 0;
        return new I2I({
            next() {
                let result;
                while (!(result = source.next()).done) {
                    const key = fn ? fn(result.value, index++) : result.value;
                    if (!seen.has(key)) {
                        seen.add(key);
                        return result;
                    }
                }
                return result;
            },
            return: (value) => source.return(value),
        });
    }
    chunk(size) {
        if (!Number.isInteger(size) || size < 1)
            throw new RangeError("Chunk size must be a positive integer");
        const source = this;
        return new I2I({
            next() {
                const chunk = [];
                while (chunk.length < size) {
                    const result = source.next();
                    if (result.done)
                        break;
                    chunk.push(result.value);
                }
                return chunk.length ? { done: false, value: chunk } : { done: true, value: undefined };
            },
            return: (value) => {
                source.return?.();
                return { done: true, value: value };
            },
        });
    }
    zip(other) {
        const left = this;
        const right = new I2I(other);
        return new I2I({
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
            return: (value) => {
                left.return();
                right.return();
                return { done: true, value: value };
            },
        });
    }
    concat(...others) {
        const source = this;
        let current = source;
        let index = 0;
        return new I2I({
            next() {
                while (true) {
                    const result = current.next();
                    if (!result.done)
                        return result;
                    if (index >= others.length)
                        return { done: true, value: undefined };
                    const other = others[index++];
                    current = Symbol.iterator in Object(other)
                        ? other[Symbol.iterator]()
                        : other;
                }
            },
            return: (value) => {
                current.return?.(value);
                return { done: true, value: value };
            },
        });
    }
    enumerate() {
        const source = this;
        let index = 0;
        return new I2I({
            next() {
                const result = source.next();
                return result.done ? result : { done: false, value: [index++, result.value] };
            },
            return: (value) => {
                source.return?.();
                return { done: true, value: value };
            },
        });
    }
    find(pred) {
        let index = 0;
        for (const value of this)
            if (pred(value, index++))
                return value;
        return undefined;
    }
    findIndex(pred) {
        let index = 0;
        for (const value of this) {
            if (pred(value, index))
                return index;
            index++;
        }
        return -1;
    }
    some(pred) {
        let index = 0;
        for (const value of this)
            if (pred(value, index++))
                return true;
        return false;
    }
    every(pred) {
        let index = 0;
        for (const value of this)
            if (!pred(value, index++))
                return false;
        return true;
    }
    reduce(fn, initial) {
        let acc = initial;
        let index = 0;
        for (const value of this)
            acc = fn(acc, value, index++);
        return acc;
    }
    forEach(fn) {
        let index = 0;
        for (const value of this)
            fn(value, index++);
    }
    count() {
        let count = 0;
        for (const _ of this)
            count++;
        return count;
    }
    sum(fn) {
        let sum = 0;
        for (const value of this)
            sum += fn ? fn(value) : value;
        return sum;
    }
    join(separator = ",") {
        return this.toArray().join(separator);
    }
    partition(pred) {
        const yes = [];
        const no = [];
        let index = 0;
        for (const value of this)
            (pred(value, index++) ? yes : no).push(value);
        return [yes, no];
    }
    group(fn) {
        const out = new Map();
        let index = 0;
        for (const value of this) {
            const key = fn(value, index++);
            let group = out.get(key);
            if (!group)
                out.set(key, group = []);
            group.push(value);
        }
        return out;
    }
    toSet() {
        return new Set(this);
    }
    toMap(keyFn, valueFn) {
        const out = new Map();
        let index = 0;
        for (const value of this) {
            out.set(keyFn(value, index), valueFn ? valueFn(value, index) : value);
            index++;
        }
        return out;
    }
    isEmpty() {
        return this.peek() === undefined;
    }
    exhaust() {
        for (const _ of this) { }
    }
    clone() {
        return new I2I(this.toArray());
    }
}
globalThis.I2 = I2I;
