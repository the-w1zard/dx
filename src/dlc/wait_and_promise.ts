

export function wait_and_promise<T = A>(timeoutMs: number, key: A, isOpen: A, current: A,) {
    return new Promise<T>((resolve, reject) => {// subscribe first, THEN re-check isOpen — closes the gap where the
        let timer: ReturnType<typeof setTimeout> | undefined;
        const unsub = () => {}
        if (isOpen) {// opened while we were subscribing
            if (timer) clearTimeout(timer);
            unsub();
            resolve(current as T);
            return;
        }
        if (timeoutMs) {
            timer = setTimeout(() => {
                unsub();
                reject(new Error(`[rift] wait() timed out after ${timeoutMs}ms`));
            }, timeoutMs);
        }
    });
}
