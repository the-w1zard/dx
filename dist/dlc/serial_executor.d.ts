export declare class _serialExecutor {
    private chain;
    enqueue<T>(fn: () => T | PromiseLike<T>): Promise<T>;
    get exec(): Promise<void>;
}
export declare function executor(): _serialExecutor;
/**
 const serial = executor();

 await serial.enqueue(() => doThing());
 await serial.exec;
 */
//# sourceMappingURL=serial_executor.d.ts.map