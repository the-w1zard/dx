

export class USP2I extends URLSearchParams implements USP2 {
	constructor(init?: S | URLSearchParams | R<S, S> | S[][]) {
		super(init as S | URLSearchParams | R<S, S> | S[][] | UD);
	}

	get size(): N {
		return Array.from(this).length as N;
	}

	getOr(name: S, fallback: S): S {
		return this.get(name) ?? fallback;
	}

	getOrNull(name: S): S | NU {
		return this.get(name);
	}

	getOrThrow(name: S, error: A = new Error(`Missing URL parameter: ${name}`)): string {
		const value = this.get(name);
		if (value === null) throw error;
		return value;
	}

	getNumber(name: S, fallback?: N): N | UD {
		const value = this.get(name);
		if (value === null || value.trim() === "") return fallback;
		const number = Number(value);
		return Number.isFinite(number) ? number : fallback;
	}

	getInt(name: S, radix: N = 10 as N): N | UD {
		const value = this.get(name);
		if (value === null || value.trim() === "") return undefined;
		const number = Number.parseInt(value, radix);
		return Number.isNaN(number) ? undefined : number;
	}

	getFloat(name: S): N | UD {
		const value = this.get(name);
		if (value === null || value.trim() === "") return undefined;
		const number = Number.parseFloat(value);
		return Number.isNaN(number) ? undefined : number;
	}

	getBoolean(name: S, fallback = false): B {
		const value = this.get(name);
		if (value === null) return fallback;
		switch (value.trim().toLowerCase()) {
			case "true":
			case "1":
			case "yes":
			case "on":
				return true;
			case "false":
			case "0":
			case "no":
			case "off":
				return false;
			default:
				return fallback;
		}
	}

	getJSON<T = A>(name: S): T | UD {
		const value = this.get(name);
		if (value === null) return undefined;
		try {
			return JSON.parse(value) as T;
		} catch {
			return undefined;
		}
	}

	getArray(name: S, separator = ","): S[] {
		const value = this.get(name);
		return value === null || value === "" ? [] : value.split(separator);
	}

	getObject<T extends R<S, A> = R<S, A>>(): T {
		const result: R<S, A> = {};
		for (const key of new Set(this.keys())) {
			const values = this.getAll(key);
			result[key] = values.length > 1 ? values : values[0];
		}
		return result as T;
	}

	setNumber(name: S, value: N): this {
		this.set(name, String(value));
		return this;
	}

	setBoolean(name: S, value: B): this {
		this.set(name, String(value));
		return this;
	}

	setJSON(name: S, value: A): this {
		this.set(name, JSON.stringify(value));
		return this;
	}

	setArray(name: S, values: Iterable<A>, separator = ","): this {
		this.set(name, Array.from(values, String).join(separator));
		return this;
	}

	setIfAbsent(name: S, value: S): this {
		if (!this.has(name)) this.set(name, value);
		return this;
	}

	setIfPresent(name: S, value: S): this {
		if (this.has(name)) this.set(name, value);
		return this;
	}

	appendAll(params: URLSearchParams | R<S, A>): this {
		if (params instanceof URLSearchParams) {
			params.forEach((value, key) => this.append(key, value));
		} else {
			for (const [key, value] of Object.entries(params)) {
				if (value != null) {
					if (Array.isArray(value)) {
						for (const item of value) this.append(key, String(item));
					} else {
						this.append(key, String(value));
					}
				}
			}
		}
		return this;
	}

	merge(params: URLSearchParams | R<S, A>, overwrite = true): this {
		if (params instanceof URLSearchParams) {
			params.forEach((value, key) => {
				if (overwrite || !this.has(key)) this.set(key, value);
			});
		} else {
			for (const [key, value] of Object.entries(params)) {
				if (value != null && (overwrite || !this.has(key))) {
					this.set(key, String(value));
				}
			}
		}
		return this;
	}

	clone(): USP2I {
		return new USP2I(this);
	}

	clear(): V {
		for (const key of new Set(this.keys())) this.delete(key);
	}

	isEmpty(): B {
		return this.size === 0;
	}

	isNotEmpty(): B {
		return this.size > 0;
	}

	toObject(): R<S, S | S[]> {
		return this.getObject();
	}

	toJSON(): R<S, S | S[]> {
		return this.toObject();
	}

	toURLSearchParams(): URLSearchParams {
		return new URLSearchParams(this);
	}

	toURL(url: S | URL): URL {
		const result = new URL(url);
		this.forEach((value, key) => result.searchParams.append(key, value));
		return result;
	}
}

globalThis.USP2 = USP2I 
