export class P2I extends Promise {
    constructor(executor) {
        super(executor);
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
}
globalThis.P2 = P2I;
