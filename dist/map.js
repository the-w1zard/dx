export class M2I extends Map {
    g = this.get;
    h = this.has;
    d = this.delete;
    s(k, v) {
        const n = typeof v === "function" ? v() : v;
        return super.set(k, n);
    }
    swap(key, value) {
        const previous = this.has(key) ? this.get(key) : undefined;
        this.s(key, value);
        return previous;
    }
    take(k) {
        const value = this.g(k);
        this.d(k);
        return value;
    }
    peek(k) {
        return this.h(k) ? this.g(k) : false;
    }
    getOrI(k, value) {
        if (this.h(k))
            return this.g(k);
        this.s(k, value);
        return value;
    }
    getOrM(k, make) {
        if (this.h(k))
            return this.g(k);
        const value = make();
        this.s(k, value);
        return value;
    }
    update(k, fn, initial) {
        const has = this.h(k);
        const value = fn(has ? this.g(k) : initial, has);
        this.s(k, value);
        return value;
    }
    setIfAbsent(k, value) {
        if (this.h(k))
            return false;
        this.s(k, value);
        return true;
    }
    setIfPresent(k, value) {
        if (!this.h(k))
            return false;
        this.s(k, value);
        return true;
    }
    replace(k, value) {
        return this.setIfPresent(k, value);
    }
    inc(key, by = 1) {
        return this.update(key, (old) => ((old ?? 0) + by), 0);
    }
    touch(k) {
        return this.setIfAbsent(k, undefined);
    }
    mapValues(fn) {
        const out = new M2I();
        for (const [k, v] of this)
            out.set(k, fn(v, k));
        return out;
    }
    mapKeys(fn) {
        const out = new M2I();
        for (const [k, v] of this)
            out.set(fn(v, k), v);
        return out;
    }
    filterKV(pred) {
        for (const [k, v] of this) {
            if (!pred(v, k))
                this.d(k);
        }
        return this;
    }
    filterKeys(pred) {
        for (const [k, v] of this) {
            if (!pred(k, v))
                this.d(k);
        }
        return this;
    }
    partition(pred) {
        const yes = new M2I();
        const no = new M2I();
        for (const [k, v] of this) {
            (pred(v, k) ? yes : no).set(k, v);
        }
        return [yes, no];
    }
    find(pred) {
        for (const [k, v] of this) {
            if (pred(v, k))
                return [k, v];
        }
        return undefined;
    }
    findKey(pred) {
        for (const [k, v] of this) {
            if (pred(v, k))
                return k;
        }
        return undefined;
    }
    findValue(pred) {
        for (const [k, v] of this) {
            if (pred(v, k))
                return v;
        }
        return undefined;
    }
    some(pred) {
        for (const [k, v] of this) {
            if (pred(v, k))
                return true;
        }
        return false;
    }
    every(pred) {
        for (const [k, v] of this) {
            if (!pred(v, k))
                return false;
        }
        return true;
    }
    reduce(fn, initial) {
        let acc = initial;
        for (const [k, v] of this)
            acc = fn(acc, v, k);
        return acc;
    }
    forEachKV(fn) {
        for (const [k, v] of this)
            fn(v, k, this);
    }
    invert() {
        const out = new M2I();
        for (const [k, v] of this)
            out.set(v, k);
        return out;
    }
    group(fn) {
        const out = new M2I();
        for (const [k, v] of this) {
            out.getOrM(fn(v, k), () => []).push(v);
        }
        return out;
    }
    unique(fn) {
        const out = new M2I();
        for (const [k, v] of this) {
            const key = (fn ? fn(v, k) : v);
            if (!out.has(key))
                out.set(key, v);
        }
        return out;
    }
    pick(keys) {
        const out = new M2I();
        for (const k of keys) {
            if (this.has(k))
                out.set(k, this.get(k));
        }
        return out;
    }
    omit(keys) {
        const omitted = new Set(keys);
        const out = new M2I();
        for (const [k, v] of this) {
            if (!omitted.has(k))
                out.set(k, v);
        }
        return out;
    }
    merge(other) {
        for (const [k, v] of other)
            this.set(k, v);
        return this;
    }
    clearAndSet(entries) {
        const snapshot = Array.from(entries);
        this.clear();
        for (const [k, v] of snapshot)
            this.set(k, v);
        return this;
    }
    toObject() {
        const out = {};
        for (const [k, v] of this)
            out[k] = v;
        return out;
    }
    toArray() {
        return Array.from(this.entries());
    }
    toKeys() {
        return Array.from(this.keys());
    }
    toValues() {
        return Array.from(this.values());
    }
    clone() {
        return new M2(this);
    }
    equals(other) {
        if (other === this)
            return true;
        if (this.size !== other.size)
            return false;
        for (const [k, v] of this) {
            if (!other.has(k) || !Object.is(other.get(k), v))
                return false;
        }
        return true;
    }
    static fromObject(obj) {
        return new M2(Object.entries(obj));
    }
    static fromEntries(entries) {
        return new M2(entries);
    }
    static from(map) {
        return new M2(map);
    }
}
globalThis.M2 = M2I;
