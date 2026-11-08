


type Key = number | string | symbol | object;
type Simd = Float64Array | Float32Array | number[];

export class M2BINI<K = N, V = N> {
    #vals: F64;
    #pidToSlot: I32;
    #slotToPid: I32;
    #size = 0;
    #odd: M<Key, V> | null = null;

    constructor(capacity = 1024) {
        const cap = Math.max(1, capacity | 0);
        this.#pidToSlot = new Int32Array(cap).fill(-1);
        this.#slotToPid = new Int32Array(cap).fill(-1);
        this.#vals = new Float64Array(cap);
    }

    get size(): number {
        return this.#size + (this.#odd === null ? 0 : this.#odd.size);
    }
    get capacity(): number {
        return this.#vals.length;
    }
    /** live backing buffer: floating-point value of slot i is buffer[i] */
    get buffer(): Float64Array {
        return this.#vals;
    }

    // ---- Map API ----------------------------------------------------------
    get(k: K): V | undefined {
        const p = this.#pidToSlot;
        if (typeof k === "number" && k >= 0 && k < p.length) {
            const i = p[k];
            return (i < 0 ? undefined : this.#vals[i]) as V | undefined;
        }
        return this.#odd === null ? undefined : this.#odd.get(k as Key);
    }

    has(k: K): boolean {
        if (typeof k === "number" && k >= 0) return k < this.#pidToSlot.length && this.#pidToSlot[k] !== -1;
        return this.#odd !== null && this.#odd.has(k as Key);
    }

    set(k: K, v: V): this {
        if (typeof v === "number" && typeof k === "number" && k >= 0) {
            this.#vals[this.#open(k)] = v;
            return this;
        }
        (this.#odd ??= new Map()).set(k as Key, v);
        return this;
    }

    delete(k: K): boolean {
        if (typeof k === "number" && k >= 0) {
            if (k >= this.#pidToSlot.length) return false;
            const i = this.#pidToSlot[k];
            if (i < 0) return false;
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
        return this.#odd !== null && this.#odd.delete(k as Key);
    }

    clear(): void {
        this.#pidToSlot.fill(-1);
        this.#slotToPid.fill(-1);
        this.#size = 0;
        this.#odd?.clear();
    }

    *keys(): MapIterator<K> {
        for (let i = 0; i < this.#size; i++) yield this.#slotToPid[i] as K;
        if (this.#odd !== null) yield* this.#odd.keys() as MapIterator<K>;
    }
    *values(): MapIterator<V> {
        for (let i = 0; i < this.#size; i++) yield this.#vals[i] as V;
        if (this.#odd !== null) yield* this.#odd.values();
    }
    *entries(): MapIterator<[K, V]> {
        for (let i = 0; i < this.#size; i++) yield [this.#slotToPid[i] as K, this.#vals[i] as V];
        if (this.#odd !== null) yield* this.#odd.entries() as MapIterator<[K, V]>;
    }
    [Symbol.iterator](): MapIterator<[K, V]> {
        return this.entries();
    }

    forEach(fn: (v: V, k: K, m: M2BINI<K, V>) => V, thisArg?: unknown): void {
        for (let i = 0; i < this.#size; i++) fn.call(thisArg, this.#vals[i] as V, this.#slotToPid[i] as K, this);
        this.#odd?.forEach((v, k) => fn.call(thisArg, v, k as K, this));
    }

    // ---- binary lane: no Map ceremony, no boxing ---------------------------
    /** read by pid */
    g(pid: number): V | undefined {
        const i = this.#pidToSlot[pid];
        return (i < 0 ? undefined : this.#vals[i]) as V | undefined;
    }
    /** write by pid */
    s(v: number, pid: number): this {
        this.#vals[this.#open(pid)] = v;
        return this;
    }
    /** read with fallback — the accumulator primitive */
    getOr(pid: number, dflt = 0): number {
        const i = this.#pidToSlot[pid];
        return i < 0 ? dflt : this.#vals[i];
    }
    /** pid += delta, returns the new value */
    add(pid: number, delta: number): number {
        const i = this.#open(pid);
        return (this.#vals[i] += delta);
    }
    in(pid: number): boolean {
        return this.#pidToSlot[pid] !== -1;
    }
    d(pid: number): boolean {
        return this.delete(pid as unknown as K);
    }
    /** walk (pid, slot) without allocating an iterator */
    forEachRaw(fn: (pid: number, slot: number) => void): void {
        for (let i = 0; i < this.#size; i++) fn(this.#slotToPid[i], i);
    }
    /** values for a list of pids, NaN where absent */
    gather(pids: ArrayLike<number>, out = new Float64Array(pids.length)): Float64Array {
        for (let i = 0; i < pids.length; i++) {
            const s = this.#pidToSlot[pids[i]];
            out[i] = s < 0 ? NaN : this.#vals[s];
        }
        return out;
    }

    #open(pid: number): number {
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
    #grow(need: number): void {
        let cap = this.#pidToSlot.length;
        while (cap <= need) cap *= 2;
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

export interface M2BIN<K, V> extends M2BINI {}
Object.setPrototypeOf(M2BINI.prototype, Map.prototype);

globalThis.M2BIN = M2BINI;
