// Resolves when n callers have called .arrive(). That's it. And this is the only correct way to express "wait until N things have happened" without inventing a shared counter, a mutex, and a condition variable every time. Every distributed system, every parallel test runner, every "wait for all peers to check in" pattern, every "wait for the rasterizer to finish N tiles" — all of them are barriers. And 99% of them hand-roll the counter and the resolve call and get the race condition wrong.
export function barrier(n: number) {
  const { promise, resolve } = gate<void>()
  let arrived = 0
  return {
    arrive() { if (++arrived >= n) resolve() },
    wait() { return promise },
  }
}
