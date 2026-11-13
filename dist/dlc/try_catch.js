export async function tryCatch(fn) {
    try {
        return [undefined, await fn()];
    }
    catch (e) {
        return [e instanceof Error ? e : new Error(String(e)), undefined];
    }
}
