export class P2I extends Promise {
    #createdAt = Date.now();
    #status = "pending";
    #val;
    #err;
    #settledAt;
    #label;
    constructor(executor) {
        super(executor);
        super.then((v) => { this.#status = "fulfilled"; this.#val = v; this.#settledAt = Date.now(); }, (e) => { this.#status = "rejected"; this.#err = e; this.#settledAt = Date.now(); });
    }
    static get [Symbol.species]() {
        return P2I;
    }
    then(onfulfilled, onrejected) {
        return super.then(onfulfilled, onrejected);
    }
    catch(onrejected) {
        return super.catch(onrejected);
    }
    finally(onfinally) {
        return super.finally(onfinally);
    }
    //                                                                                     [STATUS]
    // ══════════════════════════════════════════════════════════════════════════════════════════════════════
    status() { return this.#status; }
    isPending() { return this.#status === "pending"; }
    isFulfilled() { return this.#status === "fulfilled"; }
    isRejected() { return this.#status === "rejected"; }
    value() { return this.#status === "fulfilled" ? this.#val : undefined; }
    error() { return this.#status === "rejected" ? this.#err : undefined; }
    elapsed() { return this.#settledAt ? (this.#settledAt - this.#createdAt) : undefined; }
    static resolve(value) {
        return new P2I(resolve => resolve(value));
    }
    static reject(reason) {
        return new P2I((_, reject) => reject(reason));
    }
    static all(values) {
        return new P2I((resolve, reject) => {
            Promise.all(values).then(resolve, reject);
        });
    }
    static allSettled(values) {
        return new P2I((resolve, reject) => {
            Promise.allSettled(values).then(resolve, reject);
        });
    }
    static race(values) {
        return new P2I((resolve, reject) => {
            Promise.race(values).then(resolve, reject);
        });
    }
    static any(values) {
        return new P2I((resolve, reject) => {
            Promise.any(values).then(resolve, reject);
        });
    }
    static retry(fn, times = 3, delay = 0) {
        const run = (remaining) => P2I.try(fn).catch(error => {
            if (remaining <= 0)
                throw error;
            return new P2I(resolve => {
                if (delay > 0)
                    setTimeout(resolve, delay);
                else
                    resolve();
            }).then(() => run(remaining - 1));
        });
        return run(times);
    }
    static deferred() {
        let resolve;
        let reject;
        const promise = new P2I((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return { promise, resolve, reject };
    }
    static try(fn) {
        return new P2I((resolve, reject) => {
            try {
                resolve(fn());
            }
            catch (error) {
                reject(error);
            }
        });
    }
    //                                                                                [CONCURRENCY]
    // ══════════════════════════════════════════════════════════════════════════════════════════════════════
    static sleep(ms) {
        return new P2I(resolve => setTimeout(resolve, ms));
    }
    static fromCallback(fn) {
        return new P2I((resolve, reject) => {
            fn((err, value) => {
                if (err)
                    reject(err);
                else
                    resolve(value);
            });
        });
    }
    static mapLimit(items, limit, fn) {
        return new P2I((resolve, reject) => {
            const results = new Array(items.length);
            let next = 0;
            let active = 0;
            let done = 0;
            let failed = false;
            const run = () => {
                if (failed)
                    return;
                if (done === items.length) {
                    resolve(results);
                    return;
                }
                while (active < limit && next < items.length) {
                    const i = next++;
                    active++;
                    P2I.try(() => fn(items[i], i)).then((v) => { results[i] = v; active--; done++; run(); }, (e) => { failed = true; reject(e); });
                }
            };
            run();
        });
    }
    static series(fns) {
        return fns.reduce((acc, fn) => acc.then(results => P2I.resolve(fn()).then(v => [...results, v])), P2I.resolve([]));
    }
    tap(fn) {
        return this.then(value => P2I.resolve(fn(value)).then(() => value));
    }
    tapError(fn) {
        return this.catch(error => P2I.resolve(fn(error)).then(() => {
            throw error;
        }));
    }
    recover(fn) {
        return this.catch(fn);
    }
    fallback(value) {
        return this.catch(() => value);
    }
    timeout(ms, error = new Error("Promise timed out")) {
        return new P2I((resolve, reject) => {
            const timer = setTimeout(() => reject(error), ms);
            this.then(value => {
                clearTimeout(timer);
                resolve(value);
            }, reason => {
                clearTimeout(timer);
                reject(reason);
            });
        });
    }
    delay(ms) {
        return this.then(value => new P2I(resolve => setTimeout(() => resolve(value), ms)));
    }
    withDeadline(deadline, error = new Error("Deadline exceeded")) {
        return this.timeout(Math.max(0, deadline - Date.now()), error);
    }
    map(fn) {
        return this.then(fn);
    }
    flatMap(fn) {
        return this.then(fn);
    }
    or(other) {
        return this.catch(() => other);
    }
    and(other) {
        return this.then(value => P2I.resolve(other).then(result => [value, result]));
    }
    zip(other) {
        return this.and(other);
    }
    unwrap() {
        return this;
    }
    toResult() {
        return this.then(value => ({ ok: true, value }), error => ({ ok: false, error: error }));
    }
    onResolve(fn) {
        return this.tap(fn);
    }
    onReject(fn) {
        return this.tapError(fn);
    }
    finallyDo(fn) {
        return this.finally(fn);
    }
    //                                                                                      [DEBUG]
    // ══════════════════════════════════════════════════════════════════════════════════════════════════════
    $label(name) {
        this.#label = name;
        return this;
    }
    $debug() {
        const tag = this.#label ? `:${this.#label}` : "";
        super.then(v => console.log(`[P2${tag}] ✓ resolved`, v, `(${this.elapsed()}ms)`), e => console.log(`[P2${tag}] ✗ rejected`, e, `(${this.elapsed()}ms)`));
        return this;
    }
}
globalThis.P2 = P2I;
