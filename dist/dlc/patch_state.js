export function patchState(setState, patch) {
    setState((prev) => ({ ...prev, ...patch }));
}
