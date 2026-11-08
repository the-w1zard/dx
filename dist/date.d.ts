export declare const DATE_TAG = 17458;
export declare const D2_CODEC: {
    tag: number;
    test(v: A): v is D2;
    enc(d: D): N;
    dec(ms: N): D2;
};
export declare class D2I extends Date implements D2 {
    constructor(value?: S | N | D);
    toLocalString(format?: A): S;
    static now(): N;
    static fromUnix(seconds: N): D2;
    static fromUnixMs(ms: N): D2;
    static fromParts(year: N, month: N, day: N, hour?: number, minute?: number, second?: number, ms?: number): D2;
    static today(): D2;
    static min(...dates: D[]): D2;
    static max(...dates: D[]): D2;
    clone(): D2;
    isValid(): B;
    month(): N;
    dateOfWeek(): N;
    dayOfYear(): N;
    quarter(): N;
    unix(): N;
    addMs(amount: N): D2;
    addSeconds(amount: N): D2;
    addMinutes(amount: N): D2;
    addHours(amount: N): D2;
    addDays(amount: N): D2;
    addWeeks(amount: N): D2;
    addMonths(amount: N): D2;
    addYears(amount: N): D2;
    subDays(amount: N): D2;
    subMonths(amount: N): D2;
    subYears(amount: N): D2;
    startOfDay(): D2;
    endOfDay(): D2;
    startOfWeek(weekStartsOn?: number): D2;
    endOfWeek(weekStartsOn?: number): D2;
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
    isBefore(other: D): B;
    isAfter(other: D): B;
    isEqual(other: D): B;
    isBetween(start: D, end: D): B;
    diffMs(other: D): N;
    diffSeconds(other: D): N;
    diffMinutes(other: D): N;
    diffHours(other: D): N;
    diffDays(other: D): N;
    sameDay(other: D): B;
    sameMonth(other: D): B;
    sameYear(other: D): B;
    toUnixMs(): N;
    toUnix(): N;
    toD2(): D2;
    ago(): S;
    fromNow(): S;
    from(other: D): S;
    static from(v: A): D2;
    toInputDate(): S;
    toInputTime(): S;
    toInputDateTime(): S;
    toInputTimeWithSeconds(): S;
    next(unit: DAYSD2): D2;
    prev(unit: Parameters<D2["next"]>[0]): D2;
    nextWeek(): D2;
    prevWeek(): D2;
    nextMonth(): D2;
    prevMonth(): D2;
    nextQuarter(): D2;
    prevQuarter(): D2;
    nextYear(): D2;
    prevYear(): D2;
    subWeeks(n: N): D2;
    at(hour: N, minute?: number, second?: number, ms?: number): D2;
    atNoon(): D2;
    midnight(): D2;
    addBusinessDays(n: N): D2;
    nextBusinessDay(): D2;
    prevBusinessDay(): D2;
    isBusinessDay(): B;
    calendarDays(other: D): N;
    businessDays(other: D): N;
    diffHuman(other?: D): S;
    fmt(format: S): S;
    static parseDate(v: S): D2;
    static parseDateTime(v: S): D2;
    set(f: Partial<{
        year: N;
        month: N;
        day: N;
        hour: N;
        minute: N;
        second: N;
        ms: N;
    }>): D2;
    withDate(year: N, month: N, day: N): D2;
    sameTimeOn(other: D): D2;
    to(other: D): R2;
    isSameOrBefore(other: D): B;
    isSameOrAfter(other: D): B;
    clamp(min: D, max: D): D2;
    isSame(unit: "day" | "week" | "month" | "quarter" | "year", other: D): B;
    isToday(): B;
    isTomorrow(): B;
    isYesterday(): B;
    age(unit?: "years" | "months" | "days"): N;
}
export declare class R2I implements R2 {
    start: D2;
    end: D2;
    constructor(start: D2, end: D2);
    contains(d: D): B;
    overlaps(other: R2): B;
    durationMs(): N;
    days(): N;
    eachDay(fn: (d: D2, i: N) => void): void;
    toArray(): A2I<D2>;
}
export declare const R2II: (start: D, end: D) => R2;
/**
 *     enc(value:A) {
if (D2_CODEC.test(value)) {
    writeTag(DATE_TAG);
    writeI64(value.getTime());
    return;
}

// existing object / array / string / map handling
}
dec(value:A) {
if (tag === DATE_TAG) { return new D2(readI64()); }

// existing revival paths
}
 */
