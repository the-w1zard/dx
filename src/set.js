export class SET2I extends Set {
    s = this.add;
    take(value) {
        if (!this.delete(value))
            return undefined;
        return value;
    }
    peek(value) {
        return this.has(value) ? value : false;
    }
    toggle(value) {
        if (this.has(value)) {
            this.delete(value);
            return false;
        }
        this.add(value);
        return true;
    }
    first() {
        const result = this.values().next();
        return result.done ? undefined : result.value;
    }
    last() {
        let result = undefined;
        for (const value of this)
            result = value;
        return result;
    }
    union(other) {
        const out = new SET2I(this);
        for (const value of other)
            out.add(value);
        return out;
    }
    intersection(other) {
        const values = new Set(other);
        const out = new SET2I();
        for (const value of this)
            if (values.has(value))
                out.add(value);
        return out;
    }
    difference(other) {
        const values = new Set(other);
        const out = new SET2I();
        for (const value of this)
            if (!values.has(value))
                out.add(value);
        return out;
    }
    symmetricDifference(other) {
        const values = new Set(other);
        const out = new SET2I();
        for (const value of this)
            if (!values.has(value))
                out.add(value);
        for (const value of values)
            if (!this.has(value))
                out.add(value);
        return out;
    }
    isSubsetOf(other) {
        const values = new Set(other);
        for (const value of this)
            if (!values.has(value))
                return false;
        return true;
    }
    isSupersetOf(other) {
        for (const value of other)
            if (!this.has(value))
                return false;
        return true;
    }
    isDisjointFrom(other) {
        const values = new Set(other);
        for (const value of this)
            if (values.has(value))
                return false;
        return true;
    }
    equals(other) {
        const values = new Set(other);
        return this.size === values.size && this.isSubsetOf(values);
    }
    filter(fn) {
        const out = new SET2I();
        for (const value of this)
            if (fn(value, this))
                out.add(value);
        return out;
    }
    map(fn) {
        const out = new SET2I();
        for (const value of this)
            out.add(fn(value, this));
        return out;
    }
    partition(fn) {
        const yes = new SET2I();
        const no = new SET2I();
        for (const value of this) {
            (fn(value, this) ? yes : no).add(value);
        }
        return [yes, no];
    }
    differenceBy(other, fn) {
        const keys = new Set();
        for (const value of other)
            keys.add(fn(value));
        const out = new SET2I();
        for (const value of this)
            if (!keys.has(fn(value)))
                out.add(value);
        return out;
    }
    uniqueBy(fn) {
        const keys = new Set();
        const out = new SET2I();
        for (const value of this) {
            const key = fn(value);
            if (keys.has(key))
                continue;
            keys.add(key);
            out.add(value);
        }
        return out;
    }
    find(fn) {
        for (const value of this)
            if (fn(value, this))
                return value;
        return undefined;
    }
    every(fn) {
        for (const value of this)
            if (!fn(value, this))
                return false;
        return true;
    }
    some(fn) {
        for (const value of this)
            if (fn(value, this))
                return true;
        return false;
    }
    reduce(fn, initial) {
        let result = initial;
        for (const value of this)
            result = fn(result, value, this);
        return result;
    }
    addAll(values) {
        for (const value of values)
            this.add(value);
        return this;
    }
    deleteAll(values) {
        let count = 0;
        for (const value of values)
            if (this.delete(value))
                count++;
        return count;
    }
    retainAll(values) {
        const keep = new Set(values);
        for (const value of this)
            if (!keep.has(value))
                this.delete(value);
        return this;
    }
    update(values) {
        return this.addAll(values);
    }
    replace(values) {
        const replacement = new Set(values);
        this.clear();
        for (const value of replacement)
            this.add(value);
        return this;
    }
    swap(a, b) {
        if (!this.has(a))
            return false;
        this.delete(a);
        this.add(b);
        return true;
    }
    clone() {
        return new SET2I(this);
    }
    toArray() {
        return [...this];
    }
    toMap(fn) {
        const out = new M2();
        for (const value of this) {
            const [key, result] = fn(value);
            out.set(key, result);
        }
        return out;
    }
    toObject(fn) {
        const out = {};
        for (const value of this) {
            out[(fn ? fn(value) : String(value))] = value;
        }
        return out;
    }
    toJSON() {
        return this.toArray();
    }
    static fromArray(values) {
        return new SET2I(values);
    }
    static fromObject(obj) {
        return new SET2I(Object.values(obj));
    }
    static fromEntries(entries) {
        const out = new SET2I();
        for (const [, value] of entries)
            out.add(value);
        return out;
    }
    static from(values) {
        return new SET2I(values);
    }
}
globalThis.SET2 = SET2I;
