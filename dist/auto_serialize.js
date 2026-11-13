export const SKIP = Symbol('ser:skip');
const DEFAULT_CONFIG = {
    date: true, bigint: true, regexp: true, error: true, specialNumber: true,
    undefined: true, typedArray: true, url: true, map: true, set: true,
    array: true, object: true, string: true, number: true, boolean: true,
};
const TYPED_ARRAY_NAMES = new Set([
    'Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array',
    'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array', 'BigInt64Array', 'BigUint64Array',
]);
// ---------- serializer ----------
class SERI {
    config;
    customEncoder;
    constructor(config = {}, customEncoder) {
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.customEncoder = customEncoder;
    }
    encodeJSONEnvelope(envelope) {
        return new TextEncoder().encode(JSON.stringify(envelope));
    }
    ser(value) {
        return JSON.stringify(this._encode(value));
    }
    _encode(value) {
        if (this.customEncoder) {
            const custom = this.customEncoder(value, v => this._encode(v));
            if (custom !== SKIP)
                return { __type: custom.type, value: custom.value };
        }
        if (value === null)
            return null;
        if (value === undefined) {
            return this.config.undefined ? { __type: 'Undefined' } : undefined;
        }
        const t = typeof value;
        if (t === 'bigint') {
            return this.config.bigint
                ? { __type: 'BigInt', value: value.toString() }
                : value.toString();
        }
        if (t === 'number') {
            if (!Number.isFinite(value)) {
                return this.config.specialNumber
                    ? { __type: 'SpecialNumber', value: Number.isNaN(value) ? 'NaN' : value > 0 ? 'Infinity' : '-Infinity' }
                    : null;
            }
            return this.config.number ? { __type: 'Primitive', value } : value;
        }
        if (t === 'string')
            return this.config.string ? { __type: 'Primitive', value } : value;
        if (t === 'boolean')
            return this.config.boolean ? { __type: 'Primitive', value } : value;
        if (value instanceof Date) {
            return this.config.date ? { __type: 'Date', value: value.toISOString() } : value.toISOString();
        }
        if (value instanceof RegExp) {
            return this.config.regexp
                ? { __type: 'RegExp', value: { source: value.source, flags: value.flags } }
                : value.toString();
        }
        if (value instanceof Error) {
            return this.config.error
                ? { __type: 'Error', value: { name: value.name, message: value.message, stack: value.stack } }
                : value.message;
        }
        if (value instanceof URL) {
            return this.config.url ? { __type: 'URL', value: value.href } : value.href;
        }
        if (ArrayBuffer.isView(value) && TYPED_ARRAY_NAMES.has(value.constructor.name)) {
            if (!this.config.typedArray)
                return undefined; // no lossless native fallback
            const view = value;
            const bytes = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
            let binary = '';
            for (let i = 0; i < bytes.length; i++)
                binary += String.fromCharCode(bytes[i]);
            return { __type: value.constructor.name, value: btoa(binary) };
        }
        if (value instanceof Map) {
            const entries = Array.from(value.entries()).map(([k, v]) => [this._encode(k), this._encode(v)]);
            return this.config.map ? { __type: 'Map', value: entries } : Object.fromEntries(entries);
        }
        if (value instanceof Set) {
            const items = Array.from(value.values()).map(v => this._encode(v));
            return this.config.set ? { __type: 'Set', value: items } : items;
        }
        if (Array.isArray(value)) {
            const items = value.map(v => this._encode(v));
            return this.config.array ? { __type: 'Array', value: items } : items;
        }
        if (t === 'object') {
            const obj = {};
            for (const [k, v] of Object.entries(value))
                obj[k] = this._encode(v);
            return this.config.object ? { __type: 'Object', value: obj } : obj;
        }
        return value; // functions/symbols — unsupported, same as native JSON
    }
}
export { SERI };
export const ser = new SERI();
// ---------- deserializer ----------
class DESERI {
    config;
    customDecoder;
    constructor(config = {}, customDecoder) {
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.customDecoder = customDecoder;
    }
    decodeJSONEnvelope(bytes) {
        return JSON.parse(new TextDecoder().decode(bytes));
    }
    deser(raw) {
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        return this._decode(parsed);
    }
    _decode(parsed) {
        if (parsed === null || parsed === undefined)
            return parsed;
        if (typeof parsed === 'object' && '__type' in parsed) {
            const { __type: type, value } = parsed;
            if (this.customDecoder) {
                const custom = this.customDecoder(type, value, v => this._decode(v));
                if (custom !== SKIP)
                    return custom;
            }
            switch (type) {
                case 'Undefined': return undefined;
                case 'BigInt': return BigInt(value);
                case 'SpecialNumber':
                    return value === 'NaN' ? NaN : value === 'Infinity' ? Infinity : -Infinity;
                case 'Date': return new Date(value);
                case 'RegExp': {
                    const v = value;
                    return new RegExp(v.source, v.flags);
                }
                case 'Error': {
                    const v = value;
                    const e = new Error(v.message);
                    e.name = v.name;
                    e.stack = v.stack;
                    return e;
                }
                case 'URL': return new URL(value);
                case 'Map': return new Map(value.map(([k, v]) => [this._decode(k), this._decode(v)]));
                case 'Set': return new Set(value.map(v => this._decode(v)));
                case 'Array': return value.map(v => this._decode(v));
                case 'Object': {
                    const obj = {};
                    for (const [k, v] of Object.entries(value))
                        obj[k] = this._decode(v);
                    return obj;
                }
                case 'Primitive': return value;
                default: {
                    if (TYPED_ARRAY_NAMES.has(type)) {
                        const binary = atob(value);
                        const bytes = new Uint8Array(binary.length);
                        for (let i = 0; i < binary.length; i++)
                            bytes[i] = binary.charCodeAt(i);
                        const Ctor = globalThis[type];
                        return new Ctor(bytes.buffer);
                    }
                    return parsed; // unrecognized tag — hand back untouched
                }
            }
        }
        if (Array.isArray(parsed))
            return parsed.map(v => this._decode(v));
        if (typeof parsed === 'object') {
            const obj = {};
            for (const [k, v] of Object.entries(parsed))
                obj[k] = this._decode(v);
            return obj;
        }
        return parsed;
    }
}
export { DESERI };
export const deser = new DESERI();
/**
const usersEncoder: CustomEncoder = (value, encodeChild) => {
 if (value instanceof User) {
   return { type: 'User', value: { id: value.id, name: encodeChild(value.name) } };
 }
 return SKIP; // not mine, let the built-ins handle it
};

const usersDecoder: CustomDecoder = (type, value, decodeChild) => {
 if (type === 'User') return new User(value.id, decodeChild(value.name));
 return SKIP;
};

export const ser = new SERI({ date: false, string: false, set: false, array: false }, usersEncoder);
export const deser = new DESERI({ date: false, string: false, set: false, array: false }, usersDecoder); */
