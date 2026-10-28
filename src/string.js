export class S2I extends String {
    constructor(value = "") {
        super(value);
    }
    empty() {
        return this.length === 0;
    }
    notEmpty() {
        return this.length > 0;
    }
    blank() {
        return this.trim().length === 0;
    }
    notBlank() {
        return !this.blank();
    }
    equals(value) {
        return this.toString() === value;
    }
    equalsIgnoreCase(value) {
        return this.toLowerCase() === value.toLowerCase();
    }
    contains(value) {
        return this.includes(value);
    }
    starts(value) {
        return this.startsWith(value);
    }
    ends(value) {
        return this.endsWith(value);
    }
    first() {
        return this.charAt(0);
    }
    last() {
        return this.charAt(this.length - 1);
    }
    reverse() {
        return Array.from(this.toString()).reverse().join("");
    }
    capitalize() {
        return this.length ? this.charAt(0).toUpperCase() + this.slice(1) : "";
    }
    uncapitalize() {
        return this.length ? this.charAt(0).toLowerCase() + this.slice(1) : "";
    }
    titleCase() {
        return this.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    }
    camelCase() {
        return this.toString()
            .replace(/([a-z\d])([A-Z])/g, "$1 $2")
            .split(/[^a-zA-Z\d]+/)
            .filter(Boolean)
            .map((word, index) => index === 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join("");
    }
    kebabCase() {
        return this.toString()
            .replace(/([a-z\d])([A-Z])/g, "$1-$2")
            .replace(/[^a-zA-Z\d]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .toLowerCase();
    }
    snakeCase() {
        return this.kebabCase().replace(/-/g, "_");
    }
    pascalCase() {
        return this.toString()
            .replace(/([a-z\d])([A-Z])/g, "$1 $2")
            .split(/[^a-zA-Z\d]+/)
            .filter(Boolean)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join("");
    }
    words() {
        return this.toString().match(/[\p{L}\p{N}]+/gu) ?? [];
    }
    lines() {
        return this.split(/\r\n|\r|\n/);
    }
    chars() {
        return Array.from(this.toString());
    }
    unique() {
        return Array.from(new Set(this.chars())).join("");
    }
    escapeRegExp() {
        return this.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    stripHtml() {
        return this.replace(/<[^>]*>/g, "");
    }
    stripWhitespace() {
        return this.replace(/\s+/g, "");
    }
    truncate(length, suffix = "...") {
        if (this.length <= length)
            return this.toString();
        return this.slice(0, Math.max(0, length - suffix.length)) + suffix;
    }
    limit(length, suffix = "...") {
        return this.truncate(length, suffix);
    }
    toNumber() {
        return Number(this.toString());
    }
    toInt(radix) {
        return Number.parseInt(this.toString(), radix);
    }
    toFloat() {
        return Number.parseFloat(this.toString());
    }
    toBoolean() {
        const value = this.trim().toLowerCase();
        return value === "true" || value === "1" || value === "yes" || value === "on";
    }
    toArray() {
        return this.chars();
    }
    toJSON() {
        return JSON.stringify(this.toString());
    }
    isWellFormed() {
        return !/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/u.test(this.toString());
    }
    toWellFormed() {
        return this.toString().replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/gu, "\uFFFD");
    }
}
globalThis.S2 = S2I;
