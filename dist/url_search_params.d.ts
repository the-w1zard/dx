export declare class USP2I extends URLSearchParams implements USP2 {
    constructor(init?: S | URLSearchParams | R<S, S> | S[][]);
    get size(): N;
    getOr(name: S, fallback: S): S;
    getOrNull(name: S): S | NU;
    getOrThrow(name: S, error?: A): string;
    getNumber(name: S, fallback?: N): N | UD;
    getInt(name: S, radix?: N): N | UD;
    getFloat(name: S): N | UD;
    getBoolean(name: S, fallback?: boolean): B;
    getJSON<T = A>(name: S): T | UD;
    getArray(name: S, separator?: string): S[];
    getObject<T extends R<S, A> = R<S, A>>(): T;
    setNumber(name: S, value: N): this;
    setBoolean(name: S, value: B): this;
    setJSON(name: S, value: A): this;
    setArray(name: S, values: Iterable<A>, separator?: string): this;
    setIfAbsent(name: S, value: S): this;
    setIfPresent(name: S, value: S): this;
    appendAll(params: URLSearchParams | R<S, A>): this;
    merge(params: URLSearchParams | R<S, A>, overwrite?: boolean): this;
    clone(): USP2I;
    clear(): V;
    isEmpty(): B;
    isNotEmpty(): B;
    toObject(): R<S, S | S[]>;
    toJSON(): R<S, S | S[]>;
    toURLSearchParams(): URLSearchParams;
    toURL(url: S | URL): URL;
}
//# sourceMappingURL=url_search_params.d.ts.map