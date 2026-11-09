export const toPromise = <T>(value: T | PromiseLike<T>): Promise<T> => Promise.resolve(value)
