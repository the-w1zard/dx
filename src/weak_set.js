export class WS2I extends WeakSet {
    _tracked = new Set();
    constructor(values) {
        super(values == null ? undefined : Array.from(values));
    }
    add(value) {
        return super.add(value);
    }
    delete(value) {
        this._tracked.delete(value);
        return super.delete(value);
    }
    has(value) {
        return super.has(value);
    }
    addIfAbsent(value) {
        if (this.has(value))
            return false;
        this.add(value);
        return true;
    }
    toggle(value) {
        if (this.has(value)) {
            this.delete(value);
            return false;
        }
        this.add(value);
        return true;
    }
    deleteIfPresent(value) {
        return this.delete(value);
    }
    hasAll(values) {
        for (const value of values) {
            if (!this.has(value))
                return false;
        }
        return true;
    }
    hasAny(values) {
        for (const value of values) {
            if (this.has(value))
                return true;
        }
        return false;
    }
    addAll(values) {
        for (const value of values)
            this.add(value);
        return this;
    }
    deleteAll(values) {
        let count = 0;
        for (const value of values) {
            if (this.delete(value))
                count++;
        }
        return count;
    }
    replace(oldValue, newValue) {
        if (!this.has(oldValue))
            return false;
        this.delete(oldValue);
        this.add(newValue);
        return true;
    }
    track(value) {
        this.add(value);
        this._tracked.add(value);
        return this;
    }
    untrack(value) {
        return this._tracked.delete(value);
    }
    trackedKeys() {
        return Array.from(this._tracked);
    }
    forEachTracked(callback, thisArg) {
        this._tracked.forEach(value => {
            if (this.has(value))
                callback.call(thisArg, value, this);
            else
                this._tracked.delete(value);
        });
    }
    clearTracked() {
        for (const value of this._tracked)
            super.delete(value);
        this._tracked.clear();
    }
}
globalThis.WS2 = WS2I;
