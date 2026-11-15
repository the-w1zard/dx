const DEF_R = "root";
const DEF_M = "master";
const DEF_S = "slave";
export const rv = (v) => typeof v === "function" ? v() : v;
export const sameValue = (a, b) => Object.is(a, b) || (a instanceof Date && b instanceof Date && +a === +b);
class QUAD {
    #root = Object.create(null);
    #subRoot = Object.create(null);
    _bear = Object.create(null);
    s(v, k, s = DEF_S, m = DEF_M, r = DEF_R) {
        const rL = (this.#root[r] ??= Object.create(null));
        const mL = (rL[m] ??= Object.create(null));
        const sL = (mL[s] ??= Object.create(null));
        const next = rv(v);
        sL[k] = next;
        this.#emit(k, s, m, r, next);
        return this;
    }
    sl(s = DEF_S, m = DEF_M, r = DEF_R) {
        const rL = (this.#root[r] ??= Object.create(null));
        const mL = (rL[m] ??= Object.create(null));
        const sL = (mL[s] ??= Object.create(null));
        return sL;
    }
    ks(v, k) {
        const sL = this._bear;
        const next = rv(v);
        sL[k] = next;
        this.#emit(k, DEF_S, DEF_M, DEF_R, next);
        return this;
    }
    kg(k) { return this._bear[k]; } //              GET hot path
    kh(k) { return k in this._bear; } //                 HAS hot path
    kd(k) {
        if (!(k in this._bear))
            return false;
        delete this._bear[k];
        this.#emit(k, DEF_S, DEF_M, DEF_R, undefined);
        return true;
    }
    constructor() {
        this._bear = this.sl();
    }
    g(k, s = DEF_S, m = DEF_M, r = DEF_R) {
        return this.#root[r]?.[m]?.[s]?.[k];
    }
    h(k, s = DEF_S, m = DEF_M, r = DEF_R) {
        return !!this.#root[r]?.[m]?.[s] && k in this.#root[r][m][s];
    }
    d(k, s = DEF_S, m = DEF_M, r = DEF_R) {
        const sL = this.#root[r]?.[m]?.[s];
        if (!sL || !(k in sL))
            return false;
        delete sL[k];
        this.#emit(k, s, m, r, undefined);
        return true;
    }
    on(fn, k, s = DEF_S, m = DEF_M, r = DEF_R) {
        const rL = (this.#subRoot[r] ??= Object.create(null));
        const mL = (rL[m] ??= Object.create(null));
        const sL = (mL[s] ??= Object.create(null));
        const set = (sL[k] ??= new Set());
        set.add(fn);
        return () => {
            set.delete(fn);
            if (!set.size)
                delete sL[k];
        };
    }
    off(fn, k, s = DEF_S, m = DEF_M, r = DEF_R) {
        this.#subRoot[r]?.[m]?.[s]?.[k]?.delete(fn);
    }
    #emit(k, s, m, r, v) {
        const set = this.#subRoot[r]?.[m]?.[s]?.[k];
        if (!set)
            return;
        for (const fn of set)
            fn(v);
    }
}
