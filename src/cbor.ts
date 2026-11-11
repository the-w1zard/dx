type CBORValue = UD | NU | B | N | S | U8 | CBORValue[] | { [k: S]: CBORValue }


export class CBORI {
    private readonly encoder = new TextEncoder()
    private readonly decoder = new TextDecoder()
    private ensureAvailable(buf: U8, pos: N, length: N): V { if (pos < 0 || length < 0 || pos + length > buf.length) throw new Error("CBOR: truncated buffer") }
    private readUint(buf: U8, pos: N): [N, N] {
      this.ensureAvailable(buf, pos, 1)
      const info = buf[pos] & 0x1f
      if (info <= 23) return [info, pos + 1]
      if (info === 24) { this.ensureAvailable(buf, pos + 1, 1); return [buf[pos + 1], pos + 2] }
      if (info === 25) { this.ensureAvailable(buf, pos + 1, 2); return [new DataView(buf.buffer, buf.byteOffset + pos + 1, 2).getUint16(0, false), pos + 3]; }
      if (info === 26) { this.ensureAvailable(buf, pos + 1, 4); return [new DataView(buf.buffer, buf.byteOffset + pos + 1, 4).getUint32(0, false), pos + 5]; }
      if (info === 27) {
        this.ensureAvailable(buf, pos + 1, 8)
        const value = new DataView(buf.buffer, buf.byteOffset + pos + 1, 8).getBigUint64(0, false)
        if (value > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error("CBOR: integer exceeds Number.MAX_SAFE_INTEGER")
        return [Number(value), pos + 9]
      }; throw new Error(`CBOR: unsupported additional info ${info}`)
    }
    private encodeUint64(majorShifted: N, n: BI): U8 {
      if (n <= 23n) return new Uint8Array([majorShifted | Number(n)])
      if (n <= 0xffn) { return new Uint8Array([majorShifted | 24, Number(n)]) }
      if (n <= 0xffffn) {
        const b = new Uint8Array(3)
        b[0] = majorShifted | 25
        new DataView(b.buffer).setUint16(1, Number(n), false)
        return b
      }
      if (n <= 0xffffffffn) {
        const b = new Uint8Array(5)
        b[0] = majorShifted | 26
        new DataView(b.buffer).setUint32(1, Number(n), false)
        return b
      }
      const b = new Uint8Array(9)
      b[0] = majorShifted | 27
      new DataView(b.buffer).setBigUint64(1, n, false)
      return b
    }
    private encode(value: CBORValue): U8 {
      const parts: U8[] = []
      this.encodeValue(value, parts)
      const total = parts.reduce((n, p) => n + p.length, 0)
      const out = new Uint8Array(total)
      let offset = 0
      for (const p of parts) { out.set(p, offset); offset += p.length }
      return out
    }
    private encodeValue(v: CBORValue, out: U8[]): V {
      if (v === null) { out.push(new Uint8Array([0xf6])); return; }
      if (v === undefined) { out.push(new Uint8Array([0xf7])); return; }
      if (v === true) { out.push(new Uint8Array([0xf5])); return }
      if (v === false) { out.push(new Uint8Array([0xf4])); return }
  
      if (typeof v === 'number') {
        if (Number.isSafeInteger(v)) {
          if (v >= 0) out.push(this.encodeUint64(0x00, BigInt(v)))
          else out.push(this.encodeUint64(0x20, BigInt(-1 - v)))
        } else {
          const b = new Uint8Array(9)
          b[0] = 0xfb
          new DataView(b.buffer).setFloat64(1, v, false)
          out.push(b)
        }
        return
      }
  
      if (typeof v === 'string') { const encoded = this.encoder.encode(v); out.push(this.encodeUint(0x60, encoded.length)); out.push(encoded); return; }
      if (v instanceof Uint8Array) { out.push(this.encodeUint(0x40, v.length)); out.push(v); return; }
      if (Array.isArray(v)) {
        out.push(this.encodeUint(0x80, v.length));
        for (const item of v) { this.encodeValue(item, out); }
        return;
      }
      if (typeof v === 'object') {
        const proto = Object.getPrototypeOf(v)
        if (proto !== Object.prototype && proto !== null) throw new Error(`CBOR: unsupported object type ${v.constructor?.name ?? "unknown"}`)
        const keys = Object.keys(v)
        out.push(this.encodeUint(0xa0, keys.length))
        for (const key of keys) { this.encodeValue(key, out); this.encodeValue(v[key], out); }
        return
      }; throw new Error(`CBOR: unsupported value type ${typeof v}`)
    }
    private encodeUint(majorShifted: N, n: N): U8 {
      if (n <= 23) return new Uint8Array([majorShifted | n]);
      if (n <= 0xff) return new Uint8Array([majorShifted | 24, n]);
      if (n <= 0xffff) { const b = new Uint8Array(3); b[0] = majorShifted | 25; new DataView(b.buffer).setUint16(1, n, false); return b };
      const b = new Uint8Array(5); b[0] = majorShifted | 26; new DataView(b.buffer).setUint32(1, n, false); return b;
    }
    private decode(buf: U8): CBORValue {
      const [value, end] = this.decodeValue(buf, 0);
      if (end !== buf.length) { throw new Error("CBOR: trailing bytes") };
      return value;
    }
    private decodeValue(buf: U8, pos: N): [CBORValue, N] {
      this.ensureAvailable(buf, pos, 1)
      const first = buf[pos]
      const major = first >> 5
      const info = first & 0x1f
  
      if (major === 7) {
        if (info === 20) return [false, pos + 1]
        if (info === 21) return [true, pos + 1]
        if (info === 22) return [null, pos + 1]
        if (info === 23) return [undefined, pos + 1]
        if (info === 27) { this.ensureAvailable(buf, pos + 1, 8); const dv = new DataView(buf.buffer, buf.byteOffset + pos + 1, 8); return [dv.getFloat64(0, false), pos + 9]; }
      }
      const [n, nextPos] = this.readUint(buf, pos)
      if (major === 0) return [n, nextPos]
      if (major === 1) return [-1 - n, nextPos]
      if (major === 2) { this.ensureAvailable(buf, nextPos, n); const bytes = buf.slice(nextPos, nextPos + n); return [bytes, nextPos + n]; }
      if (major === 3) { this.ensureAvailable(buf, nextPos, n); const bytes = buf.slice(nextPos, nextPos + n); return [this.decoder.decode(bytes), nextPos + n]; }
      if (major === 4) {
        const arr: CBORValue[] = []
        let p = nextPos
        for (let i = 0; i < n; i++) { const [item, np] = this.decodeValue(buf, p); arr.push(item); p = np; }
        return [arr, p]
      }
      if (major === 5) {
        const obj: Record<S, CBORValue> = {}
        let p = nextPos
        for (let i = 0; i < n; i++) { const [k, kp] = this.decodeValue(buf, p); const [v, vp] = this.decodeValue(buf, kp); obj[k as string] = v; p = vp; }
        return [obj, p]
      }; throw new Error(`CBOR: unsupported major type ${major}`)
    }
    public encode_msg(msg: A): U8 {// Instead of leaking a raw object, encode an explicit fallback/error frame
      if (msg instanceof Uint8Array) return msg;// If it's already an encoded Uint8Array, don't re-encode it
      try { return this.encode(msg); }
      catch (err) { console.log("[BINARY_PIPE] Failed to encode outbound packet strictly:", err); return this.encode({ type: "error", error: "Encoding failed", id: msg?.id || "unknown" }); }
    }
    public decode_msg(raw: A): A {// Guard: If it didn't arrive as binary, it's a protocol violation for this core layer
      if (!(raw instanceof Uint8Array) && !(typeof Buffer !== 'undefined' && Buffer.isBuffer(raw))) { console.error("[BINARY_PIPE] Protocol violation: Expected encoded Uint8Array data stream."); return null; }
      try {
        const uint8 = raw instanceof Uint8Array ? raw : new Uint8Array((raw as A).buffer, (raw as A).byteOffset, (raw as A).length); return this.decode(uint8);
      } catch (err) {
        console.error("[BINARY_PIPE] Failed to decode inbound packet:", err);
        return null;
      }
    }
    // #endregion
}
