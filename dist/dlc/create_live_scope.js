//                                    CREATE LIVE SCOPE
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
export function createLiveScope() {
    const disposers = [];
    const scope = {
        setTimeout: (fn, ms) => {
            const id = setTimeout(fn, ms);
            disposers.push(() => clearTimeout(id));
            return id;
        },
        setInterval: (fn, ms) => {
            const id = setInterval(fn, ms);
            disposers.push(() => clearInterval(id));
            return id;
        },
        subscribe: (unsubFn) => {
            disposers.push(unsubFn);
        },
        dispose: () => {
            while (disposers.length)
                disposers.pop()();
        },
    };
    return scope;
}
// #endregion
