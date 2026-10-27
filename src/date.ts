export interface D2 extends Date {
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
}

const FORMAT = {
    full: { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" },
    dm: { month: "short", day: "numeric" },
    dmy: { year: "numeric", month: "short", day: "numeric" },
    dmyw: { weekday: "short", year: "numeric", month: "short", day: "numeric" },
    t: { hour: "2-digit", minute: "2-digit" }
};

export function ToLocalString(v: any = FORMAT.full) {
    return new Date(v).toLocaleString("en-US", v);
}

export class D2I extends Date implements D2I {
    constructor(value?: S | N | D) {
        if (value instanceof Date) super(value.getTime());
        else if (value === undefined) super();
        else super(value);
    }
    toLocalString(format: A = FORMAT.full): S {
       return new Date().toLocaleString("en-US", format);
    }
    static now(): N {
        return Date.now();
    }

    static fromUnix(seconds: N): D2 {
        return new D2I(seconds * 1000);
    }

    static fromUnixMs(ms: N): D2 {
        return new D2I(ms);
    }

    static fromParts(
        year: N,
        month: N,
        day: N,
        hour = 0,
        minute = 0,
        second = 0,
        ms = 0,
    ): D2 {
        return new D2I(new Date(year, month - 1, day, hour, minute, second, ms));
    }

    static today(): D2 {
        return new D2I().startOfDay();
    }

    static min(...dates: D[]): D2 {
        return new D2I(Math.min(...dates.map((date) => date.getTime())));
    }

    static max(...dates: D[]): D2 {
        return new D2I(Math.max(...dates.map((date) => date.getTime())));
    }

    clone(): D2 {
        return new D2I(this);
    }

    isValid(): B {
        return Number.isFinite(this.getTime());
    }

    month(): N {
        return this.getMonth() + 1;
    }

    dateOfWeek(): N {
        return this.getDay();
    }

    dayOfYear(): N {
        const start = new Date(this.getFullYear(), 0, 1);
        const current = new Date(this.getFullYear(), this.getMonth(), this.getDate());
        return Math.floor((current.getTime() - start.getTime()) / 86400000) + 1;
    }

    quarter(): N {
        return Math.floor(this.getMonth() / 3) + 1;
    }

    unix(): N {
        return Math.floor(this.getTime() / 1000);
    }

    addMs(amount: N): D2 {
        return new D2I(this.getTime() + amount);
    }

    addSeconds(amount: N): D2 {
        return this.addMs(amount * 1000);
    }

    addMinutes(amount: N): D2 {
        return this.addMs(amount * 60000);
    }

    addHours(amount: N): D2 {
        return this.addMs(amount * 3600000);
    }

    addDays(amount: N): D2 {
        const out = this.clone();
        out.setDate(out.getDate() + amount);
        return out;
    }

    addWeeks(amount: N): D2 {
        return this.addDays(amount * 7);
    }

    addMonths(amount: N): D2 {
        const out = this.clone();
        const day = out.getDate();
        out.setDate(1);
        out.setMonth(out.getMonth() + amount);
        out.setDate(Math.min(day, out.daysInMonth()));
        return out;
    }

    addYears(amount: N): D2 {
        const out = this.clone();
        const month = out.getMonth();
        const day = out.getDate();
        out.setDate(1);
        out.setFullYear(out.getFullYear() + amount);
        out.setMonth(month);
        out.setDate(Math.min(day, out.daysInMonth()));
        return out;
    }

    subDays(amount: N): D2 {
        return this.addDays(-amount);
    }

    subMonths(amount: N): D2 {
        return this.addMonths(-amount);
    }

    subYears(amount: N): D2 {
        return this.addYears(-amount);
    }

    startOfDay(): D2 {
        const out = this.clone();
        out.setHours(0, 0, 0, 0);
        return out;
    }

    endOfDay(): D2 {
        const out = this.clone();
        out.setHours(23, 59, 59, 999);
        return out;
    }

    startOfWeek(weekStartsOn = 0): D2 {
        const out = this.startOfDay();
        out.setDate(out.getDate() - ((out.getDay() - weekStartsOn + 7) % 7));
        return out;
    }

    endOfWeek(weekStartsOn = 0): D2 {
        return this.startOfWeek(weekStartsOn).addDays(7).addMs(-1);
    }

    startOfMonth(): D2 {
        const out = this.startOfDay();
        out.setDate(1);
        return out;
    }

    endOfMonth(): D2 {
        return this.addMonths(1).startOfMonth().addMs(-1);
    }

    startOfQuarter(): D2 {
        const out = this.startOfDay();
        out.setMonth(Math.floor(out.getMonth() / 3) * 3, 1);
        return out;
    }

    endOfQuarter(): D2 {
        return this.startOfQuarter().addMonths(3).addMs(-1);
    }

    startOfYear(): D2 {
        const out = this.startOfDay();
        out.setMonth(0, 1);
        return out;
    }

    endOfYear(): D2 {
        return this.startOfYear().addYears(1).addMs(-1);
    }

    daysInMonth(): N {
        return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
    }

    daysInYear(): N {
        return this.isLeapYear() ? 366 : 365;
    }

    isLeapYear(): B {
        const year = this.getFullYear();
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }

    isWeekend(): B {
        return this.getDay() === 0 || this.getDay() === 6;
    }

    isWeekday(): B {
        return !this.isWeekend();
    }

    isBefore(other: D): B {
        return this.getTime() < other.getTime();
    }

    isAfter(other: D): B {
        return this.getTime() > other.getTime();
    }

    isEqual(other: D): B {
        return this.getTime() === other.getTime();
    }

    isBetween(start: D, end: D): B {
        return this.getTime() >= start.getTime() && this.getTime() <= end.getTime();
    }

    diffMs(other: D): N {
        return this.getTime() - other.getTime();
    }

    diffSeconds(other: D): N {
        return this.diffMs(other) / 1000;
    }

    diffMinutes(other: D): N {
        return this.diffMs(other) / 60000;
    }

    diffHours(other: D): N {
        return this.diffMs(other) / 3600000;
    }

    diffDays(other: D): N {
        return this.diffMs(other) / 86400000;
    }

    sameDay(other: D): B {
        return this.getFullYear() === other.getFullYear() &&
            this.getMonth() === other.getMonth() &&
            this.getDate() === other.getDate();
    }

    sameMonth(other: D): B {
        return this.getFullYear() === other.getFullYear() &&
            this.getMonth() === other.getMonth();
    }

    sameYear(other: D): B {
        return this.getFullYear() === other.getFullYear();
    }

    toUnixMs(): N {
        return this.getTime();
    }

    toUnix(): N {
        return this.unix();
    }

    toD2(): D2 {
        return this.clone();
    }
}

globalThis.D2 = D2I;
