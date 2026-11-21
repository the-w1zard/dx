export declare const rv: <T>(v: UF<T>) => T;
export declare const sameValue: (a: A, b: A) => B;
type QuadSub<V> = (v: V | UD) => void;
export declare class QUAD<V = A> {
    #private;
    _bear: Record<string, V>;
    s(v: UF<V>, k: S, s?: S, m?: S, r?: S): this;
    sl(s?: S, m?: S, r?: S): Record<string, V>;
    ks(v: UF<V>, k: S): this;
    kg(k: S): V | UD;
    kh(k: S): B;
    kd(k: S): B;
    constructor();
    g(k: S, s?: S, m?: S, r?: S): V | UD;
    h(k: S, s?: S, m?: S, r?: S): B;
    d(k: S, s?: S, m?: S, r?: S): B;
    on(fn: QuadSub<V>, k: S, s?: S, m?: S, r?: S): () => void;
    off(fn: QuadSub<V>, k: S, s?: S, m?: S, r?: S): void;
}
export {};
//# sourceMappingURL=nested_hot_path.d.ts.map