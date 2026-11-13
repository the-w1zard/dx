export declare function gate<T = void>(): {
    promise: Promise<T>;
    open: (v: T) => void;
};
export declare function reGate<T = void>(): {
    readonly promise: Promise<T>;
    readonly opened: boolean;
    open: (v: T | PromiseLike<T>) => void;
    reset: () => void;
};
//# sourceMappingURL=gate.d.ts.map