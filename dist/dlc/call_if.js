export function callIf(condition, fn) {
    return condition ? fn() : undefined;
}
