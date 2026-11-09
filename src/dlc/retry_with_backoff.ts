
/**
useEffect(() => {
    let cancelled = false;
    retryWithBackoff({
        isCancelled: () => cancelled,
        attempt: async (n) => {
            console.log(`[STAFF_AGAIN] attempt ${n}`);
            return staff ?? undefined;
        },
    });
    return () => { cancelled = true; };
}, []);
 */

export async function retryWithBackoff<T>({
    attempts = 4,
    baseDelayMs = 1000,
    maxDelayMs = 12000,
    isCancelled = () => false,
    attempt = async (n: any) => {
        console.log(`[ATTEMPT][${n}]`);
    },
    onAttemptFailed = (n: any, e: any) => console.log(`'[✘][FAILED: ATTEMPT][${n}]`, e),
    onGiveUp = () => console.log('[✘][GAVE UP]'),
}): Promise<T | undefined> {
    const sleep =  ((ms: any) => new Promise(r => setTimeout(r, ms)));
    const maxDelay = maxDelayMs ?? Infinity;
    let delay = baseDelayMs;

    for (let n = 1; n <= attempts; n++) {
        if (isCancelled?.()) return undefined;
        try {
            const v = await attempt(n);
            if (v !== undefined) return v;
        } catch (err) {
            onAttemptFailed?.(n, err);
        }
        if (n === attempts) break;
        if (isCancelled?.()) return undefined;
        await sleep(delay);
        if (isCancelled?.()) return undefined;
        delay = Math.min(delay * 2, maxDelay);
    }
    onGiveUp?.();
    return undefined;
}
