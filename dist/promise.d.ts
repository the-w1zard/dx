export declare class P2I<T = A> extends Promise<T> implements P2<T> {
    #private;
    constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: A) => void) => void);
    static get [Symbol.species](): PromiseConstructor;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): P2I<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): P2I<T | TResult>;
    finally(onfinally?: (() => void) | null): P2I<T>;
    status(): "pending" | "fulfilled" | "rejected";
    isPending(): B;
    isFulfilled(): B;
    isRejected(): B;
    value(): T | UD;
    error(): A | UD;
    elapsed(): N | UD;
    static resolve(): P2I<void>;
    static resolve<T>(value: T | PromiseLike<T>): P2I<Awaited<T>>;
    static reject<T = never>(reason?: A): P2I<T>;
    static all<T extends readonly unknown[] | []>(values: T): P2I<{
        -readonly [P in keyof T]: Awaited<T[P]>;
    }>;
    static allSettled<T extends readonly unknown[] | []>(values: T): P2I<{
        -readonly [P in keyof T]: PromiseSettledResult<Awaited<T[P]>>;
    }>;
    static race<T extends readonly unknown[] | []>(values: T): P2I<Awaited<T[number]>>;
    static any<T extends readonly unknown[] | []>(values: T): P2I<Awaited<T[number]>>;
    static retry<T>(fn: () => T | PromiseLike<T>, times?: N, delay?: N): P2I<Awaited<T>>;
    static deferred<T = A>(): {
        promise: P2I<T>;
        resolve: (value: T | PromiseLike<T>) => void;
        reject: (reason?: A) => void;
    };
    static try<T>(fn: () => T | PromiseLike<T>): P2I<Awaited<T>>;
    static sleep(ms: N): P2I<void>;
    static fromCallback<T>(fn: (cb: (err: A, value?: T) => void) => void): P2I<T>;
    static mapLimit<T, G>(items: AR<T>, limit: N, fn: (item: T, index: N) => G | PromiseLike<G>): P2I<AR<G>>;
    static series<T>(fns: AR<() => T | PromiseLike<T>>): P2I<AR<T>>;
    tap(fn: (value: T) => unknown): P2I<T>;
    tapError(fn: (error: A) => unknown): P2I<T>;
    recover(fn: (error: A) => T | PromiseLike<T>): P2I<T>;
    fallback(value: T | PromiseLike<T>): P2I<T>;
    timeout(ms: N, error?: A): P2I<T>;
    delay(ms: N): P2I<T>;
    withDeadline(deadline: N, error?: A): P2I<T>;
    map<G>(fn: (value: T) => G | PromiseLike<G>): P2I<Awaited<G>>;
    flatMap<G>(fn: (value: T) => G | PromiseLike<G>): P2I<Awaited<G>>;
    or<G>(other: G | PromiseLike<G>): P2I<T | Awaited<G>>;
    and<G>(other: G | PromiseLike<G>): P2I<[T, Awaited<G>]>;
    zip<G>(other: PromiseLike<G>): P2I<[T, Awaited<G>]>;
    unwrap(): Promise<T>;
    toResult(): P2I<{
        ok: true;
        value: T;
    } | {
        ok: false;
        error: A;
    }>;
    onResolve(fn: (value: T) => unknown): P2I<T>;
    onReject(fn: (error: A) => unknown): P2I<T>;
    finallyDo(fn: () => unknown): P2I<T>;
    $label(name: S): this;
    $debug(): this;
}
