export const invoke = <T>(fn: () => T) => (_event?: unknown) => fn()// Make an event handler that ignores the event.
