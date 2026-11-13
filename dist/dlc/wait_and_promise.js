export function wait_and_promise(timeoutMs, key, isOpen, current) {
    return new Promise((resolve, reject) => {
        let timer;
        const unsub = () => { };
        if (isOpen) { // opened while we were subscribing
            if (timer)
                clearTimeout(timer);
            unsub();
            resolve(current);
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
