export interface S2  {
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

export interface S2C extends StringConstructor {
	new (value?: A): S2;
	(value?: A): string;
	fromCharCode(...codes: N[]): string;
	fromCodePoint(...codePoints: N[]): string;
	raw(template: TemplateStringsArray, ...substitutions: A[]): string;
}

export class S2I extends String implements S2 {
	constructor(value: A = "") {
		super(value);
	}

	empty(): boolean {
		return this.length === 0;
	}

	notEmpty(): boolean {
		return this.length > 0;
	}

	blank(): boolean {
		return this.trim().length === 0;
	}

	notBlank(): boolean {
		return !this.blank();
	}

	equals(value: string): boolean {
		return this.toString() === value;
	}

	equalsIgnoreCase(value: string): boolean {
		return this.toLowerCase() === value.toLowerCase();
	}

	contains(value: string): boolean {
		return this.includes(value);
	}

	starts(value: string): boolean {
		return this.startsWith(value);
	}

	ends(value: string): boolean {
		return this.endsWith(value);
	}

	first(): string {
		return this.charAt(0);
	}

	last(): string {
		return this.charAt(this.length - 1);
	}

	reverse(): string {
		return Array.from(this.toString()).reverse().join("");
	}

	capitalize(): string {
		return this.length ? this.charAt(0).toUpperCase() + this.slice(1) : "";
	}

	uncapitalize(): string {
		return this.length ? this.charAt(0).toLowerCase() + this.slice(1) : "";
	}

	titleCase(): string {
		return this.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
	}

	camelCase(): string {
		return this.toString()
			.replace(/([a-z\d])([A-Z])/g, "$1 $2")
			.split(/[^a-zA-Z\d]+/)
			.filter(Boolean)
			.map((word, index) =>
				index === 0
					? word.toLowerCase()
					: word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
			)
			.join("");
	}

	kebabCase(): string {
		return this.toString()
			.replace(/([a-z\d])([A-Z])/g, "$1-$2")
			.replace(/[^a-zA-Z\d]+/g, "-")
			.replace(/^-+|-+$/g, "")
			.toLowerCase();
	}

	snakeCase(): string {
		return this.kebabCase().replace(/-/g, "_");
	}

	pascalCase(): string {
		return this.toString()
			.replace(/([a-z\d])([A-Z])/g, "$1 $2")
			.split(/[^a-zA-Z\d]+/)
			.filter(Boolean)
			.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join("");
	}

	words(): string[] {
		return this.toString().match(/[\p{L}\p{N}]+/gu) ?? [];
	}

	lines(): string[] {
		return this.split(/\r\n|\r|\n/);
	}

	chars(): string[] {
		return Array.from(this.toString());
	}

	unique(): string {
		return Array.from(new Set(this.chars())).join("");
	}

	escapeRegExp(): string {
		return this.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}

	stripHtml(): string {
		return this.replace(/<[^>]*>/g, "");
	}

	stripWhitespace(): string {
		return this.replace(/\s+/g, "");
	}

	truncate(length: N, suffix = "..."): string {
		if (this.length <= length) return this.toString();
		return this.slice(0, Math.max(0, length - suffix.length)) + suffix;
	}

	limit(length: N, suffix = "..."): string {
		return this.truncate(length, suffix);
	}

	toNumber(): number {
		return Number(this.toString());
	}

	toInt(radix?: N): number {
		return Number.parseInt(this.toString(), radix);
	}

	toFloat(): number {
		return Number.parseFloat(this.toString());
	}

	toBoolean(): boolean {
		const value = this.trim().toLowerCase();
		return value === "true" || value === "1" || value === "yes" || value === "on";
	}

	toArray(): string[] {
		return this.chars();
	}

	toJSON(): string {
		return JSON.stringify(this.toString());
	}
	isWellFormed(): boolean {
		return !/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/u.test(this.toString());
	}
	
	toWellFormed(): string {
		return this.toString().replace(
			/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/gu,
			"\uFFFD",
		);
	}
}

globalThis.S2 = S2I ;
