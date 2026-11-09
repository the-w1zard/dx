
export function patchState<T = any>(setState: any, patch: Partial<T>,) {
  setState((prev: any) => ({ ...prev, ...patch }))
}
