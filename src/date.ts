export const DATE_TAG = 0x4432; // "D2"

export const D2_CODEC = {
    tag: DATE_TAG,

    test(v: A): v is D2 {
        return v instanceof Date;
    },

    enc(d: D): N {
        return d.getTime();
    },

    dec(ms: N): D2 {
        return new D2(ms);
    },
};

const FORMAT = {
    full: { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" },
    dm: { month: "short", day: "numeric" },
    dmy: { year: "numeric", month: "short", day: "numeric" },
    dmyw: { weekday: "short", year: "numeric", month: "short", day: "numeric" },
    t: { hour: "2-digit", minute: "2-digit" }
};

export function ToLocalString(v: any = FORMAT.full) { return new Date(v).toLocaleString("en-US", v);}

export class D2I extends Date implements D2  {
    constructor(value?: S | N | D) {
        if (value instanceof Date) super(value.getTime());
        else if (value === undefined) super();
        else super(value);
    }
    toLocalString(format: A = FORMAT.full): S { return super.toLocaleString("en-US", format); }
    static now(): N {return Date.now();}
    static fromUnix(seconds: N): D2 {return new D2I(seconds * 1000); }
    static fromUnixMs(ms: N): D2 {return new D2I(ms); }
    static fromParts(year: N, month: N, day: N, hour = 0, minute = 0, second = 0, ms = 0, ): D2 {
        return new D2I(new Date(year, month - 1, day, hour, minute, second, ms));
    }
    static today(): D2 { return new D2I().startOfDay(); }
    static min(...dates: D[]): D2 { return new D2I(Math.min(...dates.map((date) => date.getTime()))); }
    static max(...dates: D[]): D2 { return new D2I(Math.max(...dates.map((date) => date.getTime()))); }
    clone(): D2 { return new D2I(this); }
    isValid(): B { return Number.isFinite(this.getTime()); }
    month(): N { return this.getMonth() + 1; }
    dateOfWeek(): N { return this.getDay(); }
    dayOfYear(): N {
        const start = new Date(this.getFullYear(), 0, 1);
        const current = new Date(this.getFullYear(), this.getMonth(), this.getDate());
        return Math.floor((current.getTime() - start.getTime()) / 86400000) + 1;
    }
    quarter(): N { return Math.floor(this.getMonth() / 3) + 1; }
    unix(): N { return Math.floor(this.getTime() / 1000); }
    addMs(amount: N): D2 { return new D2I(this.getTime() + amount); }
    addSeconds(amount: N): D2 { return this.addMs(amount * 1000); }
    addMinutes(amount: N): D2 { return this.addMs(amount * 60000); }
    addHours(amount: N): D2 { return this.addMs(amount * 3600000); }
    addDays(amount: N): D2 {
        const out = this.clone();
        out.setDate(out.getDate() + amount);
        return out;
    }
    addWeeks(amount: N): D2 { return this.addDays(amount * 7); }
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
    subDays(amount: N): D2 { return this.addDays(-amount);    }
    subMonths(amount: N): D2 { return this.addMonths(-amount);    }
    subYears(amount: N): D2 { return this.addYears(-amount);    }
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
    endOfWeek(weekStartsOn = 0): D2 { return this.startOfWeek(weekStartsOn).addDays(7).addMs(-1);    }
    startOfMonth(): D2 {
        const out = this.startOfDay();
        out.setDate(1);
        return out;
    }
    endOfMonth(): D2 { return this.addMonths(1).startOfMonth().addMs(-1);    }
    startOfQuarter(): D2 {
        const out = this.startOfDay();
        out.setMonth(Math.floor(out.getMonth() / 3) * 3, 1);
        return out;
    }
    endOfQuarter(): D2 { return this.startOfQuarter().addMonths(3).addMs(-1);    }
    startOfYear(): D2 {
        const out = this.startOfDay();
        out.setMonth(0, 1);
        return out;
    }
    endOfYear(): D2 { return this.startOfYear().addYears(1).addMs(-1);    }
    daysInMonth(): N { return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();    }
    daysInYear(): N { return this.isLeapYear() ? 366 : 365;    }
    isLeapYear(): B {
        const year = this.getFullYear();
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    isWeekend(): B { return this.getDay() === 0 || this.getDay() === 6;    }
    isWeekday(): B { return !this.isWeekend();    }
    isBefore(other: D): B { return this.getTime() < other.getTime();    }
    isAfter(other: D): B { return this.getTime() > other.getTime();    }
    isEqual(other: D): B { return this.getTime() === other.getTime();    }
    isBetween(start: D, end: D): B { return this.getTime() >= start.getTime() && this.getTime() <= end.getTime();    }
    diffMs(other: D): N { return this.getTime() - other.getTime();    }
    diffSeconds(other: D): N { return this.diffMs(other) / 1000;    }
    diffMinutes(other: D): N { return this.diffMs(other) / 60000;    }
    diffHours(other: D): N { return this.diffMs(other) / 3600000;    }
    diffDays(other: D): N { return this.diffMs(other) / 86400000;    }
    sameDay(other: D): B {
        return this.getFullYear() === other.getFullYear() &&
            this.getMonth() === other.getMonth() &&
            this.getDate() === other.getDate();
    }
    sameMonth(other: D): B {
        return this.getFullYear() === other.getFullYear() &&
            this.getMonth() === other.getMonth();
    }
    sameYear(other: D): B { return this.getFullYear() === other.getFullYear();    }
    toUnixMs(): N { return this.getTime();    }
    toUnix(): N { return this.unix(); }
    toD2(): D2 { return this.clone(); }
    ago(): S { return this.fromNow(); }
    fromNow(): S { return this.from(new Date()); }
    from(other: D): S {
        const ms = this.getTime() - other.getTime();
        const abs = Math.abs(ms);
        const future = ms > 0;
    
        const units: [N, S][] = [
            [1000, "second"],
            [60_000, "minute"],
            [3_600_000, "hour"],
            [86_400_000, "day"],
            [604_800_000, "week"],
            [2_592_000_000, "month"],
            [31_536_000_000, "year"],
        ];
    
        if (abs < 1000) return "just now";
    
        let n = 1;
        let unit = "second";
    
        for (let i = units.length - 1; i >= 0; i--) {
            const [size, name] = units[i];
    
            if (abs >= size) {
                n = Math.floor(abs / size);
                unit = name;
                break;
            }
        }
    
        const plural = n === 1 ? "" : "s";
        return future
            ? `in ${n} ${unit}${plural}`
            : `${n} ${unit}${plural} ago`;
    }
    static from(v: A): D2 {
        // already a D2
        if (v instanceof D2I) return v.clone();
    
        // Date
        if (v instanceof Date) return new D2I(v.getTime());
    
        // epoch ms
        if (typeof v === "number") return new D2I(v);
    
        // string — dispatch by shape
        if (typeof v === "string") {
            const s = v.trim();
    
            // "YYYY-MM-DD" — date-only. Parse as LOCAL, not UTC (JS footgun)
            if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
                return D2I.parseDate(s);
            }
    
            // ISO with Z or offset — trust Date, it handles the zone correctly
            if (/^\d{4}-\d{2}-\d{2}T.*(Z|[+-]\d{2}:?\d{2})$/.test(s)) {
                return new D2I(s);
            }
    
            // "YYYY-MM-DDTHH:mm..." or "YYYY-MM-DD HH:mm..." — no zone, parse as local
            if (/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}/.test(s)) {
                return D2I.parseDateTime(s.replace("T", " "));
            }
    
            // fallback — let Date try (may be Invalid)
            return new D2I(s);
        }
    
        // array — [year, month, day, hour?, minute?, second?, ms?]
        if (Array.isArray(v)) {
            const [y, m, d, h = 0, min = 0, sec = 0, ms = 0] = v as N[];
            return D2I.fromParts(y, m, d, h, min, sec, ms);
        }
    
        // object — split form fields or numeric field bag
        if (typeof v === "object" && v !== null) {
            const o = v as A;
    
            // { date?: "YYYY-MM-DD", time?: "HH:mm[:ss]" } — scheduler split fields
            if ("date" in o || "time" in o) {
                const dateStr = (o.date ?? "").trim();
                const timeStr = (o.time ?? "").trim();
    
                if (!dateStr) return new D2I(NaN);   // no date = invalid
    
                const [y, m, d] = dateStr.split("-").map(Number);
                if (![y, m, d].every(Number.isFinite)) return new D2I(NaN);
    
                let h = 0, min = 0, sec = 0, ms = 0;
                if (timeStr) {
                    const parts = timeStr.split(":").map(Number);
                    [h = 0, min = 0, sec = 0] = parts;
                    // ms if a 4th segment exists
                    if (parts.length > 3) ms = parts[3];
                    if (![h, min, sec, ms].every(Number.isFinite)) return new D2I(NaN);
                }
    
                return D2I.fromParts(y, m, d, h, min, sec, ms);
            }
    
            // { year, month, day, hour?, minute?, second?, ms? } — numeric field bag
            if ("year" in o || "month" in o || "day" in o) {
                const y = o.year ?? NaN;
                const m = o.month ?? NaN;
                const d = o.day ?? NaN;
                if (![y, m, d].every(Number.isFinite)) return new D2I(NaN);
                return D2I.fromParts(y, m, d, o.hour ?? 0, o.minute ?? 0, o.second ?? 0, o.ms ?? 0);
            }
        }
    
        return new D2I(NaN);   // unrecognized → invalid
    }

    toInputDate(): S {
        return this.fmt("YYYY-MM-DD");
    }
    
    toInputTime(): S {
        return this.fmt("HH:mm");
    }
    
    toInputDateTime(): S {
        return this.fmt("YYYY-MM-DDTHH:mm");
    }
    
    toInputTimeWithSeconds(): S {
        return this.fmt("HH:mm:ss");
    }
    next(unit: DAYSD2): D2 {
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    
        if (days.includes(unit)) {          // ← was `unit in days` (index check, never true for names)
            const target = days.indexOf(unit);
            const diff = (target - this.getDay() + 7) % 7 || 7;
            return this.addDays(diff);
        }

        if (unit in days) {
            const target = days.indexOf(unit);
            const diff = (target - this.getDay() + 7) % 7 || 7;
            return this.addDays(diff);
        }
    
        if (unit === "day") return this.addDays(1);
        if (unit === "week") return this.addWeeks(1);
        if (unit === "month") return this.addMonths(1);
        if (unit === "quarter") return this.addMonths(3);
        if (unit === "year") return this.addYears(1);
    
        return this.clone();
    }
    prev(unit: Parameters<D2["next"]>[0]): D2 {
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    
        if (unit in days) {
            const target = days.indexOf(unit);
            const diff = (this.getDay() - target + 7) % 7 || 7;
            return this.subDays(diff);
        }
    
        if (unit === "day") return this.subDays(1);
        if (unit === "week") return this.subWeeks(1);
        if (unit === "month") return this.subMonths(1);
        if (unit === "quarter") return this.subMonths(3);
        if (unit === "year") return this.subYears(1);
    
        return this.clone();
    }
    nextWeek(): D2 { return this.addWeeks(1); }
    prevWeek(): D2 { return this.subWeeks(1); }
    nextMonth(): D2 { return this.addMonths(1); }
    prevMonth(): D2 { return this.subMonths(1); }
    nextQuarter(): D2 { return this.addMonths(3); }
    prevQuarter(): D2 { return this.subMonths(3); }
    nextYear(): D2 { return this.addYears(1); }
    prevYear(): D2 { return this.subYears(1); }
    subWeeks(n: N): D2 { return this.addWeeks(-n); }
    at(hour: N, minute = 0, second = 0, ms = 0): D2 {
        const out = this.clone();
        out.setHours(hour, minute, second, ms);
        return out;
    }
    atNoon(): D2 { return this.at(12); }
    midnight(): D2 { return this.startOfDay(); }
    addBusinessDays(n: N): D2 {
        let out = this.clone();
        let left = Math.abs(n);
        const dir = n < 0 ? -1 : 1;
    
        while (left > 0) {
            out = out.addDays(dir);
    
            if (out.isWeekday()) left--;
        }
    
        return out;
    }    
    nextBusinessDay(): D2 { return this.addBusinessDays(1); }
    prevBusinessDay(): D2 { return this.addBusinessDays(-1); }
    isBusinessDay(): B { return this.isWeekday(); }
    calendarDays(other: D): N {
        const a = new D2(this).startOfDay();
        const b = new D2(other).startOfDay();
    
        return Math.round(b.diffDays(a));
    }
    businessDays(other: D): N {
        let a = new D2(this).startOfDay();
        const b = new D2(other).startOfDay();
        let n = 0;
    
        while (a.isBefore(b)) {
            if (a.isWeekday()) n++;
            a = a.addDays(1);
        }
    
        return n;
    }
    diffHuman(other: D = new Date()): S {
        const ms = Math.abs(this.diffMs(other));
    
        const units: [N, S][] = [
            [31_536_000_000, "y"],
            [2_592_000_000, "mo"],
            [604_800_000, "w"],
            [86_400_000, "d"],
            [3_600_000, "h"],
            [60_000, "m"],
            [1000, "s"],
        ];
    
        for (const [size, label] of units) {
            if (ms >= size) {
                return `${Math.floor(ms / size)}${label}`;
            }
        }
    
        return `${ms}ms`;
    }
    fmt(format: S): S {
        const pad = (n: N, len = 2) => String(n).padStart(len, "0");
    
        const map: Record<S, S> = {
            YYYY: String(this.getFullYear()),
            YY: pad(this.getFullYear() % 100),
            MMMM: this.toLocaleString("en-US", { month: "long" }),
            MMM: this.toLocaleString("en-US", { month: "short" }),
            MM: pad(this.month()),
            M: String(this.month()),
            DD: pad(this.getDate()),
            D: String(this.getDate()),
            dddd: this.toLocaleString("en-US", { weekday: "long" }),
            ddd: this.toLocaleString("en-US", { weekday: "short" }),
            HH: pad(this.getHours()),
            H: String(this.getHours()),
            hh: pad(this.getHours() % 12 || 12),
            h: String(this.getHours() % 12 || 12),
            mm: pad(this.getMinutes()),
            m: String(this.getMinutes()),
            ss: pad(this.getSeconds()),
            s: String(this.getSeconds()),
            SSS: pad(this.getMilliseconds(), 3),
            A: this.getHours() < 12 ? "AM" : "PM",
            a: this.getHours() < 12 ? "am" : "pm",
        };
    
        return format.replace(
            /YYYY|YY|MMMM|MMM|MM|M|DD|D|dddd|ddd|HH|H|hh|h|mm|m|ss|s|SSS|A|a/g,
            token => map[token],
        );
    }
    static parseDate(v: S): D2 {
        const [y, m, d] = v.split("-").map(Number);
        return D2I.fromParts(y, m, d);
    }
    static parseDateTime(v: S): D2 {
        const [date, time = "00:00:00"] = v.split(" ");
        const [y, m, d] = date.split("-").map(Number);
        const [h, min, sec = 0] = time.split(":").map(Number);

        return D2I.fromParts(y, m, d, h, min, sec);
    }

    set(f: Partial<{ year: N; month: N; day: N; hour: N; minute: N; second: N; ms: N; }>): D2 {
        const out = this.clone();
    
        // Date axis — apply as a group, clamp-aware
        if (f.year !== undefined || f.month !== undefined || f.day !== undefined) {
            const y = f.year ?? out.getFullYear();
            const m = (f.month ?? out.getMonth() + 1) - 1;   // 1-based in, 0-based internal
            const targetDay = f.day ?? out.getDate();
    
            out.setDate(1);                    // pin day so month/year changes don't roll over
            out.setFullYear(y, m, 1);          // apply year + month with day = 1
            out.setDate(Math.min(targetDay, out.daysInMonth()));  // clamp day
        }
    
        // Time axis — independent, order-free
        if (f.hour !== undefined) out.setHours(f.hour);
        if (f.minute !== undefined) out.setMinutes(f.minute);
        if (f.second !== undefined) out.setSeconds(f.second);
        if (f.ms !== undefined) out.setMilliseconds(f.ms);
    
        return out;
    }
    withDate(year: N, month: N, day: N): D2 {
        return this.set({ year, month, day });
    }
    sameTimeOn(other: D): D2 {
        return this.set({
            year: other.getFullYear(),
            month: other.getMonth() + 1,
            day: other.getDate(),
        });
    }
}



export class R2I implements R2 {
    constructor(public start: D2, public end: D2) {}

    contains(d: D): B {
        return D2.from(d).isBetween(this.start, this.end);
    }

    overlaps(other: R2): B {
        return this.start.isBefore(other.end) && other.start.isBefore(this.end);
    }

    durationMs(): N {
        return this.end.diffMs(this.start);
    }

    days(): N {
        return Math.floor(this.durationMs() / 86_400_000);
    }

    eachDay(fn: (d: D2, i: N) => void): void {
        let cur = this.start.startOfDay();

        for (let i = 0; cur.isBefore(this.end); i++) {
            fn(cur, i);
            cur = cur.addDays(1);
        }
    }

    toArray(): AR<D2> {
        const out: AR<D2> = [];
        this.eachDay(d => out.push(d));
        return out;
    }
}
export const R2II = (start: D, end: D): R2 => new R2I(new D2(start), new D2(end));

globalThis.D2 = D2I;
globalThis.R2 = R2I;
globalThis.R2FN = R2II;

/*  ====================================================================================================
     I don't know about you, but for me... I have spent so much time fine tuning appt schedulers and
     custom formatting the dates that come back, making sure the times line up with the time zone
     making sure it outputs in the req format for the next system to consume... fuck that shit dude...
     I know I have another project coming up where, there will be a literal fuck ton of that bullshit...
     so this fucking thing is already huge, TO WHICH... I knew coming into this one that this was
     going to be a rather large one in terms of surface area... just look at the libs that are available.

     Lets get the hardest thing off the board, becasue I beleive everything else will fall into place with
     it get completed... which is:
     On the same level os ease and quicknesss as say... something like use state, we need to not only
     preserve the values we do not edit... but also allows us to edit the req values needed and make
     it so that, we can code it into our solutions like a reusable ui comp.
     I know... rediculous, considering whats currently available... but lets try to hit that target and...
     pray to the fucking dev gods that tthey bestow us with the bits and bytes that would help us
     get to the finish line.
    =============================================================== ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [D2] */
/*  ====================================================================================================
     D2.now().subMinutes(3).ago();       // "3 minutes ago"
     D2.now().addHours(2).fromNow();     // "in 2 hours"

     d.next("friday");
     d.prev("monday").startOfDay();
     d.nextMonth().startOfMonth();

     d.at(9, 30);        // today at 09:30 local
     d.at(9, 30, 0, 0);  // h, m, s, ms
     d.atNoon();
     d.midnight();       // alias for startOfDay

     const range = D2.range(start, end);

     range.contains(d);
     range.days();
     range.overlaps(other);
     range.durationMs();

     const sprint = R2(D2.today(), D2.today().addDays(14));

     sprint.contains(D2.now());
     sprint.days();
     sprint.eachDay(d => console.log(d.toLocalString(FORMAT.dmy)));

     D2.today().addBusinessDays(3);
     D2.today().nextBusinessDay().at(9);

     d.diffHuman(other); // "3d 4h 12m"
     d.calendarDays(other); // 3
     d.businessDays(other); // 2
 
     d.fmt("YYYY-MM-DD");
     d.fmt("MMM D, YYYY h:mm A");
     d.fmt("dddd");
 
     d.fmt("YYYY-MM-DD");
     d.fmt("MMM D, YYYY h:mm A");
     d.fmt("dddd, MMM D");
 
     D2.parseDate("2026-10-28");
     D2.parseDateTime("2026-10-28 14:30");

     const d = D2.fromParts(2026, 10, 28, 14, 30, 0, 0);  // 2026-10-28 14:30

     d.set({ hour: 9 });              // 2026-10-28 09:30  (date + minute preserved)
     d.set({ day: 15 });              // 2026-10-15 14:30  (time preserved)
     d.set({ month: 12 });            // 2026-12-28 14:30
     d.set({ year: 2027 });           // 2027-10-28 14:30
     d.set({ hour: 9, minute: 0 });   // 2026-10-28 09:00
 
     d.set({ month: 11, day: 15 });                   // 2026-11-15 14:30
     d.set({ year: 2027, hour: 0, minute: 0 });       // 2027-10-28 00:00
 
     d.set({ year: 2027, month: 3, day: 15, hour: 9, minute: 30, second: 0, ms: 0 });
     // 2027-03-15 09:30:00.000
 
     const jan31 = D2.fromParts(2026, 1, 31, 10, 0);
     jan31.set({ month: 2 });         // 2026-02-28 10:00  (Feb has 28 days in 2026)
     jan31.set({ month: 2, day: 31 }); // 2026-02-28 10:00 (clamped)
     D2.fromParts(2028, 1, 31).set({ month: 2 });  // 2028-02-29 (leap year)
 
     d.at(9, 30);                     // set({ hour: 9, minute: 30 })
     d.withDate(2027, 3, 15);         // set({ year: 2027, month: 3, day: 15 })
     d.startOfDay();                  // set({ hour: 0, minute: 0, second: 0, ms: 0 })
     d.endOfDay();                    // set({ hour: 23, minute: 59, second: 59, ms: 999 })
 
     const other = D2.fromParts(2026, 12, 25, 8, 0);
     d.sameTimeOn(other);             // 2026-12-25 14:30  (d's time, other's date)
 
     // user picks 9:30am for an appointment, date stays
     store.set('appointment', store.get('appointment').set({ hour: 9, minute: 30 }));
 
     // user picks a new day, time stays
     store.set('appointment', store.get('appointment').set({ day: 22 }));
 
     // user picks a new month and day
     store.set('appointment', store.get('appointment').set({ month: 11, day: 15 }));
 
     // functional update — same shape as React's setState(prev => ...)
     store.update('appointment', prev => prev.set({ hour: 9 }));
 
     // change time, then date, each one preserving the rest
     const moved = appt.set({ hour: 9 }).set({ month: 12 }).set({ day: 24 });
     // 2026-12-24 09:30 — hour from first, month from second, day from third
 
     // day cell clicked — keep time, change date
     const onDayClick = (day: number) =>
         store.set('selected', store.get('selected').set({ day }));
 
     // time picker — keep date, change time
     const onTimePick = (hour: number, minute: number) =>
         store.set('selected', store.get('selected').set({ hour, minute }));
 
     // month nav
     const nextMonth = () => {
         const d = store.get('selected');
         store.set('selected', d.set({ month: d.month() % 12 + 1, year: d.month() === 12 ? d.getFullYear() + 1 : d.getFullYear() }));
     };
 
     // form gives split fields
     const raw = { date: "2026-10-28", time: "14:30" };
 
     // ingest
     let appt = D2.from(raw);              // 2026-10-28 14:30 local
     if (!appt.isValid()) return;          // form incomplete/invalid
 
     // edit — same set as everything else
     appt = appt.set({ minute: 0 });       // 14:30 → 14:00, date preserved
     appt = appt.set({ day: 29 });         // 28 → 29, time preserved
 
     // write back to form
     form.date.value = appt.toInputDate(); // "2026-10-29"
     form.time.value = appt.toInputTime(); // "14:00"
 
     // or to the store
     store.set("appointment", appt);
 
     D2.from({ date: "2026-10-28" })                  // 2026-10-28 00:00 local
     D2.from({ time: "14:30" })                       // Invalid Date — no date
     D2.from({ date: "2026-10-28", time: "" })        // 2026-10-28 00:00 local
     D2.from({ date: "2026-10-28", time: "14:30:15" }) // 14:30:15
     D2.from("2026-10-28")                            // local midnight, not UTC
     D2.from("2026-10-28T14:30:00Z")                  // correct instant, shown local
     D2.from("2026-10-28T14:30")                      // local 14:30
     D2.from("2026-10-28 14:30")                      // local 14:30 (space separator)
     D2.from("garbage")                               // Invalid Date — isValid() false
     D2.from(0)                                       // 1970-01-01 00:00 local
     D2.from(NaN)                                     // Invalid Date
     D2.from([2026, 10, 28])                          // 2026-10-28 00:00
     D2.from({ year: 2026, month: 10, day: 28 })      // 2026-10-28 00:00
     D2.from({ year: 2026, month: 10, day: 28, hour: 9 }) // 2026-10-28 09:00
 
     export interface D2 extends Date {
         // ... existing ...
 
         set(f: Partial<{
             year: N; month: N; day: N;
             hour: N; minute: N; second: N; ms: N;
         }>): D2;
 
         withDate(year: N, month: N, day: N): D2;
         sameTimeOn(other: D): D2;
 
         toInputDate(): S;
         toInputTime(): S;
         toInputTimeWithSeconds(): S;
         toInputDateTime(): S;
 
         // static (add to the class, not the interface — statics don't go in interface)
     }
    =============================================================== ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [D2] */

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


























