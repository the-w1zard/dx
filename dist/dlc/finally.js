export function Finally(value, fn) {
    fn();
    return value;
}
