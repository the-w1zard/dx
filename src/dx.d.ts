import { M2I } from "./map";
import { SET2I } from "./set";
import { D2I, R2I, R2II } from "./date";
import { A2I } from "./array";
import { O2I } from "./object";
import { WM2I } from "./weak_map";
import { I2I } from "./iterator";
import { N2I } from "./number";
import { P2I } from "./promise";
import { S2I } from "./string";
import { U82I } from "./unit8array";
import { WS2I } from "./weak_set";
import { USP2I } from "./url_search_params";
import { ER2I } from "./error";
import {MaybePromise} from '../bag_of_tricks/maybe_promise'
export {};


declare global {
/*  ==========================================================================================================================
	 The entire goal is to take what is already available and give them the upgrades / updates that they need to improve the 
     ux/dx. That is it.
     Not to wildy go off and create 400 fn's to throw on.
     Create a class, extends the original api and throw it into global this so it is accessible without the need of importing
     it.
	================================================================================== ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [UX/DX] */
	type MaybePromise<R = any> = R;
	var MaybePromise: MaybePromise;
	var M2: typeof M2I; // map
	var SET2: typeof SET2I; // set
	var D2: typeof D2I; // Date
	var A2: typeof A2I; // Array
	var O2: typeof O2I; // Object
	var WM2: typeof WM2I; // Weakmap
	var WS2: typeof WS2I; // Weakset
	var P2: typeof P2I; // Promise
	var S2: typeof S2I; // String
	var N2: typeof N2I; // Number
	var USP2: typeof USP2I; // URLSearchParams
	var ER2: typeof ER2I; // Error
	var U82: typeof U82I; // Uint8Array
	var I2: typeof I2I; // Iterator
	var R2: typeof R2I;
    var R2FN: typeof R2II;
	//                                                                                                 [MAP]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	type M2Op = "set" | "del" | "upd" | "dirty";
	interface M2Event<H = A, T = A> {
		op: M2Op;
		k: H;
		v?: T;
		prev?: T;
		has: B;
		batch?: B;
	}
	type Sub<H, T> = (e: M2Event<H, T>) => V;
	interface Derived<H, T> {
		deps: AR<H>;
		fn: (...vals: AR<T>) => T;
		dirty: B;
		value?: T;
		has: B;
	}
	interface M2<H = A, T = A> extends Map<H, T> {
		//                                                                          [SET/GET/HAS/DELETE]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		//g: typeof Map.prototype.get;
		//h: typeof Map.prototype.has;
		//d: typeof Map.prototype.delete;
		g(k: H): T | UD;
		h(k: H): B;
		d(k: H): B;
		//                                                                                        [BASE]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		s(v: UF<T>, k: H): this;
		getOrI(v: UF<T>, k: H): T;
		replace(v: UF<T>, k: H): B;
		swap(v: UF<T>, k: H): T | UD;
		update(k: H, fn: (old: T, has: B) => T, initial?: UF<T>): T;
		merge(other: Iterable<readonly [H, UF<T>]>): this;
		clearAndSet(entries: Iterable<readonly [H, UF<T>]>): this;
		
		take(key: H): T | UD;
		peek(key: H): T | false;
		getOrM(make: () => T, key: H): T;
		setIfAbsent(v: UF<T>, k: H): B;
		setIfPresent(v: UF<T>, k: H): B;
		inc(key: H, by?: N): N;
		touch(key: H): B;
		//                                                                                    [REACTIVE]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		on(fn: Sub<H, T>): () => void;
		off(fn: Sub<H, T>): void;
		batch(fn: () => void): this;
		//                                                                                     [DERIVED]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		dv(k: H, deps: AR<H>, fn: (...vals: AR<T>) => T): this;
		dirty(...keys: AR<H>): this;
		//                                                                                [DEBUG/SAFETY]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		$debug(limit?: N): this;
		$strict(): this;
		$history(): AR<M2Event<H, T>>;
		$why(k: H): M2Event<H, T> | UD;
		$diff(other: Map<H, T>): {
			add: AR<[H, T]>;
			del: AR<H>;
			chg: AR<[H, T, T]>;
		};
		//                                                                                  [MAP/FILTER]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		mapValues<G>(fn: (v: T, k: H) => G): M2<H, G>;
		mapKeys<G>(fn: (v: T, k: H) => G): M2<G, T>;
		filterKV(pred: (v: T, k: H) => B): this;
		filterKeys(pred: (v: T, k: H) => B): this;
		//                                                                                        [FIND]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		partition(pred: (v: T, k: H) => B): [M2<H, T>, M2<H, T>];
		find(pred: (v: T, k: H) => B): [H, T] | UD;
		findKey(pred: (v: T, k: H) => B): H | UD;
		findValue(pred: (v: T, k: H) => B): T | UD;
		some(pred: (v: T, k: H) => B): B;
		every(pred: (v: T, k: H) => B): B;
		reduce<G>(fn: (acc: G, v: T, k: H) => G, initial: G): G;
		forEachKV(fn: (v: T, k: H, map: this) => void): void;
		//                                                                                        [BASE]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		invert(): M2<T, H>;
		group<G>(fn: (v: T, k: H) => G): M2<G, AR<T>>;
		unique<G>(fn?: (v: T, k: H) => G): M2<G, T>;
		pick(keys: Iterable<H>): M2<H, T>;
		omit(keys: Iterable<H>): M2<H, T>;
		//                                                                                      [CODECS]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		toObject(): OB<T>;
		toArray(): AR<[H, T]>;
		toKeys(): AR<H>;
		toValues(): AR<T>;
		clone(): this;
		equals(other: Map<H, T>): B;
	}
	interface M2I<H = A, T = A> extends M2<H, T> {}
	// #endregion 
	//                                                                              [R2 — REGEX, THE M2 WAY]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	type RE2Flag = "g" | "i" | "m" | "s" | "u" | "y" | "d" | "v";
	type RE2Input = S | RegExp | RE2_IF;
	type RE2ReplaceFn = (m: RegExpExecArray, groups: OB<S> | UD, index: N, input: S) => S;
	interface RE2Match {
		match: S;
		index: N;
		lastIndex: N;
		groups: OB<S> | UD;
		raw: RegExpExecArray;
	}
	interface RE2_IF {
		//                                                                            [PASSTHROUGH]
		// ══════════════════════════════════════════════════════════════════════════════════════
		readonly source: S;
		readonly flags: S;
		readonly global: B;
		readonly ignoreCase: B;
		readonly multiline: B;
		readonly sticky: B;
		readonly unicode: B;
		readonly dotAll: B;
		readonly hasIndices: B;
		toRegExp(): RegExp;
	
		//                                                                                  [BASE]
		// ══════════════════════════════════════════════════════════════════════════════════════
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
	
		//                                                                               [COLLECT]
		// ══════════════════════════════════════════════════════════════════════════════════════
		all(str: S): AR<S>;
		matches(str: S): AR<RE2Match>;
		allGroups(str: S): AR<OB<S>>;
		allSpans(str: S): AR<[N, N]>;
		count(str: S): N;
		positions(str: S): AR<N>;
	
		//                                                                               [REPLACE]
		// ══════════════════════════════════════════════════════════════════════════════════════
		replace(str: S, fn: S | RE2ReplaceFn): S;
		replaceFirst(str: S, fn: S | RE2ReplaceFn): S;
		replaceAt(str: S, n: N, fn: S | RE2ReplaceFn): S;
		remove(str: S): S;
		removeFirst(str: S): S;
		split(str: S, limit?: N): AR<S>;
		splitKeep(str: S): AR<S>;
	
		//                                                                                 [BUILD]
		// ══════════════════════════════════════════════════════════════════════════════════════
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
		lazy(): RE2_IF;
	
		//                                                                        [DEBUG/SAFETY]
		// ══════════════════════════════════════════════════════════════════════════════════════
		$trace(str: S): AR<RE2Match>;
		$explain(): AR<S>;
		$risky(): B;
		$bench(str: S, iterations?: N): N;
	
		//                                                                               [CODECS]
		// ══════════════════════════════════════════════════════════════════════════════════════
		toString(): S;
		equals(other: RE2Input): B;
		clone(): RE2_IF;
	}
	interface REC2 extends RE2_IF {}
	// #endregion 
	//                                                                                   [STATICS / PRESETS]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	interface RE2Static {
		(input: RE2Input, flags?: S): RE2_IF;
		of(input: RE2Input, flags?: S): RE2_IF;
		escape(str: S): S;
		literal(str: S): RE2_IF;
		seq(...parts: AR<RE2Input>): RE2_IF;
		alt(...parts: AR<RE2Input>): RE2_IF;
	
		digit: RE2_IF; word: RE2_IF; space: RE2_IF; any: RE2_IF;
		notDigit: RE2_IF; notWord: RE2_IF; notSpace: RE2_IF;
		range(from: S, to: S): RE2_IF;
		oneOf(chars: S): RE2_IF;
		noneOf(chars: S): RE2_IF;
	
		email: RE2_IF;
		url: RE2_IF;
		uuid: RE2_IF;
		ipv4: RE2_IF;
		ipv6: RE2_IF;
		hex: RE2_IF;
		hexColor: RE2_IF;
		slug: RE2_IF;
		alphaNumeric: RE2_IF;
		integer: RE2_IF;
		float: RE2_IF;
		phoneLoose: RE2_IF;
		isoDate: RE2_IF;
		base64: RE2_IF;
		jwt: RE2_IF;
		semver: RE2_IF;
		creditCard: RE2_IF;
		htmlTag: RE2_IF;
		whitespaceOnly: RE2_IF;
	}
	interface RE2 extends RE2Static {}
	// #endregion 
	//                                                                                             [WEAKSET]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	interface WS2<T extends WeakKey = A> extends WeakSet<T> {
		add(value: T): this;
		delete(value: T): boolean;
		has(value: T): boolean;
	
		addIfAbsent(value: T): boolean;
		toggle(value: T): boolean;
		deleteIfPresent(value: T): boolean;
		hasAll(values: Iterable<T>): boolean;
		hasAny(values: Iterable<T>): boolean;
		addAll(values: Iterable<T>): this;
		deleteAll(values: Iterable<T>): N;
		replace(oldValue: T, newValue: T): boolean;
	
		track(value: T): this;
		untrack(value: T): boolean;
		trackedKeys(): T[];
		forEachTracked(callback: (value: T, set: this) => void, thisArg?: A): void;
		clearTracked(): void;
	}
	interface WS2C extends WeakSetConstructor {
		new <T extends WeakKey = A>(values?: readonly T[] | null): WS2I<T>;
		new <T extends WeakKey = A>(values?: Iterable<T> | null): WS2I<T>;
	}
	interface WS2I<T extends WeakKey = A> extends WS2<T> {}
	// #endregion 
	//                                                                                                 [SET]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	interface SET2<T = A> extends Set<T> {
		s(value: T): this;
		take(value: T): T | UD;
		peek(value: T): T | false;
		toggle(value: T): B;
		first(): T | UD;
		last(): T | UD;
	
		union(other: Iterable<T>): SET2I<T>;
		intersection(other: Iterable<T>): SET2I<T>;
		difference(other: Iterable<T>): SET2I<T>;
		symmetricDifference(other: Iterable<T>): SET2I<T>;
		isSubsetOf(other: Iterable<T>): B;
		isSupersetOf(other: Iterable<T>): B;
		isDisjointFrom(other: Iterable<T>): B;
		equals(other: Iterable<T>): B;
	
		filter(fn: (v: T, set: this) => B): SET2I<T>;
		map<R>(fn: (v: T, set: this) => R): SET2I<R>;
		partition(fn: (v: T, set: this) => B): [SET2I<T>, SET2I<T>];
		differenceBy<K>(other: Iterable<T>, fn: (v: T) => K): SET2I<T>;
		uniqueBy<K>(fn: (v: T) => K): SET2I<T>;
		find(fn: (v: T, set: this) => B): T | UD;
		every(fn: (v: T, set: this) => B): B;
		some(fn: (v: T, set: this) => B): B;
		reduce<R>(fn: (acc: R, v: T, set: this) => R, initial: R): R;
	
		addAll(values: Iterable<T>): this;
		deleteAll(values: Iterable<T>): N;
		retainAll(values: Iterable<T>): this;
		update(values: Iterable<T>): this;
		replace(values: Iterable<T>): this;
		swap(a: T, b: T): B;
	
		clone(): this;
		toArray(): T[];
		toMap<K, R>(fn: (v: T) => readonly [K, R]): M2I<K, R>;
		toObject(fn?: (v: T) => S): OB<T>;
		toJSON(): T[];
	
	}
	interface SET2I<T = A> extends SET2<T> {}
	// #endregion 
	//                                                                                               [ARRAY]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	interface A2<T = A> extends Array<T> {
		first(): T | UD;
		last(): T | UD;
		isEmpty(): B;
		isNotEmpty(): B;
	
		clear(): this;
		clone(): A2<T>;
		unique(): A2<T>;
		compact(): A2<NonNullable<T>>;
	
		take(count: N): A2<T>;
		takeLast(count: N): A2<T>;
		drop(count: N): A2<T>;
		dropLast(count: N): A2<T>;
		chunk(size: N): A2<A2<T>>;
		flatten<X>(depth?: N): A2<X>;
		flatMap<U>(callback: (value: T, index: N, array: this) => U | readonly U[]): A2<U>;
	
		distinctBy<K>(callback: (value: T, index: N) => K): A2<T>;
		groupBy<K extends PropertyKey>(callback: (value: T, index: N) => K): Map<K, A2<T>>;
		partition(callback: (value: T, index: N) => B): [A2<T>, A2<T>];
	
		insert(index: N, ...items: T[]): this;
		removeAt(index: N): T | UD;
		remove(value: T): B;
		removeAll(value: T): N;
		replaceAt(index: N, value: T): T | UD;
		move(from: N, to: N): this;
		swap(first: N, second: N): this;
	
		sample(): T | UD;
		shuffle(): this;
		countBy(callback: (value: T, index: N) => B): N;
		sum(callback?: (value: T, index: N) => N): N;
		average(callback?: (value: T, index: N) => N): N;
		min(callback?: (value: T, index: N) => N): T | UD;
		max(callback?: (value: T, index: N) => N): T | UD;
	
		equals(array: readonly T[]): B;
		includesAll(values: readonly T[]): B;
		intersects(values: readonly T[]): B;
	}
	interface A2I<T = A> extends A2<T> {}
	// #endregion 
	//                                                                                               [ARRAY]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	interface R2 {
		start: D2;
		end: D2;
		contains(d: D): B;
		overlaps(other: R2): B;
		durationMs(): N;
		days(): N;
		eachDay(fn: (d: D2, i: N) => void): void;
		toArray(): AR<D2>;
	}
	interface D2 extends Date {
		clone(): D2;
		isValid(): B;
	
		month(): N;
		dateOfWeek(): N;
		dayOfYear(): N;
		quarter(): N;
		unix(): N;
	
		addMs(ms: N): D2;
		addSeconds(seconds: N): D2;
		addMinutes(minutes: N): D2;
		addHours(hours: N): D2;
		addDays(days: N): D2;
		addWeeks(weeks: N): D2;
		addMonths(months: N): D2;
		addYears(years: N): D2;
	
		subDays(days: N): D2;
		subMonths(months: N): D2;
		subYears(years: N): D2;
	
		startOfDay(): D2;
		endOfDay(): D2;
		startOfWeek(): D2;
		endOfWeek(): D2;
		startOfMonth(): D2;
		endOfMonth(): D2;
		startOfQuarter(): D2;
		endOfQuarter(): D2;
		startOfYear(): D2;
		endOfYear(): D2;
	
		daysInMonth(): N;
		daysInYear(): N;
		isLeapYear(): B;
		isWeekend(): B;
		isWeekday(): B;
	
		isBefore(date: D): B;
		isAfter(date: D): B;
		isEqual(date: D): B;
		isBetween(start: D, end: D): B;
	
		diffMs(date: D): N;
		diffSeconds(date: D): N;
		diffMinutes(date: D): N;
		diffHours(date: D): N;
		diffDays(date: D): N;
	
		sameDay(date: D): B;
		sameMonth(date: D): B;
		sameYear(date: D): B;
	
		toUnixMs(): N;
		toUnix(): N;
		toD2(): D2;
		toLocalString(format?: A): S;
	
		subWeeks(weeks: N): D2;
		endOfWeek(weekStartsOn?: N): D2;
		at(hour: N, minute?: N, second?: N, ms?: N): D2;
		atNoon(): D2;
		midnight(): D2;
		next(unit: DAYSD2): D2;
		prev(unit:  Parameters<D2["next"]>[0]): D2;
		nextWeek(): D2;
		prevWeek(): D2;
		nextMonth(): D2;
		prevMonth(): D2;
		nextQuarter(): D2;
		prevQuarter(): D2;
		nextYear(): D2;
		prevYear(): D2;
		ago(): S;
		fromNow(): S;
		from(other: D): S;
		fmt(format: S): S;
		diffHuman(other?: D): S;
		calendarDays(other: D): N;
		businessDays(other: D): N;
		addBusinessDays(n: N): D2;
		nextBusinessDay(): D2;
		prevBusinessDay(): D2;
		withDate(year: N, month: N, day: N): D2;
		sameTimeOn(other: D): D2;
		toInputDate(): S;
	toInputTime(): S;
	toInputTimeWithSeconds(): S;
	toInputDateTime(): S;
	}
	type DAYSD2 = "day" | "week" | "month" | "quarter" | "year" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"
	interface D2I extends D2 {}
	interface R2I extends R2 {}
	// #endregion 
	//                                                                                               [ERROR]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	interface ER2 extends Error {
		cause?: unknown;
		clone(): ER2I;
		toJSON(): {
			name: string;
			message: string;
			stack?: string;
			cause?: unknown;
		};
		toString(): string;
	}
	interface ER2C extends ErrorConstructor {
		new (message?: string, options?: ErrorOptions): ER2I;
		(message?: string): string;
		readonly prototype: ER2I;
	}
	interface ER2I extends ER2 {}
	// #endregion 
	//                                                                                            [ITERATOR]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	interface I2<T = A> extends Iterator<T> {
		n: I2<T>["next"];
		r: NonNullable<I2<T>["return"]>;
		f: NonNullable<I2<T>["throw"]>;
	
		toArray(): AR<T>;
		first(): T | UD;
		last(): T | UD;
		at(index: N): T | UD;
		peek(): T | UD;
		nextValue(): T | UD;
		nextOr(value: T): T;
		nextOrM(make: () => T): T;
		nextOrThrow(error?: Error): T;
	
	
		find(pred: (value: T, index: N) => B): T | UD;
		findIndex(pred: (value: T, index: N) => B): N;
		some(pred: (value: T, index: N) => B): B;
		every(pred: (value: T, index: N) => B): B;
		reduce<G>(fn: (acc: G, value: T, index: N) => G, initial: G): G;
		forEach(fn: (value: T, index: N) => void): void;
	
		count(): N;
		sum(fn?: (value: T) => N): N;
		join(separator?: S): S;
		partition(pred: (value: T, index: N) => B): [AR<T>, AR<T>];
		group<G>(fn: (value: T, index: N) => G): Map<G, AR<T>>;
		toSet(): Set<T>;
		toMap<K, V = T>(keyFn: (value: T, index: N) => K, valueFn?: (value: T, index: N) => V): Map<K, V>;
	
		isEmpty(): B;
		exhaust(): void;
	
	
		map<G>(fn: (value: T, index: N) => G): I2I<G>;
	filter<S extends T>(pred: (value: T, index: N) => value is S): I2I<S>;
	filter(pred: (value: T, index: N) => B): I2I<T>;
	flatMap<G>(fn: (value: T, index: N) => Iterable<G> | Iterator<G>): I2I<G>;
	flat<G>(this: I2I<Iterable<G> | Iterator<G>>): I2I<G>;
	take(limit: N): I2I<T>;
	drop(limit: N): I2I<T>;
	unique<G = T>(fn?: (value: T, index: N) => G): I2I<T>;
	chunk(size: N): I2I<AR<T>>;
	zip<G>(other: Iterable<G> | Iterator<G>): I2I<[T, G]>;
	concat(...others: (Iterable<T> | Iterator<T>)[]): I2I<T>;
	enumerate(): I2I<[N, T]>;
	clone(): I2I<T>;
	}
	interface I2I<T = A> extends I2<T> {}
	// #endregion 
	//                                                                                              [NUMBER]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	interface N2 extends Number {
		toString: typeof Number.prototype.toString;
		toFixed: typeof Number.prototype.toFixed;
		toExponential: typeof Number.prototype.toExponential;
		toPrecision: typeof Number.prototype.toPrecision;
		valueOf: typeof Number.prototype.valueOf;
		toLocaleString: typeof Number.prototype.toLocaleString;
	
		abs(): N2;
		sign(): N2;
		neg(): N2;
		inv(): N2;
	
		clamp(min: N, max: N): N2;
		wrap(min: N, max: N): N2;
		lerp(to: N, t: N): N2;
		map(inMin: N, inMax: N, outMin: N, outMax: N): N2;
		remap(inMin: N, inMax: N, outMin: N, outMax: N): N2;
	
		roundTo(precision?: N): N2;
		floorTo(precision?: N): N2;
		ceilTo(precision?: N): N2;
		truncTo(precision?: N): N2;
	
		isFinite(): B;
		isInteger(): B;
		isSafeInteger(): B;
		isNaN(): B;
		isBetween(min: N, max: N, inclusive?: B): B;
		isPositive(): B;
		isNegative(): B;
		isZero(): B;
		isEven(): B;
		isOdd(): B;
	
		squared(): N2;
		cubed(): N2;
		sqrt(): N2;
		cbrt(): N2;
		pow(exponent: N): N2;
		root(degree: N): N2;
		mod(divisor: N): N2;
		percentOf(total: N): N2;
		percentChange(from: N): N2;
	
		toRadians(): N2;
		toDegrees(): N2;
		toOrdinal(): S;
		toBytes(unit?: N, decimals?: N): S;
		toCompact(locales?: Intl.LocalesArgument): S;
		toCurrency(currency?: S, locales?: Intl.LocalesArgument): S;
		toPercent(decimals?: N, locales?: Intl.LocalesArgument): S;
	
		times(fn: (index: N) => void): this;
		upTo(end: N, step?: N): AR<N>;
		downTo(end: N, step?: N): AR<N>;
	}
	interface N2I extends N2 {}
	// #endregion 
	//                                                                                              [OBJECT]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	interface O2 extends ObjectConstructor {
		isEmpty(value: object): B;
		isNotEmpty(value: object): B;
		size(value: object): N;
		isPlainObject(value: unknown): B;
		isObject(value: unknown): B;
	
		get<T = unknown>(value: unknown, path: string | readonly PropertyKey[], fallback?: T): unknown | T;
		getOr<T>(value: unknown, path: string | readonly PropertyKey[], fallback: T): T;
		set<T extends object>(value: T, path: string | readonly PropertyKey[], next: unknown): T;
		unset(value: object, path: string | readonly PropertyKey[]): B;
		hasPath(value: unknown, path: string | readonly PropertyKey[]): B;
	
		clone<T>(value: T): T;
		deepClone<T>(value: T): T;
		deepMerge<T extends object, U extends object>(target: T, source: U): T & U;
		defaults<T extends object, U extends object>(target: T, defaults: U): T & U;
		getOrCreate<T extends object, K extends PropertyKey, X>(
			value: T,
			key: K,
			create: () => X
		): T & Record<K, X>;
	
		pick<T extends object, K extends keyof T>(value: T, keys: readonly K[]): Pick<T, K>;
		omit<T extends object, K extends keyof T>(value: T, keys: readonly K[]): Omit<T, K>;
		pickBy<T extends object>(value: T, predicate: (value: T[keyof T], key: keyof T) => B): Partial<T>;
		omitBy<T extends object>(value: T, predicate: (value: T[keyof T], key: keyof T) => B): Partial<T>;
	
		mapKeys<T extends object, K extends PropertyKey>(
			value: T,
			mapper: (key: keyof T, value: T[keyof T]) => K
		): Partial<Record<K, T[keyof T]>>;
		mapValues<T extends object, X>(
			value: T,
			mapper: (value: T[keyof T], key: keyof T) => X
		): { [K in keyof T]: X };
		mapEntries<T extends object, K extends PropertyKey, X>(
			value: T,
			mapper: (entry: [keyof T, T[keyof T]]) => readonly [K, X]
		): Partial<Record<K, X>>;
		filter<T extends object>(
			value: T,
			predicate: (value: T[keyof T], key: keyof T) => B
		): Partial<T>;
	
		isEqual(first: unknown, second: unknown): B;
		isShallowEqual(first: object, second: object): B;
	
		hasAll<T extends object>(value: T, keys: readonly PropertyKey[]): B;
		hasAny<T extends object>(value: T, keys: readonly PropertyKey[]): B;
		assertKeys<T extends object>(value: T, keys: readonly PropertyKey[]): asserts value is T;
	
		with<T extends object, K extends keyof T>(value: T, key: K, next: T[K]): T;
		without<T extends object, K extends keyof T>(value: T, key: K): Omit<T, K>;
		update<T extends object, K extends keyof T>(
			value: T,
			key: K,
			updater: (current: T[K]) => T[K]
		): T;
	}
	interface O2I extends O2 {}
	// #endregion 
	//                                                                                             [PROMISE]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	//                                                                            [P2 — PROMISE, THE M2 WAY]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	
	type P2Status = "pending" | "fulfilled" | "rejected";
	
	interface P2<T = A> extends Promise<T> {
		//                                                                           [CORE OVERRIDES]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
			onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
		): P2<TResult1 | TResult2>;
		catch<TResult = never>(
			onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
		): P2<T | TResult>;
		finally(onfinally?: (() => void) | null): P2<T>;
	
		//                                                                                     [STATUS]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		status(): P2Status;
		isPending(): B;
		isFulfilled(): B;
		isRejected(): B;
		value(): T | UD;
		error(): A | UD;
		elapsed(): N | UD;
	
		//                                                                                   [CONTROL]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		tap(fn: (value: T) => unknown): P2<T>;
		tapError(fn: (error: A) => unknown): P2<T>;
		recover(fn: (error: A) => T | PromiseLike<T>): P2<T>;
		fallback(value: T | PromiseLike<T>): P2<T>;
		timeout(ms: N, error?: A): P2<T>;
		delay(ms: N): P2<T>;
		withDeadline(deadline: N, error?: A): P2<T>;
	
		//                                                                                       [MAP]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		map<G>(fn: (value: T) => G | PromiseLike<G>): P2<Awaited<G>>;
		flatMap<G>(fn: (value: T) => G | PromiseLike<G>): P2<Awaited<G>>;
		or<G>(other: G | PromiseLike<G>): P2<T | Awaited<G>>;
		and<G>(other: G | PromiseLike<G>): P2<[T, Awaited<G>]>;
		zip<G>(other: PromiseLike<G>): P2<[T, Awaited<G>]>;
	
		//                                                                                    [CODECS]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		unwrap(): Promise<T>;
		toResult(): P2<{ ok: true; value: T } | { ok: false; error: A }>;
	
		//                                                                                   [HOOKS]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		onResolve(fn: (value: T) => unknown): P2<T>;
		onReject(fn: (error: A) => unknown): P2<T>;
		finallyDo(fn: () => unknown): P2<T>;
	
		//                                                                                     [DEBUG]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		$label(name: S): this;
		$debug(): this;
	}
	
	// #endregion 
	//                                                                               [STATICS / CONSTRUCTOR]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	interface P2C {
		new <T>(
			executor: (
				resolve: (value: T | PromiseLike<T>) => void,
				reject: (reason?: A) => void,
			) => void,
		): P2<T>;
	
		readonly prototype: P2<A>;
		readonly [Symbol.species]: PromiseConstructor;
	
		resolve(): P2<void>;
		resolve<T>(value: T | PromiseLike<T>): P2<Awaited<T>>;
	
		reject<T = never>(reason?: A): P2<T>;
	
		all<T extends readonly unknown[] | []>(
			values: T,
		): P2<{ -readonly [P in keyof T]: Awaited<T[P]> }>;
	
		allSettled<T extends readonly unknown[] | []>(
			values: T,
		): P2<{ -readonly [P in keyof T]: PromiseSettledResult<Awaited<T[P]>> }>;
	
		race<T extends readonly unknown[] | []>(values: T): P2<Awaited<T[number]>>;
		any<T extends readonly unknown[] | []>(values: T): P2<Awaited<T[number]>>;
	
		retry<T>(fn: () => T | PromiseLike<T>, times?: N, delay?: N): P2<Awaited<T>>;
	
		deferred<T = A>(): {
			promise: P2<T>;
			resolve: (value: T | PromiseLike<T>) => void;
			reject: (reason?: A) => void;
		};
	
		try<T>(fn: () => T | PromiseLike<T>): P2<Awaited<T>>;
	
		//                                                                                [CONCURRENCY]
		// ══════════════════════════════════════════════════════════════════════════════════════════════════════
		sleep(ms: N): P2<void>;
		fromCallback<T>(fn: (cb: (err: A, value?: T) => void) => void): P2<T>;
		mapLimit<T, G>(items: AR<T>, limit: N, fn: (item: T, index: N) => G | PromiseLike<G>): P2<AR<G>>;
		series<T>(fns: AR<() => T | PromiseLike<T>>): P2<AR<T>>;
	}
	interface P2I<T = A> extends P2<T> {}
	// #endregion 
	//                                                                                              [STRING]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	interface S2  {
		// Native String API
		readonly length: number;
		[index: number]: string;
	
		at(index: N): string | undefined;
		charAt(index: N): string;
		charCodeAt(index: N): N;
		codePointAt(index: N): N | undefined;
		concat(...strings: string[]): string;
		includes(searchString: string, position?: N): boolean;
		endsWith(searchString: string, endPosition?: N): boolean;
		indexOf(searchString: string, position?: N): N;
		lastIndexOf(searchString: string, position?: N): N;
		localeCompare(
			that: string,
			locales?: Intl.LocalesArgument,
			options?: Intl.CollatorOptions,
		): N;
		match(regexp: RegExp): RegExpMatchArray | null;
		matchAll(regexp: RegExp): RegExpStringIterator<RegExpExecArray>;
		normalize(form?: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
		padEnd(maxLength: N, fillString?: string): string;
		padStart(maxLength: N, fillString?: string): string;
		repeat(count: N): string;
		replace(
			searchValue: { [Symbol.replace](string: string, replaceValue: string): string } | string | RegExp,
			replaceValue: string,
		): string;
		replace(
			searchValue: { [Symbol.replace](string: string, replacer: (substring: string, ...args: A[]) => string): string } | string | RegExp,
			replacer: (substring: string, ...args: A[]) => string,
		): string;
		replaceAll(searchValue: string | RegExp, replaceValue: string): string;
		replaceAll(
			searchValue: string | RegExp,
			replacer: (substring: string, ...args: A[]) => string,
		): string;
		search(regexp: RegExp): N;
		slice(start?: N, end?: N): string;
		split(separator: string | RegExp, limit?: N): string[];
		startsWith(searchString: string, position?: N): boolean;
		substring(start: N, end?: N): string;
		toLocaleLowerCase(locales?: Intl.LocalesArgument): string;
		toLocaleUpperCase(locales?: Intl.LocalesArgument): string;
		toLowerCase(): string;
		toString(): string;
		toUpperCase(): string;
		trim(): string;
		trimStart(): string;
		trimEnd(): string;
		valueOf(): string;
		isWellFormed(): boolean;
		toWellFormed(): string;
	
		// Enhanced helpers
		empty(): boolean;
		notEmpty(): boolean;
		blank(): boolean;
		notBlank(): boolean;
		equals(value: string): boolean;
		equalsIgnoreCase(value: string): boolean;
		contains(value: string): boolean;
		starts(value: string): boolean;
		ends(value: string): boolean;
		first(): string;
		last(): string;
		reverse(): string;
		capitalize(): string;
		uncapitalize(): string;
		titleCase(): string;
		camelCase(): string;
		kebabCase(): string;
		snakeCase(): string;
		pascalCase(): string;
		words(): string[];
		lines(): string[];
		chars(): string[];
		unique(): string;
		escapeRegExp(): string;
		stripHtml(): string;
		stripWhitespace(): string;
		truncate(length: N, suffix?: string): string;
		limit(length: N, suffix?: string): string;
		toNumber(): number;
		toInt(radix?: N): number;
		toFloat(): number;
		toBoolean(): boolean;
		toArray(): string[];
		toJSON(): string;
	}
	interface S2C extends StringConstructor {
		new (value?: A): S2;
		(value?: A): string;
		fromCharCode(...codes: N[]): string;
		fromCodePoint(...codePoints: N[]): string;
		raw(template: TemplateStringsArray, ...substitutions: A[]): string;
	}
	interface S2I extends S2 {}
	// #endregion 
	//                                                                                                  [U8]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	interface U82<T = A> extends Array<T> {
		// Native Array API
		at(index: N): T | undefined;
		concat(...items: (T | ConcatArray<T>)[]): T[];
		copyWithin(target: N, start: N, end?: N): this;
		fill(value: T, start?: N, end?: N): this;
		find<S extends T>(
			predicate: (value: T, index: N, obj: T[]) => value is S,
			thisArg?: A,
		): S | undefined;
		find(predicate: (value: T, index: N, obj: T[]) => unknown, thisArg?: A): T | undefined;
		findIndex(predicate: (value: T, index: N, obj: T[]) => unknown, thisArg?: A): N;
		findLast<S extends T>(
			predicate: (value: T, index: N, obj: T[]) => value is S,
			thisArg?: A,
		): S | undefined;
		findLast(predicate: (value: T, index: N, obj: T[]) => unknown, thisArg?: A): T | undefined;
		findLastIndex(predicate: (value: T, index: N, obj: T[]) => unknown, thisArg?: A): N;
		flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
		flatMap<U, This = undefined>(
			callback: (this: This, value: T, index: N, array: T[]) => U | readonly U[],
			thisArg?: This,
		): U[];
		forEach(callback: (value: T, index: N, array: T[]) => void, thisArg?: A): void;
		includes(searchElement: T, fromIndex?: N): boolean;
		indexOf(searchElement: T, fromIndex?: N): N;
		join(separator?: string): string;
		lastIndexOf(searchElement: T, fromIndex?: N): N;
		map<U>(callback: (value: T, index: N, array: T[]) => U, thisArg?: A): U[];
		pop(): T | undefined;
		push(...items: T[]): N;
		reduce(callback: (previousValue: T, currentValue: T, currentIndex: N, array: T[]) => T): T;
		reduce<U>(callback: (previousValue: U, currentValue: T, currentIndex: N, array: T[]) => U, initialValue: U): U;
		reduceRight(callback: (previousValue: T, currentValue: T, currentIndex: N, array: T[]) => T): T;
		reduceRight<U>(
			callback: (previousValue: U, currentValue: T, currentIndex: N, array: T[]) => U,
			initialValue: U,
		): U;
		reverse(): T[];
		shift(): T | undefined;
		slice(start?: N, end?: N): T[];
		some(predicate: (value: T, index: N, array: T[]) => unknown, thisArg?: A): boolean;
		sort(compareFn?: (a: T, b: T) => N): this;
		splice(start: N, deleteCount?: N): T[];
		splice(start: N, deleteCount: N, ...items: T[]): T[];
		toReversed(): T[];
		toSorted(compareFn?: (a: T, b: T) => N): T[];
		toSpliced(start: N, deleteCount: N, ...items: T[]): T[];
		unshift(...items: T[]): N;
		with(index: N, value: T): T[];
		entries(): ArrayIterator<[N, T]>;
		keys(): ArrayIterator<N>;
		values(): ArrayIterator<T>;
		[Symbol.iterator](): ArrayIterator<T>;
		[Symbol.unscopables]: A;
	
		// Enhanced helpers
		first(): T | undefined;
		last(): T | undefined;
		second(): T | undefined;
		third(): T | undefined;
		random(): T | undefined;
		isEmpty(): boolean;
		isNotEmpty(): boolean;
		isNotEmptyAndDefined(): boolean;
		clear(): this;
		shuffle(): this;
		count(predicate?: (value: T, index: N, array: T[]) => unknown): N;
	
		sum(this: U82I<number>): number;
		average(this: U82I<number>): number;
		min(this: U82I<number>): number | undefined;
		max(this: U82I<number>): number | undefined;
	
		groupBy<K extends PropertyKey>(keyFn: (value: T, index: N) => K): Map<K, U82I<T>>;
		keyBy<K extends PropertyKey>(keyFn: (value: T, index: N) => K): Map<K, T>;
		partition(predicate: (value: T, index: N, array: T[]) => unknown): [U82I<T>, U82I<T>];
		difference(other: Iterable<T>): U82I<T>;
		intersection(other: Iterable<T>): U82I<T>;
		union(other: Iterable<T>): U82I<T>;
		symmetricDifference(other: Iterable<T>): U82I<T>;
		take(count: N): U82I<T>;
		takeLast(count: N): U82I<T>;
		drop(count: N): U82I<T>;
		dropLast(count: N): U82I<T>;
		pluck<K extends keyof T>(key: K): U82I<T[K]>;
		flattenDeep(): U82I<A>;
		insert(index: N, ...items: T[]): this;
		removeAt(index: N): T | undefined;
		remove(value: T): boolean;
		removeWhere(predicate: (value: T, index: N, array: T[]) => unknown): this;
		replace(oldValue: T, newValue: T): boolean;
		move(from: N, to: N): this;
		swap(i: N, j: N): this;
		shuffleInPlace(): this;
		pick(count?: N): U82I<T>;
		toSet(): Set<T>;
		toMap<K extends PropertyKey>(keyFn: (value: T, index: N) => K): Map<K, T>;
		equals(other: readonly T[]): boolean;
		startsWith(other: readonly T[]): boolean;
		endsWith(other: readonly T[]): boolean;
		isSorted(compareFn?: (a: T, b: T) => N): boolean;
		frequencies(): Map<T, N>;
	
		clone(): U82I<T>;
		unique(): U82I<T>;
		compact(): U82I<NonNullable<T>>;
		chunk(size: N): U82I<U82I<T>>;
		flatten<D extends N = 1>(depth?: D): U82I<A>;
		sample(count?: N): U82I<T>;
	}
	interface U82I<T = A> extends U82<T> {}
	// #endregion 
	//                                                                                                 [URL]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	interface USP2 extends URLSearchParams {
		append(name: S, value: S): V;
		delete(name: S, value?: S): V;
		get(name: S): S | NU;
		getAll(name: S): S[];
		has(name: S, value?: S): B;
		set(name: S, value: S): V;
		sort(): V;
		toString(): S;
		forEach(callback: (value: S, key: S, parent: URLSearchParams) => V, thisArg?: A): V;
		entries(): URLSearchParamsIterator<[S, S]>;
		keys(): URLSearchParamsIterator<S>;
		values(): URLSearchParamsIterator<S>;
		[Symbol.iterator](): URLSearchParamsIterator<[S, S]>;
	
		size: N;
	
		getOr(name: S, fallback: S): S;
		getOrNull(name: S): S | null;
		getOrThrow(name: S, error?: A): S;
		getNumber(name: S, fallback?: N): N | UD;
		getInt(name: S, radix?: N): N | UD;
		getFloat(name: S): N | UD;
		getBoolean(name: S, fallback?: B): B;
		getJSON<T = A>(name: S): T | UD;
		getArray(name: S, separator?: S): S[];
		getObject<T extends R<S, A> = R<S, A>>(): T;
		setNumber(name: S, value: N): this;
		setBoolean(name: S, value: B): this;
		setJSON(name: S, value: A): this;
		setArray(name: S, values: I<A>, separator?: S): this;
		setIfAbsent(name: S, value: S): this;
		setIfPresent(name: S, value: S): this;
		appendAll(params: URLSearchParams | R<S, A>): this;
		merge(params: URLSearchParams | R<S, A>, overwrite?: B): this;
		clone(): USP2I;
		clear(): V;
		isEmpty(): B;
		isNotEmpty(): B;
		toObject(): R<S, S | S[]>;
		toJSON(): R<S, S | S[]>;
		toURLSearchParams(): URLSearchParams;
		toURL(url: S | URL): URL;
	}
	interface USP2C  {
		new (init?: S | URLSearchParams | R<S, S> | S[][]): USP2I;
	}
	interface USP2I extends USP2 {}
	// #endregion 
	//                                                                                             [WEAKMAP]
	// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════ 
	interface WM2<H extends WeakKey = A, T = A> extends WeakMap<H, T> {
		g: typeof WeakMap.prototype.get;
		h: typeof WeakMap.prototype.has;
		d: typeof WeakMap.prototype.delete;
		s(k: H, v: T | (() => T)): this;
	
		swap(key: H, value: T): T | UD;
		take(key: H): T | UD;
		getAndDelete(key: H): T | UD;
		peek(key: H): T | false;
	
		getOrI(key: H, value: T): T;
		getOrM(key: H, make: () => T): T;
		getOr<G>(key: H, fallback: G): T | G;
		getOrThrow(key: H, error?: Error): T;
		getOrCreate(key: H, make: () => T): T;
		ensure(key: H, make: () => T): T;
	
		update(key: H, fn: (old: T, has: B) => T, initial: T): T;
		setIfAbsent(key: H, value: T): B;
		setIfPresent(key: H, value: T): B;
		hasOrSet(key: H, value: T): B;
		replace(key: H, value: T): B;
		touch(key: H): B;
	
		/** Registry-backed methods retain strong references to keys and can prevent garbage collection. */
		readonly tracked?: B;
		readonly trackedSize?: N;
		track(key: H): this;
		untrack(key: H): B;
		trackedKeys(): AR<H>;
		trackedValues(): AR<T>;
		trackedEntries(): AR<[H, T]>;
		forEachTracked(fn: (value: T, key: H, map: this) => void): void;
		clearTracked(): void;
	}
	interface WM2I<H extends WeakKey = A, T = A> extends WM2<H,T> {}
	// #endregion 
	
}


























