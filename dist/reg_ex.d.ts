export declare function escapeRegex(str: S): S;
export declare function escapeForClass(chars: S): S;
export declare function toSource(input: RE2Input): S;
export declare function isBalancedGroup(src: S): B;
export declare function isBalancedClass(src: S): B;
export declare function wrapForConcat(src: S): S;
export declare function mergeFlags(base: S, parts: AR<RE2Input>): S;
export declare class REC2 implements RE2_IF {
    #private;
    constructor(source: S, flags?: S);
    get source(): S;
    get flags(): S;
    get global(): B;
    get ignoreCase(): B;
    get multiline(): B;
    get sticky(): B;
    get unicode(): B;
    get dotAll(): B;
    get hasIndices(): B;
    toRegExp(): RegExp;
    test(str: S): B;
    h(str: S): B;
    exec(str: S): RegExpExecArray | null;
    g(str: S): S | UD;
    at(str: S, n: N): S | UD;
    groups(str: S): OB<S> | UD;
    group(str: S, name: S | N): S | UD;
    index(str: S): N;
    lastIndexOf(str: S): N;
    span(str: S): [N, N] | UD;
    all(str: S): AR<S>;
    matches(str: S): AR<RE2Match>;
    allGroups(str: S): AR<OB<S>>;
    allSpans(str: S): AR<[N, N]>;
    count(str: S): N;
    positions(str: S): AR<N>;
    replace(str: S, fn: S | RE2ReplaceFn): S;
    replaceFirst(str: S, fn: S | RE2ReplaceFn): S;
    replaceAt(str: S, n: N, fn: S | RE2ReplaceFn): S;
    remove(str: S): S;
    removeFirst(str: S): S;
    split(str: S, limit?: N): AR<S>;
    splitKeep(str: S): AR<S>;
    withFlags(flags: S): RE2_IF;
    addFlag(flag: RE2Flag): RE2_IF;
    removeFlag(flag: RE2Flag): RE2_IF;
    toggleFlag(flag: RE2Flag): RE2_IF;
    withSource(src: S): RE2_IF;
    and(...parts: AR<RE2Input>): RE2_IF;
    or(...parts: AR<RE2Input>): RE2_IF;
    cap(expr?: RE2Input): RE2_IF;
    namedGroup(name: S, expr: RE2Input): RE2_IF;
    nonCap(expr: RE2Input): RE2_IF;
    lookahead(expr: RE2Input): RE2_IF;
    notLookahead(expr: RE2Input): RE2_IF;
    lookbehind(expr: RE2Input): RE2_IF;
    notLookbehind(expr: RE2Input): RE2_IF;
    optional(expr?: RE2Input): RE2_IF;
    many(expr?: RE2Input): RE2_IF;
    maybeMany(expr?: RE2Input): RE2_IF;
    repeat(n: N, max?: N, expr?: RE2Input): RE2_IF;
    /**
     * [BEST-EFFORT] Appends `?` after a trailing `*`/`+`/`?`/`{n,m}` to make it lazy.
     * Only looks at the END of the source — it's not a regex parser, it won't find
     * quantifiers buried mid-pattern. Meant to be chained right after .optional()/
     * .many()/.maybeMany()/.repeat(), where the quantifier IS the last token.
     * If no trailing quantifier is found, returns an unchanged clone.
     */
    lazy(): RE2_IF;
    $trace(str: S): AR<RE2Match>;
    $explain(): AR<S>;
    $risky(): B;
    $bench(str: S, iterations?: N): N;
    toString(): S;
    equals(other: RE2Input): B;
    clone(): RE2_IF;
    static fromRegExp(re: RegExp): REC2;
}
export declare function explainSource(source: S): AR<S>;
export declare const RECC2: RE2Static;
//# sourceMappingURL=reg_ex.d.ts.map