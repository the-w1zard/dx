// It's deferred minus the failure case. And it's the right choice when failure genuinely doesn't exist — "wait for this thing to be ready" is not a thing that fails, it just takes longer than you're willing to wait. So the caller brings the timeout (which is what wait(ms) does), not the gate. That asymmetry is important: the gate doesn't decide what "too late" means; the waiter does. Which is why wait(0) = forever and wait(5000) = give up at 5s are both correct — the gate is timeless, the wait has a time.
export function gate<T = void>() {
  let resolve!: (v: T) => void
  const promise = new Promise<T>(r => { resolve = r })
  return { promise, open: resolve }
}

export function reGate<T = void>() {
    /**
     * const g = gate<void>()

    g.open()
    await g.promise // resolves

    g.reset()

    const next = g.promise
    g.open()
    await next // resolves in the next cycle
    */

    let open!: (v: T | PromiseLike<T>) => void
    let promise: Promise<T>
    let opened = false

    const reset = () => {
        opened = false
        promise = new Promise<T>(resolve => open = resolve)
    }

    const release = (v: T | PromiseLike<T>) => {
        if (opened) return
        opened = true
        open(v)
    }

    reset()

    return {
        get promise() { return promise },
        get opened() { return opened },
        open: release,
        reset,
    }
}

