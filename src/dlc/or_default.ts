export const orDefault = <T>(value: T | null | undefined, fallback: T): T => value ?? fallback
