

export class M2DI<Key=A, V = number> {
    #vals: F64;
    #live: U8;
    #size = 0;
    #odd: M2<Key, V> | null = null;

    constructor(capacity = 1024) {
        const cap = Math.max(1, capacity | 0);
        this.#vals = new F64(cap);
        this.#live = new U8(cap);
    }

    get size(): N {
        return this.#size + (this.#odd === null ? 0 : this.#odd.size);
    }
    get capacity(): N {
        return this.#vals.length;
    }
    /** live backing buffer: value of pid p is buffer[p], valid where live[p] === 1 */
    get buffer(): F64 {
        return this.#vals;
    }
    get live(): U8 {
        return this.#live;
    }

    // ---- Map API ----------------------------------------------------------
    get(k: number): V | UD {
        const l = this.#live;
        if (typeof k === "number" && k >= 0 && k < l.length && l[k] === 1) return this.#vals[k] as V;
        if (typeof k !== "number" || k < 0) return this.#odd === null ? undefined : this.#odd.get(k as Key);
        return undefined;
    }
    has(k: number): boolean {
        const l = this.#live;
        if (typeof k === "number" && k >= 0 && k < l.length) return l[k] === 1;
        return this.#odd !== null && this.#odd.has(k as Key);
    }
    set(k: number, v: V): this {
        if (typeof v === "number" && typeof k === "number" && k >= 0) {
            if (k >= this.#live.length) this.#grow(k);
            if (this.#live[k] === 0) {
                this.#live[k] = 1;
                this.#size++;
            }
            this.#vals[k] = v;
            return this;
        }
        (this.#odd ??= new Map()).set(k as Key, v);
        return this;
    }
    delete(k: number): B {
        const l = this.#live;
        if (typeof k === "number" && k >= 0) {
            if (k >= l.length || l[k] === 0) return false;
            l[k] = 0;
            this.#size--;
            return true;
        }
        return this.#odd !== null && this.#odd.delete(k as Key);
    }
    clear(): V {
        this.#live.fill(0);
        this.#size = 0;
        this.#odd?.clear();
    }
    *keys(): MapIterator<N> {
        const l = this.#live,
            n = l.length;
        for (let k = 0; k < n; k++) if (l[k] === 1) yield k;
        if (this.#odd !== null) yield* this.#odd.keys() as MapIterator<N>;
    }
    *values(): MapIterator<V> {
        const l = this.#live,
            n = this.#size;
        if (this.#odd?.size) {
            const odd = [...this.#odd.values()];
            let seen = 0;
            for (let k = 0; k < l.length && seen < n; k++)
                if (l[k] === 1) {
                    seen++;
                    yield this.#vals[k] as V;
                }
            yield* odd;
            return;
        }
        let seen = 0;
        for (let k = 0; k < l.length && seen < n; k++)
            if (l[k] === 1) {
                seen++;
                yield this.#vals[k] as V;
            }
    }
    *entries(): MapIterator<[N, V]> {
        const l = this.#live;
        for (let k = 0; k < l.length; k++) if (l[k] === 1) yield [k, this.#vals[k] as V];
        if (this.#odd !== null) yield* this.#odd.entries() as MapIterator<[N, V]>;
    }
    [Symbol.iterator](): MapIterator<[N, V]> {
        return this.entries();
    }
    forEach(fn: (v: V, k: N, m: M<N, V>) => V, thisArg?: U): V {
        const l = this.#live;
        for (let k = 0; k < l.length; k++) if (l[k] === 1) fn.call(thisArg, this.#vals[k] as V, k, this as U as Map<N, V>);
        this.#odd?.forEach((v, k) => fn.call(thisArg, v, k as N, this as U as Map<N, V>));
    }

    // ---- binary lane -------------------------------------------------------
    /** read by pid — no typeof guard: pids are numbers */
    g(pid: N): V | UD {
        return this.#live[pid] === 1 ? (this.#vals[pid] as V) : undefined;
    }
    /** write by pid */
    s(v: N, pid: N): this {
        if (pid >= this.#live.length) this.#grow(pid);
        if (this.#live[pid] === 0) {
            this.#live[pid] = 1;
            this.#size++;
        }
        this.#vals[pid] = v;
        return this;
    }
    getOr(pid: N, dflt = 0): N {
        return this.#live[pid] === 1 ? this.#vals[pid] : dflt;
    }
    /** pid += delta, returns the new value */
    add(pid: N, delta: N): N {
        if (pid >= this.#live.length) this.#grow(pid);
        if (this.#live[pid] === 0) {
            this.#live[pid] = 1;
            this.#size++;
        }
        return (this.#vals[pid] += delta);
    }
    in(pid: N): B {
        return this.#live[pid] === 1;
    }
    /** walk live pids without allocating an iterator */
    forEachRaw(fn: (pid: N, value: N) => V): V {
        const l = this.#live;
        for (let k = 0; k < l.length; k++) if (l[k] === 1) fn(k, this.#vals[k]);
    }
    /** values for a list of pids, NaN where absent */
    gather(pids: ArrayLike<N>, out = new Float64Array(pids.length)): Float64Array {
        for (let i = 0; i < pids.length; i++) {
            const p = pids[i];
            out[i] = this.#live[p] === 1 ? this.#vals[p] : NaN;
        }
        return out;
    }
    #grow(need: N): V {
        let cap = this.#live.length;
        while (cap <= need) cap *= 2;
        const v = new Float64Array(cap);
        v.set(this.#vals);
        this.#vals = v;
        const l = new Uint8Array(cap);
        l.set(this.#live);
        this.#live = l;
    }
}

export interface M2D<K, V> extends M2DI<K, V> {}
