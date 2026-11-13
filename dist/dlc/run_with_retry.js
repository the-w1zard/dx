export async function runWithRetry(fn, label, maxAttempts = 3, baseDelay = 1000) {
    let attempt = 0;
    let delay = baseDelay;
    while (attempt < maxAttempts) {
        try {
            return await fn();
        }
        catch (err) {
            attempt++;
            console.log(`[TimeMachine:${label}] attempt ${attempt} failed`, err);
            if (attempt >= maxAttempts) {
                console.log(`[TimeMachine:${label}] all retries failed`);
                return;
            }
            await new Promise(res => setTimeout(res, delay));
            delay *= 2;
        }
    }
}
