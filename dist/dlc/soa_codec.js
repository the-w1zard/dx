const FLYWEIGHT_SCOPE = { r: 0, m: 0, s: 0 };
export class SOA_CODEC {
    // HIGH_PERFORMANCE_SOA_CODEC
    maxPids;
    // SoA Memory Layout (Typed Arrays for Cache Locality)
    channelMap;
    subChannelMap;
    tripChannelMap;
    keyMap;
    listeners;
    nextPid = 1;
    constructor(maxPids = 8192) {
        this.maxPids = maxPids;
        this.channelMap = new Int32Array(maxPids);
        this.subChannelMap = new Int32Array(maxPids);
        this.tripChannelMap = new Int32Array(maxPids);
        this.keyMap = new Int32Array(maxPids);
        this.listeners = new Array(maxPids);
    } // Hot path lookup or allocation: O(1) inline integer assignment
    allocatePid(rId, mId, sId, kId) {
        // In a true LMAX disruptor ring or fixed socket registry,
        // PIDs can be pre-mapped or statically routed at startup.
        const pid = this.nextPid++;
        if (pid >= this.maxPids)
            throw new Error("PID capacity exceeded");
        this.channelMap[pid] = rId;
        this.subChannelMap[pid] = mId;
        this.tripChannelMap[pid] = sId;
        this.keyMap[pid] = kId;
        return pid;
    }
    /**
     * Encodes a columnar batch (e.g., a spreadsheet column or database table chunk)
     * directly into a parallel SoA byte slab.
     */
    encodeBatch(ids, values) {
        const headerLength = 8; // 4 bytes for count, 4 bytes for flags
        const idBytes = ids.byteLength;
        const valBytes = values.byteLength;
        const totalSize = headerLength + idBytes + valBytes;
        const slab = new Uint8Array(totalSize);
        const view = new DataView(slab.buffer);
        // Write header metadata
        view.setInt32(0, ids.length, true);
        view.setInt32(4, 0, true); // reserved flags
        // Copy raw typed array memory directly into the slab (Zero allocation overhead)
        slab.set(new Uint8Array(ids.buffer, ids.byteOffset, idBytes), headerLength);
        slab.set(new Uint8Array(values.buffer, values.byteOffset, valBytes), headerLength + idBytes);
        return slab;
    }
    /**
     * Decodes / Views the binary slab directly as SoA arenas
     * without creating individual JavaScript objects.
     */
    decodeBatchView(slab) {
        const view = new DataView(slab.buffer, slab.byteOffset, slab.byteLength);
        const count = view.getInt32(0, true);
        const headerLength = 8;
        const idByteLen = count * 4; // Int32 = 4 bytes
        const valByteLen = count * 8; // Float64 = 8 bytes
        const ids = new Int32Array(slab.buffer, slab.byteOffset + headerLength, count);
        const values = new Float64Array(slab.buffer, slab.byteOffset + headerLength + idByteLen, count);
        return { ids, values };
    }
}
export class HIGH_PERFORMANCE_SOA_CODEC {
    maxPids;
    // SoA Memory Layout (Typed Arrays for Cache Locality)
    channelMap;
    subChannelMap;
    tripChannelMap;
    keyMap;
    listeners;
    nextPid = 1;
    constructor(maxPids = 8192) {
        this.maxPids = maxPids;
        this.channelMap = new Int32Array(maxPids);
        this.subChannelMap = new Int32Array(maxPids);
        this.tripChannelMap = new Int32Array(maxPids);
        this.keyMap = new Int32Array(maxPids);
        this.listeners = new Array(maxPids);
    }
    // Hot path lookup or allocation: O(1) inline integer assignment
    allocatePid(rId, mId, sId, kId) {
        // In a true LMAX disruptor ring or fixed socket registry, 
        // PIDs can be pre-mapped or statically routed at startup.
        const pid = this.nextPid++;
        if (pid >= this.maxPids)
            throw new Error("PID capacity exceeded");
        this.channelMap[pid] = rId;
        this.subChannelMap[pid] = mId;
        this.tripChannelMap[pid] = sId;
        this.keyMap[pid] = kId;
        return pid;
    }
}
export class CONVERT_CHANNELS_AND_PIDS {
    /**
    const registry = new UnifiedRegistry(8192);
    const disruptor = new DisruptorSoA(8192);
    
    // 1. Register a Single String
    const pidSingle = registry.resolveSingle("user:logged_in");
    
    // 2. Register a Multi-Channel address
    const pidMulti = registry.resolveMulti("THE_WIZARD", "SAURON_MASTER", "SLAVE_01", "STATE_MUTATION");
    
    // 3. Publish both raw PIDs into the Disruptor (Hot path - 0 allocations)
    disruptor.publish(pidSingle, 1, 0);
    disruptor.publish(pidMulti, 99.5, 1);
    
    // 4. Consume and decode depending on what kind of PID it is
    while (disruptor.poll((pid, value, flag) => {
        // Check type lane or call decode based on your routing context
        if (registry.typeMap[pid] === 0) {
            const key = registry.decodeSingle(pid);
            console.log(`[SINGLE] Key: "${key}" | Value: ${value}`);
        } else {
            const scope = registry.decodeMulti(pid);
            console.log(`[MULTI] Channels: ${scope.r} > ${scope.m} > ${scope.s} > ${scope.k} | Value: ${value}`);
        }
    })) {
        // Drains ring buffer
    }
     */
    stringToId = new Map();
    idToString = [];
    addressToPidMap = new Map();
    nextPid = 1;
    // SoA Memory Lanes (Indexed by PID)
    typeMap; // 0 = Single String, 1 = Multi-Channel
    channelMap; // r channel
    subChannelMap; // m channel
    tripChannelMap; // s channel
    keyMap; // k channel / single key string ID
    // Zero-alloc flyweight for multi-channel decoding
    multiFlyweight = { r: "", m: "", s: "", k: "" };
    constructor(maxPids = 65536) {
        this.typeMap = new Uint8Array(maxPids);
        this.channelMap = new Int32Array(maxPids);
        this.subChannelMap = new Int32Array(maxPids);
        this.tripChannelMap = new Int32Array(maxPids);
        this.keyMap = new Int32Array(maxPids);
    }
    intern(val) {
        let id = this.stringToId.get(val);
        if (id === undefined) {
            id = this.idToString.length;
            this.stringToId.set(val, id);
            this.idToString[id] = val;
        }
        return id;
    } // Input Style A: Register a SINGLE string key -> returns a PID.
    resolveSingle(key) {
        let pid = this.addressToPidMap.get(key);
        if (pid === undefined) {
            pid = this.nextPid++;
            this.addressToPidMap.set(key, pid);
            this.typeMap[pid] = 0; // Mark as Single String
            this.keyMap[pid] = this.intern(key);
        }
        return pid;
    } // Input Style B: Register 3-4 channel strings -> returns a PID.
    resolveMulti(r, m, s, k = "") {
        const addressKey = `${r}:${m}:${s}:${k}`;
        let pid = this.addressToPidMap.get(addressKey);
        if (pid === undefined) {
            pid = this.nextPid++;
            this.addressToPidMap.set(addressKey, pid);
            this.typeMap[pid] = 1; // Mark as Multi-Channel
            this.channelMap[pid] = this.intern(r);
            this.subChannelMap[pid] = this.intern(m);
            this.tripChannelMap[pid] = this.intern(s);
            this.keyMap[pid] = this.intern(k);
        }
        return pid;
    } // Decode PID back into a Single String (if registered that way).
    decodeSingle(pid) {
        return this.idToString[this.keyMap[pid]] ?? "";
    } // Decode PID back into 3-4 Channels (zero-alloc flyweight mutation).
    decodeMulti(pid) {
        this.multiFlyweight.r = this.idToString[this.channelMap[pid]] ?? "";
        this.multiFlyweight.m = this.idToString[this.subChannelMap[pid]] ?? "";
        this.multiFlyweight.s = this.idToString[this.tripChannelMap[pid]] ?? "";
        this.multiFlyweight.k = this.idToString[this.keyMap[pid]] ?? "";
        return this.multiFlyweight;
    }
}
export class INJECTION_CODEC {
    /*  =============================================================================
         Flat, zero-heap Outbound Notification & Scope Registry. Replaces Sauron nested
         Map trees with direct PID-indexed arrays.
        ================================= ⇦✦──⇦✦──✦──✦──←'pew pew' 🧙 [INJECTION_CODEC] */
    ids = new Map();
    names = [];
    pids = new Map(); // "a:b:c:d" → pid
    addresses = new Map(); // pid → [a,b,c,d]
    nextId = 0;
    // ── hot path (was INJECTION_CODEC) — SoA, per-pid, high volume ──
    maxPids;
    listeners;
    pidToHash; // keep? see note
    nextAllocatedPid = 1; // 0 = TRACER_PID
    channelMap;
    subChannelMap;
    tripChannelMap;
    dirtyPids;
    dirtyCount = 0;
    _flushScheduled = false;
    constructor(maxPids = 8192) {
        this.maxPids = maxPids;
        this.listeners = new Array(maxPids);
        this.dirtyPids = new Int32Array(maxPids);
        this.pidToHash = new Uint32Array(maxPids);
        this.channelMap = new Int32Array(maxPids);
        this.subChannelMap = new Int32Array(maxPids);
        this.tripChannelMap = new Int32Array(maxPids);
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
                throw new Error("INJECTION_CODEC: PID capacity exceeded");
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
            throw new Error(`INJECTION_CODEC: unknown pid ${pid}`);
        const [a, b, c, d] = addr;
        return { r: this.names[a], m: this.names[b], s: this.names[c], k: this.names[d] };
    }
    parseScopeKey(pid) {
        FLYWEIGHT_SCOPE.r = this.channelMap[pid];
        FLYWEIGHT_SCOPE.m = this.subChannelMap[pid];
        FLYWEIGHT_SCOPE.s = this.tripChannelMap[pid];
        return FLYWEIGHT_SCOPE;
    }
    markDirty(pid) { this.dirtyPids[this.dirtyCount++] = pid; }
    subscribe(pid, fn) {
        this.listeners[pid] = fn;
        return () => { this.listeners[pid] = undefined; };
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
            queueMicrotask(() => { this._flushScheduled = false; this.flushNotifications(); });
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
