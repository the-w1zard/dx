const FORMAT = {
    full: { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" },
    dm: { month: "short", day: "numeric" },
    dmy: { year: "numeric", month: "short", day: "numeric" },
    dmyw: { weekday: "short", year: "numeric", month: "short", day: "numeric" },
    t: { hour: "2-digit", minute: "2-digit" }
};
export function ToLocalString(v = FORMAT.full) {
    return new Date(v).toLocaleString("en-US", v);
}
export class D2I extends Date {
    constructor(value) {
        if (value instanceof Date)
            super(value.getTime());
        else if (value === undefined)
            super();
        else
            super(value);
    }
    toLocalString(format = FORMAT.full) {
        return new Date().toLocaleString("en-US", format);
    }
    static now() {
        return Date.now();
    }
    static fromUnix(seconds) {
        return new D2I(seconds * 1000);
    }
    static fromUnixMs(ms) {
        return new D2I(ms);
    }
    static fromParts(year, month, day, hour = 0, minute = 0, second = 0, ms = 0) {
        return new D2I(new Date(year, month - 1, day, hour, minute, second, ms));
    }
    static today() {
        return new D2I().startOfDay();
    }
    static min(...dates) {
        return new D2I(Math.min(...dates.map((date) => date.getTime())));
    }
    static max(...dates) {
        return new D2I(Math.max(...dates.map((date) => date.getTime())));
    }
    clone() {
        return new D2I(this);
    }
    isValid() {
        return Number.isFinite(this.getTime());
    }
    month() {
        return this.getMonth() + 1;
    }
    dateOfWeek() {
        return this.getDay();
    }
    dayOfYear() {
        const start = new Date(this.getFullYear(), 0, 1);
        const current = new Date(this.getFullYear(), this.getMonth(), this.getDate());
        return Math.floor((current.getTime() - start.getTime()) / 86400000) + 1;
    }
    quarter() {
        return Math.floor(this.getMonth() / 3) + 1;
    }
    unix() {
        return Math.floor(this.getTime() / 1000);
    }
    addMs(amount) {
        return new D2I(this.getTime() + amount);
    }
    addSeconds(amount) {
        return this.addMs(amount * 1000);
    }
    addMinutes(amount) {
        return this.addMs(amount * 60000);
    }
    addHours(amount) {
        return this.addMs(amount * 3600000);
    }
    addDays(amount) {
        const out = this.clone();
        out.setDate(out.getDate() + amount);
        return out;
    }
    addWeeks(amount) {
        return this.addDays(amount * 7);
    }
    addMonths(amount) {
        const out = this.clone();
        const day = out.getDate();
        out.setDate(1);
        out.setMonth(out.getMonth() + amount);
        out.setDate(Math.min(day, out.daysInMonth()));
        return out;
    }
    addYears(amount) {
        const out = this.clone();
        const month = out.getMonth();
        const day = out.getDate();
        out.setDate(1);
        out.setFullYear(out.getFullYear() + amount);
        out.setMonth(month);
        out.setDate(Math.min(day, out.daysInMonth()));
        return out;
    }
    subDays(amount) {
        return this.addDays(-amount);
    }
    subMonths(amount) {
        return this.addMonths(-amount);
    }
    subYears(amount) {
        return this.addYears(-amount);
    }
    startOfDay() {
        const out = this.clone();
        out.setHours(0, 0, 0, 0);
        return out;
    }
    endOfDay() {
        const out = this.clone();
        out.setHours(23, 59, 59, 999);
        return out;
    }
    startOfWeek(weekStartsOn = 0) {
        const out = this.startOfDay();
        out.setDate(out.getDate() - ((out.getDay() - weekStartsOn + 7) % 7));
        return out;
    }
    endOfWeek(weekStartsOn = 0) {
        return this.startOfWeek(weekStartsOn).addDays(7).addMs(-1);
    }
    startOfMonth() {
        const out = this.startOfDay();
        out.setDate(1);
        return out;
    }
    endOfMonth() {
        return this.addMonths(1).startOfMonth().addMs(-1);
    }
    startOfQuarter() {
        const out = this.startOfDay();
        out.setMonth(Math.floor(out.getMonth() / 3) * 3, 1);
        return out;
    }
    endOfQuarter() {
        return this.startOfQuarter().addMonths(3).addMs(-1);
    }
    startOfYear() {
        const out = this.startOfDay();
        out.setMonth(0, 1);
        return out;
    }
    endOfYear() {
        return this.startOfYear().addYears(1).addMs(-1);
    }
    daysInMonth() {
        return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
    }
    daysInYear() {
        return this.isLeapYear() ? 366 : 365;
    }
    isLeapYear() {
        const year = this.getFullYear();
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    isWeekend() {
        return this.getDay() === 0 || this.getDay() === 6;
    }
    isWeekday() {
        return !this.isWeekend();
    }
    isBefore(other) {
        return this.getTime() < other.getTime();
    }
    isAfter(other) {
        return this.getTime() > other.getTime();
    }
    isEqual(other) {
        return this.getTime() === other.getTime();
    }
    isBetween(start, end) {
        return this.getTime() >= start.getTime() && this.getTime() <= end.getTime();
    }
    diffMs(other) {
        return this.getTime() - other.getTime();
    }
    diffSeconds(other) {
        return this.diffMs(other) / 1000;
    }
    diffMinutes(other) {
        return this.diffMs(other) / 60000;
    }
    diffHours(other) {
        return this.diffMs(other) / 3600000;
    }
    diffDays(other) {
        return this.diffMs(other) / 86400000;
    }
    sameDay(other) {
        return this.getFullYear() === other.getFullYear() &&
            this.getMonth() === other.getMonth() &&
            this.getDate() === other.getDate();
    }
    sameMonth(other) {
        return this.getFullYear() === other.getFullYear() &&
            this.getMonth() === other.getMonth();
    }
    sameYear(other) {
        return this.getFullYear() === other.getFullYear();
    }
    toUnixMs() {
        return this.getTime();
    }
    toUnix() {
        return this.unix();
    }
    toD2() {
        return this.clone();
    }
}
globalThis.D2 = D2I;
