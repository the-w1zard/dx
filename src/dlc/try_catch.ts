
export async function tryCatch<T>(fn: () => T | Promise<T>): Promise<[Error, undefined] | [undefined, T]> {// Turn a possibly-throwing function into a Result-ish tuple.
  try { return [undefined, await fn()] }
  catch (e) { return [e instanceof Error ? e : new Error(String(e)), undefined] }
}
