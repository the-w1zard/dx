function escapeRegex(str: S): S {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function escapeForClass(chars: S): S {
	return chars.replace(/[\]\\^-]/g, "\\$&");
}
function toSource(input: RE2Input): S {
	if (typeof input === "string") return input;
	return input.source;
}
function isBalancedGroup(src: S): B {
	if (src[0] !== "(" || src[src.length - 1] !== ")") return false;
	let depth = 0;
	for (let i = 0; i < src.length; i++) {
		if (src[i] === "\\") { i++; continue; }
		if (src[i] === "(") depth++;
		else if (src[i] === ")") {
			depth--;
			if (depth === 0 && i !== src.length - 1) return false;
		}
	}
	return true;
}
function isBalancedClass(src: S): B {
	if (src[0] !== "[" || src[src.length - 1] !== "]") return false;
	for (let i = 1; i < src.length - 1; i++) {
		if (src[i] === "\\") { i++; continue; }
		if (src[i] === "]") return false;
	}
	return true;
}
function wrapForConcat(src: S): S {
	if (src.length === 1) return src;
	if (/^\\.$/.test(src)) return src;
	if (/^\[.*\]$/.test(src) && isBalancedClass(src)) return src;
	if (/^\(.*\)$/.test(src) && isBalancedGroup(src)) return src;
	return `(?:${src})`;
}
function mergeFlags(base: S, parts: AR<RE2Input>): S {
	const set = new Set(base.split(""));
	for (const p of parts) {
		if (p instanceof REC2 || p instanceof RegExp) p.flags.split("").forEach(f => set.add(f));
	}
	return [...set].join("");
}
export class REC2 implements RE2_IF {
	#re: RegExp;

	constructor(source: S, flags: S = "") {
		this.#re = new RegExp(source, flags);
	}

	//                                                                                         [PASSTHROUGH]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
	get source(): S { return this.#re.source; }
	get flags(): S { return this.#re.flags; }
	get global(): B { return this.#re.global; }
	get ignoreCase(): B { return this.#re.ignoreCase; }
	get multiline(): B { return this.#re.multiline; }
	get sticky(): B { return this.#re.sticky; }
	get unicode(): B { return this.#re.unicode; }
	get dotAll(): B { return this.#re.dotAll; }
	get hasIndices(): B { return this.#re.hasIndices; }
	toRegExp(): RegExp { return new RegExp(this.#re.source, this.#re.flags); }
	// #endregion
	//                                                                                                [BASE]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
	test(str: S): B { return new RegExp(this.#re.source, this.#re.flags).test(str); }
	h(str: S): B { return this.test(str); }
	exec(str: S): RegExpExecArray | null {
		return new RegExp(this.#re.source, this.#re.flags).exec(str);
	}
	g(str: S): S | UD { return this.exec(str)?.[0]; }
	at(str: S, n: N): S | UD {                              // auto-forces g internally
		const all = this.matches(str);
		const i = n < 0 ? all.length + n : n;
		return all[i]?.match;
	}
	groups(str: S): OB<S> | UD { return this.exec(str)?.groups as OB<S> | UD; }
	group(str: S, name: S | N): S | UD {
		const m = this.exec(str);
		if (!m) return undefined;
		return typeof name === "number" ? m[name] : m.groups?.[name];
	}
 
	index(str: S): N { return this.exec(str)?.index ?? -1; }
	lastIndexOf(str: S): N {                                // auto-forces g internally
		const all = this.matches(str);
		return all.length ? all[all.length - 1].index : -1;
	}
	span(str: S): [N, N] | UD {
		const m = this.exec(str);
		return m ? [m.index, m.index + m[0].length] : undefined;
	}
	// #endregion
	//                                                                                             [COLLECT]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
	all(str: S): AR<S> { return this.matches(str).map(m => m.match); }
	matches(str: S): AR<RE2Match> {
		const out: AR<RE2Match> = [];
		for (const m of str.matchAll(this.#forceGlobal())) {
			out.push({
				match: m[0],
				index: m.index!,
				lastIndex: m.index! + m[0].length,
				groups: m.groups as OB<S> | UD,
				raw: m as RegExpExecArray,
			});
		}
		return out;
	}
	allGroups(str: S): AR<OB<S>> { return this.matches(str).map(m => m.groups ?? {}); }
	allSpans(str: S): AR<[N, N]> { return this.matches(str).map(m => [m.index, m.lastIndex] as [N, N]); }
	count(str: S): N { return this.matches(str).length; }
	positions(str: S): AR<N> { return this.matches(str).map(m => m.index); }
	// #endregion
	//                                                                                             [REPLACE]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
	#parseArgs(args: AR<A>, str: S): [RegExpExecArray, OB<S> | UD, N] {
		const groups = typeof args[args.length - 1] === "object" ? args.pop() : undefined;
		const index = args[args.length - 2] as N;
		const raw = [args[0], ...args.slice(1, -2)] as unknown as RegExpExecArray;
		(raw as A).index = index;
		(raw as A).input = str;
		(raw as A).groups = groups;
		return [raw, groups, index];
	}
	replace(str: S, fn: S | RE2ReplaceFn): S {
		const re = new RegExp(this.#re.source, this.#re.flags);
		if (typeof fn === "string") return str.replace(re, fn);
		return str.replace(re, (...a: AR<A>) => {
			const [raw, groups, index] = this.#parseArgs(a, str);
			return fn(raw, groups, index, str);
		});
	}
	replaceFirst(str: S, fn: S | RE2ReplaceFn): S {
		const re = new RegExp(this.#re.source, this.#re.flags.replace("g", ""));
		if (typeof fn === "string") return str.replace(re, fn);
		return str.replace(re, (...a: AR<A>) => {
			const [raw, groups, index] = this.#parseArgs(a, str);
			return fn(raw, groups, index, str);
		});
	}
	replaceAt(str: S, n: N, fn: S | RE2ReplaceFn): S {        // auto-forces g internally
		const total = this.matches(str).length;
		const target = n < 0 ? total + n : n;
		let i = 0;
		return str.replace(this.#forceGlobal(), (...a: AR<A>) => {
			const match = a[0] as S;
			const isTarget = i === target;
			i++;
			if (!isTarget) return match;
			if (typeof fn === "string") return fn;
			const [raw, groups, index] = this.#parseArgs(a, str);
			return fn(raw, groups, index, str);
		});
	}
	remove(str: S): S { return this.replace(str, ""); }
	removeFirst(str: S): S { return this.replaceFirst(str, ""); }
	split(str: S, limit?: N): AR<S> { return str.split(new RegExp(this.#re.source, this.#re.flags), limit); }
	splitKeep(str: S): AR<S> {
		const flags = this.flags.includes("g") ? this.flags : this.flags + "g";
		const re = new RegExp(`(${this.#re.source})`, flags);
		return str.split(re).filter(s => s !== "");
	}
	// #endregion
	//                                                                                               [BUILD]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
	withFlags(flags: S): RE2_IF { return new REC2(this.#re.source, flags); }
	addFlag(flag: RE2Flag): RE2_IF { return this.flags.includes(flag) ? this.clone() : new REC2(this.#re.source, this.flags + flag); }
	removeFlag(flag: RE2Flag): RE2_IF { return new REC2(this.#re.source, this.flags.replace(flag, "")); }
	toggleFlag(flag: RE2Flag): RE2_IF { return this.flags.includes(flag) ? this.removeFlag(flag) : this.addFlag(flag); }
	withSource(src: S): RE2_IF { return new REC2(src, this.flags); }
	and(...parts: AR<RE2Input>): RE2_IF {
		const src = [this.#re.source, ...parts.map(toSource)].map(wrapForConcat).join("");
		return new REC2(src, mergeFlags(this.flags, parts));
	}
	or(...parts: AR<RE2Input>): RE2_IF {
		const src = `(?:${[this.#re.source, ...parts.map(toSource)].join("|")})`;
		return new REC2(src, mergeFlags(this.flags, parts));
	}
    cap(expr?: RE2Input): RE2_IF {
		return new REC2(`(${expr === undefined ? this.#re.source : toSource(expr)})`, this.flags);
	}
	namedGroup(name: S, expr: RE2Input): RE2_IF { return new REC2(`(?<${name}>${toSource(expr)})`, this.flags); }
	nonCap(expr: RE2Input): RE2_IF { return new REC2(`(?:${toSource(expr)})`, this.flags); }
	lookahead(expr: RE2Input): RE2_IF { return new REC2(`(?=${toSource(expr)})`, this.flags); }
	notLookahead(expr: RE2Input): RE2_IF { return new REC2(`(?!${toSource(expr)})`, this.flags); }
	lookbehind(expr: RE2Input): RE2_IF { return new REC2(`(?<=${toSource(expr)})`, this.flags); }
	notLookbehind(expr: RE2Input): RE2_IF { return new REC2(`(?<!${toSource(expr)})`, this.flags); }
	optional(expr?: RE2Input): RE2_IF { return new REC2(`${wrapForConcat(expr === undefined ? this.#re.source : toSource(expr))}?`, this.flags); }
	many(expr?: RE2Input): RE2_IF { return new REC2(`${wrapForConcat(expr === undefined ? this.#re.source : toSource(expr))}+`, this.flags); }
	maybeMany(expr?: RE2Input): RE2_IF { return new REC2(`${wrapForConcat(expr === undefined ? this.#re.source : toSource(expr))}*`, this.flags); }
	repeat(n: N, max?: N, expr?: RE2Input): RE2_IF {
		const src = wrapForConcat(expr === undefined ? this.#re.source : toSource(expr));
		return new REC2(`${src}${max === undefined ? `{${n}}` : `{${n},${max}}`}`, this.flags);
	}
	/**
	 * [BEST-EFFORT] Appends `?` after a trailing `*`/`+`/`?`/`{n,m}` to make it lazy.
	 * Only looks at the END of the source — it's not a regex parser, it won't find
	 * quantifiers buried mid-pattern. Meant to be chained right after .optional()/
	 * .many()/.maybeMany()/.repeat(), where the quantifier IS the last token.
	 * If no trailing quantifier is found, returns an unchanged clone.
	 */
	lazy(): RE2_IF {
		const src = this.#re.source;
		if (/[*+?]$/.test(src) || /\{\d+(,\d*)?\}$/.test(src)) return new REC2(`${src}?`, this.flags);
		return this.clone();
	}
	// #endregion
	//                                                                                        [DEBUG/SAFETY]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
	$trace(str: S): AR<RE2Match> { return this.matches(str); }
	$explain(): AR<S> {
        const flagNotes: AR<S> = [];
        if (this.global) flagNotes.push("matches all occurrences (g)");
        if (this.ignoreCase) flagNotes.push("case-insensitive (i)");
        if (this.multiline) flagNotes.push("^/$ match per line (m)");
        if (this.dotAll) flagNotes.push(". matches newlines (s)");
        if (this.sticky) flagNotes.push("sticky from lastIndex (y)");
        if (this.unicode) flagNotes.push("unicode mode (u)");
    
        return [...flagNotes, "pattern:", ...explainSource(this.#re.source).map(l => `  ${l}`)];
    }
	$risky(): B { return /\([^)]*[+*][^)]*\)[+*]/.test(this.#re.source); }
	$bench(str: S, iterations: N = 1000): N {
		const re = new RegExp(this.#re.source, this.flags);
		const start = performance.now();
		for (let i = 0; i < iterations; i++) re.test(str);
		return performance.now() - start;
	}
	// #endregion
	//                                                                                              [CODECS]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
	toString(): S { return this.#re.toString(); }
    equals(other: RE2Input): B {
        const o = typeof other === "string" ? new RegExp(other)
            : other instanceof RegExp ? other
            : other; // remaining case is RE2_IF, which has .source/.flags already
        return this.#re.source === o.source && this.#re.flags === o.flags;
    }
	clone(): RE2_IF { return new REC2(this.#re.source, this.flags); }

	#forceGlobal(): RegExp {
		const flags = this.flags.includes("g") ? this.flags : this.flags + "g";
		return new RegExp(this.#re.source, flags);
	}

	static fromRegExp(re: RegExp): REC2 { return new REC2(re.source, re.flags); }
	// #endregion
}
//                                                                                  [PATTERN EXPLAIN ENGINE]
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════

interface ExplainNode {
	desc: S;
	children?: AR<ExplainNode>;
}

function explainSource(source: S): AR<S> {
	let i = 0;
	const n = source.length;
	const peek = (): S => source[i];
	const eof = (): B => i >= n;

	function parseAlt(): ExplainNode {
		const branches = [parseSeq()];
		while (!eof() && peek() === "|") { i++; branches.push(parseSeq()); }
		return branches.length === 1 ? branches[0] : { desc: "one of:", children: branches };
	}
	function parseSeq(): ExplainNode {
		const items: AR<ExplainNode> = [];
		while (!eof() && peek() !== "|" && peek() !== ")") items.push(parseQuantified());
		if (items.length === 0) return { desc: "(empty)" };
		return items.length === 1 ? items[0] : { desc: "in sequence:", children: items };
	}
	function parseQuantified(): ExplainNode {
		const atom = parseAtom();
		if (eof()) return atom;

		let quant: S | UD;
		const c = peek();
		if (c === "*") { i++; quant = "zero or more"; }
		else if (c === "+") { i++; quant = "one or more"; }
		else if (c === "?") { i++; quant = "optional (zero or one)"; }
		else if (c === "{") {
			const m = /^\{(\d+)(,(\d*))?\}/.exec(source.slice(i));
			if (m) {
				i += m[0].length;
				quant = m[2] === undefined ? `exactly ${m[1]} time${m[1] === "1" ? "" : "s"}`
					: m[3] === "" ? `${m[1]} or more times`
					: `between ${m[1]} and ${m[3]} times`;
			}
		}
		if (!quant) return atom;

		let lazy = false;
		if (!eof() && peek() === "?") { i++; lazy = true; }
		return { desc: `${atom.desc} — ${quant}${lazy ? " (lazy, as few as possible)" : ""}`, children: atom.children };
	}
	function parseAtom(): ExplainNode {
		const c = peek();
		if (c === "(") return parseGroup();
		if (c === "[") return parseClass();
		if (c === "^") { i++; return { desc: "start of string/line" }; }
		if (c === "$") { i++; return { desc: "end of string/line" }; }
		if (c === ".") { i++; return { desc: "any character" }; }
		if (c === "\\") return parseEscape();

		let lit = "";
		while (!eof() && !"\\^$.|?*+()[]{}".includes(peek())) lit += source[i++];
		if (lit) return { desc: `literally "${lit}"` };
		i++;
		return { desc: `literally "${c}"` };
	}
	function parseEscape(): ExplainNode {
		i++;
		const c = source[i++];
		const map: OB<S> = {
			d: "a digit", D: "a non-digit", w: "a word character", W: "a non-word character",
			s: "whitespace", S: "non-whitespace", b: "a word boundary", B: "not a word boundary",
			n: "a newline", t: "a tab", r: "a carriage return",
		};
		return { desc: map[c] ?? `literally "${c}"` };
	}
	function parseClass(): ExplainNode {
		i++;
		let negate = false;
		if (peek() === "^") { negate = true; i++; }
		let body = "";
		while (!eof() && peek() !== "]") {
			body += peek() === "\\" ? source[i++] + source[i++] : source[i++];
		}
		i++;
		return { desc: `${negate ? "any character NOT" : "any character"} in [${body}]` };
	}
	function parseGroup(): ExplainNode {
		i++; // consume '('
		let kind = "capturing group";

		if (peek() === "?") {
			const c2 = source[i + 1];
			if (c2 === ":") { i += 2; kind = "non-capturing group"; }
			else if (c2 === "=") { i += 2; kind = "lookahead — must be followed by"; }
			else if (c2 === "!") { i += 2; kind = "negative lookahead — must NOT be followed by"; }
			else if (c2 === "<" && source[i + 2] === "=") { i += 3; kind = "lookbehind — must be preceded by"; }
			else if (c2 === "<" && source[i + 2] === "!") { i += 3; kind = "negative lookbehind — must NOT be preceded by"; }
			else if (c2 === "<") {
				i += 2;
				let nm = "";
				while (source[i] !== ">") nm += source[i++];
				i++;
				kind = `named capturing group "${nm}"`;
			}
		}
		const inner = parseAlt();
		if (peek() === ")") i++;
		return { desc: kind, children: [inner] };
	}

	const tree = parseAlt();
	const lines: AR<S> = [];
	(function render(node: ExplainNode, depth: N) {
		lines.push(`${"  ".repeat(depth)}${node.desc}`);
		node.children?.forEach(c => render(c, depth + 1));
	})(tree, 0);

	return lines;
}
//                                                                                       [STATICS / PRESETS]
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
export const RECC2: RE2Static = Object.assign(
	(input: RE2Input, flags?: S): RE2_IF => RECC2.of(input, flags),
	{
		of(input: RE2Input, flags?: S): RE2_IF {
            if (typeof input === "string") return new REC2(input, flags ?? "");
            if (input instanceof RegExp) return new REC2(input.source, flags ?? input.flags);
            // remaining case is RE2_IF
            return flags !== undefined ? input.withFlags(flags) : input.clone();
        },
		escape: escapeRegex,
		literal(str: S): RE2_IF { return new REC2(escapeRegex(str)); },
		seq(...parts: AR<RE2Input>): RE2_IF {
			return new REC2(parts.map(p => wrapForConcat(toSource(p))).join(""), mergeFlags("", parts));
		},
		alt(...parts: AR<RE2Input>): RE2_IF {
			return new REC2(`(?:${parts.map(toSource).join("|")})`, mergeFlags("", parts));
		},

		digit: new REC2("\\d"), word: new REC2("\\w"), space: new REC2("\\s"), any: new REC2("."),
		notDigit: new REC2("\\D"), notWord: new REC2("\\W"), notSpace: new REC2("\\S"),
		range(from: S, to: S): RE2_IF { return new REC2(`[${from}-${to}]`); },
		oneOf(chars: S): RE2_IF { return new REC2(`[${escapeForClass(chars)}]`); },
		noneOf(chars: S): RE2_IF { return new REC2(`[^${escapeForClass(chars)}]`); },

		email: new REC2("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"),
		url: new REC2("https?:\\/\\/[^\\s/$.?#].[^\\s]*", "i"),
		uuid: new REC2("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", "i"),
		ipv4: new REC2("(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)"),
		ipv6: new REC2("(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}"),
		hex: new REC2("[0-9a-fA-F]+"),
		hexColor: new REC2("#(?:[0-9a-fA-F]{3}){1,2}\\b"),
		slug: new REC2("[a-z0-9]+(?:-[a-z0-9]+)*"),
		alphaNumeric: new REC2("[a-zA-Z0-9]+"),
		integer: new REC2("-?\\d+"),
		float: new REC2("-?\\d+(?:\\.\\d+)?"),
		phoneLoose: new REC2("\\+?\\d[\\d\\s().-]{6,}\\d"),
		isoDate: new REC2("\\d{4}-\\d{2}-\\d{2}"),
		base64: new REC2("(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?"),
		jwt: new REC2("[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+"),
		semver: new REC2("\\d+\\.\\d+\\.\\d+(?:-[0-9A-Za-z.-]+)?(?:\\+[0-9A-Za-z.-]+)?"),
		creditCard: new REC2("\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{1,4}"),
		htmlTag: new REC2("<\\/?[a-zA-Z][^>]*>"),
		whitespaceOnly: new REC2("^\\s*$"),
	},
);

(globalThis as A).REC2 = REC2;
(globalThis as A).RE2 = RECC2;

/*  ====================================================================================================
    
    ============================================================= ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [REGEX] */
