/**
twx.THE_POWER_OF_TWO;
twx.SIGNALS;
twx.HADRON_COLLIDER;

twx.app("myKey");
twx.app.set(myValue, "myKey");

twx.app("myKey", "slave", "master", "root");
twx.app.set(myValue, "myKey", "slave", "master", "root");

const scope = twx("myKey", "slave", "master", "root");
scope.get();
scope.set(myValue);
scope.map();

twx();
 */
//                                                                                          BYTE_ID
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
export class BYTE_ID {
    /*  ==========================================================================================================================
         provides lightweight numeric and string ID generation, using a Uint32Array counter for incrementing byte-level IDs and
         a separate counter for string IDs. It also preallocates fixed-size timestamp and resolver arrays to
         track up to 4,096 pending operations.
    
         The update byteid function now shares the counter with sid, the string variant. At the smae time, a rollover counter that
         increments whenever the 32-bit counter wraps. Keeping the fact U32Array counter while producing ids that remain unique.
        ================================================================================ ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [BYTE_ID] */
    MAX_PENDING = 4096;
    sentTimestamps;
    pendingResolvers;
    cursor = 0;
    counter;
    epoch = 0;
    _byteid() {
        const g = globalThis;
        const c = g._sauronIdCounter ?? (g._sauronIdCounter = new Uint32Array(1));
        if (++c[0] === 0)
            this.epoch++;
        g._sauronIdCounter = c;
        return `${this.epoch}:${c[0]}`;
    }
    b() {
        return this._byteid();
    }
    constructor() {
        this.counter = new Uint32Array(1);
        this.sentTimestamps = new Float64Array(this.MAX_PENDING);
        this.pendingResolvers = new Array(this.MAX_PENDING);
    }
}
function _sid() {
    const g = globalThis;
    const t = String((g._sauronIdCounter ?? 0) + 1);
    g._sauronIdCounter = t;
    return t;
}
// public _stringIdCounter = 0;
const _bid = new BYTE_ID();
// || v != null
// #endregion
//                                                                                                   TWX_DEFAULT_UC
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
const TWX_DEFAULT_UC = {
    APP_NAME: "THE_WIZARD",
    _THE_WARLOCK_ACTIVE: false,
    _THE_WARLOCK_PORTALS_ACTIVE: false,
    _HC_CONTEXT_ACTIVE: false,
    STATE_CONTEXT: "sauron",
    WS_KEY: "THE_WIZARD_WORKSPACE_ID",
    ENABLE_GLOBAL_WORKSPACE_CONTEXT: false,
    CACHE_TYPE: "sauron",
    THE_SINGULARITY_TEST: "THE_SINGULARITY_TEST",
    THE_SINGULARITY_SL_CH: "THE_SINGULARITY_SL_CH",
    THE_WARLOCK_TEST: "THE_SINGULARITY_TEST",
    THE_WARLOCK_SL_CH: "THE_SINGULARITY_SL_CH",
    GRIMOIRE_OF_VALUES_CH: "GRIMOIRE_OF_VALUES_CH",
    THE_WIZARD_ROOT_REG: "THE_WIZARD_ROOT_REG",
    SAURON_MASTER_REG: "SAURON_MASTER_REG",
    SAURON_SLAVE_REG: "SAURON_SLAVE_REG",
    THE_CLOUD_SL_REG: "THE_CLOUD_SL_REG",
    SIGNALS_SL_REG: "SIGNALS_SL_REG",
    HADRON_COLLIDER_SL_REG: "HADRON_COLLIDER_SL_REG",
};
function MaybePromise(v) {
    return v !== undefined ? v : Promise.resolve(v);
}
const TWX_GLOBAL = globalThis;
const UC = TWX_GLOBAL.UC ?? (TWX_GLOBAL.UC = TWX_DEFAULT_UC);
const TWX_MAP = Symbol("THE_WIZARD");
// 1. Corrected getNestedMap signature matching (s, m, r)
function getNestedMap(s = UC.SAURON_SLAVE_REG, m = UC.SAURON_MASTER_REG, r = UC.THE_WIZARD_ROOT_REG) {
    let root = globalThis[r];
    if (!root) {
        root = new Map();
        globalThis[r] = root;
    }
    let masterMap = root.get(m);
    if (!masterMap) {
        masterMap = new Map();
        root.set(m, masterMap);
    }
    let slaveMap = masterMap.get(s);
    if (!slaveMap) {
        slaveMap = new Map();
        masterMap.set(s, slaveMap);
    }
    return slaveMap;
}
// 2. Register getNestedMap to globalThis[TWX_MAP]
TWX_GLOBAL[TWX_MAP] = getNestedMap;
function twxChannels(k, s, m, r) {
    return {
        k: k ?? UC.APP_NAME,
        s: s ?? UC.SAURON_SLAVE_REG,
        m: m ?? UC.SAURON_MASTER_REG,
        r: r ?? (UC.THE_WIZARD_ROOT_REG || UC.APP_NAME),
    };
}
// 3. Updated twxMap to pass correct (s, m, r) arguments to mapFn
function twxMap(s, m, r) {
    const ch = twxChannels(undefined, s, m, r);
    const mapFn = TWX_GLOBAL[TWX_MAP];
    if (!mapFn) {
        throw new Error("TWX: _map() has not been registered.");
    }
    return mapFn(ch.s, ch.m, ch.r);
}
const app = ((k, s, m, r) => twxMap(s, m, r).get(k));
app.get = (k, s, m, r) => twxMap(s, m, r).get(k);
app.set = (v, k, s, m, r) => {
    twxMap(s, m, r).set(k, v);
    return v;
};
app.map = (s, m, r) => twxMap(s, m, r);
function twxScope(k, s, m, r) {
    const channels = twxChannels(k, s, m, r);
    return {
        channels,
        get: (key = channels.k) => twxMap(channels.s, channels.m, channels.r).get(key),
        set: (v, key = channels.k) => {
            twxMap(channels.s, channels.m, channels.r).set(key, v);
            return v;
        },
        map: () => twxMap(channels.s, channels.m, channels.r),
    };
}
const twx = new Proxy(Object.assign((k, s, m, r) => {
    if (k === undefined && s === undefined && m === undefined && r === undefined) {
        console.log({
            UC,
            channels: twxChannels(),
            platform: Object.keys(TWX_GLOBAL),
        });
        return;
    }
    return twxScope(k, s, m, r);
}, {
    UC,
    app,
    scope: twxScope,
}), {
    get(target, property, receiver) {
        if (Reflect.has(target, property)) {
            return Reflect.get(target, property, receiver);
        }
        return TWX_GLOBAL[property];
    },
    set(_target, property, value) {
        TWX_GLOBAL[property] = value;
        return true;
    },
    has(target, property) {
        return Reflect.has(target, property) || property in TWX_GLOBAL;
    },
});
TWX_GLOBAL.twx = twx;
export { twx };
// #endregion
//                                                                                                   TWX
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
const k = "_THE_KEY_";
const ss = "_THE_CLOUD_";
const c = "sauron";
const mm = "_SOUL_SHARD_REGISTRY_";
const rr = "_THE_WIZARD_";
// ReChain / Chain — immutable or not, value pipeline for DRS. Difference from Chain: every step returns a NEW ReChain; no in-place mutation anywhere. Safe to hold across renders, share, or re-run.
const cellStore = new Map();
export function useCell(v, k = `${_bid._byteid()}_USECELL`, s = ss, m = mm, r = rr) {
    const cellKey = `${k}:${s}:${m}:${r}`;
    // Initialize local state if not present
    if (!cellStore.has(cellKey)) {
        const initial = typeof v === "function" ? v() : v;
        cellStore.set(cellKey, initial);
    }
    const currentState = cellStore.get(cellKey);
    // Mock local setter that mimics setLive behavior
    const setLive = (next) => {
        const current = cellStore.get(cellKey);
        const newValue = typeof next === "function" ? next(current) : next;
        cellStore.set(cellKey, newValue);
        return newValue;
    };
    return [currentState, setLive];
}
export function cell(v, k = `${_bid._byteid()}_USECELL`, s = ss, m = mm, r = rr) {
    const cellKey = `${k}:${s}:${m}:${r}`;
    // Initialize if not already present in the fallback store
    if (!cellStore.has(cellKey)) {
        const initial = typeof v === "function" ? v() : v;
        cellStore.set(cellKey, initial);
    }
    const currentState = cellStore.get(cellKey);
    // Matches your MCR_Com bo return structure (read-only, no setter)
    return currentState;
}
const refStore = new Map();
export function atom(v, k = `__THE_WARLOCK_SIGNALS_${_bid._byteid()}`, s = ss, m = mm, r = rr) {
    const rk = `${k}:${s}:${m}:${r}`;
    if (!refStore.has(rk))
        refStore.set(rk, { current: typeof v === 'function' ? v() : v });
    const ref = refStore.get(rk);
    return {
        get value() { return ref.current; },
        set value(v) { ref.current = v; },
        peek() { return ref.current; },
        get current() { return ref.current; },
        set current(v) { ref.current = v; },
        set crt(v) { ref.current = v; },
        set set(v) { ref.current = v; },
    };
}
export function Maybe_Chain(v) {
    return MaybePromise(new Chain(v));
}
export function Maybe_ReChain(v) {
    return MaybePromise(new ReChain(v, `Maybe_ReChain:${_bid._byteid()}`));
}
export function MCR_Combo(v, chain) {
    if (chain === 'chain')
        return MaybePromise(new Chain(v));
    if (chain === 'rechain')
        return MaybePromise(new ReChain(v, `Maybe_ReChain:${_bid._byteid()}`));
    return MaybePromise(v);
}
// #endregion
//                                                                                                   TWX
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
export class Chain {
    initial_value;
    id;
    constructor(value, id) {
        this.initial_value = value;
        this.id = id ? id : Math.random().toString(36).substring(2, 9);
    }
    _use() {
        return useCell(this.initial_value, `re_chain_${this.id}`);
    }
    /* ---------- branch logic ---------- */
    when(p) {
        const [v] = this._use();
        const ok = typeof p === 'function' ? p(v) : p;
        return {
            then: (fn) => (ok ? fn(v) : undefined),
            otherwise: (fn) => (ok ? v : fn(v)),
        };
    }
    if(p) {
        return this.when(p);
    }
    switch() {
        const self = this;
        const [v0, setV] = this._use();
        let matched = false;
        let current = v0;
        const view = {
            case: (m, fn) => {
                if (!matched && current === m) {
                    matched = true;
                    current = fn(current);
                    setV(current);
                    self.initial_value = current;
                }
                return view;
            },
            default: (fn) => {
                if (!matched) {
                    current = fn(current);
                    setV(current);
                    self.initial_value = current;
                }
                return self;
            },
            done: () => current,
        };
        return view;
    }
    guard(p, e = new Error('guard failed')) {
        const [v] = this._use();
        if (!p(v))
            throw e;
        return this;
    }
    /* ---------- mutation steps ---------- */
    set(v) {
        const [current, setV] = this._use();
        const next = (typeof v === 'function' ? v(current) : v);
        setV(next);
        this.initial_value = next;
        return this;
    }
    patch(p) {
        const [current, setV] = this._use();
        const next = { ...current, ...p };
        setV(next);
        this.initial_value = next;
        return this;
    }
    merge(o) {
        const [current, setV] = this._use();
        const next = { ...current, ...o };
        setV(next);
        this.initial_value = next;
        return this;
    }
    tap(fn) {
        const [v] = this._use();
        fn(v);
        return this;
    }
    get(k) {
        const [v] = this._use();
        return new Chain(v?.[k]);
    }
    /* ---------- async ---------- */
    then(fn) {
        const [v] = this._use();
        return Promise.resolve(v).then(fn).then((next) => new Chain(next));
    }
    catch(fn) {
        const [v] = this._use();
        return Promise.resolve(v).catch(fn).then((next) => new Chain(next));
    }
    retry(fn, opts = {}) {
        const attempts = opts.attempts ?? 3, base = opts.baseDelayMs ?? 2000;
        const [v0] = this._use();
        return (async () => {
            let lastErr;
            for (let i = 0; i < attempts; i++) {
                try {
                    return new Chain(await fn(v0));
                }
                catch (e) {
                    lastErr = e;
                    if (i < attempts - 1)
                        await new Promise(r => setTimeout(r, base * 2 ** i));
                }
            }
            throw lastErr;
        })();
    }
    delay(m) {
        return new Promise(r => setTimeout(() => r(this), m));
    }
    throw(e) {
        throw e;
    }
    done() {
        const [v] = this._use();
        return (typeof v === 'function' ? v() : v);
    }
}
export class ReChain {
    initial_value;
    id;
    constructor(value, id) {
        this.initial_value = value;
        this.id = id ? id : _bid._byteid();
    }
    _use() {
        return useCell(this.initial_value, `re_chain_${this.id}`);
    }
    // The ONLY place a value changes hands — a fresh chain, nothing mutated.
    // write=true means this transformation broadcasts to the store + bus.
    step(next, write = false) {
        if (write) {
            const [, setV] = this._use();
            setV(next);
        }
        return next instanceof ReChain ? next : new ReChain(next, this.id);
    }
    // when/if/switch return a branch view: then and otherwise can BOTH be
    // written (only one fires, like Chain), and each call returns a fresh
    // ReChain — nothing mutated, order-independent.
    branch(passed) {
        const step = (next, write = false) => this.step(next, write);
        return {
            then: (fn) => (passed ? step(fn(this.done()), true) : this),
            otherwise: (fn) => (passed ? this : step(fn(this.done()), true)),
            else: (fn) => (passed ? this : step(fn(this.done()), true)),
            done: () => this.done(),
        };
    }
    when(pred) {
        const [v] = this._use();
        return this.branch(!!pred(v));
    }
    if(pred) {
        const [v] = this._use();
        return this.branch(!!pred(v));
    }
    switch() {
        const [v, setV] = this._use();
        let matched = false;
        let out = this;
        const self = this;
        return {
            case(val, fn) {
                if (!matched && (v === val || Object.is(v, val))) {
                    matched = true;
                    const next = fn(v);
                    setV(next);
                    out = new ReChain(next, self.id);
                }
                return self;
            },
            default(fn) {
                if (!matched) {
                    const next = fn(v);
                    setV(next);
                    out = new ReChain(next, self.id);
                }
                return self;
            },
            done: () => out.done(),
        };
    }
    gate(pred) {
        const [v] = this._use();
        if (!pred(v)) {
            const err = new Error('[Chain.gate] predicate failed');
            err.value = v;
            throw err;
        }
        return this;
    }
    guard(pred, onFail) {
        const [v, setV] = this._use();
        if (pred(v))
            return this;
        const fallback = onFail ? onFail(v) : v;
        setV(fallback); // write-through
        return this.step(fallback);
    }
    tap(fn) {
        const [v] = this._use();
        fn(v);
        return this;
    }
    set(k, val) {
        const [v, setV] = this._use();
        const next = { ...v, [k]: val };
        setV(next); // write-through
        return this.step(next);
    }
    patch(obj) {
        const [v, setV] = this._use();
        const next = { ...v, ...obj };
        setV(next); // write-through
        return this.step(next);
    }
    get(k) {
        const [v] = this._use();
        return new ReChain(v?.[k], _bid._byteid());
    }
    merge(other) {
        const [v, setV] = this._use();
        const next = { ...v, ...(other?.initial_value ?? other) };
        setV(next); // write-through
        return this.step(next);
    }
    delay(m) {
        return new Promise((resolve) => setTimeout(() => resolve(this), m));
    }
    throw(err) {
        throw err instanceof Error ? err : new Error(String(err));
    }
    retry(attempts, delayMs = 100) {
        return new Promise((resolve, reject) => {
            let n = 0;
            const attempt = () => {
                const [v] = this._use();
                const out = typeof v === 'function' ? v() : v;
                if (out !== undefined && out !== null) {
                    Promise.resolve(out).then(resolve, reject);
                    return;
                }
                if (n++ >= attempts) {
                    reject(new Error('[Chain.retry] exhausted'));
                    return;
                }
                setTimeout(attempt, delayMs);
            };
            attempt();
        });
    }
    catch(onRejected) {
        return this.then(null, onRejected);
    }
    finally(fn) {
        fn();
        return this;
    }
    then(onFulfilled, onRejected) {
        const [v] = this._use();
        const raw = typeof v === 'function' ? v() : v;
        return Promise.resolve(raw).then(onFulfilled, onRejected);
    }
    done() {
        const [v] = this._use();
        return (typeof v === 'function' ? v() : v);
    }
}
// #endregion
// ReChain / Chain — immutable or not, value pipeline for DRS. Difference from Chain: every step returns a NEW ReChain; no in-place mutation anywhere. Safe to hold across renders, share, or re-run.
