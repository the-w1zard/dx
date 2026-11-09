export declare function timedPromise<T>(gate: Promise<T>, timeoutMs: number): Promise<T>;
/**
 function wait_and_promise<T = A>(timeoutMs: number, key: A, isOpen: A, current: A,) {
    return new Promise<T>((resolve, reject) => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        function sub<T>(first:A, second: A) {return {} as T} ;
        const r = sub<RiftRecord<T>>(key, (next: A) => {
            if (next?.opened) {
                if (timer) clearTimeout(timer);
                resolve(next.value as T);
            }
        });
        if (isOpen) {
            if (timer) clearTimeout(timer);
            resolve(current as T);
            return;
        }
        if (timeoutMs) {
            timer = setTimeout(() => {
                reject(new Error(`[rift] wait() timed out after ${timeoutMs}ms`));
            }, timeoutMs);
        }
    });
}


 */
