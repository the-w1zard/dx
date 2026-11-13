export class _serialExecutor {
    chain = Promise.resolve();
    enqueue(fn) {
        const run = this.chain.then(fn);
        this.chain = run.then(() => undefined, () => undefined);
        return run;
    }
    get exec() { return this.chain; }
}
export function executor() {
    return new _serialExecutor();
}
/**
 const serial = executor();

 await serial.enqueue(() => doThing());
 await serial.exec;
 */
