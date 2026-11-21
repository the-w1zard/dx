const DEF_R: S = "root";
const DEF_M: S = "master";
const DEF_S: S = "slave";
export const rv = <T>(v: UF<T>): T => typeof v === "function" ? (v as () => T)() : v;
export const sameValue = (a: A, b: A): B =>    Object.is(a, b) || (a instanceof Date && b instanceof Date && +a === +b);
type QuadSub<V> = (v: V | UD) => void;


export class QUAD<V = A> {
	#root: Record<S, Record<S, Record<S, Record<S, V>>>> = Object.create(null);
	#subRoot: Record<S, Record<S, Record<S, Record<S, Set<QuadSub<V>>>>>> = Object.create(null);
	_bear: Record<string, V> = Object.create(null);
	public s(v: UF<V>, k: S, s: S = DEF_S, m: S = DEF_M, r: S = DEF_R): this {
		const rL = (this.#root[r] ??= Object.create(null));
		const mL = (rL[m] ??= Object.create(null));
		const sL = (mL[s] ??= Object.create(null));
		const next = rv(v);
		sL[k] = next;
		this.#emit(k, s, m, r, next);
		return this;
	}
	public sl(s: S = DEF_S, m: S = DEF_M, r: S = DEF_R) {
		const rL = (this.#root[r] ??= Object.create(null));
		const mL = (rL[m] ??= Object.create(null));
		const sL = (mL[s] ??= Object.create(null));
		return sL;
	}
	public ks(v: UF<V>, k: S) { //                                    SET hot path
		const sL = this._bear
		const next = rv(v);
		sL[k] = next;
		this.#emit(k, DEF_S, DEF_M, DEF_R, next);
		return this;
	}
	public kg(k: S): V | UD { return this._bear[k]; } //              GET hot path
	public kh(k: S): B { return k in this._bear; } //                 HAS hot path
	public kd(k: S): B { //                                           DELTE hot path
		if (!(k in this._bear)) return false;
		delete this._bear[k];
		this.#emit(k, DEF_S, DEF_M, DEF_R, undefined);
		return true;
	}
	constructor() {
		this._bear = this.sl()
	}

	public g(k: S, s: S = DEF_S, m: S = DEF_M, r: S = DEF_R): V | UD {
		return this.#root[r]?.[m]?.[s]?.[k];
	}

	public h(k: S, s: S = DEF_S, m: S = DEF_M, r: S = DEF_R): B {
		return !!this.#root[r]?.[m]?.[s] && k in this.#root[r][m][s];
	}

	public d(k: S, s: S = DEF_S, m: S = DEF_M, r: S = DEF_R): B {
		const sL = this.#root[r]?.[m]?.[s];
		if (!sL || !(k in sL)) return false;
		delete sL[k];
		this.#emit(k, s, m, r, undefined);
		return true;
	}

	public on(fn: QuadSub<V>, k: S, s: S = DEF_S, m: S = DEF_M, r: S = DEF_R): () => void {
		const rL = (this.#subRoot[r] ??= Object.create(null));
		const mL = (rL[m] ??= Object.create(null));
		const sL = (mL[s] ??= Object.create(null));
		const set: Set<QuadSub<V>> = (sL[k] ??= new Set());
		set.add(fn);
		return () => {
			set.delete(fn);
			if (!set.size) delete sL[k];
		};
	}

	public off(fn: QuadSub<V>, k: S, s: S = DEF_S, m: S = DEF_M, r: S = DEF_R): void {
		this.#subRoot[r]?.[m]?.[s]?.[k]?.delete(fn);
	}

	#emit(k: S, s: S, m: S, r: S, v: V | UD): void {
		const set = this.#subRoot[r]?.[m]?.[s]?.[k];
		if (!set) return;
		for (const fn of set) fn(v);
	}
}
