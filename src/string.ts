

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
