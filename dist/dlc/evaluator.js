export function evaluator(v) {
    // ── axis 2 first: is it async? thenable (promise-like, not necessarily Promise)  ─────────────────────══
    if (v != null && typeof v.then === 'function') /* */
        return 'thenable';
    // ─── async iterable ───────────────────────────────────────────────────────────────────────═────────────
    if (v != null && typeof v[Symbol.asyncIterator] === 'function') /* */
        return 'async-iterable';
    // ── axis 1: what shape? ────────────────────────────────────────────────────────────────────────────────
    if (v === null) /* null (typeof null === 'object', so separate) */
        return 'null';
    const t = typeof v /* */;
    if (t !== 'object' && t !== 'function') /* primitive: str/num/bool/bigint/sym/undefined */
        return t;
    if (typeof v === 'function') /* function */
        return 'function';
    if (ArrayBuffer.isView(v)) /* TypedArray or DataView */
        return 'array';
    if (v instanceof Map) /* */
        return 'map';
    if (v instanceof Set) /* */
        return 'set';
    if (v instanceof Date) /* */
        return 'date';
    if (v instanceof RegExp) /* */
        return 'regexp';
    if (v instanceof Error) /* */
        return 'error';
    if (typeof v[Symbol.iterator] === 'function') /* */
        return 'iterable';
    if (t === 'object') /* plain record */
        return 'object';
    // ─── iterable ──────────────────────────────────────────────────────────────────────────────────────────
    if (v != null && typeof v[Symbol.iterator] === 'function') /* */
        return 'iterator';
    if (typeof v === 'string') /* */
        return 'string';
    if (typeof v === 'number') /* */
        return 'number';
    if (typeof v === 'boolean') /* */
        return 'boolean';
    if (typeof v === 'bigint') /* */
        return 'bigint';
    if (typeof v === 'symbol') /* */
        return 'symbol';
    if (typeof v === 'undefined') /* */
        return 'undefined';
    // ─── objects by constructor ────────────────────────────────────────────────────────────────────────────
    if (v instanceof Array) /* or Array.isArray(v) */
        return 'Array';
    if (v instanceof WeakMap) /* */
        return 'WeakMap';
    if (v instanceof WeakSet) /* */
        return 'WeakSet';
    if (v instanceof Promise) /* */
        return 'Promise';
    if (v instanceof ArrayBuffer) /* */
        return 'ArrayBuffer';
    // ─── node-specific ─────────────────────────────────────────────────────────────────────────────────────
    if (v instanceof Buffer) /* Node buffer */
        return 'Buffer';
    if (v instanceof URL) /* oWHATWG URL */
        return 'URL';
    if (v instanceof URLSearchParams) /* */
        return 'URLSearchParams';
    // ─── plain object / record ─────────────────────────────────────────────────────────────────────────────
    if (typeof v === 'object' && v !== null && !Array.isArray(v)
        && !(v instanceof Map) && !(v instanceof Set)) /* */
        return 'plainObject';
    // ───────────────────────────────────────────────────────────────────────────────────────────────────────
}
