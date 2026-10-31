export class P2I<T = A> extends Promise<T> implements P2<T> {
	#createdAt = Date.now();
	#status: "pending" | "fulfilled" | "rejected" = "pending";
	#val?: T;
	#err?: A;
	#settledAt?: N;
	#label?: S;

	constructor(
		executor: (
			resolve: (value: T | PromiseLike<T>) => void,
			reject: (reason?: A) => void,
		) => void,
	) {
		super(executor);

		super.then(
			(v) => { this.#status = "fulfilled"; this.#val = v; this.#settledAt = Date.now(); },
			(e) => { this.#status = "rejected"; this.#err = e as A; this.#settledAt = Date.now(); },
		);
	}

	static get [Symbol.species](): PromiseConstructor {
		return P2I as unknown as PromiseConstructor;
	}

	override then<TResult1 = T, TResult2 = never>(
		onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
		onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
	): P2I<TResult1 | TResult2> {
		return super.then(onfulfilled, onrejected) as P2I<TResult1 | TResult2>;
	}

	override catch<TResult = never>(
		onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
	): P2I<T | TResult> {
		return super.catch(onrejected) as P2I<T | TResult>;
	}

	override finally(onfinally?: (() => void) | null): P2I<T> {
		return super.finally(onfinally) as P2I<T>;
	}

	//                                                                                     [STATUS]
	// ══════════════════════════════════════════════════════════════════════════════════════════════════════
	status(): "pending" | "fulfilled" | "rejected" { return this.#status; }
	isPending(): B { return this.#status === "pending"; }
	isFulfilled(): B { return this.#status === "fulfilled"; }
	isRejected(): B { return this.#status === "rejected"; }
	value(): T | UD { return this.#status === "fulfilled" ? this.#val : undefined; }
	error(): A | UD { return this.#status === "rejected" ? this.#err : undefined; }
	elapsed(): N | UD { return this.#settledAt ? (this.#settledAt - this.#createdAt) as N : undefined; }

	static resolve(): P2I<void>;
	static resolve<T>(value: T | PromiseLike<T>): P2I<Awaited<T>>;
	static resolve<T>(value?: T | PromiseLike<T>): P2I<Awaited<T> | void> {
		return new P2I(resolve => resolve(value as Awaited<T>));
	}

	static reject<T = never>(reason?: A): P2I<T> {
		return new P2I<T>((_, reject) => reject(reason));
	}

	static all<T extends readonly unknown[] | []>(
		values: T,
	): P2I<{ -readonly [P in keyof T]: Awaited<T[P]> }> {
		return new P2I((resolve, reject) => {
			Promise.all(values).then(resolve, reject);
		});
	}

	static allSettled<T extends readonly unknown[] | []>(
		values: T,
	): P2I<{ -readonly [P in keyof T]: PromiseSettledResult<Awaited<T[P]>> }> {
		return new P2I((resolve, reject) => {
			Promise.allSettled(values).then(resolve, reject);
		});
	}

	static race<T extends readonly unknown[] | []>(
		values: T,
	): P2I<Awaited<T[number]>> {
		return new P2I((resolve, reject) => {
			Promise.race(values).then(resolve, reject);
		});
	}

	static any<T extends readonly unknown[] | []>(
		values: T,
	): P2I<Awaited<T[number]>> {
		return new P2I((resolve, reject) => {
			Promise.any(values).then(resolve, reject);
		});
	}

	static retry<T>(
		fn: () => T | PromiseLike<T>,
		times: N = 3 as N,
		delay: N = 0 as N,
	): P2I<Awaited<T>> {
		const run = (remaining: number): P2I<Awaited<T>> =>
			P2I.try(fn).catch(error => {
				if (remaining <= 0) throw error;

				return new P2I<void>(resolve => {
					if (delay > 0) setTimeout(resolve, delay);
					else resolve();
				}).then(() => run(remaining - 1));
			}) as P2I<Awaited<T>>;

		return run(times);
	}

	static deferred<T = A>(): {
		promise: P2I<T>;
		resolve: (value: T | PromiseLike<T>) => void;
		reject: (reason?: A) => void;
	} {
		let resolve!: (value: T | PromiseLike<T>) => void;
		let reject!: (reason?: A) => void;

		const promise = new P2I<T>((res, rej) => {
			resolve = res;
			reject = rej;
		});

		return { promise, resolve, reject };
	}

	static try<T>(fn: () => T | PromiseLike<T>): P2I<Awaited<T>> {
		return new P2I((resolve, reject) => {
			try {
				resolve(fn() as Awaited<T>);
			} catch (error) {
				reject(error);
			}
		});
	}

	//                                                                                [CONCURRENCY]
	// ══════════════════════════════════════════════════════════════════════════════════════════════════════
	static sleep(ms: N): P2I<void> {
		return new P2I<void>(resolve => setTimeout(resolve, ms));
	}

	static fromCallback<T>(fn: (cb: (err: A, value?: T) => void) => void): P2I<T> {
		return new P2I<T>((resolve, reject) => {
			fn((err, value) => {
				if (err) reject(err);
				else resolve(value as T);
			});
		});
	}

	static mapLimit<T, G>(
		items: AR<T>,
		limit: N,
		fn: (item: T, index: N) => G | PromiseLike<G>,
	): P2I<AR<G>> {
		return new P2I<AR<G>>((resolve, reject) => {
			const results: AR<G> = new Array(items.length);
			let next = 0;
			let active = 0;
			let done = 0;
			let failed = false;

			const run = (): void => {
				if (failed) return;
				if (done === items.length) { resolve(results); return; }

				while (active < limit && next < items.length) {
					const i = next++;
					active++;

					P2I.try(() => fn(items[i], i as N)).then(
						(v) => { results[i] = v as G; active--; done++; run(); },
						(e) => { failed = true; reject(e); },
					);
				}
			};

			run();
		});
	}

	static series<T>(fns: AR<() => T | PromiseLike<T>>): P2I<AR<T>> {
		return fns.reduce(
			(acc, fn) => acc.then(results => P2I.resolve(fn()).then(v => [...results, v])),
			P2I.resolve([] as AR<T>),
		) as P2I<AR<T>>;
	}

	tap(fn: (value: T) => unknown): P2I<T> {
		return this.then(value =>
			P2I.resolve(fn(value)).then(() => value),
		);
	}

	tapError(fn: (error: A) => unknown): P2I<T> {
		return this.catch(error =>
			P2I.resolve(fn(error)).then(() => {
				throw error;
			}),
		);
	}

	recover(fn: (error: A) => T | PromiseLike<T>): P2I<T> {
		return this.catch(fn);
	}

	fallback(value: T | PromiseLike<T>): P2I<T> {
		return this.catch(() => value);
	}

	timeout(ms: N, error: A = new Error("Promise timed out") as A): P2I<T> {
		return new P2I<T>((resolve, reject) => {
			const timer = setTimeout(() => reject(error), ms);

			this.then(
				value => {
					clearTimeout(timer);
					resolve(value);
				},
				reason => {
					clearTimeout(timer);
					reject(reason);
				},
			);
		});
	}

	delay(ms: N): P2I<T> {
		return this.then(
			value => new P2I<T>(resolve => setTimeout(() => resolve(value), ms)),
		);
	}

	withDeadline(
		deadline: N,
		error: A = new Error("Deadline exceeded") as A,
	): P2I<T> {
		return this.timeout(Math.max(0, deadline - Date.now()) as N, error);
	}

	map<G>(fn: (value: T) => G | PromiseLike<G>): P2I<Awaited<G>> {
		return this.then(fn) as P2I<Awaited<G>>;
	}

	flatMap<G>(fn: (value: T) => G | PromiseLike<G>): P2I<Awaited<G>> {
		return this.then(fn) as P2I<Awaited<G>>;
	}

	or<G>(other: G | PromiseLike<G>): P2I<T | Awaited<G>> {
		return this.catch(() => other) as P2I<T | Awaited<G>>;
	}

	and<G>(other: G | PromiseLike<G>): P2I<[T, Awaited<G>]> {
		return this.then(value =>
			P2I.resolve(other).then(
				result => [value, result] as [T, Awaited<G>],
			),
		);
	}

	zip<G>(other: PromiseLike<G>): P2I<[T, Awaited<G>]> {
		return this.and(other);
	}

	unwrap(): Promise<T> {
		return this;
	}

	toResult(): P2I<{ ok: true; value: T } | { ok: false; error: A }> {
		return this.then(
			value => ({ ok: true as const, value }),
			error => ({ ok: false as const, error: error as A }),
		);
	}

	onResolve(fn: (value: T) => unknown): P2I<T> {
		return this.tap(fn);
	}

	onReject(fn: (error: A) => unknown): P2I<T> {
		return this.tapError(fn);
	}

	finallyDo(fn: () => unknown): P2I<T> {
		return this.finally(fn);
	}

	//                                                                                      [DEBUG]
	// ══════════════════════════════════════════════════════════════════════════════════════════════════════
	$label(name: S): this {
		this.#label = name;
		return this;
	}

	$debug(): this {
		const tag = this.#label ? `:${this.#label}` : "";
		super.then(
			v => console.log(`[P2${tag}] ✓ resolved`, v, `(${this.elapsed()}ms)`),
			e => console.log(`[P2${tag}] ✗ rejected`, e, `(${this.elapsed()}ms)`),
		);
		return this;
	}
}

(globalThis as A).P2 = P2I as P2C;
