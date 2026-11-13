export class M2RI {
    #vals;
    #pidToSlot;
    #slotToPid;
    #size = 0;
    stride;
    constructor(capacity = 1024, stride = 3) {
        this.stride = Math.max(1, stride | 0);
        const cap = Math.max(1, capacity | 0);
        this.#pidToSlot = new Int32Array(cap).fill(-1);
        this.#slotToPid = new Int32Array(cap).fill(-1);
        this.#vals = new Float64Array(cap * this.stride);
    }
    get size() {
        return this.#size;
    }
    get capacity() {
        return this.#pidToSlot.length;
    }
    get buffer() {
        return this.#vals;
    }
    get(pid) {
        const i = this.#pidToSlot[pid];
        if (i < 0)
            return undefined;
        const o = i * this.stride;
        return this.#vals.subarray(o, o + this.stride);
    }
    has(pid) {
        const i = this.#pidToSlot[pid];
        return i !== undefined && i !== -1;
    }
    set(pid, v) {
        this.write(pid, v);
        return this;
    }
    delete(pid) {
        const i = this.#pidToSlot[pid];
        if (i === undefined || i < 0)
            return false;
        const st = this.stride;
        const last = --this.#size;
        const lastPid = this.#slotToPid[last];
        if (i !== last) {
            this.#vals.copyWithin(i * st, last * st, last * st + st);
            this.#slotToPid[i] = lastPid;
            this.#pidToSlot[lastPid] = i;
        }
        this.#pidToSlot[pid] = -1;
        this.#slotToPid[last] = -1;
        return true;
    }
    clear() {
        this.#pidToSlot.fill(-1);
        this.#slotToPid.fill(-1);
        this.#size = 0;
    }
    /** copy a row in, no validation per component */
    write(pid, v) {
        const o = this.#open(pid) * this.stride;
        this.#vals.set(v, o);
    }
    /** single component: row[c] = v */
    put(pid, c, v) {
        this.#vals[this.#open(pid) * this.stride + c] = v;
    }
    /** single component: row[c] */
    at(pid, c) {
        return this.#vals[this.#pidToSlot[pid] * this.stride + c];
    }
    /** pid -> slot, or -1 */
    slotOf(pid) {
        const i = this.#pidToSlot[pid];
        return i === undefined ? -1 : i;
    }
    /** zero-copy row view you can write through */
    row(pid) {
        return this.get(pid);
    }
    /** view over the live prefix of the whole table — feed straight to a shader/worker */
    live() {
        return this.#vals.subarray(0, this.#size * this.stride);
    }
    *keys() {
        for (let i = 0; i < this.#size; i++)
            yield this.#slotToPid[i];
    }
    *values() {
        const st = this.stride;
        for (let i = 0; i < this.#size; i++)
            yield this.#vals.subarray(i * st, i * st + st);
    }
    *entries() {
        const st = this.stride;
        for (let i = 0; i < this.#size; i++)
            yield [this.#slotToPid[i], this.#vals.subarray(i * st, i * st + st)];
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    forEach(fn, thisArg) {
        for (const [k, v] of this.entries())
            fn.call(thisArg, v, k, this);
    }
    forEachRaw(fn) {
        for (let i = 0; i < this.#size; i++)
            fn(this.#slotToPid[i], i);
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
        const v = new Float64Array(cap * this.stride);
        v.set(this.#vals);
        this.#vals = v;
    }
}
Object.setPrototypeOf(M2RI.prototype, Map.prototype);
