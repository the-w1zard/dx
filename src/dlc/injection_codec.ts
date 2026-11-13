interface ScopeComponents {	r: N; m: N;	s: N;}
const FLYWEIGHT_SCOPE: ScopeComponents = { r: 0, m: 0, s: 0 };

export class INJECTION_CODEC {
    /*  =======================================================================================================================
          Flat, zero-heap Outbound Notification & Scope Registry. Replaces Sauron nested Map trees with direct PID-indexed arrays.
        ========================================================================== ⇦✦──⇦✦──✦──✦──←'pew pew' 🧙 [INJECTION_CODEC] */
        public readonly maxPids: N;
        public readonly listeners: Array<A | UD>;
    
        public readonly pidToHash: U32;
        public readonly hashToPidMap = new Map<N, N>();
        public nextAllocatedPid = 1;
    
        public readonly channelMap: I32;
        public readonly subChannelMap: I32;
        public readonly tripChannelMap: I32;
    
        public readonly dirtyPids: I32;
        public dirtyCount = 0;
        public _flushScheduled = false;
        public freeList: N[] = [];
        constructor(maxPids = 8192) {
            this.maxPids = maxPids;
            this.listeners = new Array(maxPids);
            this.dirtyPids = new Int32Array(maxPids);
    
            this.pidToHash = new Uint32Array(maxPids);
            this.channelMap = new Int32Array(maxPids);
            this.subChannelMap = new Int32Array(maxPids);
            this.tripChannelMap = new Int32Array(maxPids);
        }
        public getScopeHashForPid(pid: N): N { return this.pidToHash[pid]; }
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
            const ch = this.hashComponent(globalKey, 'THE_WIZARD_ROOT_REG');
            const sub = this.hashComponent(ms_reg, 'SAURON_MASTER_REG');
            const trip = this.hashComponent(sl_reg, 'SAURON_SLAVE_REG');
            const k = this.hashComponent(key, "KEY");
            // Combine hash channels deterministically
            return (ch ^ sub ^ trip ^ k) >>> 0;
        }
        public parseScopeKey(pid: N): ScopeComponents {
            FLYWEIGHT_SCOPE.r = this.channelMap[pid];
            FLYWEIGHT_SCOPE.m = this.subChannelMap[pid];
            FLYWEIGHT_SCOPE.s = this.tripChannelMap[pid];
            return FLYWEIGHT_SCOPE;
        }
        public allocateScopePid(scopeHash: N, key: A, sl_reg?: A, ms_reg?: A, globalKey?: A): N {
            let pid = this.hashToPidMap.get(scopeHash);
            if (pid !== undefined) return pid;
    
            pid = this.freeList.pop() ?? this.nextAllocatedPid++;
    
            if (pid >= this.maxPids) throw new Error("Hadron Notification Hub: PID capacity exceeded");
    
            this.hashToPidMap.set(scopeHash, pid);
            this.pidToHash[pid] = scopeHash;
    
            // Populate SoA lanes for zero-alloc reverse lookups
            this.channelMap[pid] = this.hashComponent(globalKey, 'THE_WIZARD_ROOT_REG');
            this.subChannelMap[pid] = this.hashComponent(ms_reg, 'SAURON_MASTER_REG');
            this.tripChannelMap[pid] = this.hashComponent(sl_reg, 'SAURON_SLAVE_REG');
    
            return pid;
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
                if (fn !== undefined) {
                    fn(pid, pid);
                }
            }
            this.dirtyCount = 0; // Reset dirty stack for next batch
        }
        public notifyHook(key: S) {
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
        public notifyPid(pid: N, value: N): V {
            const fn = this.listeners[pid];
    
            if (fn !== undefined) {
                fn(pid, value);
            }
        }
        public releasePid(pid: N): V {
            this.hashToPidMap.delete(this.pidToHash[pid]);
            this.pidToHash[pid] = 0;
            this.freeList.push(pid);
        }
    } 
