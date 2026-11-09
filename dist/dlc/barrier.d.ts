export declare function barrier(n: number): {
    arrive(): void;
    wait(): Promise<void>;
};
