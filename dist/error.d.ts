export interface ER2 extends Error {
    cause?: unknown;
    clone(): ER2I;
    toJSON(): {
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    toString(): string;
}
export interface ER2C extends ErrorConstructor {
    new (message?: string, options?: ErrorOptions): ER2I;
    (message?: string): string;
    readonly prototype: ER2I;
}
export declare class ER2I extends Error implements ER2 {
    constructor(message?: string, options?: ErrorOptions);
    clone(): ER2I;
    toJSON(): {
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    toString(): string;
    static is(value: unknown): value is Error;
    static isER2(value: unknown): value is ER2I;
    static from(value: unknown, fallback?: string): ER2I;
    static wrap(value: unknown, message?: string): ER2I;
    static aggregate(errors: Iterable<unknown>, message?: string): AggregateError;
}
