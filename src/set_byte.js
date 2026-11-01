export class SET2BI {
    cap;
    flags; // [pid] -> 0/1, O(1) has()
    slots; // [idx] -> pid, dense, for iteration
    pidToIdx; // [pid] -> idx into slots, -1 = absent
    #size = 0;
    constructor(maxParticles = 8192, seed) {
        this.cap = maxParticles;
        this.flags = new Uint8Array(maxParticles);
        this.slots = new Int32Array(maxParticles).fill(-1);
        this.pidToIdx = new Int32Array(maxParticles).fill(-1);
        if (seed)
            for (const pid of seed)
                this.add(pid);
    }
    get size() { return this.#size; }
    // ---------------------------------------------------------------- core
    s = this.add.bind(this); //                                                                    [s alias]
    add(pid) {
        if (this.flags[pid] === 0) {
            this.flags[pid] = 1;
            const idx = this.#size;
            this.slots[idx] = pid;
            this.pidToIdx[pid] = idx;
            this.#size++;
        }
        return this;
    }
    has(pid) { return this.flags[pid] === 1; } //                                              [HAS]
    delete(pid) {
        if (this.flags[pid] !== 1)
            return false;
        this.flags[pid] = 0;
        const idx = this.pidToIdx[pid];
        const lastIdx = this.#size - 1;
        const lastPid = this.slots[lastIdx];
        if (idx !== lastIdx) {
            this.slots[idx] = lastPid;
            this.pidToIdx[lastPid] = idx;
        }
        this.slots[lastIdx] = -1;
        this.pidToIdx[pid] = -1;
        this.#size--;
        return true;
    }
    clear() {
        for (let i = 0; i < this.#size; i++)
            this.flags[this.slots[i]] = 0;
        this.slots.fill(-1, 0, this.#size);
        this.pidToIdx.fill(-1); // cheap enough; or loop same range if cap is huge
        this.#size = 0;
    }
    // ---------------------------------------------------------------- iteration
    *[Symbol.iterator]() { for (let i = 0; i < this.#size; i++)
        yield this.slots[i]; }
    values() { return this[Symbol.iterator](); }
    keys() { return this[Symbol.iterator](); }
    *entries() { for (let i = 0; i < this.#size; i++)
        yield [this.slots[i], this.slots[i]]; }
    // ---------------------------------------------------------------- sugar
    take(pid) { return this.delete(pid) ? pid : undefined; } //                          [TAKE]
    peek(pid) { return this.has(pid) ? pid : false; } //                              [PEEK]
    toggle(pid) {
        if (this.has(pid)) {
            this.delete(pid);
            return false;
        }
        this.add(pid);
        return true;
    }
    first() { return this.#size === 0 ? undefined : this.slots[0]; } //                    [FIRST]
    last() { return this.#size === 0 ? undefined : this.slots[this.#size - 1]; } //         [LAST]
    // ---------------------------------------------------------------- set algebra (-> new SET2BI, same cap)
    union(other) {
        const out = new SET2BI(this.cap, this);
        for (const pid of other)
            out.add(pid);
        return out;
    }
    intersection(other) {
        const probe = new SET2BI(this.cap, other);
        const out = new SET2BI(this.cap);
        for (const pid of this)
            if (probe.has(pid))
                out.add(pid);
        return out;
    }
    difference(other) {
        const probe = new SET2BI(this.cap, other);
        const out = new SET2BI(this.cap);
        for (const pid of this)
            if (!probe.has(pid))
                out.add(pid);
        return out;
    }
    symmetricDifference(other) {
        const probe = new SET2BI(this.cap, other);
        const out = new SET2BI(this.cap);
        for (const pid of this)
            if (!probe.has(pid))
                out.add(pid);
        for (const pid of probe)
            if (!this.has(pid))
                out.add(pid);
        return out;
    }
    isSubsetOf(other) {
        const probe = new SET2BI(this.cap, other);
        for (const pid of this)
            if (!probe.has(pid))
                return false;
        return true;
    }
    isSupersetOf(other) {
        for (const pid of other)
            if (!this.has(pid))
                return false;
        return true;
    }
    isDisjointFrom(other) {
        for (const pid of other)
            if (this.has(pid))
                return false;
        return true;
    }
    equals(other) {
        const probe = new SET2BI(this.cap, other);
        return this.#size === probe.size && this.isSubsetOf(probe);
    }
    // ---------------------------------------------------------------- functional
    filter(fn) {
        const out = new SET2BI(this.cap);
        for (const pid of this)
            if (fn(pid, this))
                out.add(pid);
        return out;
    }
    map(fn) {
        const out = new SET2BI(this.cap); // fn must still yield in-range pids
        for (const pid of this)
            out.add(fn(pid, this));
        return out;
    }
    partition(fn) {
        const yes = new SET2BI(this.cap), no = new SET2BI(this.cap);
        for (const pid of this)
            (fn(pid, this) ? yes : no).add(pid);
        return [yes, no];
    }
    differenceBy(other, fn) {
        const keys = new Set();
        for (const pid of other)
            keys.add(fn(pid));
        const out = new SET2BI(this.cap);
        for (const pid of this)
            if (!keys.has(fn(pid)))
                out.add(pid);
        return out;
    }
    uniqueBy(fn) {
        const keys = new Set();
        const out = new SET2BI(this.cap);
        for (const pid of this) {
            const key = fn(pid);
            if (keys.has(key))
                continue;
            keys.add(key);
            out.add(pid);
        }
        return out;
    }
    find(fn) {
        for (const pid of this)
            if (fn(pid, this))
                return pid;
        return undefined;
    }
    every(fn) {
        for (const pid of this)
            if (!fn(pid, this))
                return false;
        return true;
    }
    some(fn) {
        for (const pid of this)
            if (fn(pid, this))
                return true;
        return false;
    }
    reduce(fn, initial) {
        let result = initial;
        for (const pid of this)
            result = fn(result, pid, this);
        return result;
    }
    // ---------------------------------------------------------------- bulk mutation
    addAll(pids) { for (const pid of pids)
        this.add(pid); return this; } //    [ADDALL]
    deleteAll(pids) {
        let count = 0;
        for (const pid of pids)
            if (this.delete(pid))
                count++;
        return count;
    }
    retainAll(pids) {
        const keep = new SET2BI(this.cap, pids);
        for (const pid of [...this])
            if (!keep.has(pid))
                this.delete(pid);
        return this;
    }
    update(pids) { return this.addAll(pids); } //                              [UPDATE]
    replace(pids) {
        this.clear();
        for (const pid of pids)
            this.add(pid);
        return this;
    }
    swap(a, b) {
        if (!this.has(a))
            return false;
        this.delete(a);
        this.add(b);
        return true;
    }
    // ---------------------------------------------------------------- export
    clone() { return new SET2BI(this.cap, this); } //                                     [CLONE]
    toArray() { return [...this]; } //                                                   [TOARRAY]
    toMap(fn) {
        const out = new Map();
        for (const pid of this) {
            const [key, result] = fn(pid);
            out.set(key, result);
        }
        return out;
    }
    toObject(fn) {
        const out = {};
        for (const pid of this)
            out[fn ? fn(pid) : String(pid)] = pid;
        return out;
    }
    toJSON() { return this.toArray(); } //                                                 [TOJSON]
    static fromArray(pids, maxParticles) {
        return new SET2BI(maxParticles ?? Math.max(...pids, 0) + 1, pids);
    }
    static fromObject(obj, maxParticles) {
        return SET2BI.fromArray(Object.values(obj), maxParticles);
    }
    static fromEntries(entries, maxParticles) {
        const pids = [];
        for (const [, pid] of entries)
            pids.push(pid);
        return SET2BI.fromArray(pids, maxParticles);
    }
    static from(pids, maxParticles) {
        return new SET2BI(maxParticles ?? 8192, pids);
    }
}
globalThis.SET2B = SET2BI;
