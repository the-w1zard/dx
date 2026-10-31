
<div align="left" style="position: relative;">
<img src="./icons/gandalf.png" align="right" width="30%" style="margin: -20px 0 0 20px;">

<h1>DX: <span style="font-size:18px;" >The Wizard's Arsenal</span></h1>

<p align="left"><em>The most opinionated platform... ever.</em></p>
<p align="left"><em>Trust me... I'm a fucking wizard... 🧙</em></p>
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

<a href="https://github.com/the-w1zard/app_store"><img src="https://img.shields.io/badge/Store / Maelstrom-000000.svg?style=flat&logo=JetBrains&logoColor=white" alt="JetBrains"></a>
<a href="https://github.com/the-w1zard/dx"><img src="https://img.shields.io/badge/UX /DX-34A853.svg?style=flat&logo=Android&logoColor=white" alt="Android"></a>
<a href="https://github.com/the-w1zard/temporal_shift"><img src="https://img.shields.io/badge/Temporal Shift-77AA99.svg?style=flat&logo=Org&logoColor=white" alt="Org"></a>
<a href="https://github.com/the-w1zard/the_cloud"><img src="https://img.shields.io/badge/The Cloud-02303A.svg?style=flat&logo=Gradle&logoColor=white" alt="Gradle"></a>
<a href="https://github.com/the-w1zard/signals"><img src="https://img.shields.io/badge/Signals-02303A.svg?style=flat&logo=Gradle&logoColor=white" alt="Gradle"></a>
<img src="https://img.shields.io/badge/Sometimes, my genius... It generates gravity.-4285F4.svg?style=flat&logo=🧙&logoColor=white" alt="Google">
<a href="https://github.com/the-w1zard"><img src="https://img.shields.io/badge/Coming Soon: The Wizard Platform-7F52FF.svg?style=flat&logo=Kotlin&logoColor=white" alt="Kotlin"></a>
<a href="https://github.com/the-w1zard"><img src="https://img.shields.io/badge/Coming Soon: Hadron Particle Disruptor-%23ED8B00.svg?style=flat&logo=openjdk&logoColor=white" alt="java"></a>
</p>
<p align="left">The goal? To remove all friction, from everything.</p>

</div>
<br clear="right">

---
<span  style="font-family: monospace"> 


> [!NOTE] TLDR
>
> Take what is currently... lacking in the ux dept. and give it the updates they desperatly need.

</span>


# Built-in API Extensions

Extensions to native JavaScript objects that improve developer experience by adding commonly needed operations while preserving the original APIs.

The package extends native classes and exposes their implementations through `globalThis`, allowing them to be accessed without importing each class individually.

## Table of Contents

- [A2 — Array](#a2--array)
- [D2 — Date](#d2--date)
- [ER2 — Error](#er2--error)
- [I2 — Iterator](#i2--iterator)
- [M2 — Map](#m2--map)
- [N2 — Number](#n2--number)
- [O2 — Object](#o2--object)
- [P2 — Promise](#p2--promise)
- [USP2 — URLSearchParams](#usp2--urlsearchparams)
- [U82 — Array](#u82--array)
- [S2 — String](#s2--string)
- [WS2 — WeakSet](#ws2--weakset)
- [WM2 — WeakMap](#wm2--weakmap)
- [O2 — Object](#o2--object)
- [SET2 — Set](#set2--set)


## Global APIs

| Global | Extends | Implementation | Purpose |
|---|---|---|---|
| `N2` | `Number` | `N2I` | Numeric operations, range mapping, formatting, and validation |
| `M2` | `Map` | `M2I` | Map access helpers, transformations, grouping, and comparison |
| `I2` | Iterator | `I2I` | Lazy iterator pipelines and collection operations |
| `ER2` | `Error` | `ER2I` | Error normalization, cloning, serialization, and wrapping |
| `D2` | `Date` | `D2I` | Date arithmetic, boundaries, comparisons, and formatting |
| `A2` | `Array` | `A2I` | Array manipulation, selection, grouping, and aggregation |
| `SET2` | `Set` | `SET2I` | Extended set operations |
| `O2` | `Object` | `O2I` | Extended object operations |
| `WM2` | `WeakMap` | `WM2I` | Extended weak-map operations |
| `WS2` | `WeakSet` | `WS2I` | Extended weak-set operations |
| `P2` | `Promise` | `P2I` | Extended promise operations |
| `S2` | `String` | `S2I` | Extended string operations |
| `U82` | `Uint8Array` | `U82I` | Extended byte-array operations |
| `USP2` | `URLSearchParams` | `USP2I` | Extended URL parameter operations |

The global declarations provide TypeScript access to these APIs. `MaybePromise` is also declared globally as a type alias.

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


## `D2` — Date

| Method | Description |
|---|---|
| `clone()` / `isValid()` | Copy a date or check validity |
| `month()` / `dateOfWeek()` | Get one-based month or weekday index |
| `dayOfYear()` / `quarter()` | Get day of year or quarter |
| `unix()` / `toUnix()` | Get Unix timestamp in seconds |
| `toUnixMs()` | Get Unix timestamp in milliseconds |
| `age(unit?)` | Get age in years, months, or days from this date to now |
| `addMs()` / `addSeconds()` / `addMinutes()` / `addHours()` | Add time |
| `addDays()` / `addWeeks()` / `addMonths()` / `addYears()` | Add calendar units |
| `subDays()` / `subWeeks()` / `subMonths()` / `subYears()` | Subtract calendar units |
| `startOfDay()` / `endOfDay()` | Day boundaries |
| `startOfWeek(weekStartsOn?)` / `endOfWeek(weekStartsOn?)` | Week boundaries |
| `startOfMonth()` / `endOfMonth()` | Month boundaries |
| `startOfQuarter()` / `endOfQuarter()` | Quarter boundaries |
| `startOfYear()` / `endOfYear()` | Year boundaries |
| `daysInMonth()` / `daysInYear()` | Count days |
| `isLeapYear()` | Check leap year |
| `isWeekend()` / `isWeekday()` | Check day type |
| `isBefore(date)` / `isAfter(date)` / `isEqual(date)` | Compare timestamps |
| `isSameOrBefore(date)` / `isSameOrAfter(date)` | Compare timestamps, inclusive |
| `isBetween(start, end)` | Check an inclusive date range |
| `clamp(min, max)` | Constrain a date to a range |
| `diffMs()` / `diffSeconds()` / `diffMinutes()` / `diffHours()` / `diffDays()` | Calculate signed time differences |
| `sameDay()` / `sameMonth()` / `sameYear()` | Compare calendar components |
| `isSame(unit, date)` | Compare by day, week, month, quarter, or year |
| `isToday()` / `isTomorrow()` / `isYesterday()` | Check relative to the current date |
| `ago()` / `fromNow()` | Relative-time label vs. now |
| `from(other)` | Relative-time label vs. a given date |
| `next(unit)` / `prev(unit)` | Jump to the next/previous weekday name or calendar unit |
| `nextWeek()` / `prevWeek()` / `nextMonth()` / `prevMonth()` / `nextQuarter()` / `prevQuarter()` / `nextYear()` / `prevYear()` | Shortcut unit navigation |
| `at(hour, minute?, second?, ms?)` | Set a specific time of day |
| `atNoon()` / `midnight()` | Jump to noon or start of day |
| `addBusinessDays(n)` / `nextBusinessDay()` / `prevBusinessDay()` | Business-day navigation |
| `isBusinessDay()` | Check if this date is a weekday |
| `calendarDays(other)` | Signed whole-day difference, ignoring time of day |
| `businessDays(other)` | Count weekdays between this date and another |
| `diffHuman(other?)` | Single-unit human-readable duration (e.g. `"3d"`) |
| `fmt(format)` | Format using token strings (`YYYY`, `MMM`, `dddd`, etc.) |
| `toLocalString(format?)` | Format via `Date.prototype.toLocaleString` |
| `toInputDate()` / `toInputTime()` / `toInputDateTime()` / `toInputTimeWithSeconds()` | Format for HTML `<input>` fields |
| `set(fields)` | Immutably update one or more date/time fields, preserving the rest |
| `withDate(year, month, day)` | Shortcut for `set()` on the date portion |
| `sameTimeOn(other)` | Keep this date's time, swap in another date's day |
| `to(other)` | Build an `R2` range from this date to another |
| `toD2()` | Return a cloned `D2` |

Static helpers include `now()`, `fromUnix()`, `fromUnixMs()`, `fromParts()`, `today()`, `min()`, `max()`, `from(value)` (flexible ingestion from `Date`, epoch ms, ISO/local strings, arrays, or field objects), `parseDate(str)`, and `parseDateTime(str)`.


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

`ER2I` accepts an optional message and standard `ErrorOptions`, including `cause`.



## `I2` — Iterator

`I2I` wraps an iterable or iterator and provides lazy transformation pipelines.

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

`M2I` extends `Map` and retains the standard `Map` API.

| Method | Description |
|---|---|
| `g(key)` / `h(key)` / `d(key)` | Aliases for `get`, `has`, and `delete` |
| `s(key, value)` | Set a value; evaluates function arguments as factories |
| `swap(key, value)` | Replace a value and return the previous value |
| `take(key)` | Get and delete a value |
| `peek(key)` | Return the value or `false` if absent |
| `getOrI(key, value)` | Get or insert a supplied value |
| `getOrM(key, make)` | Get or lazily create a value |
| `update(key, fn, initial)` | Update using the current value or initial value |
| `setIfAbsent(key, value)` | Insert only when missing |
| `setIfPresent(key, value)` | Set only when present |
| `replace(key, value)` | Replace only when present |
| `inc(key, by?)` | Increment a numeric entry |
| `touch(key)` | Ensure a key exists |
| `mapValues(fn)` / `mapKeys(fn)` | Transform values or keys |
| `filterKV(pred)` / `filterKeys(pred)` | Filter in place |
| `partition(pred)` | Split entries into matching and nonmatching maps |
| `find(pred)` | Find the first matching entry |
| `findKey(pred)` / `findValue(pred)` | Find a matching key or value |
| `some(pred)` / `every(pred)` | Predicate checks |
| `reduce(fn, initial)` | Reduce entries |
| `forEachKV(fn)` | Iterate over value, key, and map |
| `invert()` | Reverse keys and values |
| `group(fn)` | Group values by computed key |
| `unique(fn?)` | Deduplicate by computed or original value |
| `pick(keys)` / `omit(keys)` | Select or exclude keys |
| `merge(entries)` | Merge entries into the current map |
| `clearAndSet(entries)` | Replace all entries |
| `toObject()` | Convert entries to an object |
| `toArray()` / `toKeys()` / `toValues()` | Convert entries, keys, or values to arrays |
| `clone()` | Create a shallow copy |
| `equals(other)` | Compare keys and values |
| `fromObject(obj)` | Create a map from an object |
| `fromEntries(entries)` | Create a map from entries |
| `from(map)` | Create a map from another map |


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

Extends `Set<T>` with convenience accessors, set algebra, predicate operations, and conversions.

| Method | Description |
|---|---|
| `s(value)` | Alias for `add` |
| `take(value)` | Deletes and returns the value if present |
| `peek(value)` | Returns the value if present, otherwise `false` |
| `toggle(value)` | Adds an absent value or deletes a present value |
| `first()` / `last()` | Gets the first or last iterated value |
| `union(other)` | Returns the union |
| `intersection(other)` | Returns the intersection |
| `difference(other)` | Returns values absent from another iterable |
| `symmetricDifference(other)` | Returns values exclusive to either set |
| `isSubsetOf(other)` / `isSupersetOf(other)` | Checks subset or superset relationships |
| `isDisjointFrom(other)` | Checks whether sets have no shared values |
| `equals(other)` | Checks set equality |
| `filter(fn)` / `map(fn)` | Filters or transforms values into a `SET2I` |
| `partition(fn)` | Splits values into matching and nonmatching sets |
| `differenceBy(other, fn)` | Computes a difference using computed keys |
| `uniqueBy(fn)` | Keeps the first value for each computed key |
| `find(fn)` | Returns the first matching value |
| `every(fn)` / `some(fn)` | Tests values against a predicate |
| `reduce(fn, initial)` | Reduces values to an accumulated result |
| `addAll(values)` | Adds multiple values |
| `deleteAll(values)` | Deletes values and returns the deletion count |
| `retainAll(values)` | Keeps only values present in another iterable |
| `update(values)` | Adds values from another iterable |
| `replace(values)` | Replaces all members |
| `swap(a, b)` | Removes `a` and adds `b` if `a` exists |
| `clone()` | Creates a copy |
| `toArray()` | Converts to an array |
| `toMap(fn)` | Converts values into a map using returned key-value pairs |
| `toObject(fn?)` | Converts values to an object using generated or stringified keys |
| `toJSON()` | Returns the values as an array |

Static constructors: `fromArray(values)`, `fromObject(obj)`, `fromEntries(entries)`, and `from(values)`.



## `U82` — Array

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

