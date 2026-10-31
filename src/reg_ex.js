function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function escapeForClass(chars) {
    return chars.replace(/[\]\\^-]/g, "\\$&");
}
function toSource(input) {
    if (typeof input === "string")
        return input;
    return input.source;
}
function isBalancedGroup(src) {
    if (src[0] !== "(" || src[src.length - 1] !== ")")
        return false;
    let depth = 0;
    for (let i = 0; i < src.length; i++) {
        if (src[i] === "\\") {
            i++;
            continue;
        }
        if (src[i] === "(")
            depth++;
        else if (src[i] === ")") {
            depth--;
            if (depth === 0 && i !== src.length - 1)
                return false;
        }
    }
    return true;
}
function isBalancedClass(src) {
    if (src[0] !== "[" || src[src.length - 1] !== "]")
        return false;
    for (let i = 1; i < src.length - 1; i++) {
        if (src[i] === "\\") {
            i++;
            continue;
        }
        if (src[i] === "]")
            return false;
    }
    return true;
}
function wrapForConcat(src) {
    if (src.length === 1)
        return src;
    if (/^\\.$/.test(src))
        return src;
    if (/^\[.*\]$/.test(src) && isBalancedClass(src))
        return src;
    if (/^\(.*\)$/.test(src) && isBalancedGroup(src))
        return src;
    return `(?:${src})`;
}
function mergeFlags(base, parts) {
    const set = new Set(base.split(""));
    for (const p of parts) {
        if (p instanceof REC2 || p instanceof RegExp)
            p.flags.split("").forEach(f => set.add(f));
    }
    return [...set].join("");
}
export class REC2 {
    #re;
    constructor(source, flags = "") {
        this.#re = new RegExp(source, flags);
    }
    //                                                                                         [PASSTHROUGH]
    // #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
    get source() { return this.#re.source; }
    get flags() { return this.#re.flags; }
    get global() { return this.#re.global; }
    get ignoreCase() { return this.#re.ignoreCase; }
    get multiline() { return this.#re.multiline; }
    get sticky() { return this.#re.sticky; }
    get unicode() { return this.#re.unicode; }
    get dotAll() { return this.#re.dotAll; }
    get hasIndices() { return this.#re.hasIndices; }
    toRegExp() { return new RegExp(this.#re.source, this.#re.flags); }
    // #endregion
    //                                                                                                [BASE]
    // #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
    test(str) { return new RegExp(this.#re.source, this.#re.flags).test(str); }
    h(str) { return this.test(str); }
    exec(str) {
        return new RegExp(this.#re.source, this.#re.flags).exec(str);
    }
    g(str) { return this.exec(str)?.[0]; }
    at(str, n) {
        const all = this.matches(str);
        const i = n < 0 ? all.length + n : n;
        return all[i]?.match;
    }
    groups(str) { return this.exec(str)?.groups; }
    group(str, name) {
        const m = this.exec(str);
        if (!m)
            return undefined;
        return typeof name === "number" ? m[name] : m.groups?.[name];
    }
    index(str) { return this.exec(str)?.index ?? -1; }
    lastIndexOf(str) {
        const all = this.matches(str);
        return all.length ? all[all.length - 1].index : -1;
    }
    span(str) {
        const m = this.exec(str);
        return m ? [m.index, m.index + m[0].length] : undefined;
    }
    // #endregion
    //                                                                                             [COLLECT]
    // #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
    all(str) { return this.matches(str).map(m => m.match); }
    matches(str) {
        const out = [];
        for (const m of str.matchAll(this.#forceGlobal())) {
            out.push({
                match: m[0],
                index: m.index,
                lastIndex: m.index + m[0].length,
                groups: m.groups,
                raw: m,
            });
        }
        return out;
    }
    allGroups(str) { return this.matches(str).map(m => m.groups ?? {}); }
    allSpans(str) { return this.matches(str).map(m => [m.index, m.lastIndex]); }
    count(str) { return this.matches(str).length; }
    positions(str) { return this.matches(str).map(m => m.index); }
    // #endregion
    //                                                                                             [REPLACE]
    // #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
    #parseArgs(args, str) {
        const groups = typeof args[args.length - 1] === "object" ? args.pop() : undefined;
        const index = args[args.length - 2];
        const raw = [args[0], ...args.slice(1, -2)];
        raw.index = index;
        raw.input = str;
        raw.groups = groups;
        return [raw, groups, index];
    }
    replace(str, fn) {
        const re = new RegExp(this.#re.source, this.#re.flags);
        if (typeof fn === "string")
            return str.replace(re, fn);
        return str.replace(re, (...a) => {
            const [raw, groups, index] = this.#parseArgs(a, str);
            return fn(raw, groups, index, str);
        });
    }
    replaceFirst(str, fn) {
        const re = new RegExp(this.#re.source, this.#re.flags.replace("g", ""));
        if (typeof fn === "string")
            return str.replace(re, fn);
        return str.replace(re, (...a) => {
            const [raw, groups, index] = this.#parseArgs(a, str);
            return fn(raw, groups, index, str);
        });
    }
    replaceAt(str, n, fn) {
        const total = this.matches(str).length;
        const target = n < 0 ? total + n : n;
        let i = 0;
        return str.replace(this.#forceGlobal(), (...a) => {
            const match = a[0];
            const isTarget = i === target;
            i++;
            if (!isTarget)
                return match;
            if (typeof fn === "string")
                return fn;
            const [raw, groups, index] = this.#parseArgs(a, str);
            return fn(raw, groups, index, str);
        });
    }
    remove(str) { return this.replace(str, ""); }
    removeFirst(str) { return this.replaceFirst(str, ""); }
    split(str, limit) { return str.split(new RegExp(this.#re.source, this.#re.flags), limit); }
    splitKeep(str) {
        const flags = this.flags.includes("g") ? this.flags : this.flags + "g";
        const re = new RegExp(`(${this.#re.source})`, flags);
        return str.split(re).filter(s => s !== "");
    }
    // #endregion
    //                                                                                               [BUILD]
    // #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
    withFlags(flags) { return new REC2(this.#re.source, flags); }
    addFlag(flag) { return this.flags.includes(flag) ? this.clone() : new REC2(this.#re.source, this.flags + flag); }
    removeFlag(flag) { return new REC2(this.#re.source, this.flags.replace(flag, "")); }
    toggleFlag(flag) { return this.flags.includes(flag) ? this.removeFlag(flag) : this.addFlag(flag); }
    withSource(src) { return new REC2(src, this.flags); }
    and(...parts) {
        const src = [this.#re.source, ...parts.map(toSource)].map(wrapForConcat).join("");
        return new REC2(src, mergeFlags(this.flags, parts));
    }
    or(...parts) {
        const src = `(?:${[this.#re.source, ...parts.map(toSource)].join("|")})`;
        return new REC2(src, mergeFlags(this.flags, parts));
    }
    cap(expr) {
        return new REC2(`(${expr === undefined ? this.#re.source : toSource(expr)})`, this.flags);
    }
    namedGroup(name, expr) { return new REC2(`(?<${name}>${toSource(expr)})`, this.flags); }
    nonCap(expr) { return new REC2(`(?:${toSource(expr)})`, this.flags); }
    lookahead(expr) { return new REC2(`(?=${toSource(expr)})`, this.flags); }
    notLookahead(expr) { return new REC2(`(?!${toSource(expr)})`, this.flags); }
    lookbehind(expr) { return new REC2(`(?<=${toSource(expr)})`, this.flags); }
    notLookbehind(expr) { return new REC2(`(?<!${toSource(expr)})`, this.flags); }
    optional(expr) { return new REC2(`${wrapForConcat(expr === undefined ? this.#re.source : toSource(expr))}?`, this.flags); }
    many(expr) { return new REC2(`${wrapForConcat(expr === undefined ? this.#re.source : toSource(expr))}+`, this.flags); }
    maybeMany(expr) { return new REC2(`${wrapForConcat(expr === undefined ? this.#re.source : toSource(expr))}*`, this.flags); }
    repeat(n, max, expr) {
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
    lazy() {
        const src = this.#re.source;
        if (/[*+?]$/.test(src) || /\{\d+(,\d*)?\}$/.test(src))
            return new REC2(`${src}?`, this.flags);
        return this.clone();
    }
    // #endregion
    //                                                                                        [DEBUG/SAFETY]
    // #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
    $trace(str) { return this.matches(str); }
    $explain() {
        const flagNotes = [];
        if (this.global)
            flagNotes.push("matches all occurrences (g)");
        if (this.ignoreCase)
            flagNotes.push("case-insensitive (i)");
        if (this.multiline)
            flagNotes.push("^/$ match per line (m)");
        if (this.dotAll)
            flagNotes.push(". matches newlines (s)");
        if (this.sticky)
            flagNotes.push("sticky from lastIndex (y)");
        if (this.unicode)
            flagNotes.push("unicode mode (u)");
        return [...flagNotes, "pattern:", ...explainSource(this.#re.source).map(l => `  ${l}`)];
    }
    $risky() { return /\([^)]*[+*][^)]*\)[+*]/.test(this.#re.source); }
    $bench(str, iterations = 1000) {
        const re = new RegExp(this.#re.source, this.flags);
        const start = performance.now();
        for (let i = 0; i < iterations; i++)
            re.test(str);
        return performance.now() - start;
    }
    // #endregion
    //                                                                                              [CODECS]
    // #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
    toString() { return this.#re.toString(); }
    equals(other) {
        const o = typeof other === "string" ? new RegExp(other)
            : other instanceof RegExp ? other
                : other; // remaining case is RE2_IF, which has .source/.flags already
        return this.#re.source === o.source && this.#re.flags === o.flags;
    }
    clone() { return new REC2(this.#re.source, this.flags); }
    #forceGlobal() {
        const flags = this.flags.includes("g") ? this.flags : this.flags + "g";
        return new RegExp(this.#re.source, flags);
    }
    static fromRegExp(re) { return new REC2(re.source, re.flags); }
}
function explainSource(source) {
    let i = 0;
    const n = source.length;
    const peek = () => source[i];
    const eof = () => i >= n;
    function parseAlt() {
        const branches = [parseSeq()];
        while (!eof() && peek() === "|") {
            i++;
            branches.push(parseSeq());
        }
        return branches.length === 1 ? branches[0] : { desc: "one of:", children: branches };
    }
    function parseSeq() {
        const items = [];
        while (!eof() && peek() !== "|" && peek() !== ")")
            items.push(parseQuantified());
        if (items.length === 0)
            return { desc: "(empty)" };
        return items.length === 1 ? items[0] : { desc: "in sequence:", children: items };
    }
    function parseQuantified() {
        const atom = parseAtom();
        if (eof())
            return atom;
        let quant;
        const c = peek();
        if (c === "*") {
            i++;
            quant = "zero or more";
        }
        else if (c === "+") {
            i++;
            quant = "one or more";
        }
        else if (c === "?") {
            i++;
            quant = "optional (zero or one)";
        }
        else if (c === "{") {
            const m = /^\{(\d+)(,(\d*))?\}/.exec(source.slice(i));
            if (m) {
                i += m[0].length;
                quant = m[2] === undefined ? `exactly ${m[1]} time${m[1] === "1" ? "" : "s"}`
                    : m[3] === "" ? `${m[1]} or more times`
                        : `between ${m[1]} and ${m[3]} times`;
            }
        }
        if (!quant)
            return atom;
        let lazy = false;
        if (!eof() && peek() === "?") {
            i++;
            lazy = true;
        }
        return { desc: `${atom.desc} — ${quant}${lazy ? " (lazy, as few as possible)" : ""}`, children: atom.children };
    }
    function parseAtom() {
        const c = peek();
        if (c === "(")
            return parseGroup();
        if (c === "[")
            return parseClass();
        if (c === "^") {
            i++;
            return { desc: "start of string/line" };
        }
        if (c === "$") {
            i++;
            return { desc: "end of string/line" };
        }
        if (c === ".") {
            i++;
            return { desc: "any character" };
        }
        if (c === "\\")
            return parseEscape();
        let lit = "";
        while (!eof() && !"\\^$.|?*+()[]{}".includes(peek()))
            lit += source[i++];
        if (lit)
            return { desc: `literally "${lit}"` };
        i++;
        return { desc: `literally "${c}"` };
    }
    function parseEscape() {
        i++;
        const c = source[i++];
        const map = {
            d: "a digit", D: "a non-digit", w: "a word character", W: "a non-word character",
            s: "whitespace", S: "non-whitespace", b: "a word boundary", B: "not a word boundary",
            n: "a newline", t: "a tab", r: "a carriage return",
        };
        return { desc: map[c] ?? `literally "${c}"` };
    }
    function parseClass() {
        i++;
        let negate = false;
        if (peek() === "^") {
            negate = true;
            i++;
        }
        let body = "";
        while (!eof() && peek() !== "]") {
            body += peek() === "\\" ? source[i++] + source[i++] : source[i++];
        }
        i++;
        return { desc: `${negate ? "any character NOT" : "any character"} in [${body}]` };
    }
    function parseGroup() {
        i++; // consume '('
        let kind = "capturing group";
        if (peek() === "?") {
            const c2 = source[i + 1];
            if (c2 === ":") {
                i += 2;
                kind = "non-capturing group";
            }
            else if (c2 === "=") {
                i += 2;
                kind = "lookahead — must be followed by";
            }
            else if (c2 === "!") {
                i += 2;
                kind = "negative lookahead — must NOT be followed by";
            }
            else if (c2 === "<" && source[i + 2] === "=") {
                i += 3;
                kind = "lookbehind — must be preceded by";
            }
            else if (c2 === "<" && source[i + 2] === "!") {
                i += 3;
                kind = "negative lookbehind — must NOT be preceded by";
            }
            else if (c2 === "<") {
                i += 2;
                let nm = "";
                while (source[i] !== ">")
                    nm += source[i++];
                i++;
                kind = `named capturing group "${nm}"`;
            }
        }
        const inner = parseAlt();
        if (peek() === ")")
            i++;
        return { desc: kind, children: [inner] };
    }
    const tree = parseAlt();
    const lines = [];
    (function render(node, depth) {
        lines.push(`${"  ".repeat(depth)}${node.desc}`);
        node.children?.forEach(c => render(c, depth + 1));
    })(tree, 0);
    return lines;
}
//                                                                                       [STATICS / PRESETS]
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
export const RECC2 = Object.assign((input, flags) => RECC2.of(input, flags), {
    of(input, flags) {
        if (typeof input === "string")
            return new REC2(input, flags ?? "");
        if (input instanceof RegExp)
            return new REC2(input.source, flags ?? input.flags);
        // remaining case is RE2_IF
        return flags !== undefined ? input.withFlags(flags) : input.clone();
    },
    escape: escapeRegex,
    literal(str) { return new REC2(escapeRegex(str)); },
    seq(...parts) {
        return new REC2(parts.map(p => wrapForConcat(toSource(p))).join(""), mergeFlags("", parts));
    },
    alt(...parts) {
        return new REC2(`(?:${parts.map(toSource).join("|")})`, mergeFlags("", parts));
    },
    digit: new REC2("\\d"), word: new REC2("\\w"), space: new REC2("\\s"), any: new REC2("."),
    notDigit: new REC2("\\D"), notWord: new REC2("\\W"), notSpace: new REC2("\\S"),
    range(from, to) { return new REC2(`[${from}-${to}]`); },
    oneOf(chars) { return new REC2(`[${escapeForClass(chars)}]`); },
    noneOf(chars) { return new REC2(`[^${escapeForClass(chars)}]`); },
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
});
globalThis.REC2 = REC2;
globalThis.RE2 = RECC2;
/*  ====================================================================================================
    
    ============================================================= ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [REGEX] */
