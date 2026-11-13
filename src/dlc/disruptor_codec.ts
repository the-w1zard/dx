
	interface ScopeComponents {
		r: N;
		m: N;
		s: N;
	}
const SITH_SCOPE: ScopeComponents = { r: 0, m: 0, s: 0 };


export class SITH_DISRUPTOR_CODEC {//  Flat, zero-heap Outbound Notification & Scope Registry. Replaces Sauron nested  Map trees with direct PID-indexed arrays.
    private ids = new Map<S, N>();
    private pids = new Map<S, N>(); // "a:b:c:d" → pid
    private addresses = new Map<N, [N, N, N, N]>(); // pid → [a,b,c,d]
    public readonly hashToPidMap = new Map<N, N>();
    public _flushScheduled = false;

    private names: S[] = [];
    private nextId = 0;
    // ── hot path (was SITH_DISRUPTOR_CODEC) — SoA, per-pid, high volume ──
    public readonly maxPids: N;
    public readonly listeners: AR<A | UD>;
    public readonly pidToHash: U32; // keep? see note
    public nextAllocatedPid = 1; // 0 = TRACER_PID
    public readonly channelMap: I32;
    public readonly subChannelMap: I32;
    public readonly tripChannelMap: I32;
    public readonly dirtyPids: I32;
    public dirtyCount = 0;
    public freeList: N[] = [];
    public THE_WIZARD_ROOT_REG;
    public SAURON_MASTER_REG;
    public SAURON_SLAVE_REG;
    constructor(maxPids = 8192, THE_WIZARD_ROOT_REG: S, SAURON_MASTER_REG: S, SAURON_SLAVE_REG: S) {
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
    public getScopeHashForPid(pid: N): N {
        return this.pidToHash[pid];
    }
    public getExistingPid(scopeHash: N): N {
        console.log("getExistingPid");
        return this.hashToPidMap.get(scopeHash) ?? -1;
    }
    public hashComponent(val: A, fallback: S): N {
        const str = String(val ?? fallback);
        let hash = 0x811c9dc5;
        for (let i = 0; i < str.length; i++) {
            hash ^= str.charCodeAt(i);
            hash = Math.imul(hash, 0x01000193) >>> 0;
        }
        return hash;
    }
    public getScopeHash(key: S | SY, sl_reg?: A, ms_reg?: A, globalKey?: A): N {
        const ch = this.hashComponent(globalKey, this.THE_WIZARD_ROOT_REG);
        const sub = this.hashComponent(ms_reg, this.SAURON_MASTER_REG);
        const trip = this.hashComponent(sl_reg, this.SAURON_SLAVE_REG);
        const k = this.hashComponent(key, "KEY");
        // Combine hash channels deterministically
        return (ch ^ sub ^ trip ^ k) >>> 0;
    }

    public allocateScopePid(scopeHash: N, key: A, sl_reg?: A, ms_reg?: A, globalKey?: A): N {
        let pid = this.hashToPidMap.get(scopeHash);
        if (pid !== undefined) return pid;

        pid = this.freeList.pop() ?? this.nextAllocatedPid++;

        if (pid >= this.maxPids) throw new Error("Hadron Notification Hub: PID capacity exceeded");

        this.hashToPidMap.set(scopeHash, pid);
        this.pidToHash[pid] = scopeHash;

        // Populate SoA lanes for zero-alloc reverse lookups
        this.channelMap[pid] = this.hashComponent(globalKey, this.THE_WIZARD_ROOT_REG);
        this.subChannelMap[pid] = this.hashComponent(ms_reg, this.SAURON_MASTER_REG);
        this.tripChannelMap[pid] = this.hashComponent(sl_reg, this.SAURON_SLAVE_REG);

        return pid;
    }
    private intern(value: S): N {
        let id = this.ids.get(value);
        if (id === undefined) {
            id = this.nextId++;
            this.ids.set(value, id);
            this.names[id] = value;
        }
        return id;
    }
    /** Exact identity: encode address → pid (interned, no collisions). */
    public encode(pid_key: S, sl: S, ms: S, rt: S): N {
        const a = this.intern(rt);
        const b = this.intern(ms);
        const c = this.intern(sl);
        const d = this.intern(pid_key);
        const addressKey = `${a}:${b}:${c}:${d}`;

        let pid = this.pids.get(addressKey);
        if (pid === undefined) {
            pid = this.nextAllocatedPid++;
            if (pid >= this.maxPids) throw new Error("SITH_DISRUPTOR_CODEC: PID capacity exceeded");
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
    public decode(pid: N): { k: S; s: S; m: S; r: S } {
        const addr = this.addresses.get(pid);
        if (!addr) throw new Error(`SITH_DISRUPTOR_CODEC: unknown pid ${pid}`);
        const [a, b, c, d] = addr;
        return { r: this.names[a], m: this.names[b], s: this.names[c], k: this.names[d] };
    }
    public parseScopeKey(pid: N): ScopeComponents {
        SITH_SCOPE.r = this.channelMap[pid];
        SITH_SCOPE.m = this.subChannelMap[pid];
        SITH_SCOPE.s = this.tripChannelMap[pid];
        return SITH_SCOPE;
    }
    public markDirty(pid: N): V {
        this.dirtyPids[this.dirtyCount++] = pid;
    }
    public subscribe(pid: N, fn: A): () => V {
        this.listeners[pid] = fn;
        return () => {
            this.listeners[pid] = undefined;
        };
    }
    public flushNotifications(): V {
        this._flushScheduled = false;
        for (let i = 0; i < this.dirtyCount; i++) {
            const pid = this.dirtyPids[i];
            const fn = this.listeners[pid];
            if (fn !== undefined) fn(pid, pid);
        }
        this.dirtyCount = 0;
    }
    public notifyHook(key: S): V {
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
    public notifyPid(pid: N, value: N): V {
        const fn = this.listeners[pid];
        if (fn !== undefined) fn(pid, value);
    }
    public releasePid(pid: N): V {
        const addr = this.addresses.get(pid);
        if (addr) {
            this.pids.delete(`${addr[0]}:${addr[1]}:${addr[2]}:${addr[3]}`);
            this.addresses.delete(pid);
        }
        this.pidToHash[pid] = 0;
    }
}
