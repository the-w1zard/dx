export interface P2<T = A> extends Promise<T> {
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): P2<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): P2<T | TResult>;
    finally(onfinally?: (() => void) | null): P2<T>;
    tap(fn: (value: T) => unknown): P2<T>;
    tapError(fn: (error: A) => unknown): P2<T>;
    recover(fn: (error: A) => T | PromiseLike<T>): P2<T>;
    fallback(value: T | PromiseLike<T>): P2<T>;
    timeout(ms: N, error?: A): P2<T>;
    delay(ms: N): P2<T>;
    withDeadline(deadline: N, error?: A): P2<T>;
    map<G>(fn: (value: T) => G | PromiseLike<G>): P2<Awaited<G>>;
    flatMap<G>(fn: (value: T) => G | PromiseLike<G>): P2<Awaited<G>>;
    and<G>(other: G | PromiseLike<G>): P2<[T, Awaited<G>]>;
    or<G>(other: G | PromiseLike<G>): P2<T | Awaited<G>>;
    zip<G>(other: PromiseLike<G>): P2<[T, Awaited<G>]>;
    unwrap(): Promise<T>;
    toResult(): P2<{
        ok: true;
        value: T;
    } | {
        ok: false;
        error: A;
    }>;
    onResolve(fn: (value: T) => unknown): P2<T>;
    onReject(fn: (error: A) => unknown): P2<T>;
    finallyDo(fn: () => unknown): P2<T>;
}
export interface P2C extends PromiseConstructor {
    new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: A) => void) => void): P2<T>;
    resolve(): P2<void>;
    resolve<T>(value: T | PromiseLike<T>): P2<Awaited<T>>;
    reject<T = never>(reason?: A): P2<T>;
    all<T extends readonly unknown[] | []>(values: T): P2<{
        -readonly [P in keyof T]: Awaited<T[P]>;
    }>;
    allSettled<T extends readonly unknown[] | []>(values: T): P2<{
        -readonly [P in keyof T]: PromiseSettledResult<Awaited<T[P]>>;
    }>;
    race<T extends readonly unknown[] | []>(values: T): P2<Awaited<T[number]>>;
    any<T extends readonly unknown[] | []>(values: T): P2<Awaited<T[number]>>;
    retry<T>(fn: () => T | PromiseLike<T>, times?: N, delay?: N): P2<Awaited<T>>;
    deferred<T = A>(): {
        promise: P2<T>;
        resolve: (value: T | PromiseLike<T>) => void;
        reject: (reason?: A) => void;
    };
    try<T>(fn: () => T | PromiseLike<T>): P2<Awaited<T>>;
}
export declare class P2I<T = A> extends Promise<T> implements P2<T> {
    constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: A) => void) => void);
    static get [Symbol.species](): PromiseConstructor;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): P2I<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): P2I<T | TResult>;
    finally(onfinally?: (() => void) | null): P2I<T>;
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
}
