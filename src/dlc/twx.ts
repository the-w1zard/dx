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
	public MAX_PENDING = 4096;
	public sentTimestamps;
	public pendingResolvers;
	public cursor = 0;
	private readonly counter: U32;
	private epoch = 0;
	public _byteid(): string {
		const g = globalThis as A;
		const c = g._sauronIdCounter ?? (g._sauronIdCounter = new Uint32Array(1));
		if (++c[0] === 0) this.epoch++;
		g._sauronIdCounter = c;
		return `${this.epoch}:${c[0]}`;
	}
	public b(): string {
		return this._byteid();
	}
	constructor() {
		this.counter = new Uint32Array(1);
		this.sentTimestamps = new Float64Array(this.MAX_PENDING);
		this.pendingResolvers = new Array(this.MAX_PENDING);
	}
}

function _sid(): string {
	const g = globalThis as A;
	const t = String(((g._sauronIdCounter ?? 0) as N) + 1);
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

 
// #endregion
//                                                                                          MaybePromise
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
type MaybePromise<R = any> = R;
function MaybePromise<R = any>(v: R): MaybePromise {
	return v !== undefined ? v as R : Promise.resolve(v) as P<R>
}
// || v != null
// #endregion
//                                                                                                   TWX
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
type PK = string | symbol | number;


const TWX_GLOBAL = globalThis as typeof globalThis & Record<string, A>;
const UC: typeof TWX_DEFAULT_UC = TWX_GLOBAL.UC ?? (TWX_GLOBAL.UC = TWX_DEFAULT_UC);
const TWX_MAP = Symbol.for("THE_WIZARD");

// 1. Corrected getNestedMap signature matching (s, m, r)
function getNestedMap<K, V>(
	s = UC.SAURON_SLAVE_REG,
	m = UC.SAURON_MASTER_REG,
	r = UC.THE_WIZARD_ROOT_REG
): Map<K, V> {
	let root = (globalThis as A)[r];
	if (!root) {
		root = new Map<A, Map<A, Map<A, A>>>();
		(globalThis as A)[r] = root;
	}
	let masterMap = root.get(m);
	if (!masterMap) {
		masterMap = new Map<A, Map<A, A>>();
		root.set(m, masterMap);
	}
	let slaveMap = masterMap.get(s);
	if (!slaveMap) {
		slaveMap = new Map<K, V>();
		masterMap.set(s, slaveMap);
	}
	return slaveMap;
}

// 2. Register getNestedMap to globalThis[TWX_MAP]
TWX_GLOBAL[TWX_MAP] = getNestedMap;

type TWX_CHANNELS = {
	k: PK;
	s: PK;
	m: PK;
	r: PK;
};

type TWX_SCOPE = {
	channels: TWX_CHANNELS;
	get: (k?: PK) => A;
	set: (v: A, k?: PK) => A;
	map: () => Map<PK, A>;
};

type TWX_APP = {
	(k: PK, s?: PK, m?: PK, r?: PK): A;
	get: (k: PK, s?: PK, m?: PK, r?: PK) => A;
	set: (v: A, k: PK, s?: PK, m?: PK, r?: PK) => A;
	map: (s?: PK, m?: PK, r?: PK) => Map<PK, A>;
};

type TWX = {
	(): void;
	(k: PK, s?: PK, m?: PK, r?: PK): TWX_SCOPE;
	UC: Record<string, A>;
	app: TWX_APP;
	scope: (k: PK, s?: PK, m?: PK, r?: PK) => TWX_SCOPE;
	[key: string]: A;
};

function twxChannels(k?: PK, s?: PK, m?: PK, r?: PK): TWX_CHANNELS {
	return {
		k: k ?? UC.APP_NAME,
		s: s ?? UC.SAURON_SLAVE_REG,
		m: m ?? UC.SAURON_MASTER_REG,
		r: r ?? (UC.THE_WIZARD_ROOT_REG || UC.APP_NAME),
	};
}

// 3. Updated twxMap to pass correct (s, m, r) arguments to mapFn
function twxMap(s?: PK, m?: PK, r?: PK): M<PK, A> {
	const ch = twxChannels(undefined, s, m, r);

	const mapFn = TWX_GLOBAL[TWX_MAP] as
		| ((s: PK, m: PK, r: PK) => M<PK, A>)
		| undefined;

	if (!mapFn) {
		throw new Error("TWX: _map() has not been registered.");
	}

	return mapFn(ch.s, ch.m, ch.r);
}

const app = ((k: PK, s?: PK, m?: PK, r?: PK) => twxMap(s, m, r).get(k)) as TWX_APP;
app.get = (k, s, m, r) => twxMap(s, m, r).get(k);
app.set = (v, k, s, m, r) => {
	twxMap(s, m, r).set(k, v);
	return v;
};
app.map = (s, m, r) => twxMap(s, m, r);

function twxScope(k?: PK, s?: PK, m?: PK, r?: PK): TWX_SCOPE {
	const channels = twxChannels(k, s, m, r);

	return {
		channels,
		get: (key = channels.k) =>
			twxMap(channels.s, channels.m, channels.r).get(key),
		set: (v, key = channels.k) => {
			twxMap(channels.s, channels.m, channels.r).set(key, v);
			return v;
		},
		map: () => twxMap(channels.s, channels.m, channels.r),
	};
}

const twx = new Proxy(
	Object.assign(
		(k?: PK, s?: PK, m?: PK, r?: PK) => {
			if (k === undefined && s === undefined && m === undefined && r === undefined) {
				console.log({
					UC,
					channels: twxChannels(),
					platform: Object.keys(TWX_GLOBAL),
				});
				return;
			}

			return twxScope(k, s, m, r);
		},
		{
			UC,
			app,
			scope: twxScope,
		},
	),
	{
		get(target, property, receiver) {
			if (Reflect.has(target, property)) {
				return Reflect.get(target, property, receiver);
			}

			return TWX_GLOBAL[property as string];
		},

		set(_target, property, value) {
			TWX_GLOBAL[property as string] = value;
			return true;
		},

		has(target, property) {
			return Reflect.has(target, property) || property in TWX_GLOBAL;
		},
	},
) as TWX;

TWX_GLOBAL.twx = twx;
export { twx };

// #endregion
//                                                                                                   TWX
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════


const k = "_THE_KEY_";
const ss  = "_THE_CLOUD_"
const c = "sauron";
const mm  = "_SOUL_SHARD_REGISTRY_";
const rr = "_THE_WIZARD_"

// ReChain / Chain — immutable or not, value pipeline for DRS. Difference from Chain: every step returns a NEW ReChain; no in-place mutation anywhere. Safe to hold across renders, share, or re-run.
const cellStore = new Map<string, any>();
export function useCell<T=A>(v: A, k: A = `${_bid._byteid()}_USECELL`, s: S = ss, m: S = mm, r: S = rr) {
	const cellKey = `${k}:${s}:${m}:${r}`;

	// Initialize local state if not present
	if (!cellStore.has(cellKey)) {
		const initial = typeof v === "function" ? (v as Function)() : v;
		cellStore.set(cellKey, initial);
	}

	const currentState = cellStore.get(cellKey);

	// Mock local setter that mimics setLive behavior
	const setLive = (next: any) => {
		const current = cellStore.get(cellKey);
		const newValue = typeof next === "function" ? next(current) : next;
		cellStore.set(cellKey, newValue);
		return newValue;
	};
	return [currentState as T, setLive] as const;
}
export function cell<T = any>(v: A,k: A = `${_bid._byteid()}_USECELL`, s: S = ss, m: S = mm, r: S = rr) {
	const cellKey = `${k}:${s}:${m}:${r}`;

	// Initialize if not already present in the fallback store
	if (!cellStore.has(cellKey)) {
		const initial = typeof v === "function" ? (v as Function)() : v;
		cellStore.set(cellKey, initial);
	}
	const currentState = cellStore.get(cellKey);
	// Matches your MCR_Com bo return structure (read-only, no setter)
	return currentState as T
}
const refStore = new Map<string, { current: any }>();
export function atom<T = any>( v: A, k: A = `__THE_WARLOCK_SIGNALS_${_bid._byteid()}`, s: S = ss, m: S = mm, r: S = rr) {
	const rk = `${k}:${s}:${m}:${r}`;
	if (!refStore.has(rk)) refStore.set(rk, { current: typeof v === 'function' ? (v as Function)() : v });
	const ref = refStore.get(rk)!;
	return {
		get value(): T { return ref.current },
		set value(v: T) { ref.current = v },
		peek(): T { return ref.current },
		get current(): T { return ref.current },
		set current(v: T) { ref.current = v },
		set crt(v: T) { ref.current = v },
		set set(v: T) { ref.current = v },
	};
}
export function Maybe_Chain<T = A>(v: A) {
	return MaybePromise(new Chain(v as T))
}
export function Maybe_ReChain<T = A>(v: A) {
	return MaybePromise(new ReChain(v as T, `Maybe_ReChain:${_bid._byteid()}`))
}
export function MCR_Combo<T = A>(v: A, chain?: CHAIN) {
	if (chain === 'chain') return MaybePromise(new Chain(v as T))
	if (chain === 'rechain') return MaybePromise(new ReChain(v as T, `Maybe_ReChain:${_bid._byteid()}`))
	return MaybePromise<T>(v as T)
}
// #endregion
//                                                                                                   TWX
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
export class Chain<T = any> {
	public initial_value: T;
	public id: string;

	constructor(value?: T, id?: string) {
		this.initial_value = value as T;
		this.id = id ? id : Math.random().toString(36).substring(2, 9);
	}

	private _use() {
		return useCell( this.initial_value, `re_chain_${this.id}`);
	}

	/* ---------- branch logic ---------- */
	when(p: boolean | ((v: T) => boolean)) {
		const [v] = this._use();
		const ok = typeof p === 'function' ? (p as (v: T) => boolean)(v) : p;
		return {
			then: (fn: (v: T) => T | Promise<T>) => (ok ? fn(v) : undefined),
			otherwise: (fn: (v: T) => T | Promise<T>) => (ok ? v : fn(v)),
		};
	}
	
	if(p: boolean | ((v: T) => boolean)) { 
		return this.when(p) as unknown as T; 
	}

	switch() {
		const self = this;
		const [v0, setV] = this._use();
		let matched = false;
		let current: any = v0;
		
		const view = {
			case: <V = any>(m: V, fn: (v: T) => T | Promise<T>) => {
				if (!matched && current === m) {
					matched = true;
					current = fn(current);
					setV(current);
					self.initial_value = current;
				}
				return view;
			},
			default: (fn: (v: T) => T | Promise<T>) => {
				if (!matched) {
					current = fn(current);
					setV(current);
					self.initial_value = current;
				}
				return self;
			},
			done: () => current as T,
		};
		return view as unknown as T;
	}

	guard(p: (v: T) => boolean, e: any = new Error('guard failed')) {
		const [v] = this._use();
		if (!p(v)) throw e;
		return this;
	}

	/* ---------- mutation steps ---------- */
	set(v: T | ((c: T) => T)) {
		const [current, setV] = this._use();
		const next = (typeof v === 'function' ? (v as Function)(current) : v) as T;
		setV(next);
		this.initial_value = next;
		return this;
	}
	
	patch(p: Partial<T>) {
		const [current, setV] = this._use();
		const next = { ...(current as any), ...(p as any) } as T;
		setV(next);
		this.initial_value = next;
		return this;
	}
	
	merge(o: any) {
		const [current, setV] = this._use();
		const next = { ...(current as any), ...(o as any) } as T;
		setV(next);
		this.initial_value = next;
		return this;
	}
	
	tap(fn: (v: T) => void) {
		const [v] = this._use();
		fn(v);
		return this;
	}
	
	get<K extends keyof T>(k: K): Chain<T[K]> {
		const [v] = this._use();
		return new Chain(v?.[k] as T[K]);
	}

	/* ---------- async ---------- */
	then(fn: (v: T) => T | Promise<T>) {
		const [v] = this._use();
		return Promise.resolve(v).then(fn).then((next: any) => new Chain(next) as unknown as T);
	}
	
	catch(fn: (e: any) => T) {
		const [v] = this._use();
		return Promise.resolve(v).catch(fn).then((next: any) => new Chain(next) as unknown as T);
	}
	
	retry(fn: (v: T) => Promise<T>, opts: { attempts?: number; baseDelayMs?: number } = {}) {
		const attempts = opts.attempts ?? 3, base = opts.baseDelayMs ?? 2000;
		const [v0] = this._use();
		return (async () => {
			let lastErr: any;
			for (let i = 0; i < attempts; i++) {
				try { return new Chain(await fn(v0)); }
				catch (e) { 
					lastErr = e; 
					if (i < attempts - 1) await new Promise(r => setTimeout(r, base * 2 ** i)); 
				}
			}
			throw lastErr;
		})();
	}
	
	delay(m: number) { 
		return new Promise<Chain<T>>(r => setTimeout(() => r(this), m)); 
	}
	
	throw(e: any): never { 
		throw e; 
	}

	done(): T {
		const [v] = this._use();
		return (typeof v === 'function' ? (v as Function)() : v) as T;
	}
}
export class ReChain<T = A> {
	public initial_value: A;
	public id: A;

	constructor(value?: A, id?: A) { 
		this.initial_value = value; 
		this.id = id ? id : _bid._byteid(); 
	}

	private _use() {
		 return useCell(this.initial_value, `re_chain_${this.id}`);
	}

	// The ONLY place a value changes hands — a fresh chain, nothing mutated.
	// write=true means this transformation broadcasts to the store + bus.
	private step(next: A, write = false): ReChain<A> {
		if (write) {
			const [, setV] = this._use();
			setV(next);
		}
		return next instanceof ReChain ? next : new ReChain(next, this.id);
	}

	// when/if/switch return a branch view: then and otherwise can BOTH be
	// written (only one fires, like Chain), and each call returns a fresh
	// ReChain — nothing mutated, order-independent.
	private branch(passed: boolean) {
		const step = (next: A, write = false) => this.step(next, write);
		return {
			then: (fn: A) => (passed ? step(fn(this.done()), true) : this),
			otherwise: (fn: A) => (passed ? this : step(fn(this.done()), true)),
			else: (fn: A) => (passed ? this : step(fn(this.done()), true)),
			done: () => this.done(),
		};
	}

	public when(pred: (v: T) => boolean) {
		const [v] = this._use();
		return this.branch(!!pred(v));
	}

	public if(pred: (v: T) => boolean) {
		const [v] = this._use();
		return this.branch(!!pred(v));
	}

	public switch() {
		const [v, setV] = this._use();
		let matched = false;
		let out: ReChain<A> = this;
		const self = this;
		
		return {
			case(val: A, fn: A) {
				if (!matched && (v === val || Object.is(v, val))) {
					matched = true;
					const next = fn(v);
					setV(next); // write-through
					out = new ReChain(next, self.id);
				}
				return self;
			},
			default(fn: A) {
				if (!matched) {
					const next = fn(v);
					setV(next); // write-through
					out = new ReChain(next, self.id);
				}
				return self;
			},
			done: () => out.done(),
		};
	}

	public gate(pred: (v: T) => boolean): this {
		const [v] = this._use();
		if (!pred(v)) {
			const err: A = new Error('[Chain.gate] predicate failed');
			err.value = v;
			throw err;
		}
		return this;
	}

	public guard(pred: (v: T) => boolean, onFail?: (v: T) => A) {
		const [v, setV] = this._use();
		if (pred(v)) return this;
		const fallback = onFail ? onFail(v) : v;
		setV(fallback); // write-through
		return this.step(fallback);
	}

	public tap(fn: (v: T) => A) {
		const [v] = this._use();
		fn(v);
		return this;
	}

	public set(k: string, val: A) {
		const [v, setV] = this._use();
		const next = { ...v, [k]: val };
		setV(next); // write-through
		return this.step(next);
	}

	public patch(obj: object) {
		const [v, setV] = this._use();
		const next = { ...v, ...obj };
		setV(next); // write-through
		return this.step(next);
	}

	public get(k: string) {
	  const [v] = this._use();
	  return new ReChain(v?.[k], _bid._byteid());
  }

	public merge(other: A) {
		const [v, setV] = this._use();
		const next = { ...v, ...(other?.initial_value ?? other) };
		setV(next); // write-through
		return this.step(next);
	}

	public delay(m: number): Promise<ReChain<T>> {
		return new Promise((resolve) => setTimeout(() => resolve(this), m));
	}

	public throw(err: A): never {
		throw err instanceof Error ? err : new Error(String(err));
	}

	public retry(attempts: number, delayMs = 100): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			let n = 0;
			const attempt = () => {
				const [v] = this._use();
				const out = typeof v === 'function' ? (v as Function)() : v;

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

	public catch<R = never>(onRejected: (e: A) => R | PromiseLike<R>): Promise<T | R> {
		return this.then(null, onRejected);
	}

	public finally(fn: () => A): this {
		fn();
		return this;
	}

	public then<R = T>(
		onFulfilled?: ((v: T) => R | PromiseLike<R>) | null, 
		onRejected?: ((e: A) => R | PromiseLike<R>) | null
	): Promise<T | R> {
		const [v] = this._use();
		const raw = typeof v === 'function' ? (v as Function)() : v;
		return Promise.resolve(raw).then(onFulfilled as A, onRejected);
	}

	public done(): T {
		const [v] = this._use();
		return (typeof v === 'function' ? (v as Function)() : v) as T;
	}
}

// #endregion
// ReChain / Chain — immutable or not, value pipeline for DRS. Difference from Chain: every step returns a NEW ReChain; no in-place mutation anywhere. Safe to hold across renders, share, or re-run.
 
