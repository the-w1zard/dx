const SITH_SCOPE = { r: 0, m: 0, s: 0 };
export class SITH_DISRUPTOR_CODEC {
    ids = new Map();
    pids = new Map(); // "a:b:c:d" → pid
    addresses = new Map(); // pid → [a,b,c,d]
    hashToPidMap = new Map();
    _flushScheduled = false;
    names = [];
    nextId = 0;
    // ── hot path (was SITH_DISRUPTOR_CODEC) — SoA, per-pid, high volume ──
    maxPids;
    listeners;
    pidToHash; // keep? see note
    nextAllocatedPid = 1; // 0 = TRACER_PID
    channelMap;
    subChannelMap;
    tripChannelMap;
    dirtyPids;
    dirtyCount = 0;
    freeList = [];
    THE_WIZARD_ROOT_REG;
    SAURON_MASTER_REG;
    SAURON_SLAVE_REG;
    constructor(maxPids = 8192, THE_WIZARD_ROOT_REG, SAURON_MASTER_REG, SAURON_SLAVE_REG) {
        this.maxPids = maxPids;
        this.listeners = new Array(maxPids);
        this.dirtyPids = new Int32Array(maxPids);
        this.pidToHash = new Uint32Array(maxPids);
        this.channelMap = new Int32Array(maxPids);
        this.subChannelMap = new Int32Array(maxPids);
        this.tripChannelMap = new Int32Array(maxPids);
        this.THE_WIZARD_ROOT_REG = THE_WIZARD_ROOT_REG;
        this.SAURON_MASTER_REG = SAURON_MASTER_REG;
        this.SAURON_SLAVE_REG = SAURON_SLAVE_REG;
    }
    getScopeHashForPid(pid) {
        return this.pidToHash[pid];
    }
    getExistingPid(scopeHash) {
        console.log("getExistingPid");
        return this.hashToPidMap.get(scopeHash) ?? -1;
    }
    hashComponent(val, fallback) {
        const str = String(val ?? fallback);
        let hash = 0x811c9dc5;
        for (let i = 0; i < str.length; i++) {
            hash ^= str.charCodeAt(i);
            hash = Math.imul(hash, 0x01000193) >>> 0;
        }
        return hash;
    }
    getScopeHash(key, sl_reg, ms_reg, globalKey) {
        const ch = this.hashComponent(globalKey, this.THE_WIZARD_ROOT_REG);
        const sub = this.hashComponent(ms_reg, this.SAURON_MASTER_REG);
        const trip = this.hashComponent(sl_reg, this.SAURON_SLAVE_REG);
        const k = this.hashComponent(key, "KEY");
        // Combine hash channels deterministically
        return (ch ^ sub ^ trip ^ k) >>> 0;
    }
    allocateScopePid(scopeHash, key, sl_reg, ms_reg, globalKey) {
        let pid = this.hashToPidMap.get(scopeHash);
        if (pid !== undefined)
            return pid;
        pid = this.freeList.pop() ?? this.nextAllocatedPid++;
        if (pid >= this.maxPids)
            throw new Error("Hadron Notification Hub: PID capacity exceeded");
        this.hashToPidMap.set(scopeHash, pid);
        this.pidToHash[pid] = scopeHash;
        // Populate SoA lanes for zero-alloc reverse lookups
        this.channelMap[pid] = this.hashComponent(globalKey, this.THE_WIZARD_ROOT_REG);
        this.subChannelMap[pid] = this.hashComponent(ms_reg, this.SAURON_MASTER_REG);
        this.tripChannelMap[pid] = this.hashComponent(sl_reg, this.SAURON_SLAVE_REG);
        return pid;
    }
    intern(value) {
        let id = this.ids.get(value);
        if (id === undefined) {
            id = this.nextId++;
            this.ids.set(value, id);
            this.names[id] = value;
        }
        return id;
    }
    /** Exact identity: encode address → pid (interned, no collisions). */
    encode(pid_key, sl, ms, rt) {
        const a = this.intern(rt);
        const b = this.intern(ms);
        const c = this.intern(sl);
        const d = this.intern(pid_key);
        const addressKey = `${a}:${b}:${c}:${d}`;
        let pid = this.pids.get(addressKey);
        if (pid === undefined) {
            pid = this.nextAllocatedPid++;
            if (pid >= this.maxPids)
                throw new Error("SITH_DISRUPTOR_CODEC: PID capacity exceeded");
            this.pids.set(addressKey, pid);
            this.addresses.set(pid, [a, b, c, d]);
            // populate SoA lanes from the interned ids (no re-hash)
            this.channelMap[pid] = a;
            this.subChannelMap[pid] = b;
            this.tripChannelMap[pid] = c;
        }
        return pid;
    }
    /** Exact decode: pid → address. */
    decode(pid) {
        const addr = this.addresses.get(pid);
        if (!addr)
            throw new Error(`SITH_DISRUPTOR_CODEC: unknown pid ${pid}`);
        const [a, b, c, d] = addr;
        return { r: this.names[a], m: this.names[b], s: this.names[c], k: this.names[d] };
    }
    parseScopeKey(pid) {
        SITH_SCOPE.r = this.channelMap[pid];
        SITH_SCOPE.m = this.subChannelMap[pid];
        SITH_SCOPE.s = this.tripChannelMap[pid];
        return SITH_SCOPE;
    }
    markDirty(pid) {
        this.dirtyPids[this.dirtyCount++] = pid;
    }
    subscribe(pid, fn) {
        this.listeners[pid] = fn;
        return () => {
            this.listeners[pid] = undefined;
        };
    }
    flushNotifications() {
        this._flushScheduled = false;
        for (let i = 0; i < this.dirtyCount; i++) {
            const pid = this.dirtyPids[i];
            const fn = this.listeners[pid];
            if (fn !== undefined)
                fn(pid, pid);
        }
        this.dirtyCount = 0;
    }
    notifyHook(key) {
        const pid = this.encode(key, "", "", "");
        this.markDirty(pid);
        if (!this._flushScheduled) {
            this._flushScheduled = true;
            queueMicrotask(() => {
                this._flushScheduled = false;
                this.flushNotifications();
            });
        }
    }
    notifyPid(pid, value) {
        const fn = this.listeners[pid];
        if (fn !== undefined)
            fn(pid, value);
    }
    releasePid(pid) {
        const addr = this.addresses.get(pid);
        if (addr) {
            this.pids.delete(`${addr[0]}:${addr[1]}:${addr[2]}:${addr[3]}`);
            this.addresses.delete(pid);
        }
        this.pidToHash[pid] = 0;
    }
}
