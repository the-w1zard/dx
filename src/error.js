export class ER2I extends Error {
    constructor(message = "", options) {
        super(message, options);
        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
    clone() {
        const error = new ER2I(this.message, { cause: this.cause });
        error.name = this.name;
        error.stack = this.stack;
        return error;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
            cause: this.cause,
        };
    }
    toString() {
        return `${this.name}: ${this.message}`;
    }
    static is(value) {
        return value instanceof Error;
    }
    static isER2(value) {
        return value instanceof ER2I;
    }
    static from(value, fallback = "An unknown error occurred") {
        if (value instanceof ER2I)
            return value;
        if (value instanceof Error) {
            const error = new ER2I(value.message, { cause: value });
            error.name = value.name;
            error.stack = value.stack;
            return error;
        }
        if (typeof value === "string") {
            return new ER2I(value);
        }
        if (value === null || value === undefined) {
            return new ER2I(fallback);
        }
        try {
            return new ER2I(String(value));
        }
        catch {
            return new ER2I(fallback);
        }
    }
    static wrap(value, message) {
        const cause = ER2I.from(value);
        return new ER2I(message ?? cause.message, { cause });
    }
    static aggregate(errors, message = "Multiple errors occurred") {
        return new AggregateError(Array.from(errors, error => ER2I.from(error)), message);
    }
}
globalThis.ER2 = ER2I;
