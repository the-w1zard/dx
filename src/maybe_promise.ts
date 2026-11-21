
// #endregion
//                                                                                         MAYBE PROMISE
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
export type MaybePromise<R = any> = R;
export function MaybePromise<R = any>(v: R): MaybePromise {
    return v !== undefined ? v as R : Promise.resolve(v) as Promise<R> 
}
// #endregion
//                                                                                                  LOAD
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
export function load(name: string): any {
	try { let v: A;
		v = require(name);
		if (v !== undefined) return MaybePromise(v);
		else return MaybePromise(import(name));
	} catch { return MaybePromise(import(name)); }
}
// #endregion
//                                  CODE BREAKDOWN / EXAMPLES ON HOW TO SET UP AND UTILIZE MAYBE PROMISE
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
function SyncFn<T>(s: T) {
    return s;
}
function ThrowFn<T>(s: T) {
    throw new Error('sync fail');
}
function PromiseFn<T = any>(s: T) {
    return Promise.resolve(s);
}
function NEW_CATCH_BREAKDOWN(name: string): any {
	let v: A;
	try {// <- Throw logic gate
		v = SyncFn(name);
		if (v !== undefined) {// <- Main logic gate start
			return MaybePromise(v);
		} else {// <- Don't forget to place the async BEHIND a logic gate
			return MaybePromise(PromiseFn(name));
		}
	} catch {// <- Both async execution paths, locked behind gates
		return MaybePromise(PromiseFn(name));
	}
}
function NEW_CATCH_BREAKDOWN_W_SYNC_THROWING(name: string): any {
	let v: A;
	try {
		v = ThrowFn(name);
		if (v !== undefined) { return MaybePromise(v); } 
        else { return MaybePromise(PromiseFn(name)); }
	} catch { return MaybePromise(PromiseFn(name)); }
}
function TYPESCRIPT_PRANK<T = any>(name: string): any {
    let v: A = PromiseFn(name)
    if (v !== undefined && !(v instanceof Promise)) { return MaybePromise<T>(v); }
    else {
        const tMs = 5000;
        return MaybePromise( (() => {
                return new P<T>((resolve, reject) => {
                    let timer: RT<typeof setTimeout> | UD;
                    if (tMs) { timer = setTimeout(() => { reject(new Error(`wait() timed out after ${tMs}ms`)); }, tMs); }
                    if (v) { if (timer) clearTimeout(timer); resolve(v as T); return; }
                });
            })(),
        );
    }
}
// #endregion
