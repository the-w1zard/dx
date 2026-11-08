

export class M2RI<K = N> {
    #vals: Float64Array;
    #pidToSlot: Int32Array;
    #slotToPid: Int32Array;
    #size = 0;
    readonly stride: N;

    constructor(capacity = 1024, stride = 3) {
        this.stride = Math.max(1, stride | 0);
        const cap = Math.max(1, capacity | 0);
        this.#pidToSlot = new Int32Array(cap).fill(-1);
        this.#slotToPid = new Int32Array(cap).fill(-1);
        this.#vals = new Float64Array(cap * this.stride);
    }

    get size(): N {
        return this.#size;
    }
    get capacity(): N {
        return this.#pidToSlot.length;
    }
    get buffer(): Float64Array {
        return this.#vals;
    }

    get(pid: N): Float64Array | UD {
        const i = this.#pidToSlot[pid] as N;
        if (i < 0) return undefined;
        const o = i * this.stride;
        return this.#vals.subarray(o, o + this.stride);
    }
    has(pid: N): boolean {
        const i = this.#pidToSlot[pid];
        return i !== undefined && i !== -1;
    }
    set(pid: N, v: Float64Array | ArrayLike<N>): this {
        this.write(pid, v);
        return this;
    }
    delete(pid: N): boolean {
        const i = this.#pidToSlot[pid] as N;
        if (i === undefined || i < 0) return false;
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
    clear(): void {
        this.#pidToSlot.fill(-1);
        this.#slotToPid.fill(-1);
        this.#size = 0;
    }

    /** copy a row in, no validation per component */
    write(pid: N, v: Float64Array | ArrayLike<N>): V {
        const o = this.#open(pid) * this.stride;
        this.#vals.set(v as ArrayLike<N>, o);
    }
    /** single component: row[c] = v */
    put(pid: N, c: N, v: N): V {
        this.#vals[this.#open(pid) * this.stride + c] = v;
    }
    /** single component: row[c] */
    at(pid: N, c: N): N {
        return this.#vals[this.#pidToSlot[pid] * this.stride + c];
    }
    /** pid -> slot, or -1 */
    slotOf(pid: N): N {
        const i = this.#pidToSlot[pid];
        return i === undefined ? -1 : i;
    }
    /** zero-copy row view you can write through */
    row(pid: N): F64 | UD {
        return this.get(pid);
    }
    /** view over the live prefix of the whole table — feed straight to a shader/worker */
    live(): F64 {
        return this.#vals.subarray(0, this.#size * this.stride);
    }
    *keys(): MapIterator<K> {
        for (let i = 0; i < this.#size; i++) yield this.#slotToPid[i] as K;
    }
    *values(): MapIterator<F64> {
        const st = this.stride;
        for (let i = 0; i < this.#size; i++) yield this.#vals.subarray(i * st, i * st + st);
    }
    *entries(): MapIterator<[K, F64]> {
        const st = this.stride;
        for (let i = 0; i < this.#size; i++) yield [this.#slotToPid[i] as K, this.#vals.subarray(i * st, i * st + st)];
    }
    [Symbol.iterator](): MapIterator<[K, F64]> {
        return this.entries();
    }
    forEach(fn: (v: F64, k: K, m: Map<K, F64>) => V, thisArg?: U): V {
        for (const [k, v] of this.entries()) fn.call(thisArg, v, k, this);
    }
    forEachRaw(fn: (pid: N, slot: N) => V): V {
        for (let i = 0; i < this.#size; i++) fn(this.#slotToPid[i], i);
    }

    #open(pid: N): N {
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
    #grow(need: N): V {
        let cap = this.#pidToSlot.length;
        while (cap <= need) cap *= 2;
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
export interface M2R<K> extends M2RI {}
Object.setPrototypeOf(M2RI.prototype, Map.prototype);
