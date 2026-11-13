export function setKey(setState, key, value) {
    setState((prev) => ({ ...prev, [key]: value }));
}
