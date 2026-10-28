export class A2I extends Array {
    constructor(...items) {
        super(...items);
        Object.setPrototypeOf(this, new.target.prototype);
    }
    static get [Symbol.species]() {
        return Array;
    }
    static from(arrayLike) {
        return new A2I(...Array.from(arrayLike));
    }
    static of(...items) {
        return new A2I(...items);
    }
    first() {
        return this[0];
    }
    last() {
        return this[this.length - 1];
    }
    isEmpty() {
        return this.length === 0;
    }
    isNotEmpty() {
        return this.length !== 0;
    }
    clear() {
        this.length = 0;
        return this;
    }
    clone() {
        return new A2I(...this);
    }
    unique() {
        return new A2I(...new Set(this));
    }
    compact() {
        return new A2(...this.filter((value) => value != null));
    }
    take(count) {
        return new A2I(...this.slice(0, Math.max(0, count)));
    }
    takeLast(count) {
        return new A2I(...this.slice(Math.max(0, this.length - Math.max(0, count))));
    }
    drop(count) {
        return new A2I(...this.slice(Math.max(0, count)));
    }
    dropLast(count) {
        return new A2I(...this.slice(0, Math.max(0, this.length - Math.max(0, count))));
    }
    chunk(size) {
        if (!Number.isInteger(size) || size < 1) {
            throw new RangeError("Chunk size must be a positive integer.");
        }
        const result = new A2();
        for (let i = 0; i < this.length; i += size) {
            result.push(new A2I(...this.slice(i, i + size)));
        }
        return result;
    }
    flatten(depth = Infinity) {
        return new A2(...this.flat(depth));
    }
    flatMap(callback) {
        return new A2(...this.flatMap((value, index) => callback(value, index, this)));
    }
    distinctBy(callback) {
        const seen = new Set();
        const result = new A2I();
        this.forEach((value, index) => {
            const key = callback(value, index);
            if (!seen.has(key)) {
                seen.add(key);
                result.push(value);
            }
        });
        return result;
    }
    groupBy(callback) {
        const result = new Map();
        this.forEach((value, index) => {
            const key = callback(value, index);
            let group = result.get(key);
            if (!group) {
                group = new A2I();
                result.set(key, group);
            }
            group.push(value);
        });
        return result;
    }
    partition(callback) {
        const yes = new A2I();
        const no = new A2I();
        this.forEach((value, index) => {
            (callback(value, index) ? yes : no).push(value);
        });
        return [yes, no];
    }
    insert(index, ...items) {
        this.splice(index, 0, ...items);
        return this;
    }
    removeAt(index) {
        const normalized = index < 0 ? this.length + index : index;
        if (normalized < 0 || normalized >= this.length) {
            return undefined;
        }
        return this.splice(normalized, 1)[0];
    }
    remove(value) {
        const index = this.indexOf(value);
        if (index === -1) {
            return false;
        }
        this.splice(index, 1);
        return true;
    }
    removeAll(value) {
        let removed = 0;
        for (let i = this.length - 1; i >= 0; i--) {
            if (Object.is(this[i], value)) {
                this.splice(i, 1);
                removed++;
            }
        }
        return removed;
    }
    replaceAt(index, value) {
        const normalized = index < 0 ? this.length + index : index;
        if (normalized < 0 || normalized >= this.length) {
            return undefined;
        }
        const previous = this[normalized];
        this[normalized] = value;
        return previous;
    }
    move(from, to) {
        const source = from < 0 ? this.length + from : from;
        const target = to < 0 ? this.length + to : to;
        if (source < 0 || source >= this.length ||
            target < 0 || target >= this.length ||
            source === target) {
            return this;
        }
        const [item] = this.splice(source, 1);
        this.splice(target, 0, item);
        return this;
    }
    swap(first, second) {
        const a = first < 0 ? this.length + first : first;
        const b = second < 0 ? this.length + second : second;
        if (a < 0 || a >= this.length ||
            b < 0 || b >= this.length) {
            return this;
        }
        [this[a], this[b]] = [this[b], this[a]];
        return this;
    }
    sample() {
        if (this.length === 0) {
            return undefined;
        }
        return this[Math.floor(Math.random() * this.length)];
    }
    shuffle() {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
        return this;
    }
    countBy(callback) {
        let count = 0;
        this.forEach((value, index) => {
            if (callback(value, index))
                count++;
        });
        return count;
    }
    sum(callback) {
        let total = 0;
        this.forEach((value, index) => {
            total += callback ? callback(value, index) : Number(value);
        });
        return total;
    }
    average(callback) {
        return (this.length === 0 ? NaN : this.sum(callback) / this.length);
    }
    min(callback) {
        if (this.length === 0)
            return undefined;
        return this.reduce((best, value, index) => {
            const current = callback ? callback(value, index) : Number(value);
            const bestValue = callback ? callback(best, this.indexOf(best)) : Number(best);
            return current < bestValue ? value : best;
        });
    }
    max(callback) {
        if (this.length === 0)
            return undefined;
        return this.reduce((best, value, index) => {
            const current = callback ? callback(value, index) : Number(value);
            const bestValue = callback ? callback(best, this.indexOf(best)) : Number(best);
            return current > bestValue ? value : best;
        });
    }
    equals(array) {
        return this.length === array.length &&
            this.every((value, index) => Object.is(value, array[index]));
    }
    includesAll(values) {
        return values.every(value => this.includes(value));
    }
    intersects(values) {
        return values.some(value => this.includes(value));
    }
}
globalThis.A2 = A2I;
