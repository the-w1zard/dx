export type ALL_MAPS = M2<K, V> | Map<K, V> | M2B | M2BIN<K, V> | M2D<K, V> | M2R<K> | NU;
export declare class nestedi<K = A, V = A> {
    r: string;
    m: string;
    s: string;
    CACHE: ALL_MAPS;
    FALLBACK: import("./map").M2<any, M2<any, M2<K, V>>>;
    constructor(CACHE?: ALL_MAPS);
    map<K, V>(s?: A, m?: A, r?: A): Map<A, A>;
    m2<K, V>(s?: A, m?: A, r?: A): M2<A, A>;
    m2b<K, V>(s?: A, m?: A, r?: A): M2B<A, A>;
    m2bin<K, V>(s?: A, m?: A, r?: A): M2BIN<A, A>;
    m2d<K, V>(s?: A, m?: A, r?: A): M2D<A, A>;
    m2r<K>(s?: A, m?: A, r?: A): M2R<A>;
    cache<K, V>(s?: A, m?: A, r?: A): M2<A, A>;
}
export declare const nested: nestedi<any, any>;
//# sourceMappingURL=nested.d.ts.map