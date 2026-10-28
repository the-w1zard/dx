export class WM2I extends WeakMap {
    g = this.get;
    h = this.has;
    d = this.delete;
    _tracked;
    s(k, v) {
        const n = typeof v === "function" ? v() : v;
        super.set(k, n);
        return this;
    }
    swap(key, value) {
        const previous = this.h(key) ? this.g(key) : undefined;
        this.s(key, value);
        return previous;
    }
    take(key) {
        const value = this.g(key);
        this.d(key);
        return value;
    }
    getAndDelete(key) {
        return this.take(key);
    }
    peek(key) {
        return this.h(key) ? this.g(key) : false;
    }
    getOrI(key, value) {
        if (this.h(key))
            return this.g(key);
        this.s(key, value);
        return value;
    }
    getOrM(key, make) {
        if (this.h(key))
            return this.g(key);
        const value = make();
        this.s(key, value);
        return value;
    }
    getOr(key, fallback) {
        return this.h(key) ? this.g(key) : fallback;
    }
    getOrThrow(key, error = new Error("WeakMap key not found")) {
        if (!this.h(key))
            throw error;
        return this.g(key);
    }
    getOrCreate(key, make) {
        return this.getOrM(key, make);
    }
    ensure(key, make) {
        return this.getOrM(key, make);
    }
    update(key, fn, initial) {
        const has = this.h(key);
        const value = fn(has ? this.g(key) : initial, has);
        this.s(key, value);
        return value;
    }
    setIfAbsent(key, value) {
        if (this.h(key))
            return false;
        this.s(key, value);
        return true;
    }
    setIfPresent(key, value) {
        if (!this.h(key))
            return false;
        this.s(key, value);
        return true;
    }
    hasOrSet(key, value) {
        if (this.h(key))
            return true;
        this.s(key, value);
        return false;
    }
    replace(key, value) {
        return this.setIfPresent(key, value);
    }
    touch(key) {
        return this.setIfAbsent(key, undefined);
    }
    get tracked() {
        return this._tracked !== undefined;
    }
    get trackedSize() {
        return this._tracked?.size ?? 0;
    }
    track(key) {
        (this._tracked ??= new Set()).add(key);
        return this;
    }
    untrack(key) {
        return this._tracked?.delete(key) ?? false;
    }
    trackedKeys() {
        return this._tracked ? Array.from(this._tracked) : [];
    }
    trackedValues() {
        const out = [];
        if (this._tracked) {
            for (const key of this._tracked) {
                if (this.h(key))
                    out.push(this.g(key));
            }
        }
        return out;
    }
    trackedEntries() {
        const out = [];
        if (this._tracked) {
            for (const key of this._tracked) {
                if (this.h(key))
                    out.push([key, this.g(key)]);
            }
        }
        return out;
    }
    forEachTracked(fn) {
        if (this._tracked) {
            for (const key of this._tracked) {
                if (this.h(key))
                    fn(this.g(key), key, this);
            }
        }
    }
    clearTracked() {
        if (this._tracked) {
            for (const key of this._tracked)
                this.d(key);
            this._tracked.clear();
        }
    }
}
globalThis.WM2 = WM2I;
