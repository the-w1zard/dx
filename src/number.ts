export interface N2 extends Number {
	toString: typeof Number.prototype.toString;
	toFixed: typeof Number.prototype.toFixed;
	toExponential: typeof Number.prototype.toExponential;
	toPrecision: typeof Number.prototype.toPrecision;
	valueOf: typeof Number.prototype.valueOf;
	toLocaleString: typeof Number.prototype.toLocaleString;

	abs(): N2;
	sign(): N2;
	neg(): N2;
	inv(): N2;

	clamp(min: N, max: N): N2;
	wrap(min: N, max: N): N2;
	lerp(to: N, t: N): N2;
	map(inMin: N, inMax: N, outMin: N, outMax: N): N2;
	remap(inMin: N, inMax: N, outMin: N, outMax: N): N2;

	roundTo(precision?: N): N2;
	floorTo(precision?: N): N2;
	ceilTo(precision?: N): N2;
	truncTo(precision?: N): N2;

	isFinite(): B;
	isInteger(): B;
	isSafeInteger(): B;
	isNaN(): B;
	isBetween(min: N, max: N, inclusive?: B): B;
	isPositive(): B;
	isNegative(): B;
	isZero(): B;
	isEven(): B;
	isOdd(): B;

	squared(): N2;
	cubed(): N2;
	sqrt(): N2;
	cbrt(): N2;
	pow(exponent: N): N2;
	root(degree: N): N2;
	mod(divisor: N): N2;
	percentOf(total: N): N2;
	percentChange(from: N): N2;

	toRadians(): N2;
	toDegrees(): N2;
	toOrdinal(): S;
	toBytes(unit?: N, decimals?: N): S;
	toCompact(locales?: Intl.LocalesArgument): S;
	toCurrency(currency?: S, locales?: Intl.LocalesArgument): S;
	toPercent(decimals?: N, locales?: Intl.LocalesArgument): S;

	times(fn: (index: N) => void): this;
	upTo(end: N, step?: N): AR<N>;
	downTo(end: N, step?: N): AR<N>;
}


export class N2I extends Number implements N2 {
	abs(): N2I {
		return new N2I(Math.abs(this.valueOf()));
	}

	sign(): N2I {
		return new N2I(Math.sign(this.valueOf()));
	}

	neg(): N2I {
		return new N2I(-this.valueOf());
	}

	inv(): N2I {
		return new N2I(1 / this.valueOf());
	}

	clamp(min: N, max: N): N2I {
		return new N2I(Math.min(Math.max(this.valueOf(), min), max));
	}

	wrap(min: N, max: N): N2I {
		const range = max - min;
		if (range <= 0) throw new RangeError("max must be greater than min");
		return new N2I((((this.valueOf() - min) % range) + range) % range + min);
	}

	lerp(to: N, t: N): N2I {
		return new N2I(this.valueOf() + (to - this.valueOf()) * t);
	}

	map(inMin: N, inMax: N, outMin: N, outMax: N): N2I {
		if (inMax === inMin) throw new RangeError("Input range cannot be zero");
		return new N2I(outMin + ((this.valueOf() - inMin) / (inMax - inMin)) * (outMax - outMin));
	}

	remap(inMin: N, inMax: N, outMin: N, outMax: N): N2I {
		return this.map(inMin, inMax, outMin, outMax);
	}

	roundTo(precision: N = 0): N2I {
		const factor = 10 ** precision;
		return new N2I(Math.round((this.valueOf() + Number.EPSILON) * factor) / factor);
	}

	floorTo(precision: N = 0): N2I {
		const factor = 10 ** precision;
		return new N2I(Math.floor(this.valueOf() * factor) / factor);
	}

	ceilTo(precision: N = 0): N2I {
		const factor = 10 ** precision;
		return new N2I(Math.ceil(this.valueOf() * factor) / factor);
	}

	truncTo(precision: N = 0): N2I {
		const factor = 10 ** precision;
		return new N2I(Math.trunc(this.valueOf() * factor) / factor);
	}

	isFinite(): B {
		return Number.isFinite(this.valueOf());
	}

	isInteger(): B {
		return Number.isInteger(this.valueOf());
	}

	isSafeInteger(): B {
		return Number.isSafeInteger(this.valueOf());
	}

	isNaN(): B {
		return Number.isNaN(this.valueOf());
	}

	isBetween(min: N, max: N, inclusive: B = true): B {
		const value = this.valueOf();
		return inclusive ? value >= min && value <= max : value > min && value < max;
	}

	isPositive(): B {
		return this.valueOf() > 0;
	}

	isNegative(): B {
		return this.valueOf() < 0;
	}

	isZero(): B {
		return this.valueOf() === 0;
	}

	isEven(): B {
		const value = this.valueOf();
		return Number.isInteger(value) && value % 2 === 0;
	}

	isOdd(): B {
		const value = this.valueOf();
		return Number.isInteger(value) && Math.abs(value % 2) === 1;
	}

	squared(): N2I {
		return new N2I(this.valueOf() ** 2);
	}

	cubed(): N2I {
		return new N2I(this.valueOf() ** 3);
	}

	sqrt(): N2I {
		return new N2I(Math.sqrt(this.valueOf()));
	}

	cbrt(): N2I {
		return new N2I(Math.cbrt(this.valueOf()));
	}

	pow(exponent: N): N2I {
		return new N2I(this.valueOf() ** exponent);
	}

	root(degree: N): N2I {
		if (degree === 0) throw new RangeError("Root degree cannot be zero");
		const value = this.valueOf();
		if (value < 0 && Number.isInteger(degree) && Math.abs(degree % 2) === 1) {
			return new N2I(-((-value) ** (1 / degree)));
		}
		return new N2I(value ** (1 / degree));
	}

	mod(divisor: N): N2I {
		if (divisor === 0) throw new RangeError("Divisor cannot be zero");
		return new N2I(((this.valueOf() % divisor) + divisor) % divisor);
	}

	percentOf(total: N): N2I {
		return new N2I((this.valueOf() / 100) * total);
	}

	percentChange(from: N): N2I {
		if (from === 0) throw new RangeError("Cannot calculate percentage change from zero");
		return new N2I(((this.valueOf() - from) / Math.abs(from)) * 100);
	}

	toRadians(): N2I {
		return new N2I(this.valueOf() * (Math.PI / 180));
	}

	toDegrees(): N2I {
		return new N2I(this.valueOf() * (180 / Math.PI));
	}

	toOrdinal(): S {
		const value = this.valueOf();
		const integer = Math.trunc(value);
		const abs = Math.abs(integer);
		const suffix = abs % 100 >= 11 && abs % 100 <= 13
			? "th"
			: ({ 1: "st", 2: "nd", 3: "rd" } as Record<N, S>)[abs % 10] ?? "th";
		return `${value}${suffix}`;
	}

	toBytes(unit?: N, decimals: N = 2): S {
		const value = this.valueOf();
		const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];
		const index = unit === undefined
			? value === 0 ? 0 : Math.min(Math.floor(Math.log(Math.abs(value)) / Math.log(1024)), units.length - 1)
			: Math.max(0, Math.min(Math.trunc(unit), units.length - 1));
		return `${(value / 1024 ** index).toFixed(decimals)} ${units[index]}`;
	}

	toCompact(locales?: Intl.LocalesArgument): S {
		return new Intl.NumberFormat(locales, { notation: "compact", maximumFractionDigits: 2 }).format(this.valueOf());
	}

	toCurrency(currency: S = "USD", locales?: Intl.LocalesArgument): S {
		return new Intl.NumberFormat(locales, { style: "currency", currency }).format(this.valueOf());
	}

	toPercent(decimals: N = 0, locales?: Intl.LocalesArgument): S {
		return new Intl.NumberFormat(locales, {
			style: "percent",
			maximumFractionDigits: decimals,
		}).format(this.valueOf());
	}

	times(fn: (index: N) => void): this {
		const count = this.valueOf();
		for (let i = 0; i < count; i++) fn(i);
		return this;
	}

	upTo(end: N, step: N = 1): AR<N> {
		if (step <= 0) throw new RangeError("step must be positive");
		const out: N[] = [];
		for (let value = this.valueOf(); value <= end; value += step) out.push(value);
		return out as AR<N>;
	}

	downTo(end: N, step: N = 1): AR<N> {
		if (step <= 0) throw new RangeError("step must be positive");
		const out: N[] = [];
		for (let value = this.valueOf(); value >= end; value -= step) out.push(value);
		return out as AR<N>;
	}
}

globalThis.N2 = N2I;
