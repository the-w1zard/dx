export function callIf<T>(condition: any, fn: () => T,): T | undefined {
  return condition ? fn() : undefined
}
