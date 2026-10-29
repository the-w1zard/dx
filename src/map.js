export const rv = (v) => typeof v === "function" ? v() : v;
export class M2I extends Map {
    // public g = this.get;
    // public h = this.has;
    // public d = this.delete;
    // public c = this.clear
    f = this.forEach; //                                                     [FOR EACH]
    #subs;
    #hist;
    #histLimit = 0;
    #strict = false;
    #iterating = 0;
    #batching = 0;
    #pending;
    #derived;
    #dependents;
    #emit(e) {
        if (this.#batching > 0) {
            // coalesce: last write per key wins, keep prev from first event
            const pending = this.#pending.get(e.k);
            this.#pending.set(e.k, pending ? { ...e, prev: pending.prev, batch: true } : { ...e, batch: true });
            return;
        }
        this.#record(e);
        this.#subs?.forEach((sub) => {
            try {
                sub(e);
            }
            catch (err) {
                process.emitWarning(err);
            }
        });
    }
    #record(e) {
        if (!this.#hist)
            return;
        this.#hist.push(e);
        if (this.#hist.length > this.#histLimit) {
            this.#hist.splice(0, this.#hist.length - this.#histLimit);
        }
    }
    #invalidate(k) {
        const deps = this.#dependents?.get(k);
        if (!deps)
            return;
        for (const dk of deps) {
            const d = this.#derived?.get(dk);
            if (!d || d.dirty)
                continue;
            d.dirty = true;
            this.#emit({ op: "dirty", k: dk, has: d.has });
        }
    }
    #computeDerived(k, d) {
        const vals = d.deps.map((dep) => this.g(dep));
        const next = d.fn(...vals);
        const had = d.has;
        const prev = d.value;
        d.value = next;
        d.has = true;
        d.dirty = false;
        if (!had || !Object.is(prev, next)) {
            this.#emit({
                op: had ? "upd" : "set",
                k,
                v: next,
                prev: prev,
                has: true,
            });
        }
        return next;
    }
    #assertNotIterating(op) {
        if (this.#strict && this.#iterating > 0) {
            throw new Error(`M2.${op}() during iteration. Use filterKV(), collect keys first, or disable $strict().`);
        }
    }
    [Symbol.iterator]() { return this.entries(); }
    on(fn) {
        (this.#subs ??= new Set()).add(fn);
        return () => this.off(fn);
    }
    off(fn) {
        this.#subs?.delete(fn);
    }
    batch(fn) {
        this.#batching++;
        this.#pending ??= new M2I();
        try {
            fn();
        }
        finally {
            this.#batching--;
            if (this.#batching === 0) {
                const events = [...this.#pending.values()];
                this.#pending = undefined;
                for (const e of events) {
                    this.#record(e);
                    this.#subs?.forEach(sub => sub(e));
                }
            }
        }
        return this;
    }
    s(v, k) {
        this.#assertNotIterating("s");
        const next = rv(v);
        const has = this.h(k);
        const prev = has ? this.g(k) : undefined;
        super.set(k, next);
        this.#invalidate(k);
        this.#emit({
            op: "set",
            k,
            v: next,
            prev: prev,
            has,
        });
        return this;
    }
    mutate(k, fn) {
        this.#assertNotIterating("mutate");
        if (!this.h(k))
            return undefined;
        const old = this.g(k);
        const next = fn(old, true);
        this.s(next, k);
        return next;
    }
    d(k) {
        this.#assertNotIterating("delete");
        if (!this.h(k))
            return false;
        const prev = this.g(k);
        const out = super.delete(k);
        this.#invalidate(k);
        this.#emit({
            op: "del",
            k,
            prev,
            has: false,
        });
        return out;
    }
    c() {
        this.#assertNotIterating("clear");
        const entries = [...this.entries()];
        super.clear();
        for (const [k, prev] of entries) {
            this.#invalidate(k);
            this.#emit({ op: "del", k, prev, has: false });
        }
    }
    dv(k, deps, fn) {
        (this.#derived ??= new M2I())
            .set(k, {
            deps,
            fn,
            dirty: true,
            has: false,
        });
        for (const dep of deps) {
            (this.#dependents ??= new M2I())
                .getOrM(() => new Set(), dep)
                .add(k);
        }
        return this;
    }
    dirty(...keys) {
        for (const k of keys) {
            const d = this.#derived?.get(k);
            if (d && !d.dirty) {
                d.dirty = true;
                this.#emit({ op: "dirty", k, has: d.has });
            }
        }
        return this;
    }
    g(k) {
        const d = this.#derived?.get(k);
        if (d) {
            if (d.dirty || !d.has)
                return this.#computeDerived(k, d);
            return d.value;
        }
        return super.get(k);
    }
    h(k) {
        const d = this.#derived?.get(k);
        if (d) {
            if (d.dirty || !d.has)
                this.#computeDerived(k, d);
            return true;
        }
        return super.has(k);
    }
    $debug(limit = 256) {
        this.#hist ??= [];
        this.#histLimit = limit;
        return this;
    }
    $strict() {
        this.#strict = true;
        return this;
    }
    $history() {
        return this.#hist ? [...this.#hist] : [];
    }
    $why(k) {
        if (!this.#hist)
            return undefined;
        for (let i = this.#hist.length - 1; i >= 0; i--) {
            if (Object.is(this.#hist[i].k, k))
                return this.#hist[i];
        }
        return undefined;
    }
    $diff(other) {
        const add = [];
        const del = [];
        const chg = [];
        for (const [k, v] of this) {
            if (!other.has(k)) {
                add.push([k, v]);
            }
            else if (!Object.is(other.get(k), v)) {
                chg.push([k, v, other.get(k)]);
            }
        }
        for (const k of other.keys()) {
            if (!this.has(k))
                del.push(k);
        }
        return { add, del, chg };
    }
    *entries() {
        this.#iterating++;
        try {
            for (const entry of super.entries())
                yield entry;
        }
        finally {
            this.#iterating--;
        }
    }
    *keys() {
        this.#iterating++;
        try {
            for (const k of super.keys())
                yield k;
        }
        finally {
            this.#iterating--;
        }
    }
    *values() {
        this.#iterating++;
        try {
            for (const v of super.values())
                yield v;
        }
        finally {
            this.#iterating--;
        }
    }
    swap(value, key) {
        const next = rv(value);
        const previous = this.has(key) ? this.get(key) : next;
        this.s(next, key);
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
    getOrI(value, k) {
        if (this.h(k))
            return this.g(k);
        const next = rv(value);
        this.s(next, k);
        return next;
    }
    getOrM(make, k) {
        if (this.h(k))
            return this.g(k);
        const value = make();
        this.s(value, k);
        return value;
    }
    update(k, fn, initial) {
        const has = this.h(k);
        const old = has
            ? this.g(k)
            : initial === undefined
                ? undefined
                : rv(initial);
        const next = rv(fn(old, has));
        this.s(next, k);
        return next;
    }
    setIfAbsent(value, k) {
        if (this.h(k))
            return false;
        const next = rv(value);
        this.s(next, k);
        return true;
    }
    setIfPresent(value, k) {
        if (!this.h(k))
            return false;
        const next = rv(value);
        this.s(next, k);
        return true;
    }
    replace(value, k) {
        const next = rv(value);
        return this.setIfPresent(next, k);
    }
    inc(key, by = 1) {
        return this.update(key, (old) => ((old ?? 0) + by), 0);
    }
    touch(k) {
        return this.setIfAbsent(undefined, k);
    }
    mapValues(fn) {
        const out = new M2I();
        for (const [k, v] of this)
            out.s(fn(v, k), k);
        return out;
    }
    mapKeys(fn) {
        const out = new M2I();
        for (const [k, v] of this)
            out.s(v, fn(v, k));
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
        return this.filterKV(pred);
    }
    partition(pred) {
        const yes = new M2I();
        const no = new M2I();
        for (const [k, v] of this) {
            (pred(v, k) ? yes : no).s(v, k);
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
            out.s(k, v);
        return out;
    }
    group(fn) {
        const out = new M2I();
        for (const [k, v] of this) {
            out.getOrM(() => [], fn(v, k)).push(v);
        }
        return out;
    }
    unique(fn) {
        const out = new M2I();
        for (const [k, v] of this) {
            const key = (fn ? fn(v, k) : v);
            if (!out.h(key))
                out.s(v, key);
        }
        return out;
    }
    pick(keys) {
        const out = new M2I();
        for (const k of keys) {
            if (this.h(k))
                out.s(this.g(k), k);
        }
        return out;
    }
    omit(keys) {
        const omitted = new Set(keys);
        const out = new M2I();
        for (const [k, v] of this) {
            if (!omitted.has(k))
                out.s(v, k);
        }
        return out;
    }
    merge(other) {
        for (const [k, v] of other) {
            const n = rv(v);
            this.s(n, k);
        }
        return this;
    }
    clearAndSet(entries) {
        return this.batch(() => {
            this.clear();
            for (const [k, v] of entries) {
                const n = rv(v);
                this.s(n, k);
            }
        });
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
        return new M2I(this);
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
        return new M2I(Object.entries(obj));
    }
    static fromEntries(entries) {
        return new M2I(entries);
    }
    static from(map) {
        return new M2I(map);
    }
}
globalThis.M2 = M2I;
/*  ====================================================================================================
    
    ============================================================= ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [STORE] */
