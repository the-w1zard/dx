export function setPrev(setter, k, v) {
    setter((prev) => k !== undefined ? { ...prev, [k]: v } : { ...prev, ...v });
}
export function setPrevB(setter) {
    setter((prev) => !prev);
}
