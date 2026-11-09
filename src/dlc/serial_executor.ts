export class _serialExecutor {
	private chain: Promise<void> = Promise.resolve();

	enqueue<T>(fn: () => T | PromiseLike<T>): Promise<T> {
		const run = this.chain.then(fn);
		this.chain = run.then(
			() => undefined,
			() => undefined,
		);
		return run;
	}

	get exec(): Promise<void> { return this.chain;	}
}
export function executor() {
	return new _serialExecutor();
}

/**
 const serial = executor();

 await serial.enqueue(() => doThing());
 await serial.exec;
 */
