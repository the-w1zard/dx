// alongside resolveFactory, buildCtx, createLiveSelf
export function once(fn) {
    let cached;
    let done = false;
    return () => {
        if (!done) {
            cached = fn();
            done = true;
        }
        return cached;
    };
}
export function onceB(fn) {
    let called = false;
    let value;
    return ((...args) => {
        if (!called) {
            called = true;
            value = fn(...args);
        }
        return value;
    });
}
