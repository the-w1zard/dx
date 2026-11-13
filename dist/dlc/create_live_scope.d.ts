export declare function createLiveScope(): {
    setTimeout: (fn: () => void, ms: number) => NodeJS.Timeout;
    setInterval: (fn: () => void, ms: number) => NodeJS.Timeout;
    subscribe: (unsubFn: () => void) => void;
    dispose: () => void;
};
//# sourceMappingURL=create_live_scope.d.ts.map