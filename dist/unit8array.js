export class U82I extends Array {
    constructor(...items) {
        super(...items);
        Object.setPrototypeOf(this, new.target.prototype);
    }
    static get [Symbol.species]() {
        return Array;
    }
    static from(iterable, mapFn, thisArg) {
        const values = Symbol.iterator in Object(iterable)
            ? Array.from(iterable)
            : Array.from(iterable);
        const result = mapFn
            ? values.map((value, index) => mapFn.call(thisArg, value, index))
            : values;
        return new U82I(...result);
    }
    static of(...items) {
        return new U82I(...items);
    }
    first() {
        return this[0];
    }
    last() {
        return this[this.length - 1];
    }
    second() {
        return this[1];
    }
    third() {
        return this[2];
    }
    random() {
        return this.length ? this[Math.floor(Math.random() * this.length)] : undefined;
    }
    isEmpty() {
        return this.length === 0;
    }
    isNotEmpty() {
        return this.length > 0;
    }
    isNotEmptyAndDefined() {
        return this.some(value => value !== undefined && value !== null);
    }
    clear() {
        this.length = 0;
        return this;
    }
    clone() {
        return new U82I(...this);
    }
    unique() {
        return new U82I(...new Set(this));
    }
    compact() {
        return new U82I(...this.filter((value) => value != null));
    }
    chunk(size) {
        if (size <= 0)
            throw new RangeError("Chunk size must be greater than zero");
        const result = new U82I();
        for (let i = 0; i < this.length; i += size) {
            result.push(new U82I(...this.slice(i, i + size)));
        }
        return result;
    }
    flatten(depth) {
        return new U82I(...this.flat(depth));
    }
    shuffle() {
        return this.shuffleInPlace();
    }
    sample(count = 1) {
        return this.pick(count);
    }
    count(predicate) {
        return (predicate ? this.filter(predicate).length : this.length);
    }
    sum() {
        return this.reduce((total, value) => total + value, 0);
    }
    average() {
        return this.length ? this.sum() / this.length : 0;
    }
    min() {
        return this.length ? Math.min(...this) : undefined;
    }
    max() {
        return this.length ? Math.max(...this) : undefined;
    }
    groupBy(keyFn) {
        const result = new Map();
        this.forEach((value, index) => {
            const key = keyFn(value, index);
            if (!result.has(key))
                result.set(key, new U82I());
            result.get(key).push(value);
        });
        return result;
    }
    keyBy(keyFn) {
        const result = new Map();
        this.forEach((value, index) => result.set(keyFn(value, index), value));
        return result;
    }
    partition(predicate) {
        const yes = new U82I();
        const no = new U82I();
        this.forEach((value, index, array) => {
            (predicate(value, index, array) ? yes : no).push(value);
        });
        return [yes, no];
    }
    difference(other) {
        const values = new Set(other);
        return new U82I(...this.filter(value => !values.has(value)));
    }
    intersection(other) {
        const values = new Set(other);
        return new U82I(...this.filter(value => values.has(value)));
    }
    union(other) {
        return new U82I(...new Set([...this, ...other]));
    }
    symmetricDifference(other) {
        const values = new Set(other);
        const own = new Set(this);
        return new U82I(...[...this.filter(value => !values.has(value)), ...Array.from(values).filter(value => !own.has(value))]);
    }
    take(count) {
        return new U82I(...this.slice(0, Math.max(0, count)));
    }
    takeLast(count) {
        return new U82I(...this.slice(-Math.max(0, count)));
    }
    drop(count) {
        return new U82I(...this.slice(Math.max(0, count)));
    }
    dropLast(count) {
        return new U82I(...this.slice(0, Math.max(0, this.length - count)));
    }
    pluck(key) {
        return new U82I(...this.map(value => value[key]));
    }
    flattenDeep() {
        return new U82I(...this.flat(Infinity));
    }
    insert(index, ...items) {
        this.splice(index, 0, ...items);
        return this;
    }
    removeAt(index) {
        if (index < 0 || index >= this.length)
            return undefined;
        return this.splice(index, 1)[0];
    }
    remove(value) {
        const index = this.indexOf(value);
        if (index === -1)
            return false;
        this.splice(index, 1);
        return true;
    }
    removeWhere(predicate) {
        for (let i = this.length - 1; i >= 0; i--) {
            if (predicate(this[i], i, this))
                this.splice(i, 1);
        }
        return this;
    }
    replace(oldValue, newValue) {
        const index = this.indexOf(oldValue);
        if (index === -1)
            return false;
        this[index] = newValue;
        return true;
    }
    move(from, to) {
        if (from < 0 || from >= this.length || to < 0 || to >= this.length)
            return this;
        const [value] = this.splice(from, 1);
        this.splice(to, 0, value);
        return this;
    }
    swap(i, j) {
        if (i < 0 || j < 0 || i >= this.length || j >= this.length)
            return this;
        [this[i], this[j]] = [this[j], this[i]];
        return this;
    }
    shuffleInPlace() {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
        return this;
    }
    pick(count = 1) {
        const values = [...this];
        const result = new U82I();
        for (let i = 0; i < Math.min(Math.max(0, count), values.length); i++) {
            const j = Math.floor(Math.random() * values.length);
            result.push(values.splice(j, 1)[0]);
        }
        return result;
    }
    toSet() {
        return new Set(this);
    }
    toMap(keyFn) {
        return this.keyBy(keyFn);
    }
    equals(other) {
        return this.length === other.length && this.every((value, index) => Object.is(value, other[index]));
    }
    startsWith(other) {
        return other.length <= this.length && other.every((value, index) => Object.is(this[index], value));
    }
    endsWith(other) {
        return (other.length <= this.length &&
            other.every((value, index) => Object.is(this[this.length - other.length + index], value)));
    }
    isSorted(compareFn = ((a, b) => (a < b ? -1 : a > b ? 1 : 0))) {
        for (let i = 1; i < this.length; i++) {
            if (compareFn(this[i - 1], this[i]) > 0)
                return false;
        }
        return true;
    }
    frequencies() {
        const result = new Map();
        for (const value of this) {
            result.set(value, ((result.get(value) ?? 0) + 1));
        }
        return result;
    }
    findLast(predicate, thisArg) {
        for (let i = this.length - 1; i >= 0; i--) {
            if (predicate.call(thisArg, this[i], i, this))
                return this[i];
        }
        return undefined;
    }
    findLastIndex(predicate, thisArg) {
        for (let i = this.length - 1; i >= 0; i--) {
            if (predicate.call(thisArg, this[i], i, this))
                return i;
        }
        return -1;
    }
    toReversed() {
        return [...this].reverse();
    }
    toSorted(compareFn) {
        return [...this].sort(compareFn);
    }
    toSpliced(start, deleteCount, ...items) {
        const result = [...this];
        result.splice(start, deleteCount, ...items);
        return result;
    }
    with(index, value) {
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
