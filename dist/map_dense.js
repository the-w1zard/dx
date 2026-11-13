export class M2DI {
    #vals;
    #live;
    #size = 0;
    #odd = null;
    constructor(capacity = 1024) {
        const cap = Math.max(1, capacity | 0);
        this.#vals = new F64(cap);
        this.#live = new U8(cap);
    }
    get size() {
        return this.#size + (this.#odd === null ? 0 : this.#odd.size);
    }
    get capacity() {
        return this.#vals.length;
    }
    /** live backing buffer: value of pid p is buffer[p], valid where live[p] === 1 */
    get buffer() {
        return this.#vals;
    }
    get live() {
        return this.#live;
    }
    // ---- Map API ----------------------------------------------------------
    get(k) {
        const l = this.#live;
        if (typeof k === "number" && k >= 0 && k < l.length && l[k] === 1)
            return this.#vals[k];
        if (typeof k !== "number" || k < 0)
            return this.#odd === null ? undefined : this.#odd.get(k);
        return undefined;
    }
    has(k) {
        const l = this.#live;
        if (typeof k === "number" && k >= 0 && k < l.length)
            return l[k] === 1;
        return this.#odd !== null && this.#odd.has(k);
    }
    set(k, v) {
        if (typeof v === "number" && typeof k === "number" && k >= 0) {
            if (k >= this.#live.length)
                this.#grow(k);
            if (this.#live[k] === 0) {
                this.#live[k] = 1;
                this.#size++;
            }
            this.#vals[k] = v;
            return this;
        }
        (this.#odd ??= new M2()).set(k, v);
        return this;
    }
    delete(k) {
        const l = this.#live;
        if (typeof k === "number" && k >= 0) {
            if (k >= l.length || l[k] === 0)
                return false;
            l[k] = 0;
            this.#size--;
            return true;
        }
        return this.#odd !== null && this.#odd.delete(k);
    }
    clear() {
        this.#live.fill(0);
        this.#size = 0;
        this.#odd?.clear();
    }
    *keys() {
        const l = this.#live, n = l.length;
        for (let k = 0; k < n; k++)
            if (l[k] === 1)
                yield k;
        if (this.#odd !== null)
            yield* this.#odd.keys();
    }
    *values() {
        const l = this.#live, n = this.#size;
        if (this.#odd?.size) {
            const odd = [...this.#odd.values()];
            let seen = 0;
            for (let k = 0; k < l.length && seen < n; k++)
                if (l[k] === 1) {
                    seen++;
                    yield this.#vals[k];
                }
            yield* odd;
            return;
        }
        let seen = 0;
        for (let k = 0; k < l.length && seen < n; k++)
            if (l[k] === 1) {
                seen++;
                yield this.#vals[k];
            }
    }
    *entries() {
        const l = this.#live;
        for (let k = 0; k < l.length; k++)
            if (l[k] === 1)
                yield [k, this.#vals[k]];
        if (this.#odd !== null)
            yield* this.#odd.entries();
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    forEach(fn, thisArg) {
        const l = this.#live;
        for (let k = 0; k < l.length; k++)
            if (l[k] === 1)
                fn.call(thisArg, this.#vals[k], k, this);
        this.#odd?.forEach((v, k) => fn.call(thisArg, v, k, this));
    }
    // ---- binary lane -------------------------------------------------------
    /** read by pid — no typeof guard: pids are numbers */
    g(pid) {
        return this.#live[pid] === 1 ? this.#vals[pid] : undefined;
    }
    /** write by pid */
    s(v, pid) {
        if (pid >= this.#live.length)
            this.#grow(pid);
        if (this.#live[pid] === 0) {
            this.#live[pid] = 1;
            this.#size++;
        }
        this.#vals[pid] = v;
        return this;
    }
    getOr(pid, dflt = 0) {
        return this.#live[pid] === 1 ? this.#vals[pid] : dflt;
    }
    /** pid += delta, returns the new value */
    add(pid, delta) {
        if (pid >= this.#live.length)
            this.#grow(pid);
        if (this.#live[pid] === 0) {
            this.#live[pid] = 1;
            this.#size++;
        }
        return (this.#vals[pid] += delta);
    }
    in(pid) {
        return this.#live[pid] === 1;
    }
    /** walk live pids without allocating an iterator */
    forEachRaw(fn) {
        const l = this.#live;
        for (let k = 0; k < l.length; k++)
            if (l[k] === 1)
                fn(k, this.#vals[k]);
    }
    /** values for a list of pids, NaN where absent */
    gather(pids, out = new Float64Array(pids.length)) {
        for (let i = 0; i < pids.length; i++) {
            const p = pids[i];
            out[i] = this.#live[p] === 1 ? this.#vals[p] : NaN;
        }
        return out;
    }
    #grow(need) {
        let cap = this.#live.length;
        while (cap <= need)
            cap *= 2;
        const v = new Float64Array(cap);
        v.set(this.#vals);
        this.#vals = v;
        const l = new Uint8Array(cap);
        l.set(this.#live);
        this.#live = l;
    }
}
