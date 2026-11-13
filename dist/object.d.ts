export declare class O2I {
    static isEmpty(value: object): B;
    static isNotEmpty(value: object): B;
    static size(value: object): N;
    static isPlainObject(value: unknown): B;
    static isObject(value: unknown): B;
    static get<X = unknown>(value: unknown, path: string | readonly PropertyKey[], fallback?: X): unknown | X;
    static getOr<X>(value: unknown, path: string | readonly PropertyKey[], fallback: X): X;
    static set<T extends object>(value: T, path: string | readonly PropertyKey[], next: unknown): T;
    static unset(value: object, path: string | readonly PropertyKey[]): B;
    static hasPath(value: unknown, path: string | readonly PropertyKey[]): B;
    static clone<T>(value: T): T;
    static deepClone<T>(value: T): T;
    static deepMerge<T extends object, U extends object>(target: T, source: U): T & U;
    static defaults<T extends object, U extends object>(target: T, defaults: U): T & U;
    static getOrCreate<T extends object, K extends PropertyKey, X>(value: T, key: K, create: () => X): T & Record<K, X>;
    static pick<T extends object, K extends keyof T>(value: T, keys: readonly K[]): Pick<T, K>;
    static omit<T extends object, K extends keyof T>(value: T, keys: readonly K[]): Omit<T, K>;
    static pickBy<T extends object>(value: T, predicate: (value: T[keyof T], key: keyof T) => B): Partial<T>;
    static omitBy<T extends object>(value: T, predicate: (value: T[keyof T], key: keyof T) => B): Partial<T>;
    static mapKeys<T extends object, K extends PropertyKey>(value: T, mapper: (key: keyof T, value: T[keyof T]) => K): Partial<Record<K, T[keyof T]>>;
    static mapValues<T extends object, X>(value: T, mapper: (value: T[keyof T], key: keyof T) => X): {
        [K in keyof T]: X;
    };
    static mapEntries<T extends object, K extends PropertyKey, X>(value: T, mapper: (entry: [keyof T, T[keyof T]]) => readonly [K, X]): Partial<Record<K, X>>;
    static filter<T extends object>(value: T, predicate: (value: T[keyof T], key: keyof T) => B): Partial<T>;
    static isEqual(first: unknown, second: unknown): B;
    static isShallowEqual(first: object, second: object): B;
    static hasAll<T extends object>(value: T, keys: readonly PropertyKey[]): B;
    static hasAny<T extends object>(value: T, keys: readonly PropertyKey[]): B;
    static assertKeys<T extends object>(value: T, keys: readonly PropertyKey[]): asserts value is T;
    static with<T extends object, K extends keyof T>(value: T, key: K, next: T[K]): T;
    static without<T extends object, K extends keyof T>(value: T, key: K): Omit<T, K>;
    static update<T extends object, K extends keyof T>(value: T, key: K, updater: (current: T[K]) => T[K]): T;
}
//# sourceMappingURL=object.d.ts.map