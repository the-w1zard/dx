export const TAG = { UNDEFINED: 0, NULL: 1, FALSE: 2, TRUE: 3, INT32: 4, FLOAT64: 5, STRING: 6, ARRAY: 7, OBJECT: 8, UINT8ARRAY: 9, REF: 10 };
export class BEAM_CODEC {
    /*  =============================================================================
         Encodes ordinary JavaScript values into a collider-owned byte slab.
      ================================= ⇦✦──⇦✦──✦──✦──←'pew pew' 🧙 [BINARY_CODEC] */
    bytes;
    view;
    tail = 0;
    strings = new Map();
    stringBytes = [];
    refs = new Map();
    nextRef = 0;
    constructor(initialCapacity = 1 << 16) {
        this.bytes = new Uint8Array(initialCapacity);
        this.view = new DataView(this.bytes.buffer);
    }
    encode(value) {
        this.tail = 0;
        this.strings.clear();
        this.stringBytes.length = 0;
        this.refs.clear();
        this.nextRef = 0;
        this.writeValue(value);
        return this.bytes.subarray(0, this.tail);
    }
    /* HC_BINARY_CODEC */
    decode(binary) {
        const savedBytes = this.bytes;
        const savedView = this.view;
        const savedTail = this.tail;
        try {
            this.bytes = binary;
            this.view = new DataView(binary.buffer, binary.byteOffset, binary.byteLength);
            this.tail = binary.length;
            this.refs.clear();
            this.nextRef = 0;
            const cursor = { at: 0 };
            return this.readValue(cursor);
        }
        finally {
            // Restore the encode-side buffer so the next encode()
            // never writes into the disruptor pool.
            this.bytes = savedBytes;
            this.view = savedView;
            this.tail = savedTail;
        }
    }
    need(count) {
        if (this.tail + count <= this.bytes.length)
            return;
        let size = this.bytes.length;
        while (size < this.tail + count)
            size *= 2;
        const next = new Uint8Array(size);
        next.set(this.bytes);
        this.bytes = next;
        this.view = new DataView(next.buffer);
    }
    u8(value) {
        this.need(1);
        this.bytes[this.tail++] = value;
    }
    i32(value) {
        this.need(4);
        this.view.setInt32(this.tail, value, true);
        this.tail += 4;
    }
    f64(value) {
        this.need(8);
        this.view.setFloat64(this.tail, value, true);
        this.tail += 8;
    }
    writeValue(value) {
        if (value === undefined)
            return this.u8(TAG.UNDEFINED);
        if (value === null)
            return this.u8(TAG.NULL);
        if (value === false)
            return this.u8(TAG.FALSE);
        if (value === true)
            return this.u8(TAG.TRUE);
        const type = typeof value;
        if (type === "number") {
            const n = value;
            if (Number.isSafeInteger(n) && n >= -2147483648 && n <= 2147483647) {
                this.u8(TAG.INT32);
                return this.i32(n);
            }
            this.u8(TAG.FLOAT64);
            return this.f64(n);
        }
        if (type === "string") {
            return this.writeString(value);
        }
        if (Array.isArray(value)) {
            return this.writeArray(value);
        }
        if (value instanceof Uint8Array) {
            return this.writeBytes(value);
        }
        if (type === "object") {
            return this.writeObject(value);
        }
        throw new Error(`HC_BINARY_CODEC: unsupported value type: ${type}`);
    }
    writeString(value) {
        const encoded = new TextEncoder().encode(value);
        this.u8(TAG.STRING);
        this.i32(encoded.length);
        this.need(encoded.length);
        this.bytes.set(encoded, this.tail);
        this.tail += encoded.length;
    }
    writeArray(value) {
        const ref = this.beginRef(value);
        this.u8(TAG.ARRAY);
        this.i32(value.length);
        for (let i = 0; i < value.length; i++) {
            this.writeValue(value[i]);
        }
        this.endRef(ref);
    }
    writeBytes(value) {
        this.u8(TAG.UINT8ARRAY);
        this.i32(value.length);
        this.need(value.length);
        this.bytes.set(value, this.tail);
        this.tail += value.length;
    }
    writeObject(value) {
        const ref = this.beginRef(value);
        const keys = Object.keys(value);
        this.u8(TAG.OBJECT);
        this.i32(keys.length);
        for (const key of keys) {
            this.writeString(key);
            this.writeValue(value[key]);
        }
        this.endRef(ref);
    }
    beginRef(value) {
        const existing = this.refs.get(value);
        if (existing !== undefined) {
            this.u8(TAG.REF);
            this.i32(existing);
            return -1;
        }
        const ref = this.nextRef++;
        this.refs.set(value, ref);
        return ref;
    }
    endRef(ref) {
        // Reserved for future back-reference patching.
        void ref;
    }
    readU8(cursor) {
        return this.bytes[cursor.at++];
    }
    readI32(cursor) {
        const value = this.view.getInt32(cursor.at, true);
        cursor.at += 4;
        return value;
    }
    readF64(cursor) {
        const value = this.view.getFloat64(cursor.at, true);
        cursor.at += 8;
        return value;
    }
    readValue(cursor) {
        const tag = this.readU8(cursor);
        switch (tag) {
            case TAG.UNDEFINED:
                return undefined;
            case TAG.NULL:
                return null;
            case TAG.FALSE:
                return false;
            case TAG.TRUE:
                return true;
            case TAG.INT32:
                return this.readI32(cursor);
            case TAG.FLOAT64:
                return this.readF64(cursor);
            case TAG.STRING:
                return this.readString(cursor);
            case TAG.ARRAY:
                return this.readArray(cursor);
            case TAG.OBJECT:
                return this.readObject(cursor);
            case TAG.UINT8ARRAY:
                return this.readBytes(cursor);
            default:
                throw new Error(`HC_BINARY_CODEC: unknown tag ${tag}`);
        }
    }
    readString(cursor) {
        const length = this.readI32(cursor);
        const bytes = this.bytes.subarray(cursor.at, cursor.at + length);
        cursor.at += length;
        return new TextDecoder().decode(bytes);
    }
    readArray(cursor) {
        const length = this.readI32(cursor);
        const out = new Array(length);
        for (let i = 0; i < length; i++) {
            out[i] = this.readValue(cursor);
        }
        return out;
    }
    readObject(cursor) {
        const length = this.readI32(cursor);
        const out = {};
        for (let i = 0; i < length; i++) {
            const key = this.readString(cursor);
            out[key] = this.readValue(cursor);
        }
        return out;
    }
    readBytes(cursor) {
        const length = this.readI32(cursor);
        const out = this.bytes.slice(cursor.at, cursor.at + length);
        cursor.at += length;
        return out;
    }
}
