export interface ILazy<T> {
    readonly isValueCreated: boolean;
    readonly value: T;
}
export declare class Lazy<T> implements ILazy<T> {
    private readonly _factory;
    private _isValueCreated;
    private _value;
    get isValueCreated(): boolean;
    get value(): T;
    constructor(factory: () => T);
}
