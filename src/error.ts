export interface ER2 extends Error {
	cause?: unknown;
	clone(): ER2I;
	toJSON(): {
		name: string;
		message: string;
		stack?: string;
		cause?: unknown;
	};
	toString(): string;
}

export interface ER2C extends ErrorConstructor {
	new (message?: string, options?: ErrorOptions): ER2I;
	(message?: string): string;
	readonly prototype: ER2I;
}

export class ER2I extends Error implements ER2 {
	constructor(message = "", options?: ErrorOptions) {
		super(message, options);
		this.name = new.target.name;
		Object.setPrototypeOf(this, new.target.prototype);
	}

	clone(): ER2I {
		const error = new ER2I(this.message, { cause: this.cause });
		error.name = this.name;
		error.stack = this.stack;
		return error;
	}

	toJSON(): {
		name: string;
		message: string;
		stack?: string;
		cause?: unknown;
	} {
		return {
			name: this.name,
			message: this.message,
			stack: this.stack,
			cause: this.cause,
		};
	}

	override toString(): string {
		return `${this.name}: ${this.message}`;
	}

	static is(value: unknown): value is Error {
		return value instanceof Error;
	}

	static isER2(value: unknown): value is ER2I {
		return value instanceof ER2I;
	}

	static from(value: unknown, fallback = "An unknown error occurred"): ER2I {
		if (value instanceof ER2I) return value;

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
		} catch {
			return new ER2I(fallback);
		}
	}

	static wrap(value: unknown, message?: string): ER2I {
		const cause = ER2I.from(value);
		return new ER2I(message ?? cause.message, { cause });
	}

	static aggregate(errors: Iterable<unknown>, message = "Multiple errors occurred"): AggregateError {
		return new AggregateError(
			Array.from(errors, error => ER2I.from(error)),
			message,
		);
	}
}

globalThis.ER2 = ER2I 
