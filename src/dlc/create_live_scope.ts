


//                                    CREATE LIVE SCOPE
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
export function createLiveScope() {
  const disposers: (() => void)[] = [];

  const scope = {
    setTimeout: (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      disposers.push(() => clearTimeout(id));
      return id;
    },
    setInterval: (fn: () => void, ms: number) => {
      const id = setInterval(fn, ms);
      disposers.push(() => clearInterval(id));
      return id;
    },
    subscribe: (unsubFn: () => void) => {
      disposers.push(unsubFn);
    },
    dispose: () => {
      while (disposers.length) disposers.pop()!();
    },
  };

  return scope;
}
// #endregion
