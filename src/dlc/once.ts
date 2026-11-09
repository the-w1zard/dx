// alongside resolveFactory, buildCtx, createLiveSelf
export function once<T>(fn: () => T): () => T {
  let cached: T;
  let done = false;
  return () => {
    if (!done) {
      cached = fn();
      done = true;
    }
    return cached;
  };
}



export function onceB<F extends (...args: any[]) => any>(fn: F): F {
  let called = false
  let value: any

  return ((...args: any[]) => {
    if (!called) {
      called = true
      value = fn(...args)
    }
    return value
  }) as F
}
