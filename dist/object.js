export class O2I {
    static isEmpty(value) {
        return Reflect.ownKeys(value).length === 0;
    }
    static isNotEmpty(value) {
        return Reflect.ownKeys(value).length !== 0;
    }
    static size(value) {
        return Reflect.ownKeys(value).length;
    }
    static isPlainObject(value) {
        if (value === null || typeof value !== "object")
            return false;
        const prototype = Object.getPrototypeOf(value);
        return prototype === Object.prototype || prototype === null;
    }
    static isObject(value) {
        return value !== null && typeof value === "object";
    }
    static get(value, path, fallback) {
        const parts = typeof path === "string" ? path.split(".") : path;
        let current = value;
        for (const key of parts) {
            if (current === null || (typeof current !== "object" && typeof current !== "function")) {
                return fallback;
            }
            current = current[key];
        }
        return current === undefined ? fallback : current;
    }
    static getOr(value, path, fallback) {
        return this.get(value, path, fallback);
    }
    static set(value, path, next) {
        const parts = typeof path === "string" ? path.split(".") : path;
        if (!parts.length)
            return value;
        let current = value;
        for (let i = 0; i < parts.length - 1; i++) {
            const key = parts[i];
            const child = current[key];
            if (child === null || (typeof child !== "object" && typeof child !== "function")) {
                current[key] = {};
            }
            current = current[key];
        }
        current[parts[parts.length - 1]] = next;
        return value;
    }
    static unset(value, path) {
        const parts = typeof path === "string" ? path.split(".") : path;
        if (!parts.length)
            return false;
        let current = value;
        for (let i = 0; i < parts.length - 1; i++) {
            const child = current[parts[i]];
            if (child === null || typeof child !== "object")
                return false;
            current = child;
        }
        return Reflect.deleteProperty(current, parts[parts.length - 1]);
    }
    static hasPath(value, path) {
        const parts = typeof path === "string" ? path.split(".") : path;
        let current = value;
        for (const key of parts) {
            if (current === null || (typeof current !== "object" && typeof current !== "function")) {
                return false;
            }
            if (!Object.prototype.hasOwnProperty.call(current, key))
                return false;
            current = current[key];
        }
        return true;
    }
    static clone(value) {
        if (value === null || typeof value !== "object")
            return value;
        if (Array.isArray(value))
            return value.slice();
        return Object.assign(Object.create(Object.getPrototypeOf(value)), value);
    }
    static deepClone(value) {
        return structuredClone(value);
    }
    static deepMerge(target, source) {
        const result = { ...target };
        for (const key of Reflect.ownKeys(source)) {
            const incoming = source[key];
            const current = result[key];
            result[key] =
                this.isPlainObject(current) && this.isPlainObject(incoming)
                    ? this.deepMerge(current, incoming)
                    : incoming;
        }
        return result;
    }
    static defaults(target, defaults) {
        return Object.assign({}, defaults, target);
    }
    static getOrCreate(value, key, create) {
        const object = value;
        if (!Object.prototype.hasOwnProperty.call(object, key) || object[key] === undefined) {
            object[key] = create();
        }
        return object;
    }
    static pick(value, keys) {
        const result = {};
        for (const key of keys) {
            if (Object.prototype.hasOwnProperty.call(value, key))
                result[key] = value[key];
        }
        return result;
    }
    static omit(value, keys) {
        const result = { ...value };
        for (const key of keys)
            delete result[key];
        return result;
    }
    static pickBy(value, predicate) {
        const result = {};
        for (const key of Object.keys(value)) {
            if (predicate(value[key], key))
                result[key] = value[key];
        }
        return result;
    }
    static omitBy(value, predicate) {
        const result = {};
        for (const key of Object.keys(value)) {
            if (!predicate(value[key], key))
                result[key] = value[key];
        }
        return result;
    }
    static mapKeys(value, mapper) {
        const result = {};
        for (const key of Object.keys(value)) {
            result[mapper(key, value[key])] = value[key];
        }
        return result;
    }
    static mapValues(value, mapper) {
        const result = {};
        for (const key of Object.keys(value)) {
            result[key] = mapper(value[key], key);
        }
        return result;
    }
    static mapEntries(value, mapper) {
        const result = {};
        for (const key of Object.keys(value)) {
            const [nextKey, nextValue] = mapper([key, value[key]]);
            result[nextKey] = nextValue;
        }
        return result;
    }
    static filter(value, predicate) {
        return this.pickBy(value, predicate);
    }
    static isEqual(first, second) {
        if (Object.is(first, second))
            return true;
        if (first === null || second === null ||
            typeof first !== "object" || typeof second !== "object") {
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
            firstKeys.every(key => secondKeys.includes(key) &&
                this.isEqual(first[key], second[key]));
    }
    static isShallowEqual(first, second) {
        if (Object.is(first, second))
            return true;
        const firstKeys = Reflect.ownKeys(first);
        const secondKeys = Reflect.ownKeys(second);
        return firstKeys.length === secondKeys.length &&
            firstKeys.every(key => secondKeys.includes(key) &&
                Object.is(first[key], second[key]));
    }
    static hasAll(value, keys) {
        return keys.every(key => Object.prototype.hasOwnProperty.call(value, key));
    }
    static hasAny(value, keys) {
        return keys.some(key => Object.prototype.hasOwnProperty.call(value, key));
    }
    static assertKeys(value, keys) {
        const missing = keys.filter(key => !Object.prototype.hasOwnProperty.call(value, key));
        if (missing.length) {
            throw new TypeError(`Missing required keys: ${missing.map(String).join(", ")}`);
        }
    }
    static with(value, key, next) {
        return { ...value, [key]: next };
    }
    static without(value, key) {
        const result = { ...value };
        delete result[key];
        return result;
    }
    static update(value, key, updater) {
        return { ...value, [key]: updater(value[key]) };
    }
}
globalThis.O2 = O2I;
