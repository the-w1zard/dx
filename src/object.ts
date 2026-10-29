

export class O2I   {
    static isEmpty(value: object): B {
        return Reflect.ownKeys(value).length === 0;
    }
    static isNotEmpty(value: object): B {
        return Reflect.ownKeys(value).length !== 0;
    }
    static size(value: object): N {
        return Reflect.ownKeys(value).length as N;
    }
    static isPlainObject(value: unknown): B {
        if (value === null || typeof value !== "object") return false;
        const prototype = Object.getPrototypeOf(value);
        return prototype === Object.prototype || prototype === null;
    }
    static isObject(value: unknown): B {
        return value !== null && typeof value === "object";
    }
    static get<X = unknown>(
        value: unknown,
        path: string | readonly PropertyKey[],
        fallback?: X
    ): unknown | X {
        const parts: readonly PropertyKey[] = typeof path === "string" ? path.split(".") : path;
        let current = value;

        for (const key of parts) {
            if (current === null || (typeof current !== "object" && typeof current !== "function")) {
                return fallback;
            }
            current = (current as Record<PropertyKey, unknown>)[key];
        }

        return current === undefined ? fallback : current;
    }
    static getOr<X>(value: unknown, path: string | readonly PropertyKey[], fallback: X): X {
        return this.get(value, path, fallback) as X;
    }
    static set<T extends object>(value: T, path: string | readonly PropertyKey[], next: unknown): T {
        const parts: readonly PropertyKey[] = typeof path === "string" ? path.split(".") : path;
        if (!parts.length) return value;

        let current = value as Record<PropertyKey, unknown>;

        for (let i = 0; i < parts.length - 1; i++) {
            const key = parts[i];
            const child = current[key];

            if (child === null || (typeof child !== "object" && typeof child !== "function")) {
                current[key] = {};
            }

            current = current[key] as Record<PropertyKey, unknown>;
        }

        current[parts[parts.length - 1]] = next;
        return value;
    }
    static unset(value: object, path: string | readonly PropertyKey[]): B {
        const parts: readonly PropertyKey[] = typeof path === "string" ? path.split(".") : path;
        if (!parts.length) return false;

        let current = value as Record<PropertyKey, unknown>;

        for (let i = 0; i < parts.length - 1; i++) {
            const child = current[parts[i]];
            if (child === null || typeof child !== "object") return false;
            current = child as Record<PropertyKey, unknown>;
        }

        return Reflect.deleteProperty(current, parts[parts.length - 1]);
    }
    static hasPath(value: unknown, path: string | readonly PropertyKey[]): B {
        const parts: readonly PropertyKey[] = typeof path === "string" ? path.split(".") : path;
        let current = value;

        for (const key of parts) {
            if (current === null || (typeof current !== "object" && typeof current !== "function")) {
                return false;
            }
            if (!Object.prototype.hasOwnProperty.call(current, key)) return false;
            current = (current as Record<PropertyKey, unknown>)[key];
        }

        return true;
    }
    static clone<T>(value: T): T {
        if (value === null || typeof value !== "object") return value;
        if (Array.isArray(value)) return value.slice() as T;
        return Object.assign(Object.create(Object.getPrototypeOf(value)), value);
    }
    static deepClone<T>(value: T): T {
        return structuredClone(value);
    }
    static deepMerge<T extends object, U extends object>(target: T, source: U): T & U {
        const result = { ...target } as Record<PropertyKey, unknown>;

        for (const key of Reflect.ownKeys(source)) {
            const incoming = source[key as keyof U];
            const current = result[key];

            result[key] =
                this.isPlainObject(current) && this.isPlainObject(incoming)
                    ? this.deepMerge(
                        current as Record<PropertyKey, unknown>,
                        incoming as Record<PropertyKey, unknown>
                    )
                    : incoming;
        }

        return result as T & U;
    }
    static defaults<T extends object, U extends object>(target: T, defaults: U): T & U {
        return Object.assign({}, defaults, target) as T & U;
    }
    static getOrCreate<T extends object, K extends PropertyKey, X>(
        value: T,
        key: K,
        create: () => X
    ): T & Record<K, X> {
        const object = value as T & Record<K, X>;

        if (!Object.prototype.hasOwnProperty.call(object, key) || object[key] === undefined) {
            object[key] = create() as (T & Record<K, X>)[K];
        }

        return object;
    }
    static pick<T extends object, K extends keyof T>(value: T, keys: readonly K[]): Pick<T, K> {
        const result = {} as Pick<T, K>;

        for (const key of keys) {
            if (Object.prototype.hasOwnProperty.call(value, key)) result[key] = value[key];
        }

        return result;
    }
    static omit<T extends object, K extends keyof T>(value: T, keys: readonly K[]): Omit<T, K> {
        const result = { ...value };

        for (const key of keys) delete result[key];

        return result;
    }
    static pickBy<T extends object>(
        value: T,
        predicate: (value: T[keyof T], key: keyof T) => B
    ): Partial<T> {
        const result: Partial<T> = {};

        for (const key of Object.keys(value) as (keyof T)[]) {
            if (predicate(value[key], key)) result[key] = value[key];
        }

        return result;
    }
    static omitBy<T extends object>(
        value: T,
        predicate: (value: T[keyof T], key: keyof T) => B
    ): Partial<T> {
        const result: Partial<T> = {};

        for (const key of Object.keys(value) as (keyof T)[]) {
            if (!predicate(value[key], key)) result[key] = value[key];
        }

        return result;
    }
    static mapKeys<T extends object, K extends PropertyKey>(
        value: T,
        mapper: (key: keyof T, value: T[keyof T]) => K
    ): Partial<Record<K, T[keyof T]>> {
        const result: Partial<Record<K, T[keyof T]>> = {};

        for (const key of Object.keys(value) as (keyof T)[]) {
            result[mapper(key, value[key])] = value[key];
        }

        return result;
    }
    static mapValues<T extends object, X>(
        value: T,
        mapper: (value: T[keyof T], key: keyof T) => X
    ): { [K in keyof T]: X } {
        const result = {} as { [K in keyof T]: X };

        for (const key of Object.keys(value) as (keyof T)[]) {
            result[key] = mapper(value[key], key);
        }

        return result;
    }
    static mapEntries<T extends object, K extends PropertyKey, X>(
        value: T,
        mapper: (entry: [keyof T, T[keyof T]]) => readonly [K, X]
    ): Partial<Record<K, X>> {
        const result: Partial<Record<K, X>> = {};

        for (const key of Object.keys(value) as (keyof T)[]) {
            const [nextKey, nextValue] = mapper([key, value[key]]);
            result[nextKey] = nextValue;
        }

        return result;
    }
    static filter<T extends object>(
        value: T,
        predicate: (value: T[keyof T], key: keyof T) => B
    ): Partial<T> {
        return this.pickBy(value, predicate);
    }
    static isEqual(first: unknown, second: unknown): B {
        if (Object.is(first, second)) return true;

        if (
            first === null || second === null ||
            typeof first !== "object" || typeof second !== "object"
        ) {
            return false;
        }

        if (first instanceof Date && second instanceof Date) {
            return first.getTime() === second.getTime();
        }

        if (Array.isArray(first) || Array.isArray(second)) {
            return Array.isArray(first) && Array.isArray(second) &&
                first.length === second.length &&
                first.every((value, index) => this.isEqual(value, second[index]));
        }

        const firstKeys = Reflect.ownKeys(first);
        const secondKeys = Reflect.ownKeys(second);

        return firstKeys.length === secondKeys.length &&
            firstKeys.every(key =>
                secondKeys.includes(key) &&
                this.isEqual(
                    (first as Record<PropertyKey, unknown>)[key],
                    (second as Record<PropertyKey, unknown>)[key]
                )
            );
    }
    static isShallowEqual(first: object, second: object): B {
        if (Object.is(first, second)) return true;

        const firstKeys = Reflect.ownKeys(first);
        const secondKeys = Reflect.ownKeys(second);

        return firstKeys.length === secondKeys.length &&
            firstKeys.every(key =>
                secondKeys.includes(key) &&
                Object.is(
                    (first as Record<PropertyKey, unknown>)[key],
                    (second as Record<PropertyKey, unknown>)[key]
                )
            );
    }
    static hasAll<T extends object>(value: T, keys: readonly PropertyKey[]): B {
        return keys.every(key => Object.prototype.hasOwnProperty.call(value, key));
    }
    static hasAny<T extends object>(value: T, keys: readonly PropertyKey[]): B {
        return keys.some(key => Object.prototype.hasOwnProperty.call(value, key));
    }
    static assertKeys<T extends object>(value: T, keys: readonly PropertyKey[]): asserts value is T {
        const missing = keys.filter(key => !Object.prototype.hasOwnProperty.call(value, key));

        if (missing.length) {
            throw new TypeError(`Missing required keys: ${missing.map(String).join(", ")}`);
        }
    }
    static with<T extends object, K extends keyof T>(value: T, key: K, next: T[K]): T {
        return { ...value, [key]: next };
    }
    static without<T extends object, K extends keyof T>(value: T, key: K): Omit<T, K> {
        const result = { ...value };
        delete result[key];
        return result;
    }
    static update<T extends object, K extends keyof T>(
        value: T,
        key: K,
        updater: (current: T[K]) => T[K]
    ): T {
        return { ...value, [key]: updater(value[key]) };
    }
}

globalThis.O2 = O2I;
