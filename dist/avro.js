export class AVROWriter {
    buf = new Uint8Array(256);
    pos = 0;
    ensure(length) {
        if (this.pos + length <= this.buf.length)
            return this;
        let size = this.buf.length;
        while (size < this.pos + length)
            size *= 2;
        const next = new Uint8Array(size);
        next.set(this.buf);
        this.buf = next;
        return this;
    }
    get offset() { return this.pos; }
    byte = (v) => { this.ensure(1); this.buf[this.pos++] = v; return this; };
    bytes = (v) => { this.ensure(v.length); this.buf.set(v, this.pos); this.pos += v.length; return this; };
    long = (value) => {
        let n = BigInt(value);
        if (n < -(1n << 63n) || n > (1n << 63n) - 1n)
            throw new Error("Avro: long out of range");
        n = n >= 0n ? n << 1n : ((-n) << 1n) - 1n;
        while (n >= 0x80n) {
            this.byte(Number(n & 0x7fn) | 0x80);
            n >>= 7n;
        }
        this.byte(Number(n));
        return this;
    };
    int = (value) => {
        if (!Number.isInteger(value) || value < -2147483648 || value > 2147483647)
            throw new Error("Avro: int out of range");
        this.long(value);
        return this;
    };
    float = (value) => { this.ensure(4); new DataView(this.buf.buffer).setFloat32(this.pos, value, true); this.pos += 4; return this; };
    double = (value) => { this.ensure(8); new DataView(this.buf.buffer).setFloat64(this.pos, value, true); this.pos += 8; return this; };
    finish = () => this.buf.slice(0, this.pos);
}
export class AVROReader {
    buf;
    pos = 0;
    view;
    constructor(buf) {
        this.buf = buf;
        this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    ensure(length) {
        if (length < 0 || this.pos + length > this.buf.length)
            throw new Error("Avro: truncated buffer");
    }
    byte() {
        this.ensure(1);
        return this.buf[this.pos++];
    }
    bytes(length) {
        this.ensure(length);
        const out = this.buf.slice(this.pos, this.pos + length);
        this.pos += length;
        return out;
    }
    long() {
        let n = 0n;
        let shift = 0n;
        for (let i = 0; i < 10; i++) {
            const b = this.byte();
            n |= BigInt(b & 0x7f) << shift;
            if ((b & 0x80) === 0) {
                const value = (n & 1n) === 0n ? n >> 1n : -((n >> 1n) + 1n);
                return value >= BigInt(Number.MIN_SAFE_INTEGER) && value <= BigInt(Number.MAX_SAFE_INTEGER)
                    ? Number(value)
                    : value;
            }
            shift += 7n;
        }
        throw new Error("Avro: invalid long");
    }
    int() {
        const n = this.long();
        if (typeof n === "bigint" || n < -2147483648 || n > 2147483647)
            throw new Error("Avro: invalid int");
        return n;
    }
    float() {
        this.ensure(4);
        const n = this.view.getFloat32(this.pos, true);
        this.pos += 4;
        return n;
    }
    double() {
        this.ensure(8);
        const n = this.view.getFloat64(this.pos, true);
        this.pos += 8;
        return n;
    }
    done() { return this.pos === this.buf.length; }
}
export const AVRO_ERROR_SCHEMA = {
    type: "record",
    name: "AVROError",
    fields: [
        { name: "type", type: "string" },
        { name: "error", type: "string" },
        { name: "id", type: "string" },
    ],
};
export class BINARY_AVRO {
    encoder = new TextEncoder();
    decoder = new TextDecoder();
    schema;
    names = Object.create(null);
    errorSchema = AVRO_ERROR_SCHEMA;
    wireSchema;
    constructor(schema) {
        if (Array.isArray(schema))
            throw new Error("Avro: root schema cannot be a union");
        this.schema = schema;
        this.wireSchema = [schema, this.errorSchema];
        this.#collect(schema);
        this.#collect(this.errorSchema);
    }
    #collect(schema) {
        if (Array.isArray(schema)) {
            for (const branch of schema)
                this.#collect(branch);
            return;
        }
        if (typeof schema === "string")
            return;
        if (schema.name)
            this.names[schema.name] = schema;
        if (Array.isArray(schema.type))
            this.#collect(schema.type);
        else if (typeof schema.type === "object")
            this.#collect(schema.type);
        else if (typeof schema.type === "string" && ![
            "null", "boolean", "int", "long", "float", "double",
            "bytes", "string", "record", "array", "map", "enum", "fixed",
        ].includes(schema.type)) {
            if (!this.names[schema.type])
                throw new Error(`Avro: unknown named type ${schema.type}`);
        }
        if (schema.fields)
            for (const field of schema.fields)
                this.#collect(field.type);
        if (schema.items)
            this.#collect(schema.items);
        if (schema.values)
            this.#collect(schema.values);
    }
    #resolve(schema) {
        if (typeof schema === "string" && this.names[schema])
            return this.names[schema];
        return schema;
    }
    #kind(schema) {
        schema = this.#resolve(schema);
        if (typeof schema === "string")
            return schema;
        if (Array.isArray(schema))
            return "union";
        return typeof schema.type === "string" ? schema.type : this.#kind(schema.type);
    }
    #matches(schema, value) {
        schema = this.#resolve(schema);
        const kind = this.#kind(schema);
        switch (kind) {
            case "null": return value === null || value === undefined;
            case "boolean": return typeof value === "boolean";
            case "int": return typeof value === "number" && Number.isInteger(value) && value >= -2147483648 && value <= 2147483647;
            case "long": return typeof value === "bigint" || (typeof value === "number" && Number.isSafeInteger(value));
            case "float":
            case "double": return typeof value === "number";
            case "string": return typeof value === "string";
            case "bytes":
            case "fixed": return value instanceof Uint8Array && (kind !== "fixed" || value.length === schema.size);
            case "array": return Array.isArray(value);
            case "map": return value !== null && typeof value === "object" && !Array.isArray(value) && !(value instanceof Uint8Array);
            case "record": return value !== null && typeof value === "object" && !Array.isArray(value) && !(value instanceof Uint8Array);
            case "enum": return typeof value === "string" && schema.symbols.includes(value);
            default: return false;
        }
    }
    #write(w, schema, value) {
        schema = this.#resolve(schema);
        if (Array.isArray(schema)) {
            const index = schema.findIndex(branch => this.#matches(branch, value));
            if (index === -1)
                throw new Error("Avro: no matching union branch");
            w.long(index);
            this.#write(w, schema[index], value);
            return;
        }
        if (typeof schema === "string") {
            switch (schema) {
                case "null": return;
                case "boolean":
                    w.byte(value ? 1 : 0);
                    return;
                case "int":
                    w.int(value);
                    return;
                case "long":
                    w.long(value);
                    return;
                case "float":
                    w.float(value);
                    return;
                case "double":
                    w.double(value);
                    return;
                case "string": {
                    const bytes = this.encoder.encode(value);
                    w.long(bytes.length);
                    w.bytes(bytes);
                    return;
                }
                case "bytes": {
                    w.long(value.length);
                    w.bytes(value);
                    return;
                }
                default: throw new Error(`Avro: unknown type ${schema}`);
            }
        }
        if (typeof schema.type !== "string") {
            this.#write(w, schema.type, value);
            return;
        }
        switch (schema.type) {
            case "null": return;
            case "boolean":
                w.byte(value ? 1 : 0);
                return;
            case "int":
                w.int(value);
                return;
            case "long":
                w.long(value);
                return;
            case "float":
                w.float(value);
                return;
            case "double":
                w.double(value);
                return;
            case "string": {
                const bytes = this.encoder.encode(value);
                w.long(bytes.length);
                w.bytes(bytes);
                return;
            }
            case "bytes":
                w.long(value.length);
                w.bytes(value);
                return;
            case "fixed":
                if (!(value instanceof Uint8Array) || value.length !== schema.size)
                    throw new Error("Avro: invalid fixed value");
                w.bytes(value);
                return;
            case "enum": {
                const index = schema.symbols.indexOf(value);
                if (index < 0)
                    throw new Error(`Avro: invalid enum symbol ${value}`);
                w.long(index);
                return;
            }
            case "record":
                for (const field of schema.fields) {
                    if (value[field.name] === undefined && !Array.isArray(field.type))
                        throw new Error(`Avro: missing field ${field.name}`);
                    this.#write(w, field.type, value[field.name]);
                }
                return;
            case "array":
                if (value.length) {
                    w.long(value.length);
                    for (const item of value)
                        this.#write(w, schema.items, item);
                }
                w.long(0);
                return;
            case "map": {
                const keys = Object.keys(value);
                if (keys.length) {
                    w.long(keys.length);
                    for (const key of keys) {
                        this.#write(w, "string", key);
                        this.#write(w, schema.values, value[key]);
                    }
                }
                w.long(0);
                return;
            }
            default:
                throw new Error(`Avro: unsupported schema type ${schema.type}`);
        }
    }
    #read(r, schema) {
        schema = this.#resolve(schema);
        if (Array.isArray(schema)) {
            const index = r.long();
            if (typeof index !== "number" || index < 0 || index >= schema.length)
                throw new Error("Avro: invalid union index");
            return this.#read(r, schema[index]);
        }
        if (typeof schema === "string") {
            switch (schema) {
                case "null": return null;
                case "boolean": {
                    const b = r.byte();
                    if (b > 1)
                        throw new Error("Avro: invalid boolean");
                    return b === 1;
                }
                case "int": return r.int();
                case "long": return r.long();
                case "float": return r.float();
                case "double": return r.double();
                case "string": return this.decoder.decode(r.bytes(Number(r.long())));
                case "bytes": return r.bytes(Number(r.long()));
                default: throw new Error(`Avro: unknown type ${schema}`);
            }
        }
        if (typeof schema.type !== "string")
            return this.#read(r, schema.type);
        switch (schema.type) {
            case "null": return null;
            case "boolean": {
                const b = r.byte();
                if (b > 1)
                    throw new Error("Avro: invalid boolean");
                return b === 1;
            }
            case "int": return r.int();
            case "long": return r.long();
            case "float": return r.float();
            case "double": return r.double();
            case "string": return this.decoder.decode(r.bytes(Number(r.long())));
            case "bytes": return r.bytes(Number(r.long()));
            case "fixed": return r.bytes(schema.size);
            case "enum": {
                const index = r.long();
                if (typeof index !== "number" || index < 0 || index >= schema.symbols.length)
                    throw new Error("Avro: invalid enum index");
                return schema.symbols[index];
            }
            case "record": {
                const out = {};
                for (const field of schema.fields)
                    out[field.name] = this.#read(r, field.type);
                return out;
            }
            case "array": {
                const out = [];
                let count;
                while ((count = r.long()) !== 0) {
                    if (typeof count === "bigint")
                        throw new Error("Avro: array block too large");
                    if (count < 0) {
                        count = -count;
                        const blockSize = r.long();
                        if (typeof blockSize !== "number" || blockSize < 0)
                            throw new Error("Avro: invalid array block");
                    }
                    for (let i = 0; i < count; i++)
                        out.push(this.#read(r, schema.items));
                }
                return out;
            }
            case "map": {
                const out = {};
                let count;
                while ((count = r.long()) !== 0) {
                    if (typeof count === "bigint")
                        throw new Error("Avro: map block too large");
                    if (count < 0) {
                        count = -count;
                        const blockSize = r.long();
                        if (typeof blockSize !== "number" || blockSize < 0)
                            throw new Error("Avro: invalid map block");
                    }
                    for (let i = 0; i < count; i++) {
                        const key = this.#read(r, "string");
                        out[key] = this.#read(r, schema.values);
                    }
                }
                return out;
            }
            default:
                throw new Error(`Avro: unsupported schema type ${schema.type}`);
        }
    }
    #encode(value, branch) {
        const w = new AVROWriter();
        w.long(branch);
        this.#write(w, this.wireSchema[branch], value);
        return w.finish();
    }
    #decode(bytes) {
        const r = new AVROReader(bytes);
        const branch = r.long();
        if (typeof branch !== "number" || branch < 0 || branch >= this.wireSchema.length)
            throw new Error("Avro: invalid envelope branch");
        const value = this.#read(r, this.wireSchema[branch]);
        if (!r.done())
            throw new Error("Avro: trailing bytes");
        return value;
    }
    encode_msg(msg) {
        if (msg instanceof Uint8Array)
            return msg;
        try {
            return this.#encode(msg, 0);
        }
        catch (err) {
            console.log("[AVRO_PIPE] Failed to encode outbound packet:", err);
            return this.#encode({
                type: "error",
                error: err instanceof Error ? err.message : "Encoding failed",
                id: String(msg?.id ?? "unknown"),
            }, 1);
        }
    }
    decode_msg(raw) {
        if (!(raw instanceof Uint8Array) && !isBuffer(raw)) {
            console.error("[AVRO_PIPE] Protocol violation: Expected encoded Uint8Array data stream.");
            return null;
        }
        try {
            const bytes = raw instanceof Uint8Array
                ? raw
                : new Uint8Array(raw.buffer, raw.byteOffset, raw.byteLength);
            return this.#decode(bytes);
        }
        catch (err) {
            console.error("[AVRO_PIPE] Failed to decode inbound packet:", err);
            return null;
        }
    }
}
function isBuffer(x) {
    return typeof Buffer !== "undefined" && Buffer.isBuffer(x);
}
export const AVROI = new BINARY_AVRO({
    type: "record",
    name: "SITHMessage",
    fields: [
        { name: "pid", type: "int" },
        { name: "op", type: "int" },
        { name: "value", type: ["null", "double"] },
        { name: "payload", type: ["null", "bytes"] },
    ],
});
