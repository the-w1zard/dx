export function lwwState(v) {
    let state = { ...v };
    let ts = new Map(Object.entries(v ?? {}).map(([k]) => [k, 0]));
    const set = (patch) => {
        const p = (patch ?? {});
        for (const [k, v] of Object.entries(p)) {
            const t = Date.now();
            if ((ts.get(k) ?? 0) < t) {
                ts.set(k, t);
                state = { ...state, [k]: v };
            }
        }
    };
    return [state, set];
}
