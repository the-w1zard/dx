export function MaybePromise(v) {
    return v !== undefined ? v : Promise.resolve(v);
}
// #endregion
//                                                                                                  LOAD
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
export function load(name) {
    try {
        let v;
        v = require(name);
        if (v !== undefined)
            return MaybePromise(v);
        else
            return MaybePromise(import(name));
    }
    catch {
        return MaybePromise(import(name));
    }
}
// #endregion
//                                  CODE BREAKDOWN / EXAMPLES ON HOW TO SET UP AND UTILIZE MAYBE PROMISE
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
function SyncFn(s) {
    return s;
}
function ThrowFn(s) {
    throw new Error('sync fail');
}
function PromiseFn(s) {
    return Promise.resolve(s);
}
function NEW_CATCH_BREAKDOWN(name) {
    let v;
    try { // <- Throw logic gate
        v = SyncFn(name);
        if (v !== undefined) { // <- Main logic gate start
            return MaybePromise(v);
        }
        else { // <- Don't forget to place the async BEHIND a logic gate
            return MaybePromise(PromiseFn(name));
        }
    }
    catch { // <- Both async execution paths, locked behind gates
        return MaybePromise(PromiseFn(name));
    }
}
function NEW_CATCH_BREAKDOWN_W_SYNC_THROWING(name) {
    let v;
    try {
        v = ThrowFn(name);
        if (v !== undefined) {
            return MaybePromise(v);
        }
        else {
            return MaybePromise(PromiseFn(name));
        }
    }
    catch {
        return MaybePromise(PromiseFn(name));
    }
}
function TYPESCRIPT_PRANK(name) {
    let v = PromiseFn(name);
    if (v !== undefined && !(v instanceof Promise)) {
        return MaybePromise(v);
    }
    else {
        const tMs = 5000;
        return MaybePromise((() => {
            return new P((resolve, reject) => {
                let timer;
                if (tMs) {
                    timer = setTimeout(() => { reject(new Error(`wait() timed out after ${tMs}ms`)); }, tMs);
                }
                if (v) {
                    if (timer)
                        clearTimeout(timer);
                    resolve(v);
                    return;
                }
            });
        })());
    }
}
// #endregion
