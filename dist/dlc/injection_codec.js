const FLYWEIGHT_SCOPE = { r: 0, m: 0, s: 0 };
export class INJECTION_CODEC {
    /*  =======================================================================================================================
          Flat, zero-heap Outbound Notification & Scope Registry. Replaces Sauron nested Map trees with direct PID-indexed arrays.
        ========================================================================== ⇦✦──⇦✦──✦──✦──←'pew pew' 🧙 [INJECTION_CODEC] */
    maxPids;
    listeners;
    pidToHash;
    hashToPidMap = new Map();
    nextAllocatedPid = 1;
    channelMap;
    subChannelMap;
    tripChannelMap;
    dirtyPids;
    dirtyCount = 0;
    _flushScheduled = false;
    freeList = [];
    constructor(maxPids = 8192) {
        this.maxPids = maxPids;
        this.listeners = new Array(maxPids);
        this.dirtyPids = new Int32Array(maxPids);
        this.pidToHash = new Uint32Array(maxPids);
        this.channelMap = new Int32Array(maxPids);
        this.subChannelMap = new Int32Array(maxPids);
        this.tripChannelMap = new Int32Array(maxPids);
    }
    getScopeHashForPid(pid) { return this.pidToHash[pid]; }
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
        const ch = this.hashComponent(globalKey, 'THE_WIZARD_ROOT_REG');
        const sub = this.hashComponent(ms_reg, 'SAURON_MASTER_REG');
        const trip = this.hashComponent(sl_reg, 'SAURON_SLAVE_REG');
        const k = this.hashComponent(key, "KEY");
        // Combine hash channels deterministically
        return (ch ^ sub ^ trip ^ k) >>> 0;
    }
    parseScopeKey(pid) {
        FLYWEIGHT_SCOPE.r = this.channelMap[pid];
        FLYWEIGHT_SCOPE.m = this.subChannelMap[pid];
        FLYWEIGHT_SCOPE.s = this.tripChannelMap[pid];
        return FLYWEIGHT_SCOPE;
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
        this.channelMap[pid] = this.hashComponent(globalKey, 'THE_WIZARD_ROOT_REG');
        this.subChannelMap[pid] = this.hashComponent(ms_reg, 'SAURON_MASTER_REG');
        this.tripChannelMap[pid] = this.hashComponent(sl_reg, 'SAURON_SLAVE_REG');
        return pid;
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
            if (fn !== undefined) {
                fn(pid, pid);
            }
        }
        this.dirtyCount = 0; // Reset dirty stack for next batch
    }
    notifyHook(key) {
        // 1. Map the string key to its Hadron PID
        const scopeHash = this.getScopeHash(key);
        const pid = this.allocateScopePid(scopeHash, key); // 2. Mark PID dirty in the Hadron Notification ring buffer
        this.markDirty(pid); // 3. Schedule microtask flush if not already scheduled (Your original guard!)
        if (!this._flushScheduled) {
            this._flushScheduled = true;
            queueMicrotask(() => {
                // Flushes all dirty PIDs accumulated across microtasks
                this._flushScheduled = false;
                this.flushNotifications();
            });
        }
    }
    notifyPid(pid, value) {
        const fn = this.listeners[pid];
        if (fn !== undefined) {
            fn(pid, value);
        }
    }
    releasePid(pid) {
        this.hashToPidMap.delete(this.pidToHash[pid]);
        this.pidToHash[pid] = 0;
        this.freeList.push(pid);
    }
}
