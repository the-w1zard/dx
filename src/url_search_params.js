export class USP2I extends URLSearchParams {
    constructor(init) {
        super(init);
    }
    get size() {
        return Array.from(this).length;
    }
    getOr(name, fallback) {
        return this.get(name) ?? fallback;
    }
    getOrNull(name) {
        return this.get(name);
    }
    getOrThrow(name, error = new Error(`Missing URL parameter: ${name}`)) {
        const value = this.get(name);
        if (value === null)
            throw error;
        return value;
    }
    getNumber(name, fallback) {
        const value = this.get(name);
        if (value === null || value.trim() === "")
            return fallback;
        const number = Number(value);
        return Number.isFinite(number) ? number : fallback;
    }
    getInt(name, radix = 10) {
        const value = this.get(name);
        if (value === null || value.trim() === "")
            return undefined;
        const number = Number.parseInt(value, radix);
        return Number.isNaN(number) ? undefined : number;
    }
    getFloat(name) {
        const value = this.get(name);
        if (value === null || value.trim() === "")
            return undefined;
        const number = Number.parseFloat(value);
        return Number.isNaN(number) ? undefined : number;
    }
    getBoolean(name, fallback = false) {
        const value = this.get(name);
        if (value === null)
            return fallback;
        switch (value.trim().toLowerCase()) {
            case "true":
            case "1":
            case "yes":
            case "on":
                return true;
            case "false":
            case "0":
            case "no":
            case "off":
                return false;
            default:
                return fallback;
        }
    }
    getJSON(name) {
        const value = this.get(name);
        if (value === null)
            return undefined;
        try {
            return JSON.parse(value);
        }
        catch {
            return undefined;
        }
    }
    getArray(name, separator = ",") {
        const value = this.get(name);
        return value === null || value === "" ? [] : value.split(separator);
    }
    getObject() {
        const result = {};
        for (const key of new Set(this.keys())) {
            const values = this.getAll(key);
            result[key] = values.length > 1 ? values : values[0];
        }
        return result;
    }
    setNumber(name, value) {
        this.set(name, String(value));
        return this;
    }
    setBoolean(name, value) {
        this.set(name, String(value));
        return this;
    }
    setJSON(name, value) {
        this.set(name, JSON.stringify(value));
        return this;
    }
    setArray(name, values, separator = ",") {
        this.set(name, Array.from(values, String).join(separator));
        return this;
    }
    setIfAbsent(name, value) {
        if (!this.has(name))
            this.set(name, value);
        return this;
    }
    setIfPresent(name, value) {
        if (this.has(name))
            this.set(name, value);
        return this;
    }
    appendAll(params) {
        if (params instanceof URLSearchParams) {
            params.forEach((value, key) => this.append(key, value));
        }
        else {
            for (const [key, value] of Object.entries(params)) {
                if (value != null) {
                    if (Array.isArray(value)) {
                        for (const item of value)
                            this.append(key, String(item));
                    }
                    else {
                        this.append(key, String(value));
                    }
                }
            }
        }
        return this;
    }
    merge(params, overwrite = true) {
        if (params instanceof URLSearchParams) {
            params.forEach((value, key) => {
                if (overwrite || !this.has(key))
                    this.set(key, value);
            });
        }
        else {
            for (const [key, value] of Object.entries(params)) {
                if (value != null && (overwrite || !this.has(key))) {
                    this.set(key, String(value));
                }
            }
        }
        return this;
    }
    clone() {
        return new USP2I(this);
    }
    clear() {
        for (const key of new Set(this.keys()))
            this.delete(key);
    }
    isEmpty() {
        return this.size === 0;
    }
    isNotEmpty() {
        return this.size > 0;
    }
    toObject() {
        return this.getObject();
    }
    toJSON() {
        return this.toObject();
    }
    toURLSearchParams() {
        return new URLSearchParams(this);
    }
    toURL(url) {
        const result = new URL(url);
        this.forEach((value, key) => result.searchParams.append(key, value));
        return result;
    }
}
globalThis.USP2 = USP2I;
