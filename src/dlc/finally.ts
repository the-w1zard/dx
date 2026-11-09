export function Finally<T>(value: T, fn: () => any,): T {
  fn()
  return value
}
