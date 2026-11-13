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
export declare function retryWithBackoff<T>({ attempts, baseDelayMs, maxDelayMs, isCancelled, attempt, onAttemptFailed, onGiveUp, }: {
    attempts?: number | undefined;
    baseDelayMs?: number | undefined;
    maxDelayMs?: number | undefined;
    isCancelled?: (() => boolean) | undefined;
    attempt?: ((n: any) => Promise<void>) | undefined;
    onAttemptFailed?: ((n: any, e: any) => void) | undefined;
    onGiveUp?: (() => void) | undefined;
}): Promise<T | undefined>;
//# sourceMappingURL=retry_with_backoff.d.ts.map