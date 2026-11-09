export function lwwState(v: Record<string, A>): [Record<string, A>, (u: unknown) => void] {
    let state: Record<string, A> = { ...v };
    let ts = new Map<string, number>(Object.entries(v ?? {}).map(([k]) => [k, 0] as const));
    const set = (patch: unknown) => {
        const p = (patch ?? {}) as Record<string, A>;
        for (const [k, v] of Object.entries(p)) {
            const t = Date.now();
            if ((ts.get(k) ?? 0) < t) { ts.set(k, t); state = { ...state, [k]: v }; }
        }
    };
    return [state, set];
}
