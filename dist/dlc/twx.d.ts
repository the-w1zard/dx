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
export declare class BYTE_ID {
    MAX_PENDING: number;
    sentTimestamps: Float64Array<ArrayBuffer>;
    pendingResolvers: any[];
    cursor: number;
    private readonly counter;
    private epoch;
    _byteid(): string;
    b(): string;
    constructor();
}
type PK = string | symbol | number;
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
declare const twx: TWX;
export { twx };
export declare function useCell<T = A>(v: A, k?: A, s?: S, m?: S, r?: S): readonly [T, (next: any) => any];
export declare function cell<T = any>(v: A, k?: A, s?: S, m?: S, r?: S): T;
export declare function atom<T = any>(v: A, k?: A, s?: S, m?: S, r?: S): {
    value: T;
    peek(): T;
    current: T;
    crt: T;
    set: T;
};
export declare function Maybe_Chain<T = A>(v: A): any;
export declare function Maybe_ReChain<T = A>(v: A): any;
export declare function MCR_Combo<T = A>(v: A, chain?: CHAIN): any;
export declare class Chain<T = any> {
    initial_value: T;
    id: string;
    constructor(value?: T, id?: string);
    private _use;
    when(p: boolean | ((v: T) => boolean)): {
        then: (fn: (v: T) => T | Promise<T>) => T | Promise<T> | undefined;
        otherwise: (fn: (v: T) => T | Promise<T>) => any;
    };
    if(p: boolean | ((v: T) => boolean)): T;
    switch(): T;
    guard(p: (v: T) => boolean, e?: any): this;
    set(v: T | ((c: T) => T)): this;
    patch(p: Partial<T>): this;
    merge(o: any): this;
    tap(fn: (v: T) => void): this;
    get<K extends keyof T>(k: K): Chain<T[K]>;
    then(fn: (v: T) => T | Promise<T>): Promise<T>;
    catch(fn: (e: any) => T): Promise<T>;
    retry(fn: (v: T) => Promise<T>, opts?: {
        attempts?: number;
        baseDelayMs?: number;
    }): Promise<T>;
    delay(m: number): Promise<Chain<T>>;
    throw(e: any): never;
    done(): T;
}
export declare class ReChain<T = A> {
    initial_value: A;
    id: A;
    constructor(value?: A, id?: A);
    private _use;
    private step;
    private branch;
    when(pred: (v: T) => boolean): {
        then: (fn: A) => ReChain<any>;
        otherwise: (fn: A) => ReChain<any>;
        else: (fn: A) => ReChain<any>;
        done: () => T;
    };
    if(pred: (v: T) => boolean): {
        then: (fn: A) => ReChain<any>;
        otherwise: (fn: A) => ReChain<any>;
        else: (fn: A) => ReChain<any>;
        done: () => T;
    };
    switch(): {
        case(val: A, fn: (v: A) => A): ReChain<T>;
        default(fn: (v: A) => A): ReChain<T>;
        done(): T;
    };
    gate(pred: (v: T) => boolean): this;
    guard(pred: (v: T) => boolean, onFail?: (v: T) => A): ReChain<any>;
    tap(fn: (v: T) => A): this;
    set(k: string, val: A): ReChain<any>;
    patch(obj: object): ReChain<any>;
    get(k: string): ReChain<any>;
    merge(other: A): ReChain<any>;
    delay(m: number): Promise<ReChain<T>>;
    throw(err: A): never;
    retry(attempts: number, delayMs?: number): Promise<T>;
    catch<R = never>(onRejected: (e: A) => R | PromiseLike<R>): Promise<T | R>;
    finally(fn: () => A): this;
    then<R = T>(onFulfilled?: ((v: T) => R | PromiseLike<R>) | null, onRejected?: ((e: A) => R | PromiseLike<R>) | null): Promise<T | R>;
    done(): T;
}
//# sourceMappingURL=twx.d.ts.map