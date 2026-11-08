
<div align="left" style="position: relative;">
<img src="./icons/gandalf.png" align="right" width="30%" style="margin: -20px 0 0 20px;">

<h3 style="font-size:26px;">DX: <span style="font-size:18px;" >The Wizard's Arsenal</span></h3>

<p align="left"><em>The most opinionated platform... ever.</em></p>
<p align="left"><em>Trust me... I'm a fucking wizard... 🧙</em></p>
<p align="left">Platforms stats:</p>
<p align="left">
<img src="https://img.shields.io/badge/LINES OF CODE- 10,300,000-95ED27?style=flat">
<img src="https://img.shields.io/badge/FEATURES- UNKNOWN-95ED27?style=flat">
<img src="https://img.shields.io/badge/REACTS RULES ON HOOKS- 0-95ED27?style=flat">
<img src="https://img.shields.io/badge/DISRUPTORS- 18+-95ED27?style=flat">
<img src="https://img.shields.io/badge/MESSAGE QUEUES- 5-95ED27?style=flat">
</p>
<p align="left">VSCode ext:</p>
<p align="left">
<img src="https://img.shields.io/badge/THEMES- 251-95ED27?style=flat">
<img src="https://img.shields.io/badge/SIDEBARS- 160+-95ED27?style=flat">
<img src="https://img.shields.io/badge/PRODUCT ICONS- 651-95ED27?style=flat">
<img src="https://img.shields.io/badge/FILE ICONS- 454-95ED27?style=flat">
<img src="https://img.shields.io/badge/VSCode Extentions- 82+-95ED27?style=flat">
<img src="https://img.shields.io/badge/FEATURES- SHIT TONNE-95ED27?style=flat">
</p>
<p align="left">Small but powerful repos worth checking out:</p>
<p align="left">

- [![🧙 Alias Types](https://img.shields.io/badge/Alias%20Types-000000.svg?style=flat&logo=typescript&logoColor=white)](https://github.com/the-w1zard/alias_types) <a href="https://www.npmjs.com/package/@the-w1zard/alias_types"><img src="./icons/npm.png" alt="alias_types" width="20" height="20"></a>
- [![🧙 The Cloud](https://img.shields.io/badge/%F0%9F%A7%99%20App%20Store-000000.svg?style=flat)](https://github.com/the-w1zard/app_store)  <a href="https://www.npmjs.com/package/@the-w1zard/store"><img src="./icons/npm.png" alt="app_store" width="20" height="20"></a>
- [![🧙 The Cloud](https://img.shields.io/badge/%F0%9F%A7%99%20DX-95ED27.svg?style=flat)](https://github.com/the-w1zard/dx) <a href="https://www.npmjs.com/package/@the-w1zard/dx"><img src="./icons/npm.png" alt="dx" width="20" height="20"></a>
- [![🧙 The Cloud](https://img.shields.io/badge/%F0%9F%A7%99%20Temporal%20Shift-77AA99.svg?style=flat)](https://github.com/the-w1zard/temporal_shift) <a href="https://www.npmjs.com/package/@the-w1zard/temporal_shift"><img src="./icons/npm.png" alt="temporal_shift" width="20" height="20"></a>
- [![🧙 The Cloud](https://img.shields.io/badge/%F0%9F%A7%99%20The%20Cloud-02303A.svg?style=flat)](https://github.com/the-w1zard/the_cloud)  <a href="https://www.npmjs.com/package/@the-w1zard/the-cloud"><img src="./icons/npm.png" alt="app_store" width="20" height="20"></a>
- [![🧙 SINGULARITY](https://img.shields.io/badge/%F0%9F%A7%99%20SINGULARITY-02303A.svg?style=flat)](https://github.com/the-w1zard)  
- [![🧙 Sometimes,%20my%20genius...%20It%20generates%20gravity.](https://img.shields.io/badge/%F0%9F%A7%99%20Sometimes,%20my%20genius...%20It%20generates%20gravity.-4285F4.svg?style=flat)](https://github.com/the-w1zard)  
- [![🧙 The Wizard](https://img.shields.io/badge/%F0%9F%A7%99%20Coming%20Soon:%20The%20Wizard%20Ed.-7F52FF.svg?style=flat)](https://github.com/the-w1zard)  
- [![🧙 Hadron Particle Disruptor](https://img.shields.io/badge/%F0%9F%A7%99%20Coming%20Soon:%20Hadron%20Particle%20Disruptor-23ED8B00.svg?style=flat)](https://github.com/the-w1zard)  
</p>
<p align="left">The goal? To remove all friction, from everything.</p>
</div>
<br clear="right">

---
<span  style="font-family: monospace"> 


> [!NOTE] TLDR
>
> Take what is currently... lacking in the ux dept. and give it the updates they desperatly need.

> [!IMPORTANT] BENCH RESULTS
>
> Currently in the middle of throwing together another implementation and since I have already created them, I'm going to be placing them within the solution due to the fact that I don't just throw everything away. Especially when they work like this.
>
> To give some context on the numbers, starting with the basic map. V8 has optimized maps path, really optimized when its only used with int's. Essentially, simply put, its a disruptor. Which is why the number is so high. The very next one, is 
>
> ```txt
> === Starting 10-Second Nested Router Benchmarks ===
> [1. ORIGINAL RECIPE] 50,081,792 ops -> 5,008,122 ops/sec
> [2. INTERNED] 90,097,664 ops -> 9,009,692 ops/sec
> [3. HOT PATH IDX] 91,598,848 ops -> 9,159,753 ops/sec
> [4. NOT NESTED, CHS CONVERTED TO BIG INT] 30,720 ops -> 2,515 ops/sec
> [5. 3D FLAT (M2BNestedClass)] 2,272,765,952 ops -> 227,274,854 ops/sec
> [6. True Binary + Single-Slot Memo] 1,037,336,576 ops -> 103,733,619 ops/sec
> === Benchmarks Complete ===
> 
> 
> --- Starting 10-Second Binary Store Benchmarks (Set & Get) ---
> [Map] 478,537,728 ops in 10.00s -> 47,853,532 ops/sec
> [getNestedMap6 vs)] 24,862,720 ops in 10.00s -> 2,486,192 ops/sec
> [BYTEOP_MAP LG vs)] 286,138,368 ops in 10.00s -> 28,613,545 ops/sec
> [M2B] 896,022,528 ops in 10.00s -> 89,601,992 ops/sec
> [M2] 366,237,696 ops in 10.00s -> 36,623,606 ops/sec
> [BYTE_MAP small vs)] 41,459,712 ops in 10.00s -> 4,145,936 ops/sec
> [M2Bin (Hybrid Map + Int32/F64)] 35,465,216 ops in 10.00s -> 3,546,358 ops/sec
> [M2Dense (Dense Array + Live Byte Lane)] 23,777,280 ops in 10.00s -> 2,377,641 ops/sec
> [M2Rows (Strided Row Buffer, stride=1)] 31,150,080 ops in 10.00s -> 3,114,899 ops/sec
> --- Benchmarks Complete ---
> ```

</span>


# Built-in API Extensions

Extensions to native JavaScript objects that improve developer experience by adding commonly needed operations while preserving the original APIs.

The package extends native classes and exposes their implementations through `globalThis`, allowing them to be accessed without importing each class individually.

## Table of Contents

<ul style="list-style: none; padding-left: 0;">
  <li><a href="#a2--array">A2 — Array</a></li>
  <li><a href="#b2--byte-bool">B2 — Byte Boolean</a></li>
  <li><a href="#d2--date">D2 — Date</a></li>
  <li><a href="#er2--error">ER2 — Error</a></li>
  <li><a href="#i2--iterator">I2 — Iterator</a></li>
  <li><a href="#m2--map">M2 — Map</a></li>
  <li><a href="#m2b--map-byte">M2B — Map Byte</a></li>
  <li><a href="#m2bin--map-binary">M2BIN — Map Binary</a></li>
  <li><a href="#m2d--map-dense">M2D — Map Dense</a></li>
  <li><a href="#m2r--map-rows">M2R — Map Rows</a></li>
  <li><a href="#n2--number">N2 — Number</a></li>
  <li><a href="#nested--maps">nested — maps</a></li>
  <li><a href="#o2--object">O2 — Object</a></li>
  <li><a href="#p2--promise">P2 — Promise</a></li>
  <li><a href="#re2--regular-expression">RE2 — Regular Expression</a></li>
  <li><a href="#res2--regular-expression-static">RES2 — Regular Expression Builder &amp; Presets</a></li>
  <li><a href="#s2--string">S2 — String</a></li>
  <li><a href="#set2--set">SET2 — Set</a></li>
  <li><a href="#set2b--set-binary">SET2B — Set Binary</a></li>
  <li><a href="#u82--array">U82 — Uint8Array</a></li>
  <li><a href="#usp2--urlsearchparams">USP2 — URLSearchParams</a></li>
  <li><a href="#wm2--weakmap">WM2 — WeakMap</a></li>
  <li><a href="#ws2--weakset">WS2 — WeakSet</a></li>
</ul>

> [!IMPORTANT] To improve your ux/dx to an even greater degree...
>
> I would suggest checking out <a href="https://www.npmjs.com/package/@the-w1zard/alias_types">Alias Types</a>, as it aims to do the same thing as dx but from a different angle.
>
> ```tsx 
> npm i -D @the-w1zard/alias_types
> ```
>
> ```tsx 
> pnpm i -D @the-w1zard/alias_types
> ```

## Global APIs

| Global | Extends | Interface | Purpose |
|---|---|---|---|
| `A2` | `Array` | `A2I` | Array manipulation, selection, grouping, and aggregation |
| `B2` | — | `B2I` | Byte-based boolean operations |
| `D2` | `Date` | `D2I` | Date arithmetic, boundaries, comparisons, and formatting |
| `ER2` | `Error` | `ER2I` | Error normalization, cloning, serialization, and wrapping |
| `I2` | Iterator | `I2I` | Lazy iterator pipelines and collection operations |
| `M2` | `Map` | `M2I` | Map access helpers, transformations, grouping, and comparison |
| `M2B` | `Map` | `M2BI` | Byte-backed map storage and operations |
| `M2BIN` | `Map` | `M2BINI` | Binary map storage using packed PID-to-slot indexing |
| `M2D` | `Map` | `M2DI` | Dense map storage using direct numeric indexing |
| `M2R` | `Map` | `M2RI` | Packed fixed-width numeric row storage |
| `N2` | `Number` | `N2I` | Numeric operations, range mapping, formatting, and validation |
| `nested` | `class` | `nestedi` | Class exposing several nested maps fns |
| `O2` | `Object` | `O2I` | Extended object operations |
| `P2` | `Promise` | `P2I` | Extended promise operations |
| `RE2` | `RegExp` | `RE2_IF` | Regex matching, collection, replacement, composition, and debugging |
| `RES2` | — | `RE2Static` | Regex factory, builders, character classes, and presets |
| `S2` | `String` | `S2I` | Extended string operations |
| `SET2` | `Set` | `SET2I` | Extended set operations |
| `SET2B` | `Set` | `SET2BI` | Binary set storage and operations |
| `U82` | `Uint8Array` | `U82I` | Extended byte-array operations |
| `USP2` | `URLSearchParams` | `USP2I` | Extended URL parameter operations |
| `WM2` | `WeakMap` | `WM2I` | Extended weak-map operations |
| `WS2` | `WeakSet` | `WS2I` | Extended weak-set operations |

The global declarations provide TypeScript access to these APIs. `MaybePromise` is also declared globally as a type alias and fn.

## Quick Reference


## `A2` — Array

`A2I` extends `Array` and adds collection helpers. Methods returning arrays generally return `A2I` instances.

| Method | Description |
|---|---|
| `first()` / `last()` | Retrieve the first or last element |
| `isEmpty()` / `isNotEmpty()` | Check whether the array contains elements |
| `clear()` | Empty the array in place |
| `clone()` | Create a shallow copy |
| `unique()` / `compact()` | Remove duplicates or nullish values |
| `take()` / `takeLast()` | Select elements from either end |
| `drop()` / `dropLast()` | Remove elements from either end |
| `chunk(size)` | Split into fixed-size arrays |
| `flatten(depth?)` | Flatten nested arrays |
| `flatMap(callback)` | Map and flatten |
| `distinctBy(callback)` | Deduplicate by a computed key |
| `groupBy(callback)` | Group elements into a map |
| `partition(callback)` | Split into matching and nonmatching arrays |
| `insert(index, ...items)` | Insert elements in place |
| `removeAt(index)` | Remove and return an element |
| `remove(value)` / `removeAll(value)` | Remove one or all matching values |
| `replaceAt(index, value)` | Replace an element and return the previous value |
| `move(from, to)` / `swap(first, second)` | Reorder elements in place |
| `sample()` | Return a random element |
| `shuffle()` | Shuffle in place |
| `countBy(callback)` | Count matching elements |
| `sum(callback?)` / `average(callback?)` | Calculate numeric aggregates |
| `min(callback?)` / `max(callback?)` | Find minimum or maximum element |
| `equals(array)` | Compare arrays using `Object.is` |
| `includesAll(values)` | Check whether every supplied value exists |
| `intersects(values)` | Check whether any supplied value exists |

Static helpers include `A2I.from()` and `A2I.of()`.


## `B2` — Bool Byte 

`B2I` replaces boolean properties and boolean maps with a zero-allocation, PID-indexed `Uint8Array` lane. One byte per PID, no boxing, no `Map`, no per-entry allocation — `set`, `get`, and `toggle` are O(1) array stores, and `clear` is a single `fill(0)`.

| Method | Description |
|---|---|
| `set(pid, value)` | Set the boolean flag for a PID |
| `true(pid, value)` | Set the flag to `1` (`value` is accepted for call-site symmetry and ignored) |
| `false(pid, value)` | Set the flag to `0` (`value` is accepted for call-site symmetry and ignored) |
| `get(pid)` | Return `true` if the PID's flag is `1`, else `false` |
| `toggle(pid)` | Flip the PID's flag and return the new state |
| `clear()` | Zero every flag in place; no reallocation |
| `flags` | The backing `Uint8Array`, indexed by PID |

## `D2` — Date

`D2` extends `Date` and keeps the standard `Date` API, adding immutable date arithmetic, calendar helpers, human-readable diffs, custom formatting, and locale-aware parsing. Every method returns a new `D2I`; the receiver is never mutated.

Registered as a codec (`DATE_TAG = 0x4432`, `"D2"`): `enc` writes the epoch-ms as an `i64`, `dec` revives it as a `D2I`.

| Method | Description |
|---|---|
| `set(f)` | Return a new date with the given `{ year, month, day, hour, minute, second, ms }` fields applied; unset fields are preserved, `day` is clamped to the target month |
| `withDate(year, month, day)` | Replace the calendar date, keep the time |
| `sameTimeOn(other)` | Keep this date's time, adopt `other`'s calendar date |
| `at(hour, minute?, second?, ms?)` | Return a new date at the given time on this date |
| `atNoon()` / `midnight()` | `at(12)` / `startOfDay()` |
| `toInputDate()` / `toInputTime()` / `toInputDateTime()` / `toInputTimeWithSeconds()` | `YYYY-MM-DD`, `HH:mm`, `YYYY-MM-DDTHH:mm`, `HH:mm:ss` for form inputs |

### Arithmetic

| Method | Description |
|---|---|
| `addMs` / `addSeconds` / `addMinutes` / `addHours` / `addDays` / `addWeeks` / `addMonths` / `addYears` | Return a new date shifted by the amount |
| `subDays` / `subWeeks` / `subMonths` / `subYears` | Negative-shift shorthand |
| `addBusinessDays(n)` / `nextBusinessDay()` / `prevBusinessDay()` | Shift by weekdays, skipping weekends |
| `next(unit)` / `prev(unit)` | Next/previous `day`, `week`, `month`, `quarter`, `year`, or weekday name (`"friday"`) |
| `nextWeek` / `prevWeek` / `nextMonth` / `prevMonth` / `nextQuarter` / `prevQuarter` / `nextYear` / `prevYear` | Named shorthands |

### Boundaries

| Method | Description |
|---|---|
| `startOfDay` / `endOfDay` | Local day boundaries |
| `startOfWeek(weekStartsOn?)` / `endOfWeek(weekStartsOn?)` | Week boundaries; `weekStartsOn` defaults to `0` (Sunday) |
| `startOfMonth` / `endOfMonth` | Month boundaries |
| `startOfQuarter` / `endOfQuarter` | Quarter boundaries |
| `startOfYear` / `endOfYear` | Year boundaries |

### Fields and predicates

| Method | Description |
|---|---|
| `month()` | 1-based month |
| `dateOfWeek()` / `dayOfYear()` / `quarter()` | Calendar fields |
| `daysInMonth()` / `daysInYear()` / `isLeapYear()` | Calendar facts |
| `isWeekend()` / `isWeekday()` / `isBusinessDay()` | Day-type predicates |
| `isBefore` / `isAfter` / `isEqual` / `isBetween` / `isSameOrBefore` / `isSameOrAfter` | Instant comparison |
| `sameDay` / `sameMonth` / `sameYear` / `isSame(unit, other)` | Calendar comparison |
| `isToday` / `isTomorrow` / `isYesterday` | Relative-day predicates |
| `clamp(min, max)` | Clamp into a range |

### Differences

| Method | Description |
|---|---|
| `diffMs` / `diffSeconds` / `diffMinutes` / `diffHours` / `diffDays` | Numeric difference from `other` |
| `calendarDays(other)` | Whole calendar days between the two dates |
| `businessDays(other)` | Weekdays between the two dates |
| `diffHuman(other?)` | Compact human diff, e.g. `"3d"` |
| `fromNow()` / `ago()` | Relative description, e.g. `"in 2 hours"`, `"3 minutes ago"` |
| `from(other)` | Relative description vs. `other` |
| `age(unit?)` | Elapsed years/months/days since this date |

### Formatting and parsing

| Method | Description |
|---|---|
| `fmt(format)` | Token substitution: `YYYY`, `YY`, `MMMM`, `MMM`, `MM`, `M`, `DD`, `D`, `dddd`, `ddd`, `HH`, `H`, `hh`, `h`, `mm`, `m`, `ss`, `s`, `SSS`, `A`, `a` |
| `toLocalString(format?)` | `toLocaleString("en-US", format)`; `format` defaults to `FORMAT.full` |
| `D2.from(value)` | Parse from `Date`, number (epoch ms), ISO string, `YYYY-MM-DD`, `YYYY-MM-DD HH:mm`, array `[y,m,d,h?,min?,s?,ms?]`, or object (`{ date, time }` or `{ year, month, day, … }`) |
| `D2.parseDate("YYYY-MM-DD")` | Local midnight for that date |
| `D2.parseDateTime("YYYY-MM-DD HH:mm")` | Local date-time |
| `D2.fromParts(y, m, d, h?, min?, s?, ms?)` | Construct from calendar parts |

### Statics

| Method | Description |
|---|---|
| `D2.now()` / `D2.today()` | Current instant / today's `startOfDay()` |
| `D2.fromUnix(s)` / `D2.fromUnixMs(ms)` | Construct from epoch seconds / milliseconds |
| `D2.min(...dates)` / `D2.max(...dates)` | Earliest / latest of the inputs |

### Ranges

`R2I` is a half-open `[start, end)` interval.

| Method | Description |
|---|---|
| `contains(d)` | Whether `d` falls inside the range |
| `overlaps(other)` | Whether two ranges intersect |
| `durationMs()` / `days()` | Length in ms / whole days |
| `eachDay(fn)` | Iterate each calendar day in the range |
| `toArray()` | `A2I<D2>` of days |
| `R2(start, end)` | Build a range from any two `D2`-coercible values |

## `ER2` — Error

| Method | Description |
|---|---|
| `clone()` | Copy message, name, cause, and stack |
| `toJSON()` | Produce a serializable error representation |
| `toString()` | Format as `name: message` |
| `ER2.is(value)` | Check whether a value is an `Error` |
| `ER2.isER2(value)` | Check whether a value is an `ER2I` |
| `ER2.from(value, fallback?)` | Normalize unknown values into `ER2I` |
| `ER2.wrap(value, message?)` | Wrap an error with a cause |
| `ER2.aggregate(errors, message?)` | Create an `AggregateError` from multiple errors |

`ER2` accepts an optional message and standard `ErrorOptions`, including `cause`.



## `I2` — Iterator

`I2` wraps an iterable or iterator and provides lazy transformation pipelines.

| Method | Description |
|---|---|
| `n()` / `r()` / `f()` | Intended aliases for `next`, `return`, and `throw` |
| `toArray()` | Consume into an array |
| `first()` / `last()` | Retrieve the first or last value |
| `at(index)` | Retrieve by position, supporting negative indices |
| `peek()` | Read the next value without consuming it |
| `nextValue()` | Return the next value |
| `nextOr(value)` / `nextOrM(make)` | Return the next value or a fallback |
| `nextOrThrow(error?)` | Throw if exhausted |
| `map(fn)` / `filter(pred)` | Lazy transformation and filtering |
| `flatMap(fn)` / `flat()` | Flatten mapped iterables |
| `take(limit)` / `drop(limit)` | Limit or skip values |
| `unique(fn?)` | Remove duplicate values or computed keys |
| `chunk(size)` | Emit arrays of a specified size |
| `zip(other)` | Pair values from two iterators |
| `concat(...others)` | Concatenate iterables |
| `enumerate()` | Emit index-value pairs |
| `find(pred)` / `findIndex(pred)` | Find a value or index |
| `some(pred)` / `every(pred)` | Predicate checks |
| `reduce(fn, initial)` / `forEach(fn)` | Aggregate or consume values |
| `count()` / `sum(fn?)` | Count or sum values |
| `join(separator?)` | Join values into a string |
| `partition(pred)` | Split into matching and nonmatching arrays |
| `group(fn)` | Group values into a map |
| `toSet()` / `toMap(keyFn, valueFn?)` | Convert to collections |
| `isEmpty()` | Check whether another value is available |
| `exhaust()` | Consume the remaining iterator |
| `clone()` | Create an iterator over a materialized copy |


## `M2` — Map

`M2` extends `Map` and retains the standard `Map` API, plus reactive subscriptions, derived values, batching, and a large set of convenience methods. Keys are arbitrary — any value `Map` accepts, `M2` accepts.

| Method | Description |
|---|---|
| `g(key)` / `h(key)` / `d(key)` / `c()` | Aliases for `get`, `has`, `delete`, and `clear` |
| `f` | Alias for `forEach` |
| `s(value, key)` | Set a value; function arguments are evaluated as factories |
| `mutate(key, fn)` | Update an existing value in place using the current value |
| `swap(value, key)` | Replace a value and return the previous value |
| `take(key)` | Get and delete a value |
| `peek(key)` | Return the value or `false` if absent |
| `getOrI(value, key)` | Get or insert a supplied value |
| `getOrM(make, key)` | Get or lazily create a value |
| `update(key, fn, initial?)` | Update using the current value, or an initial value if missing |
| `setIfAbsent(value, key)` | Insert only when missing |
| `setIfPresent(value, key)` | Set only when present |
| `replace(value, key)` | Replace only when present |
| `inc(key, by?)` | Increment a numeric entry |
| `touch(key)` | Ensure a key exists |
| `mapValues(fn)` / `mapKeys(fn)` | Transform values or keys into a new map |
| `filterKV(pred)` / `filterKeys(pred)` | Filter in place |
| `partition(pred)` | Split entries into matching and nonmatching maps |
| `find(pred)` | Find the first matching entry |
| `findKey(pred)` / `findValue(pred)` | Find a matching key or value |
| `some(pred)` / `every(pred)` | Predicate checks |
| `reduce(fn, initial)` | Reduce entries |
| `forEachKV(fn)` | Iterate over value, key, and map |
| `invert()` | Reverse keys and values |
| `group(fn)` | Group values by computed key, into a map of `A2` buckets |
| `unique(fn?)` | Deduplicate by computed or original value |
| `pick(keys)` / `omit(keys)` | Select or exclude keys |
| `merge(entries)` | Merge entries into the current map |
| `clearAndSet(entries)` | Replace all entries as a single batch |
| `toObject()` | Convert entries to an object |
| `toArray()` / `toKeys()` / `toValues()` | Convert entries, keys, or values to an `A2` |
| `clone()` | Create a shallow copy |
| `equals(other)` | Compare keys and values by value-aware equality |
| `on(fn)` | Subscribe to change events; returns an unsubscribe function |
| `off(fn)` | Unsubscribe a listener |
| `batch(fn)` | Run multiple writes, coalescing into one event per key |
| `dv(key, deps, fn)` | Define a derived value computed from other keys |
| `dirty(...keys)` | Mark derived values as needing recomputation |
| `$debug(limit?)` | Enable event history tracking |
| `$strict()` | Throw if mutated while iterating |
| `$history()` | Return recorded change events |
| `$why(key)` | Return the most recent event for a key |
| `$diff(other)` | Compare against another map: added, deleted, and changed entries |
| `fromObject(obj)` | Create a map from an object |
| `fromEntries(entries)` | Create a map from entries |
| `from(map)` | Create a map from another map |


## `M2B` — Map byte

`M2B` is the dense, PID-indexed backing store for `M2`. Where `M2` accepts arbitrary keys and stores values in a `Map`, `M2B` stores fixed-width values in a flat `Float64Array`, indexed by integer PID. `pidToSlot` / `slotToPid` give O(1) lookup in both directions, and iteration walks the dense slot range — no hashing, no per-entry allocation.

`stride` controls how many doubles each PID holds: `stride = 1` stores scalars (`number`), `stride > 1` stores fixed-length `Float64Array` views. `cap` is the maximum PID; values outside `[0, cap)` read as absent.

| Method | Description |
|---|---|
| `g(pid)` / `h(pid)` / `d(pid)` / `c()` | Aliases for `get`, `has`, `delete`, and `clear` |
| `f` | Alias for `forEach` |
| `s(value, pid)` | Set a value for a PID |
| `mutate(pid, fn)` | Update an existing value in place using the current value |
| `swap(value, pid)` | Replace a value and return the previous value |
| `take(pid)` | Get and delete a value |
| `peek(pid)` | Return the value or `false` if absent |
| `getOrI(value, pid)` | Get or insert a supplied value |
| `getOrM(make, pid)` | Get or lazily create a value |
| `update(pid, fn, initial?)` | Update using the current value, or an initial value if missing |
| `setIfAbsent(value, pid)` | Insert only when missing |
| `setIfPresent(value, pid)` | Set only when present |
| `replace(value, pid)` | Replace only when present |
| `inc(pid, by?)` | Increment a numeric entry |
| `touch(pid)` | Ensure a PID exists |
| `mapValues(fn)` / `mapKeys(fn)` | Transform values or PIDs into a new map |
| `filterKV(pred)` / `filterKeys(pred)` | Filter in place |
| `partition(pred)` | Split entries into matching and nonmatching maps |
| `find(pred)` | Find the first matching entry |
| `findKey(pred)` / `findValue(pred)` | Find a matching PID or value |
| `some(pred)` / `every(pred)` | Predicate checks |
| `reduce(fn, initial)` | Reduce entries |
| `forEachKV(fn)` | Iterate over value, PID, and map |
| `invert()` | Reverse PIDs and values into a plain `Map` |
| `group(fn)` | Group values by computed key, into a map of arrays |
| `unique(fn?)` | Deduplicate by computed or original value |
| `pick(pids)` / `omit(pids)` | Select or exclude PIDs |
| `merge(entries)` | Merge entries into the current map |
| `clearAndSet(entries)` | Replace all entries as a single batch |
| `toObject()` | Convert entries to an object |
| `toArray()` / `toKeys()` / `toValues()` | Convert entries, PIDs, or values to an array |
| `clone()` | Create a shallow copy |
| `equals(other)` | Compare PIDs and values by value-aware equality |
| `on(fn)` | Subscribe to change events; returns an unsubscribe function |
| `off(fn)` | Unsubscribe a listener |
| `batch(fn)` | Run multiple writes, coalescing into one event per PID |
| `dv(pid, deps, fn)` | Define a derived value computed from other PIDs |
| `dirty(...pids)` | Mark derived values as needing recomputation |
| `$debug(limit?)` | Enable event history tracking |
| `$strict()` | Throw if mutated while iterating |
| `$history()` | Return recorded change events |
| `$why(pid)` | Return the most recent event for a PID |
| `$diff(other)` | Compare against another map: added, deleted, and changed entries |
| `fromObject(obj, cap, stride?)` | Create a map from an object |
| `fromEntries(entries, cap, stride?)` | Create a map from entries |
| `from(map, cap, stride?)` | Create a map from another map |

`cap`, `stride`, and `size` are exposed as readonly properties. `pidToSlot`, `slotToPid`, and `vals` are the backing arrays.

## `M2BIN` — Binary Map

`M2BIN` is a binary-backed map implementation optimized for numeric keys and numeric values. It uses typed arrays and direct PID-to-slot indexing for its fast path, while retaining a native `Map` as a fallback for other key/value combinations.

Numeric keys are treated as PIDs. Values are stored in a `Float64Array`, with `Int32Array` indexes mapping PIDs to dense storage slots and slots back to PIDs. Deletion uses swap-with-last compaction, keeping the dense storage packed without leaving gaps.

| Method / Property | Description |
|---|---|
| `size` | Total number of entries across binary storage and fallback storage |
| `capacity` | Current capacity of the binary backing buffer |
| `buffer` | Live `Float64Array` backing buffer |
| `get(key)` | Retrieve a value by key |
| `has(key)` | Check whether a key exists |
| `set(key, value)` | Insert or update an entry; numeric PID/value pairs use binary storage |
| `delete(key)` | Remove an entry; binary entries are removed using swap-with-last compaction |
| `clear()` | Clear binary and fallback storage |
| `keys()` | Iterate over stored keys |
| `values()` | Iterate over stored values |
| `entries()` | Iterate over key/value pairs |
| `[Symbol.iterator]()` | Iterate over entries |
| `forEach(fn, thisArg?)` | Iterate over values, keys, and the map instance |
| `g(pid)` | Direct binary read by PID |
| `s(value, pid)` | Direct binary write by PID |
| `getOr(pid, default?)` | Read a PID value or return a numeric fallback |
| `add(pid, delta)` | Add a numeric delta to a PID and return the resulting value |
| `in(pid)` | Check whether a PID exists in binary storage |
| `d(pid)` | Delete a PID |
| `forEachRaw(fn)` | Iterate over PID/slot pairs without allocating an iterator |
| `gather(pids, out?)` | Gather values for a list of PIDs into a `Float64Array`; absent PIDs produce `NaN` |

### Storage layout

| Buffer | Type | Purpose |
|---|---|---|
| `#vals` | `Float64Array` | Dense numeric value storage |
| `#pidToSlot` | `Int32Array` | Maps a PID to its storage slot |
| `#slotToPid` | `Int32Array` | Maps a storage slot back to its PID |
| `#odd` | `Map<Key, V>` | Fallback storage for non-binary entries |

The binary storage uses dense slots rather than storing values directly at their PID indexes. This allows sparse PIDs without requiring the value buffer to contain unused gaps.

### Binary operations

The short-form methods operate directly on the binary storage:

| Method | Description |
|---|---|
| `g(pid)` | Read a value by PID |
| `s(value, pid)` | Write a value by PID |
| `getOr(pid, default?)` | Read with a numeric fallback |
| `add(pid, delta)` | Increment a PID value |
| `in(pid)` | Check binary PID existence |
| `d(pid)` | Delete a PID |
| `forEachRaw(fn)` | Walk PID/slot pairs |
| `gather(pids, out?)` | Bulk-read values into a typed array |

`forEachRaw` exposes the underlying PID/slot relationship directly, avoiding the allocation and callback overhead of standard entry iteration.

`gather` supports bulk reads into a reusable output buffer, making it suitable for repeated numeric operations.

### Capacity and growth

The constructor accepts an initial capacity:

```ts
new M2BIN<K, V>(1024)
```

The backing arrays grow automatically when a PID or dense slot exceeds the current capacity. Growth doubles the capacity and copies the existing typed-array contents into the expanded buffers.

### Intended use

`M2BIN` is intended for workloads where:

- Keys are numeric PIDs.
- Values are numeric.
- Fast direct reads and writes are important.
- Dense iteration is preferable to sparse PID-indexed storage.
- Bulk numeric reads benefit from typed-array operations.
- Non-binary entries still need a fallback storage path.



## `M2D` — Dense Map

`M2D` is a dense, PID-indexed map implementation backed by typed arrays. Numeric keys are used directly as array indexes, eliminating the PID-to-slot indirection used by `M2BIN`.

Values are stored at their corresponding PID positions in a `Float64Array`. A parallel `Uint8Array` tracks whether each position is occupied. This provides constant-time direct access while allowing sparse PID ranges without treating uninitialized positions as existing entries.

A secondary `M2` instance provides fallback storage for entries that do not qualify for the numeric binary path.

| Method / Property | Description |
|---|---|
| `size` | Total number of entries across dense and fallback storage |
| `capacity` | Current capacity of the backing arrays |
| `buffer` | Live `Float64Array` containing values at their PID indexes |
| `live` | Live `Uint8Array` indicating occupied PID positions |
| `get(key)` | Retrieve a value by numeric key or fallback key |
| `has(key)` | Check whether a key exists |
| `set(key, value)` | Insert or update an entry; numeric keys with numeric values use dense storage |
| `delete(key)` | Remove an entry and clear its live flag |
| `clear()` | Clear dense and fallback storage |
| `keys()` | Iterate over occupied numeric PIDs and fallback keys |
| `values()` | Iterate over stored values |
| `entries()` | Iterate over key/value pairs |
| `[Symbol.iterator]()` | Iterate over entries |
| `forEach(fn, thisArg?)` | Iterate over values, keys, and the map instance |
| `g(pid)` | Direct read by PID |
| `s(value, pid)` | Direct write by PID |
| `getOr(pid, default?)` | Read a PID value or return a numeric fallback |
| `add(pid, delta)` | Add a numeric delta to a PID and return the resulting value |
| `in(pid)` | Check whether a PID is occupied |
| `forEachRaw(fn)` | Walk occupied PIDs and their values without allocating an iterator |
| `gather(pids, out?)` | Bulk-read values into a `Float64Array`; absent PIDs produce `NaN` |

### Storage layout

| Buffer | Type | Purpose |
|---|---|---|
| `#vals` | `Float64Array` | Stores values directly at their PID indexes |
| `#live` | `Uint8Array` | Tracks whether each PID position is occupied |
| `#odd` | `M2<Key, V>` | Fallback storage for entries outside the numeric binary path |

Unlike `M2BIN`, `M2D` does not maintain a separate PID-to-slot mapping. PID `p` always corresponds to `buffer[p]`.

The live bitmap distinguishes an occupied position from an unused position, including positions whose stored numeric value is zero.

### Binary operations

The short-form methods operate directly on the dense storage:

| Method | Description |
|---|---|
| `g(pid)` | Read the value at a PID |
| `s(value, pid)` | Write a value at a PID |
| `getOr(pid, default?)` | Read with a numeric fallback |
| `add(pid, delta)` | Increment a PID value |
| `in(pid)` | Check PID occupancy |
| `forEachRaw(fn)` | Walk occupied PIDs and their values |
| `gather(pids, out?)` | Bulk-read values into a typed array |

### Capacity and growth

The constructor accepts an initial capacity:

```ts
new M2D<Key, V>(1024)
```

When a numeric PID exceeds the current capacity, the backing arrays grow automatically. Capacity doubles until the requested PID fits.

Existing values and occupancy flags are copied into the expanded arrays, preserving their PID positions.

### Dense iteration

`forEachRaw` walks the live bitmap and invokes its callback with the PID and corresponding numeric value.

`gather` reads a supplied list of PIDs into an output buffer. Missing PIDs are represented by `NaN`, and callers can reuse an existing output buffer to avoid repeated allocations.

### Intended use

`M2D` is intended for workloads where:

- Numeric PIDs are the primary keys.
- Values are numeric.
- Direct PID-to-array-index access is desirable.
- Dense iteration over occupied positions is important.
- Typed-array operations and bulk reads are useful.
- A fallback map is still needed for non-binary entries.



## `M2R` — Row Map

`M2R` is a binary-backed map designed for storing fixed-width numeric rows under numeric PIDs. It combines dense slot storage with direct PID-to-slot indexing, allowing rows to be stored contiguously while supporting sparse PID values.

Each entry occupies a fixed-width row in a `Float64Array`. The configured stride determines the number of numeric components per row. A pair of `Int32Array` indexes maps PIDs to dense slots and slots back to PIDs.

Unlike `M2D`, which stores one numeric value directly at each PID index, `M2R` stores complete rows in packed storage. Deletion uses swap-with-last compaction, keeping the active rows contiguous.

| Method / Property | Description |
|---|---|
| `size` | Number of stored rows |
| `capacity` | Current PID/slot capacity |
| `stride` | Number of numeric components per row |
| `buffer` | Live backing `Float64Array` |
| `get(pid)` | Return a zero-copy `Float64Array` view of a row, or `undefined` |
| `has(pid)` | Check whether a PID exists |
| `set(pid, value)` | Write a complete row and return the map |
| `delete(pid)` | Remove a row using swap-with-last compaction |
| `clear()` | Clear all PID mappings and stored rows |
| `write(pid, value)` | Copy a complete row into storage |
| `put(pid, component, value)` | Write an individual component |
| `at(pid, component)` | Read an individual component |
| `slotOf(pid)` | Resolve a PID to its dense slot, or return `-1` |
| `row(pid)` | Return a zero-copy writable row view |
| `live()` | Return a view over the contiguous active portion of the backing buffer |
| `keys()` | Iterate over stored PIDs |
| `values()` | Iterate over row views |
| `entries()` | Iterate over PID/row pairs |
| `[Symbol.iterator]()` | Iterate over entries |
| `forEach(fn, thisArg?)` | Iterate over row views, PIDs, and the map instance |
| `forEachRaw(fn)` | Iterate over PID/slot pairs without allocating an iterator |

### Storage layout

| Buffer | Type | Purpose |
|---|---|---|
| `#vals` | `Float64Array` | Contiguous fixed-width row storage |
| `#pidToSlot` | `Int32Array` | Maps each PID to its dense slot |
| `#slotToPid` | `Int32Array` | Maps each dense slot back to its PID |

For a given PID, its row begins at:

```ts
const offset = slot * stride;
```

The row occupies `stride` consecutive elements in the backing buffer.

### Row operations

The row API provides both whole-row and individual-component access:

| Method | Description |
|---|---|
| `get(pid)` | Obtain a row view |
| `write(pid, values)` | Copy values into a row |
| `put(pid, component, value)` | Update one component |
| `at(pid, component)` | Read one component |
| `row(pid)` | Obtain a writable row view |

`get()` and `row()` return `subarray()` views rather than copied arrays. Changes made through those views directly modify the underlying storage.

### Raw access and iteration

`buffer` exposes the complete backing array.

`live()` exposes only the active prefix:

```ts
buffer.subarray(0, size * stride)
```

This provides a contiguous representation of all active rows, suitable for direct consumption by workers, shaders, and other numeric processing systems.

`forEachRaw` exposes PID/slot pairs without constructing row views or entry tuples.

### Capacity and growth

The constructor accepts an initial PID capacity and row stride:

```ts
new M2R<K>(1024, 3)
```

The default stride is `3`.

When a PID or dense slot exceeds the current capacity, the index arrays and value buffer grow automatically. Existing mappings and row data are preserved.

### Deletion and compaction

Deleting a row moves the final active row into the deleted row's slot when necessary. The PID mappings are updated accordingly, keeping active storage contiguous.

Consequently, dense slot positions are not stable across deletions. Use `slotOf(pid)` whenever the current slot is needed.

### Intended use

`M2R` is intended for workloads where:

- Numeric PIDs identify records.
- Each record contains a fixed number of numeric components.
- Contiguous row storage is preferable to individually allocated objects.
- Direct component access is important.
- Dense iteration and bulk buffer access are useful.
- Zero-copy row views are desirable.


## `N2` — Number

Numeric helpers return `N2I` for chaining unless otherwise indicated.

| Method | Description |
|---|---|
| `abs()` | Absolute value |
| `sign()` | Sign of the number |
| `neg()` | Negate the number |
| `inv()` | Reciprocal |
| `clamp(min, max)` | Constrain to a range |
| `wrap(min, max)` | Wrap into a range |
| `lerp(to, t)` | Linear interpolation |
| `map(inMin, inMax, outMin, outMax)` | Map between numeric ranges |
| `remap(...)` | Alias for `map()` |
| `roundTo(precision?)` | Round to decimal precision |
| `floorTo(precision?)` | Floor to decimal precision |
| `ceilTo(precision?)` | Ceiling to decimal precision |
| `truncTo(precision?)` | Truncate to decimal precision |
| `isFinite()` | Check for a finite number |
| `isInteger()` | Check for an integer |
| `isSafeInteger()` | Check for a safe integer |
| `isNaN()` | Check for `NaN` |
| `isBetween(min, max, inclusive?)` | Check whether the value is in a range |
| `isPositive()` / `isNegative()` | Check the sign |
| `isZero()` | Check for zero |
| `isEven()` / `isOdd()` | Check integer parity |
| `squared()` / `cubed()` | Square or cube |
| `sqrt()` / `cbrt()` | Square or cube root |
| `pow(exponent)` | Raise to a power |
| `root(degree)` | Calculate a root |
| `mod(divisor)` | Positive modulo |
| `percentOf(total)` | Calculate a percentage of a total |
| `percentChange(from)` | Calculate percentage change |
| `toRadians()` / `toDegrees()` | Convert angular units |
| `toOrdinal()` | Format as an ordinal |
| `toBytes(unit?, decimals?)` | Format as a byte quantity |
| `toCompact(locales?)` | Compact number formatting |
| `toCurrency(currency?, locales?)` | Currency formatting |
| `toPercent(decimals?, locales?)` | Percentage formatting |
| `times(fn)` | Execute a callback for each integer index below the value |
| `upTo(end, step?)` | Generate an ascending numeric array |
| `downTo(end, step?)` | Generate a descending numeric array |


## `nested` — Nested Map Storage

`nested` provides a unified interface for creating and retrieving nested maps across multiple storage implementations. It uses a three-level addressing structure — `root`, `master`, and `slave` — to organize independently addressable map instances.

The class supports native `Map`, `M2`, `M2B`, `M2BIN`, `M2D`, and `M2R`, with an optional externally supplied cache and an internal `M2` fallback.

### Storage Methods

| Method | Storage Type | Description |
|---|---|---|
| `map(s?, m?, r?)` | `Map` | Retrieves or creates a native JavaScript Map |
| `m2(s?, m?, r?)` | `M2` | Retrieves or creates an extended Map |
| `m2b(s?, m?, r?)` | `M2B` | Retrieves or creates a byte-backed Map |
| `m2bin(s?, m?, r?)` | `M2BIN` | Retrieves or creates a binary Map |
| `m2d(s?, m?, r?)` | `M2D` | Retrieves or creates a dense Map |
| `m2r(s?, m?, r?)` | `M2R` | Retrieves or creates a row-based Map |
| `cache(s?, m?, r?)` | `M2` | Retrieves or creates a Map through the supplied cache or internal fallback |

### Addressing

Each storage method accepts three address parameters:

| Parameter | Default | Purpose |
|---|---|---|
| `s` | Storage method name | Identifies the slave map |
| `m` | `'MASTER'` | Identifies the master namespace |
| `r` | `'ROOT'` | Identifies the root namespace |

The global storage methods use `globalThis[r]` as their root, allowing independently instantiated `nested` instances and application modules to access the same addressed storage hierarchy.

The resulting structure is:

```text
globalThis[r]
    └── master[m]
          └── slave[s]
                └── Map instance
```

### Cache and Fallback

The constructor accepts an optional `CACHE` implementing one of the supported map types.

- `CACHE` — uses the supplied map for root-level storage.
- `FALLBACK` — uses an internal nested `M2` hierarchy when no external cache is supplied.

The `cache()` method maintains its own nested addressing structure through the selected cache.

### Usage

```ts
const nested = new nestedi();

const users = nested.map('users');
const sessions = nested.m2('sessions');
const records = nested.m2bin('records');

const shared = nested.cache('shared', 'APP', 'ROOT');
```

### Global Access

A shared instance is exported as `nested` and assigned to `nested`, making the helper accessible across application modules without requiring each module to construct its own instance.

### Types

`ALL_MAPS` represents the supported storage implementations:

```ts
type ALL_MAPS =
    | M2<K, V>
    | Map<K, V>
    | M2B
    | M2BIN<K, V>
    | M2D<K, V>
    | M2R<K>
    | NU;
```

`nested<K = A, V = A>` provides generic typing for its fallback storage and map operations.

## `O2` — Object

Provides static object inspection, nested-path access, cloning, merging, selection, transformation, comparison, and update helpers.

| Method | Description |
|---|---|
| `isEmpty(value)` / `isNotEmpty(value)` | Checks own-key count |
| `size(value)` | Returns the number of own keys, including symbols |
| `isPlainObject(value)` / `isObject(value)` | Checks object type |
| `get(value, path, fallback?)` | Reads a nested path |
| `getOr(value, path, fallback)` | Reads a nested path with a typed fallback |
| `set(value, path, next)` | Sets a nested path, creating intermediate objects |
| `unset(value, path)` | Deletes a nested property |
| `hasPath(value, path)` | Checks whether a nested path exists |
| `clone(value)` | Shallow-clones an object or array |
| `deepClone(value)` | Uses `structuredClone` |
| `deepMerge(target, source)` | Recursively merges plain objects |
| `defaults(target, defaults)` | Applies defaults while retaining target values |
| `getOrCreate(value, key, create)` | Creates a property when absent or undefined |
| `pick(value, keys)` / `omit(value, keys)` | Selects or excludes properties |
| `pickBy(value, predicate)` / `omitBy(value, predicate)` | Selects or excludes properties by predicate |
| `mapKeys(value, mapper)` | Transforms property keys |
| `mapValues(value, mapper)` | Transforms property values |
| `mapEntries(value, mapper)` | Transforms key-value entries |
| `filter(value, predicate)` | Selects properties by predicate |
| `isEqual(first, second)` | Performs recursive equality checks |
| `isShallowEqual(first, second)` | Compares own keys and values shallowly |
| `hasAll(value, keys)` / `hasAny(value, keys)` | Checks required own properties |
| `assertKeys(value, keys)` | Throws if required own properties are missing |
| `with(value, key, next)` | Returns a copy with a property changed |
| `without(value, key)` | Returns a copy without a property |
| `update(value, key, updater)` | Returns a copy with an updated property |

`O2` is exposed as a static utility constructor on `globalThis`.

## `P2` — Promise

Extends `Promise<T>` with chaining helpers, recovery, timing controls, and result conversion.

| Method | Description |
|---|---|
| `tap(fn)` | Runs a callback on fulfillment and preserves the value |
| `tapError(fn)` | Runs a callback on rejection and preserves the rejection |
| `recover(fn)` | Recovers from rejection |
| `fallback(value)` | Supplies a fallback after rejection |
| `timeout(ms, error?)` | Rejects if the promise does not settle before the timeout |
| `delay(ms)` | Delays delivery of a fulfilled value |
| `withDeadline(deadline, error?)` | Applies a deadline based on a timestamp |
| `map(fn)` / `flatMap(fn)` | Chains a transformation |
| `and(other)` / `zip(other)` | Combines a fulfilled value with another value or promise |
| `or(other)` | Uses an alternative after rejection |
| `unwrap()` | Returns the promise as a native `Promise<T>` type |
| `toResult()` | Converts fulfillment or rejection into an `{ ok, value/error }` result |
| `onResolve(fn)` / `onReject(fn)` | Registers fulfillment or rejection callbacks |
| `finallyDo(fn)` | Runs a final callback |

Static helpers:

| Method | Description |
|---|---|
| `resolve(value?)` / `reject(reason?)` | Creates a settled promise |
| `all(values)` | Waits for all promises to fulfill |
| `allSettled(values)` | Waits for all promises to settle |
| `race(values)` | Settles with the first settled promise |
| `any(values)` | Settles with the first fulfilled promise |
| `retry(fn, times?, delay?)` | Retries a task after rejection |
| `deferred<T>()` | Returns a promise with external `resolve` and `reject` functions |
| `try(fn)` | Executes a function and converts synchronous throws into rejection |

Chained operations return `P2` instances.



## `RE2` — Regular Expression

`REC2` wraps the native `RegExp` API and extends it with match collection, positional access, replacement callbacks, pattern composition, quantifier builders, flag manipulation, debugging, and utility methods. It accepts a regex source string and optional flags, or can be created from an existing `RegExp` using `fromRegExp`.

| Method | Description |
|---|---|
| `source` / `flags` | Read the regular expression source and flags |
| `global` / `ignoreCase` / `multiline` | Read the `g`, `i`, and `m` flag states |
| `sticky` / `unicode` / `dotAll` / `hasIndices` | Read the `y`, `u`, `s`, and `d` flag states |
| `toRegExp()` | Return a native `RegExp` copy |
| `test(str)` / `h(str)` | Test whether the pattern matches; `h` is an alias for `test` |
| `exec(str)` | Return the first native `RegExpExecArray` match or `null` |
| `g(str)` | Return the first matched string or `undefined` |
| `at(str, n)` | Return the matched string at an index; supports negative indexes |
| `groups(str)` | Return the named capture groups from the first match |
| `group(str, name)` | Return a capture by numeric index or named group |
| `index(str)` | Return the first match's starting index, or `-1` |
| `lastIndexOf(str)` | Return the final match's starting index, or `-1` |
| `span(str)` | Return the first match's `[start, end]` positions |
| `all(str)` | Return all matched strings |
| `matches(str)` | Return detailed match records containing `match`, `index`, `lastIndex`, `groups`, and `raw` |
| `allGroups(str)` | Return the named capture groups from every match |
| `allSpans(str)` | Return the `[start, end]` positions of every match |
| `count(str)` | Count all matches |
| `positions(str)` | Return the starting indexes of all matches |
| `replace(str, fn)` | Replace matches using a replacement string or callback |
| `replaceFirst(str, fn)` | Replace only the first match |
| `replaceAt(str, n, fn)` | Replace a specific match by index; supports negative indexes |
| `remove(str)` / `removeFirst(str)` | Remove all matches or only the first match |
| `split(str, limit?)` | Split a string using the pattern |
| `splitKeep(str)` | Split while retaining matched separators |
| `withFlags(flags)` | Create a new instance with the supplied flags |
| `addFlag(flag)` | Add a flag if it is not already present |
| `removeFlag(flag)` | Remove a flag |
| `toggleFlag(flag)` | Add or remove a flag depending on its current state |
| `withSource(src)` | Create a new instance using a different source |
| `and(...parts)` | Concatenate patterns into a combined expression |
| `or(...parts)` | Combine patterns as alternatives |
| `cap(expr?)` | Wrap an expression in a capturing group |
| `namedGroup(name, expr)` | Create a named capturing group |
| `nonCap(expr)` | Create a non-capturing group |
| `lookahead(expr)` / `notLookahead(expr)` | Create positive or negative lookahead assertions |
| `lookbehind(expr)` / `notLookbehind(expr)` | Create positive or negative lookbehind assertions |
| `optional(expr?)` | Apply the `?` quantifier |
| `many(expr?)` | Apply the `+` quantifier |
| `maybeMany(expr?)` | Apply the `*` quantifier |
| `repeat(n, max?, expr?)` | Apply an exact or ranged repetition quantifier |
| `lazy()` | Best-effort conversion of a trailing quantifier to lazy matching |
| `$trace(str)` | Return detailed match records |
| `$explain()` | Return flag descriptions and a formatted pattern explanation |
| `$risky()` | Check for a potentially risky nested-quantifier pattern |
| `$bench(str, iterations?)` | Benchmark repeated native regex tests |
| `toString()` | Return the native regular expression string representation |
| `equals(other)` | Compare source and flags against another regex input |
| `clone()` | Create an independent copy |
| `fromRegExp(re)` | Create a `REC2` instance from a native `RegExp` |



## `RES2` — Regular Expression Static

`RECC2` is a callable regex factory with static builders, character-class helpers, composition methods, and ready-made pattern presets. It accepts strings, native `RegExp` instances, or existing `RE2_IF` instances and returns a `RE2_IF` implementation. It also exposes `escapeRegex` and `explainSource` helpers through its associated utilities.

| Method / Property | Description |
|---|---|
| `RECC2(input, flags?)` | Create a regex from a string, native `RegExp`, or existing `RE2_IF` |
| `of(input, flags?)` | Normalize an input into a `RE2_IF`; optionally override flags |
| `escape(str)` | Escape regex-special characters in a string |
| `literal(str)` | Create a regex that matches the supplied string literally |
| `seq(...parts)` | Combine patterns sequentially into one expression |
| `alt(...parts)` | Combine patterns as alternatives |
| `digit` | Match a digit (`\d`) |
| `word` | Match a word character (`\w`) |
| `space` | Match whitespace (`\s`) |
| `any` | Match any character (`.`) |
| `notDigit` | Match a non-digit (`\D`) |
| `notWord` | Match a non-word character (`\W`) |
| `notSpace` | Match non-whitespace (`\S`) |
| `range(from, to)` | Match one character within a character range |
| `oneOf(chars)` | Match one character from the supplied character set |
| `noneOf(chars)` | Match one character not in the supplied character set |
| `email` | Email-address pattern |
| `url` | HTTP or HTTPS URL pattern; case-insensitive |
| `uuid` | UUID pattern; case-insensitive |
| `ipv4` | IPv4 address pattern |
| `ipv6` | Full eight-group IPv6 address pattern |
| `hex` | One or more hexadecimal characters |
| `hexColor` | Three- or six-digit hexadecimal color pattern |
| `slug` | Lowercase alphanumeric slug with optional hyphen-separated segments |
| `alphaNumeric` | One or more alphanumeric characters |
| `integer` | Optional leading minus sign followed by digits |
| `float` | Optional leading minus sign, digits, and optional decimal portion |
| `phoneLoose` | Loose phone-number pattern |
| `isoDate` | `YYYY-MM-DD` date pattern |
| `base64` | Base64 pattern with optional padding |
| `jwt` | Three dot-separated JWT-style segments |
| `semver` | Semantic-version-style pattern with optional prerelease and build metadata |
| `creditCard` | Digit groups separated by optional spaces or hyphens |
| `htmlTag` | Opening or closing HTML tag pattern |
| `whitespaceOnly` | Match strings containing only whitespace, including empty strings |

`seq()` wraps multi-character patterns when needed for concatenation and merges flags from its inputs. `alt()` creates a non-capturing alternation group and also merges input flags.

## `S2` — String

Extends `String` with common string checks, transformations, parsing, and conversion helpers.

| Method | Description |
|---|---|
| `empty()` / `notEmpty()` | Checks whether the string has characters |
| `blank()` / `notBlank()` | Checks whether the string is empty or whitespace-only |
| `equals(value)` | Checks exact equality |
| `equalsIgnoreCase(value)` | Checks equality without case sensitivity |
| `contains(value)` | Checks whether the string contains a value |
| `starts(value)` / `ends(value)` | Checks the beginning or end |
| `first()` / `last()` | Gets the first or last character |
| `reverse()` | Reverses the string by Unicode code point |
| `capitalize()` / `uncapitalize()` | Changes the first character's case |
| `titleCase()` | Capitalizes word initials |
| `camelCase()` | Converts to camel case |
| `kebabCase()` | Converts to kebab case |
| `snakeCase()` | Converts to snake case |
| `pascalCase()` | Converts to PascalCase |
| `words()` | Extracts letter-and-number sequences |
| `lines()` | Splits into lines |
| `chars()` / `toArray()` | Converts to an array of characters |
| `unique()` | Removes duplicate characters |
| `escapeRegExp()` | Escapes regular-expression special characters |
| `stripHtml()` | Removes HTML-like tags |
| `stripWhitespace()` | Removes all whitespace |
| `truncate(length, suffix?)` / `limit(length, suffix?)` | Limits string length |
| `toNumber()` | Converts to a number |
| `toInt(radix?)` | Parses an integer |
| `toFloat()` | Parses a floating-point number |
| `toBoolean()` | Parses `true`, `1`, `yes`, or `on` as true |
| `toJSON()` | Returns the JSON-serialized string |

Also inherits the native `String` API. `S2` is registered as a callable and constructible string wrapper.


## `SET2` — Set

`SET2` extends `Set` and retains the standard `Set` API, plus functional transforms, bulk mutation, set algebra, and conversion helpers. Like `M2`, keys are arbitrary — any value `Set` accepts, `SET2` accepts.

| Method | Description |
|---|---|
| `s(value)` | Alias for `add` |
| `take(value)` | Delete and return the value, or `undefined` if absent |
| `peek(value)` | Return the value or `false` if absent |
| `toggle(value)` | Add if absent, delete if present; returns the new membership |
| `first()` / `last()` | First or last value in iteration order |
| `union(other)` | New set of all values in either set |
| `intersection(other)` | New set of values in both sets |
| `difference(other)` | New set of values in this set but not the other |
| `symmetricDifference(other)` | New set of values in either set but not both |
| `isSubsetOf(other)` / `isSupersetOf(other)` | Containment checks |
| `isDisjointFrom(other)` | Whether the two sets share no values |
| `equals(other)` | Whether the two sets contain the same values |
| `filter(fn)` | New set of values matching the predicate |
| `map(fn)` | New set of mapped values |
| `partition(fn)` | Split into matching and nonmatching sets |
| `differenceBy(other, fn)` | Difference by computed key |
| `uniqueBy(fn)` | Deduplicate by computed key |
| `find(fn)` | First matching value, or `undefined` |
| `every(fn)` / `some(fn)` | Predicate checks |
| `reduce(fn, initial)` | Reduce values |
| `addAll(values)` | Add many values |
| `deleteAll(values)` | Delete many values; returns the count removed |
| `retainAll(values)` | Delete every value not in `values` |
| `update(values)` | Alias for `addAll` |
| `replace(values)` | Clear, then add all values |
| `swap(a, b)` | If `a` is present, delete `a` and add `b` |
| `clone()` | Create a shallow copy |
| `toArray()` | Convert to an array |
| `toMap(fn)` | Convert to an `M2`, using `fn` to produce `[key, value]` per entry |
| `toObject(fn?)` | Convert to an object, keyed by `fn(value)` or `String(value)` |
| `toJSON()` | Alias for `toArray` |
| `fromArray(values)` | Create a set from an array |
| `fromObject(obj)` | Create a set from an object's values |
| `fromEntries(entries)` | Create a set from the values of `[key, value]` pairs |
| `from(values)` | Create a set from any iterable |

## `SET2B` — Set Binary

`SET2BI` is the dense, PID-indexed backing store for `SET2`. Membership lives in a `Uint8Array` (`flags[pid] → 0/1`), dense iteration walks `slots`, and `pidToIdx` gives O(1) delete via swap-remove. `cap` is the maximum PID; values outside `[0, cap)` read as absent.

| Method | Description |
|---|---|
| `s(pid)` | Alias for `add` |
| `add(pid)` | Add a PID |
| `has(pid)` | Whether the PID is a member |
| `delete(pid)` | Remove a PID; returns whether it was present |
| `clear()` | Remove every member in place |
| `take(pid)` | Delete and return the PID, or `undefined` if absent |
| `peek(pid)` | Return the PID or `false` if absent |
| `toggle(pid)` | Add if absent, delete if present; returns the new membership |
| `first()` / `last()` | First or last PID in dense order |
| `union(other)` | New set of all PIDs in either set |
| `intersection(other)` | New set of PIDs in both sets |
| `difference(other)` | New set of PIDs in this set but not the other |
| `symmetricDifference(other)` | New set of PIDs in either set but not both |
| `isSubsetOf(other)` / `isSupersetOf(other)` | Containment checks |
| `isDisjointFrom(other)` | Whether the two sets share no PIDs |
| `equals(other)` | Whether the two sets contain the same PIDs |
| `filter(fn)` | New set of PIDs matching the predicate |
| `map(fn)` | New set of mapped PIDs |
| `partition(fn)` | Split into matching and nonmatching sets |
| `differenceBy(other, fn)` | Difference by computed key |
| `uniqueBy(fn)` | Deduplicate by computed key |
| `find(fn)` | First matching PID, or `undefined` |
| `every(fn)` / `some(fn)` | Predicate checks |
| `reduce(fn, initial)` | Reduce PIDs |
| `addAll(pids)` | Add many PIDs |
| `deleteAll(pids)` | Delete many PIDs; returns the count removed |
| `retainAll(pids)` | Delete every PID not in `pids` |
| `update(pids)` | Alias for `addAll` |
| `replace(pids)` | Clear, then add all PIDs |
| `swap(a, b)` | If `a` is present, delete `a` and add `b` |
| `clone()` | Create a shallow copy |
| `toArray()` | Convert to an array of PIDs |
| `toMap(fn)` | Convert to a plain `Map`, using `fn` to produce `[key, value]` per PID |
| `toObject(fn?)` | Convert to an object, keyed by `fn(pid)` or `String(pid)` |
| `toJSON()` | Alias for `toArray` |
| `fromArray(pids, cap?)` | Create a set from an array of PIDs |
| `fromObject(obj, cap?)` | Create a set from an object's values |
| `fromEntries(entries, cap?)` | Create a set from the values of `[key, value]` pairs |
| `from(pids, cap?)` | Create a set from any iterable of PIDs |

## `U82` — Uint8Array

Extends `Array<T>` with collection access, transformations, set-like operations, and in-place utilities.

| Method | Description |
|---|---|
| `first()` / `second()` / `third()` / `last()` | Gets an element by position |
| `random()` | Gets a random element |
| `isEmpty()` / `isNotEmpty()` | Checks whether the array has elements |
| `isNotEmptyAndDefined()` | Checks for at least one non-nullish element |
| `clear()` | Empties the array in place |
| `clone()` | Creates a shallow copy |
| `unique()` | Removes duplicate values |
| `compact()` | Removes `null` and `undefined` |
| `chunk(size)` | Splits into groups of a given size |
| `flatten(depth?)` / `flattenDeep()` | Flattens nested arrays |
| `shuffle()` / `shuffleInPlace()` | Randomizes the array in place |
| `sample(count?)` / `pick(count?)` | Selects random elements without replacement |
| `count(predicate?)` | Counts all elements or matching elements |
| `sum()` / `average()` / `min()` / `max()` | Numeric aggregations |
| `groupBy(keyFn)` | Groups elements by computed key |
| `keyBy(keyFn)` / `toMap(keyFn)` | Maps computed keys to elements |
| `partition(predicate)` | Splits elements into matching and nonmatching arrays |
| `difference(other)` | Returns elements not present in another iterable |
| `intersection(other)` | Returns elements present in another iterable |
| `union(other)` | Combines unique elements |
| `symmetricDifference(other)` | Returns elements exclusive to either collection |
| `take(count)` / `takeLast(count)` | Takes elements from either end |
| `drop(count)` / `dropLast(count)` | Removes elements from either end in the returned copy |
| `pluck(key)` | Extracts a property from every element |
| `insert(index, ...items)` | Inserts elements in place |
| `removeAt(index)` | Removes and returns an element |
| `remove(value)` | Removes the first matching element |
| `removeWhere(predicate)` | Removes all matching elements in place |
| `replace(oldValue, newValue)` | Replaces the first matching element |
| `move(from, to)` | Moves an element to another index |
| `swap(i, j)` | Swaps two positions |
| `toSet()` | Converts to a native `Set` |
| `equals(other)` | Checks element-by-element equality |
| `startsWith(other)` / `endsWith(other)` | Checks matching elements at either end |
| `isSorted(compareFn?)` | Checks whether elements are sorted |
| `frequencies()` | Counts occurrences of each element |

Also inherits the native `Array` API. Static `from()` and `of()` return the enhanced array type.


## `USP2` — URLSearchParams

Extends `URLSearchParams` with typed value access, serialization, merging, and convenience methods.

| Method | Description |
|---|---|
| `getOr(name, fallback)` | Gets a parameter or returns a fallback |
| `getOrNull(name)` | Gets a parameter or returns `null` |
| `getOrThrow(name, error?)` | Gets a parameter or throws |
| `getNumber(name, fallback?)` | Parses a finite number |
| `getInt(name, radix?)` | Parses an integer |
| `getFloat(name)` | Parses a floating-point number |
| `getBoolean(name, fallback?)` | Parses boolean-like values |
| `getJSON<T>(name)` | Parses JSON; returns `undefined` on missing or invalid JSON |
| `getArray(name, separator?)` | Splits a parameter into an array |
| `getObject<T>()` | Converts parameters to an object, preserving repeated values as arrays |
| `setNumber(name, value)` | Sets a numeric parameter |
| `setBoolean(name, value)` | Sets a boolean parameter |
| `setJSON(name, value)` | JSON-serializes a value into a parameter |
| `setArray(name, values, separator?)` | Joins values into a parameter |
| `setIfAbsent(name, value)` | Sets only if the parameter does not exist |
| `setIfPresent(name, value)` | Sets only if the parameter exists |
| `appendAll(params)` | Appends parameters from another source |
| `merge(params, overwrite?)` | Merges parameters, overwriting by default |
| `clone()` | Creates a copy |
| `clear()` | Removes all parameters |
| `isEmpty()` / `isNotEmpty()` | Checks whether parameters exist |
| `toObject()` / `toJSON()` | Converts parameters to an object |
| `toURLSearchParams()` | Returns a native `URLSearchParams` copy |
| `toURL(url)` | Creates a URL and appends these parameters |

Also exposes `size` and inherits the native `URLSearchParams` API.



## `WM2` — WeakMap

Extends `WeakMap<K, V>` with aliases, lazy initialization, conditional updates, and optional explicit key tracking.

| Method | Description |
|---|---|
| `g` / `h` / `d` | Aliases for `get` / `has` / `delete` |
| `s(key, value)` | Sets a value; evaluates a function argument lazily |
| `swap(key, value)` | Sets a value and returns the previous value |
| `take(key)` / `getAndDelete(key)` | Gets and deletes a value |
| `peek(key)` | Returns the value or `false` if absent |
| `getOrI(key, value)` | Gets an existing value or stores the supplied value |
| `getOrM(key, make)` | Gets an existing value or lazily creates and stores one |
| `getOr(key, fallback)` | Gets a value or returns a fallback |
| `getOrThrow(key, error?)` | Gets a value or throws |
| `getOrCreate(key, make)` / `ensure(key, make)` | Lazily creates a missing value |
| `update(key, fn, initial)` | Computes and stores an updated value |
| `setIfAbsent(key, value)` | Sets only if the key is absent |
| `setIfPresent(key, value)` | Sets only if the key exists |
| `hasOrSet(key, value)` | Returns whether the key already existed; otherwise sets it |
| `replace(key, value)` | Replaces a value only when the key exists |
| `touch(key)` | Inserts `undefined` for an absent key |
| `track(key)` / `untrack(key)` | Enables or removes explicit key tracking |
| `trackedKeys()` / `trackedValues()` / `trackedEntries()` | Reads explicitly tracked keys and their current values |
| `forEachTracked(fn)` | Iterates tracked entries still present |
| `clearTracked()` | Deletes tracked keys from the WeakMap and clears tracking |

**Tracking note:** Tracking retains strong references to keys and can prevent garbage collection. Tracking is opt-in.




## `WS2` — WeakSet

Extends `WeakSet<T>` with conditional membership, bulk operations, and optional explicit tracking.

| Method | Description |
|---|---|
| `addIfAbsent(value)` | Adds only if absent; returns whether it added |
| `toggle(value)` | Adds if absent or deletes if present; returns the new membership state |
| `deleteIfPresent(value)` | Deletes a value if present |
| `hasAll(values)` / `hasAny(values)` | Checks membership across an iterable |
| `addAll(values)` | Adds multiple values |
| `deleteAll(values)` | Deletes multiple values and returns the deletion count |
| `replace(oldValue, newValue)` | Replaces a member if the old value exists |
| `track(value)` | Adds a value and explicitly tracks it |
| `untrack(value)` | Removes a value from explicit tracking |
| `trackedKeys()` | Returns explicitly tracked values |
| `forEachTracked(callback, thisArg?)` | Iterates tracked values still present in the WeakSet |
| `clearTracked()` | Deletes all explicitly tracked values |

**Tracking note:** Native `WeakSet` values are not enumerable. These helpers maintain a separate strong-reference `Set` for tracked values; tracked objects can therefore remain reachable until untracked or cleared.


## Usage

After the package's initialization module has executed, the registered globals can be used directly:

```ts
const values = new A2(1, 2, 2, 3, 4);

values.unique().chunk(2);
// [[1, 2], [3, 4]]

new N2(42).clamp(0, 10).valueOf();
// 10

const cache = new M2<string, number>();
cache.s("count", 1);
cache.inc("count");
// 2

const iterator = new I2([1, 2, 3, 4]);
iterator.filter(value => value % 2 === 0).toArray();
// [2, 4]

const error = ER2.from("Something failed");
error.toJSON();
```






</div>
<div style="font-size: 9px;  text-align: right">

