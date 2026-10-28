export interface WS2<T extends WeakKey = A> extends WeakSet<T> {
    add(value: T): this;
    delete(value: T): boolean;
    has(value: T): boolean;
    addIfAbsent(value: T): boolean;
    toggle(value: T): boolean;
    deleteIfPresent(value: T): boolean;
    hasAll(values: Iterable<T>): boolean;
    hasAny(values: Iterable<T>): boolean;
    addAll(values: Iterable<T>): this;
    deleteAll(values: Iterable<T>): N;
    replace(oldValue: T, newValue: T): boolean;
    track(value: T): this;
    untrack(value: T): boolean;
    trackedKeys(): T[];
    forEachTracked(callback: (value: T, set: this) => void, thisArg?: A): void;
    clearTracked(): void;
}
export interface WS2C extends WeakSetConstructor {
    new <T extends WeakKey = A>(values?: readonly T[] | null): WS2I<T>;
    new <T extends WeakKey = A>(values?: Iterable<T> | null): WS2I<T>;
}
export declare class WS2I<T extends WeakKey = A> extends WeakSet<T> implements WS2<T> {
    private readonly _tracked;
    constructor(values?: readonly T[] | Iterable<T> | null);
    add(value: T): this;
    delete(value: T): boolean;
    has(value: T): boolean;
    addIfAbsent(value: T): boolean;
    toggle(value: T): boolean;
    deleteIfPresent(value: T): boolean;
    hasAll(values: Iterable<T>): boolean;
    hasAny(values: Iterable<T>): boolean;
    addAll(values: Iterable<T>): this;
    deleteAll(values: Iterable<T>): N;
    replace(oldValue: T, newValue: T): boolean;
    track(value: T): this;
    untrack(value: T): boolean;
    trackedKeys(): T[];
    forEachTracked(callback: (value: T, set: this) => void, thisArg?: A): void;
    clearTracked(): void;
}
