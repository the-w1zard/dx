export const ignoreArg = <T>(fn: () => T) => (_arg?: unknown) => fn()// Adapt a no-argument callback to APIs that pass an event.
