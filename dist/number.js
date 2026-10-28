export class N2I extends Number {
    abs() {
        return new N2I(Math.abs(this.valueOf()));
    }
    sign() {
        return new N2I(Math.sign(this.valueOf()));
    }
    neg() {
        return new N2I(-this.valueOf());
    }
    inv() {
        return new N2I(1 / this.valueOf());
    }
    clamp(min, max) {
        return new N2I(Math.min(Math.max(this.valueOf(), min), max));
    }
    wrap(min, max) {
        const range = max - min;
        if (range <= 0)
            throw new RangeError("max must be greater than min");
        return new N2I((((this.valueOf() - min) % range) + range) % range + min);
    }
    lerp(to, t) {
        return new N2I(this.valueOf() + (to - this.valueOf()) * t);
    }
    map(inMin, inMax, outMin, outMax) {
        if (inMax === inMin)
            throw new RangeError("Input range cannot be zero");
        return new N2I(outMin + ((this.valueOf() - inMin) / (inMax - inMin)) * (outMax - outMin));
    }
    remap(inMin, inMax, outMin, outMax) {
        return this.map(inMin, inMax, outMin, outMax);
    }
    roundTo(precision = 0) {
        const factor = 10 ** precision;
        return new N2I(Math.round((this.valueOf() + Number.EPSILON) * factor) / factor);
    }
    floorTo(precision = 0) {
        const factor = 10 ** precision;
        return new N2I(Math.floor(this.valueOf() * factor) / factor);
    }
    ceilTo(precision = 0) {
        const factor = 10 ** precision;
        return new N2I(Math.ceil(this.valueOf() * factor) / factor);
    }
    truncTo(precision = 0) {
        const factor = 10 ** precision;
        return new N2I(Math.trunc(this.valueOf() * factor) / factor);
    }
    isFinite() {
        return Number.isFinite(this.valueOf());
    }
    isInteger() {
        return Number.isInteger(this.valueOf());
    }
    isSafeInteger() {
        return Number.isSafeInteger(this.valueOf());
    }
    isNaN() {
        return Number.isNaN(this.valueOf());
    }
    isBetween(min, max, inclusive = true) {
        const value = this.valueOf();
        return inclusive ? value >= min && value <= max : value > min && value < max;
    }
    isPositive() {
        return this.valueOf() > 0;
    }
    isNegative() {
        return this.valueOf() < 0;
    }
    isZero() {
        return this.valueOf() === 0;
    }
    isEven() {
        const value = this.valueOf();
        return Number.isInteger(value) && value % 2 === 0;
    }
    isOdd() {
        const value = this.valueOf();
        return Number.isInteger(value) && Math.abs(value % 2) === 1;
    }
    squared() {
        return new N2I(this.valueOf() ** 2);
    }
    cubed() {
        return new N2I(this.valueOf() ** 3);
    }
    sqrt() {
        return new N2I(Math.sqrt(this.valueOf()));
    }
    cbrt() {
        return new N2I(Math.cbrt(this.valueOf()));
    }
    pow(exponent) {
        return new N2I(this.valueOf() ** exponent);
    }
    root(degree) {
        if (degree === 0)
            throw new RangeError("Root degree cannot be zero");
        const value = this.valueOf();
        if (value < 0 && Number.isInteger(degree) && Math.abs(degree % 2) === 1) {
            return new N2I(-((-value) ** (1 / degree)));
        }
        return new N2I(value ** (1 / degree));
    }
    mod(divisor) {
        if (divisor === 0)
            throw new RangeError("Divisor cannot be zero");
        return new N2I(((this.valueOf() % divisor) + divisor) % divisor);
    }
    percentOf(total) {
        return new N2I((this.valueOf() / 100) * total);
    }
    percentChange(from) {
        if (from === 0)
            throw new RangeError("Cannot calculate percentage change from zero");
        return new N2I(((this.valueOf() - from) / Math.abs(from)) * 100);
    }
    toRadians() {
        return new N2I(this.valueOf() * (Math.PI / 180));
    }
    toDegrees() {
        return new N2I(this.valueOf() * (180 / Math.PI));
    }
    toOrdinal() {
        const value = this.valueOf();
        const integer = Math.trunc(value);
        const abs = Math.abs(integer);
        const suffix = abs % 100 >= 11 && abs % 100 <= 13
            ? "th"
            : { 1: "st", 2: "nd", 3: "rd" }[abs % 10] ?? "th";
        return `${value}${suffix}`;
    }
    toBytes(unit, decimals = 2) {
        const value = this.valueOf();
        const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];
        const index = unit === undefined
            ? value === 0 ? 0 : Math.min(Math.floor(Math.log(Math.abs(value)) / Math.log(1024)), units.length - 1)
            : Math.max(0, Math.min(Math.trunc(unit), units.length - 1));
        return `${(value / 1024 ** index).toFixed(decimals)} ${units[index]}`;
    }
    toCompact(locales) {
        return new Intl.NumberFormat(locales, { notation: "compact", maximumFractionDigits: 2 }).format(this.valueOf());
    }
    toCurrency(currency = "USD", locales) {
        return new Intl.NumberFormat(locales, { style: "currency", currency }).format(this.valueOf());
    }
    toPercent(decimals = 0, locales) {
        return new Intl.NumberFormat(locales, {
            style: "percent",
            maximumFractionDigits: decimals,
        }).format(this.valueOf());
    }
    times(fn) {
        const count = this.valueOf();
        for (let i = 0; i < count; i++)
            fn(i);
        return this;
    }
    upTo(end, step = 1) {
        if (step <= 0)
            throw new RangeError("step must be positive");
        const out = [];
        for (let value = this.valueOf(); value <= end; value += step)
            out.push(value);
        return out;
    }
    downTo(end, step = 1) {
        if (step <= 0)
            throw new RangeError("step must be positive");
        const out = [];
        for (let value = this.valueOf(); value >= end; value -= step)
            out.push(value);
        return out;
    }
}
globalThis.N2 = N2I;
