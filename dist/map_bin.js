export class M2BINI {
    #vals;
    #pidToSlot;
    #slotToPid;
    #size = 0;
    #odd = null;
    constructor(capacity = 1024) {
        const cap = Math.max(1, capacity | 0);
        this.#pidToSlot = new Int32Array(cap).fill(-1);
        this.#slotToPid = new Int32Array(cap).fill(-1);
        this.#vals = new Float64Array(cap);
    }
    get size() {
        return this.#size + (this.#odd === null ? 0 : this.#odd.size);
    }
    get capacity() {
        return this.#vals.length;
    }
    /** live backing buffer: floating-point value of slot i is buffer[i] */
    get buffer() {
        return this.#vals;
    }
    // ---- Map API ----------------------------------------------------------
    get(k) {
        const p = this.#pidToSlot;
        if (typeof k === "number" && k >= 0 && k < p.length) {
            const i = p[k];
            return (i < 0 ? undefined : this.#vals[i]);
        }
        return this.#odd === null ? undefined : this.#odd.get(k);
    }
    has(k) {
        if (typeof k === "number" && k >= 0)
            return k < this.#pidToSlot.length && this.#pidToSlot[k] !== -1;
        return this.#odd !== null && this.#odd.has(k);
    }
    set(k, v) {
        if (typeof v === "number" && typeof k === "number" && k >= 0) {
            this.#vals[this.#open(k)] = v;
            return this;
        }
        (this.#odd ??= new Map()).set(k, v);
        return this;
    }
    delete(k) {
        if (typeof k === "number" && k >= 0) {
            if (k >= this.#pidToSlot.length)
                return false;
            const i = this.#pidToSlot[k];
            if (i < 0)
                return false;
            const last = --this.#size;
            const lastPid = this.#slotToPid[last];
            if (i !== last) {
                this.#vals[i] = this.#vals[last];
                this.#slotToPid[i] = lastPid;
                this.#pidToSlot[lastPid] = i;
            }
            this.#pidToSlot[k] = -1;
            this.#slotToPid[last] = -1;
            return true;
        }
        return this.#odd !== null && this.#odd.delete(k);
    }
    clear() {
        this.#pidToSlot.fill(-1);
        this.#slotToPid.fill(-1);
        this.#size = 0;
        this.#odd?.clear();
    }
    *keys() {
        for (let i = 0; i < this.#size; i++)
            yield this.#slotToPid[i];
        if (this.#odd !== null)
            yield* this.#odd.keys();
    }
    *values() {
        for (let i = 0; i < this.#size; i++)
            yield this.#vals[i];
        if (this.#odd !== null)
            yield* this.#odd.values();
    }
    *entries() {
        for (let i = 0; i < this.#size; i++)
            yield [this.#slotToPid[i], this.#vals[i]];
        if (this.#odd !== null)
            yield* this.#odd.entries();
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    forEach(fn, thisArg) {
        for (let i = 0; i < this.#size; i++)
            fn.call(thisArg, this.#vals[i], this.#slotToPid[i], this);
        this.#odd?.forEach((v, k) => fn.call(thisArg, v, k, this));
    }
    // ---- binary lane: no Map ceremony, no boxing ---------------------------
    /** read by pid */
    g(pid) {
        const i = this.#pidToSlot[pid];
        return (i < 0 ? undefined : this.#vals[i]);
    }
    /** write by pid */
    s(v, pid) {
        this.#vals[this.#open(pid)] = v;
        return this;
    }
    /** read with fallback — the accumulator primitive */
    getOr(pid, dflt = 0) {
        const i = this.#pidToSlot[pid];
        return i < 0 ? dflt : this.#vals[i];
    }
    /** pid += delta, returns the new value */
    add(pid, delta) {
        const i = this.#open(pid);
        return (this.#vals[i] += delta);
    }
    in(pid) {
        return this.#pidToSlot[pid] !== -1;
    }
    d(pid) {
        return this.delete(pid);
    }
    /** walk (pid, slot) without allocating an iterator */
    forEachRaw(fn) {
        for (let i = 0; i < this.#size; i++)
            fn(this.#slotToPid[i], i);
    }
    /** values for a list of pids, NaN where absent */
    gather(pids, out = new Float64Array(pids.length)) {
        for (let i = 0; i < pids.length; i++) {
            const s = this.#pidToSlot[pids[i]];
            out[i] = s < 0 ? NaN : this.#vals[s];
        }
        return out;
    }
    #open(pid) {
        let p = this.#pidToSlot;
        if (pid >= p.length) {
            this.#grow(pid);
            p = this.#pidToSlot;
        }
        let i = p[pid];
        if (i < 0) {
            if (this.#size === p.length) {
                this.#grow(this.#size);
                p = this.#pidToSlot;
            }
            i = this.#size++;
            p[pid] = i;
            this.#slotToPid[i] = pid;
        }
        return i;
    }
    #grow(need) {
        let cap = this.#pidToSlot.length;
        while (cap <= need)
            cap *= 2;
        const p2s = new Int32Array(cap).fill(-1);
        p2s.set(this.#pidToSlot);
        this.#pidToSlot = p2s;
        const s2p = new Int32Array(cap).fill(-1);
        s2p.set(this.#slotToPid);
        this.#slotToPid = s2p;
        const v = new Float64Array(cap);
        v.set(this.#vals);
        this.#vals = v;
    }
}
Object.setPrototypeOf(M2BINI.prototype, Map.prototype);
