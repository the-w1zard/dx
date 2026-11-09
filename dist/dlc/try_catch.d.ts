export declare function tryCatch<T>(fn: () => T | Promise<T>): Promise<[Error, undefined] | [undefined, T]>;
