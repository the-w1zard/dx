

function _instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function _class_apply_descriptor_get(receiver, descriptor) {
    if (descriptor.get) return descriptor.get.call(receiver);
    return descriptor.value;
}
function _class_apply_descriptor_set(receiver, descriptor, value) {
    if (descriptor.set) descriptor.set.call(receiver, value);
    else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
function _class_apply_descriptor_update(receiver, descriptor) {
    if (descriptor.set) {
        if (!descriptor.get) throw new TypeError("attempted to read set only private field");
        if (!("__destrWrapper" in descriptor)) {
            descriptor.__destrWrapper = {
                set value (v){
                    descriptor.set.call(receiver, v);
                },
                get value () {
                    return descriptor.get.call(receiver);
                }
            };
        }
        return descriptor.__destrWrapper;
    } else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        return descriptor;
    }
}
function _class_call_check(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _class_extract_field_descriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
    return privateMap.get(receiver);
}
function _class_private_field_get(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor(receiver, privateMap, "get");
    return _class_apply_descriptor_get(receiver, descriptor);
}
function _class_private_field_init(obj, privateMap, value) {
    _check_private_redeclaration(obj, privateMap);
    privateMap.set(obj, value);
}
function _class_private_field_set(receiver, privateMap, value) {
    var descriptor = _class_extract_field_descriptor(receiver, privateMap, "set");
    _class_apply_descriptor_set(receiver, descriptor, value);
    return value;
}
function _class_private_field_update(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor(receiver, privateMap, "update");
    return _class_apply_descriptor_update(receiver, descriptor);
}
function _class_private_method_get(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}
function _class_private_method_init(obj, privateSet) {
    _check_private_redeclaration(obj, privateSet);
    privateSet.add(obj);
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _ts_generator(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype), d = Object.defineProperty;
    return d(g, "next", {
        value: verb(0)
    }), d(g, "throw", {
        value: verb(1)
    }), d(g, "return", {
        value: verb(2)
    }), typeof Symbol === "function" && d(g, Symbol.iterator, {
        value: function value() {
            return this;
        }
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var _vals = /*#__PURE__*/ new WeakMap(), _pidToSlot = /*#__PURE__*/ new WeakMap(), _slotToPid = /*#__PURE__*/ new WeakMap(), _size = /*#__PURE__*/ new WeakMap(), _open = /*#__PURE__*/ new WeakSet(), _grow = /*#__PURE__*/ new WeakSet();
var map_rows_M2RI = /*#__PURE__*/ function() {
    "use strict";
    function M2RI() {
        var capacity = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1024, stride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3;
        _class_call_check(this, M2RI);
        _class_private_method_init(this, _open);
        _class_private_method_init(this, _grow);
        _class_private_field_init(this, _vals, {
            writable: true,
            value: void 0
        });
        _class_private_field_init(this, _pidToSlot, {
            writable: true,
            value: void 0
        });
        _class_private_field_init(this, _slotToPid, {
            writable: true,
            value: void 0
        });
        _class_private_field_init(this, _size, {
            writable: true,
            value: 0
        });
        _define_property(this, "stride", void 0);
        this.stride = Math.max(1, stride | 0);
        var cap = Math.max(1, capacity | 0);
        _class_private_field_set(this, _pidToSlot, new Int32Array(cap).fill(-1));
        _class_private_field_set(this, _slotToPid, new Int32Array(cap).fill(-1));
        _class_private_field_set(this, _vals, new Float64Array(cap * this.stride));
    }
    _create_class(M2RI, [
        {
            key: "size",
            get: function get() {
                return _class_private_field_get(this, _size);
            }
        },
        {
            key: "capacity",
            get: function get() {
                return _class_private_field_get(this, _pidToSlot).length;
            }
        },
        {
            key: "buffer",
            get: function get() {
                return _class_private_field_get(this, _vals);
            }
        },
        {
            key: "get",
            value: function get(pid) {
                var i = _class_private_field_get(this, _pidToSlot)[pid];
                if (i < 0) return undefined;
                var o = i * this.stride;
                return _class_private_field_get(this, _vals).subarray(o, o + this.stride);
            }
        },
        {
            key: "has",
            value: function has(pid) {
                var i = _class_private_field_get(this, _pidToSlot)[pid];
                return i !== undefined && i !== -1;
            }
        },
        {
            key: "set",
            value: function set(pid, v) {
                this.write(pid, v);
                return this;
            }
        },
        {
            key: "delete",
            value: function _delete(pid) {
                var i = _class_private_field_get(this, _pidToSlot)[pid];
                if (i === undefined || i < 0) return false;
                var st = this.stride;
                var last = --_class_private_field_update(this, _size).value;
                var lastPid = _class_private_field_get(this, _slotToPid)[last];
                if (i !== last) {
                    _class_private_field_get(this, _vals).copyWithin(i * st, last * st, last * st + st);
                    _class_private_field_get(this, _slotToPid)[i] = lastPid;
                    _class_private_field_get(this, _pidToSlot)[lastPid] = i;
                }
                _class_private_field_get(this, _pidToSlot)[pid] = -1;
                _class_private_field_get(this, _slotToPid)[last] = -1;
                return true;
            }
        },
        {
            key: "clear",
            value: function clear() {
                _class_private_field_get(this, _pidToSlot).fill(-1);
                _class_private_field_get(this, _slotToPid).fill(-1);
                _class_private_field_set(this, _size, 0);
            }
        },
        {
            /** copy a row in, no validation per component */ key: "write",
            value: function write(pid, v) {
                var o = _class_private_method_get(this, _open, map_rows_open).call(this, pid) * this.stride;
                _class_private_field_get(this, _vals).set(v, o);
            }
        },
        {
            /** single component: row[c] = v */ key: "put",
            value: function put(pid, c, v) {
                _class_private_field_get(this, _vals)[_class_private_method_get(this, _open, map_rows_open).call(this, pid) * this.stride + c] = v;
            }
        },
        {
            /** single component: row[c] */ key: "at",
            value: function at(pid, c) {
                return _class_private_field_get(this, _vals)[_class_private_field_get(this, _pidToSlot)[pid] * this.stride + c];
            }
        },
        {
            /** pid -> slot, or -1 */ key: "slotOf",
            value: function slotOf(pid) {
                var i = _class_private_field_get(this, _pidToSlot)[pid];
                return i === undefined ? -1 : i;
            }
        },
        {
            /** zero-copy row view you can write through */ key: "row",
            value: function row(pid) {
                return this.get(pid);
            }
        },
        {
            /** view over the live prefix of the whole table — feed straight to a shader/worker */ key: "live",
            value: function live() {
                return _class_private_field_get(this, _vals).subarray(0, _class_private_field_get(this, _size) * this.stride);
            }
        },
        {
            key: "keys",
            value: function keys() {
                var i;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            i = 0;
                            _state.label = 1;
                        case 1:
                            if (!(i < _class_private_field_get(this, _size))) return [
                                3,
                                4
                            ];
                            return [
                                4,
                                _class_private_field_get(this, _slotToPid)[i]
                            ];
                        case 2:
                            _state.sent();
                            _state.label = 3;
                        case 3:
                            i++;
                            return [
                                3,
                                1
                            ];
                        case 4:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: "values",
            value: function values() {
                var st, i;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            st = this.stride;
                            i = 0;
                            _state.label = 1;
                        case 1:
                            if (!(i < _class_private_field_get(this, _size))) return [
                                3,
                                4
                            ];
                            return [
                                4,
                                _class_private_field_get(this, _vals).subarray(i * st, i * st + st)
                            ];
                        case 2:
                            _state.sent();
                            _state.label = 3;
                        case 3:
                            i++;
                            return [
                                3,
                                1
                            ];
                        case 4:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: "entries",
            value: function entries() {
                var st, i;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            st = this.stride;
                            i = 0;
                            _state.label = 1;
                        case 1:
                            if (!(i < _class_private_field_get(this, _size))) return [
                                3,
                                4
                            ];
                            return [
                                4,
                                [
                                    _class_private_field_get(this, _slotToPid)[i],
                                    _class_private_field_get(this, _vals).subarray(i * st, i * st + st)
                                ]
                            ];
                        case 2:
                            _state.sent();
                            _state.label = 3;
                        case 3:
                            i++;
                            return [
                                3,
                                1
                            ];
                        case 4:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: Symbol.iterator,
            value: function value() {
                return this.entries();
            }
        },
        {
            key: "forEach",
            value: function forEach(fn, thisArg) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = _sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        fn.call(thisArg, v, k, this);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            key: "forEachRaw",
            value: function forEachRaw(fn) {
                for(var i = 0; i < _class_private_field_get(this, _size); i++)fn(_class_private_field_get(this, _slotToPid)[i], i);
            }
        }
    ]);
    return M2RI;
}();
function map_rows_open(pid) {
    var p = _class_private_field_get(this, _pidToSlot);
    if (pid >= p.length) {
        _class_private_method_get(this, _grow, grow).call(this, pid);
        p = _class_private_field_get(this, _pidToSlot);
    }
    var i = p[pid];
    if (i < 0) {
        if (_class_private_field_get(this, _size) === p.length) {
            _class_private_method_get(this, _grow, grow).call(this, _class_private_field_get(this, _size));
            p = _class_private_field_get(this, _pidToSlot);
        }
        i = _class_private_field_update(this, _size).value++;
        p[pid] = i;
        _class_private_field_get(this, _slotToPid)[i] = pid;
    }
    return i;
}
function grow(need) {
    var cap = _class_private_field_get(this, _pidToSlot).length;
    while(cap <= need)cap *= 2;
    var p2s = new Int32Array(cap).fill(-1);
    p2s.set(_class_private_field_get(this, _pidToSlot));
    _class_private_field_set(this, _pidToSlot, p2s);
    var s2p = new Int32Array(cap).fill(-1);
    s2p.set(_class_private_field_get(this, _slotToPid));
    _class_private_field_set(this, _slotToPid, s2p);
    var v = new Float64Array(cap * this.stride);
    v.set(_class_private_field_get(this, _vals));
    _class_private_field_set(this, _vals, v);
}
Object.setPrototypeOf(map_rows_M2RI.prototype, Map.prototype);
globalThis.M2R = map_rows_M2RI;

function map_dense_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function map_dense_array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return map_dense_array_like_to_array(arr);
}
function map_dense_check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function map_dense_class_apply_descriptor_get(receiver, descriptor) {
    if (descriptor.get) return descriptor.get.call(receiver);
    return descriptor.value;
}
function map_dense_class_apply_descriptor_set(receiver, descriptor, value) {
    if (descriptor.set) descriptor.set.call(receiver, value);
    else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
function map_dense_class_apply_descriptor_update(receiver, descriptor) {
    if (descriptor.set) {
        if (!descriptor.get) throw new TypeError("attempted to read set only private field");
        if (!("__destrWrapper" in descriptor)) {
            descriptor.__destrWrapper = {
                set value (v){
                    descriptor.set.call(receiver, v);
                },
                get value () {
                    return descriptor.get.call(receiver);
                }
            };
        }
        return descriptor.__destrWrapper;
    } else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        return descriptor;
    }
}
function map_dense_class_call_check(instance, Constructor) {
    if (!map_dense_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function map_dense_class_extract_field_descriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
    return privateMap.get(receiver);
}
function map_dense_class_private_field_get(receiver, privateMap) {
    var descriptor = map_dense_class_extract_field_descriptor(receiver, privateMap, "get");
    return map_dense_class_apply_descriptor_get(receiver, descriptor);
}
function map_dense_class_private_field_init(obj, privateMap, value) {
    map_dense_check_private_redeclaration(obj, privateMap);
    privateMap.set(obj, value);
}
function map_dense_class_private_field_set(receiver, privateMap, value) {
    var descriptor = map_dense_class_extract_field_descriptor(receiver, privateMap, "set");
    map_dense_class_apply_descriptor_set(receiver, descriptor, value);
    return value;
}
function map_dense_class_private_field_update(receiver, privateMap) {
    var descriptor = map_dense_class_extract_field_descriptor(receiver, privateMap, "update");
    return map_dense_class_apply_descriptor_update(receiver, descriptor);
}
function map_dense_class_private_method_get(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}
function map_dense_class_private_method_init(obj, privateSet) {
    map_dense_check_private_redeclaration(obj, privateSet);
    privateSet.add(obj);
}
function map_dense_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function map_dense_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) map_dense_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) map_dense_defineProperties(Constructor, staticProps);
    return Constructor;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || map_dense_unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function map_dense_ts_generator(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype), d = Object.defineProperty;
    return d(g, "next", {
        value: verb(0)
    }), d(g, "throw", {
        value: verb(1)
    }), d(g, "return", {
        value: verb(2)
    }), typeof Symbol === "function" && d(g, Symbol.iterator, {
        value: function value() {
            return this;
        }
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function _ts_values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) {
        return m.call(o);
    }
    if (o && typeof o.length === "number") {
        return {
            next: function next() {
                if (o && i >= o.length) {
                    o = void 0;
                }
                return {
                    value: o && o[i++],
                    done: !o
                };
            }
        };
    }
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function map_dense_unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return map_dense_array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return map_dense_array_like_to_array(o, minLen);
}
var map_dense_vals = /*#__PURE__*/ new WeakMap(), _live = /*#__PURE__*/ new WeakMap(), map_dense_size = /*#__PURE__*/ new WeakMap(), _odd = /*#__PURE__*/ new WeakMap(), map_dense_grow = /*#__PURE__*/ new WeakSet();
var map_dense_M2DI = /*#__PURE__*/ function() {
    "use strict";
    function M2DI() {
        var capacity = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1024;
        map_dense_class_call_check(this, M2DI);
        map_dense_class_private_method_init(this, map_dense_grow);
        map_dense_class_private_field_init(this, map_dense_vals, {
            writable: true,
            value: void 0
        });
        map_dense_class_private_field_init(this, _live, {
            writable: true,
            value: void 0
        });
        map_dense_class_private_field_init(this, map_dense_size, {
            writable: true,
            value: 0
        });
        map_dense_class_private_field_init(this, _odd, {
            writable: true,
            value: null
        });
        var cap = Math.max(1, capacity | 0);
        map_dense_class_private_field_set(this, map_dense_vals, new F64(cap));
        map_dense_class_private_field_set(this, _live, new U8(cap));
    }
    map_dense_create_class(M2DI, [
        {
            key: "size",
            get: function get() {
                return map_dense_class_private_field_get(this, map_dense_size) + (map_dense_class_private_field_get(this, _odd) === null ? 0 : map_dense_class_private_field_get(this, _odd).size);
            }
        },
        {
            key: "capacity",
            get: function get() {
                return map_dense_class_private_field_get(this, map_dense_vals).length;
            }
        },
        {
            key: "buffer",
            get: /** live backing buffer: value of pid p is buffer[p], valid where live[p] === 1 */ function get() {
                return map_dense_class_private_field_get(this, map_dense_vals);
            }
        },
        {
            key: "live",
            get: function get() {
                return map_dense_class_private_field_get(this, _live);
            }
        },
        {
            // ---- Map API ----------------------------------------------------------
            key: "get",
            value: function get(k) {
                var l = map_dense_class_private_field_get(this, _live);
                if (typeof k === "number" && k >= 0 && k < l.length && l[k] === 1) return map_dense_class_private_field_get(this, map_dense_vals)[k];
                if (typeof k !== "number" || k < 0) return map_dense_class_private_field_get(this, _odd) === null ? undefined : map_dense_class_private_field_get(this, _odd).get(k);
                return undefined;
            }
        },
        {
            key: "has",
            value: function has(k) {
                var l = map_dense_class_private_field_get(this, _live);
                if (typeof k === "number" && k >= 0 && k < l.length) return l[k] === 1;
                return map_dense_class_private_field_get(this, _odd) !== null && map_dense_class_private_field_get(this, _odd).has(k);
            }
        },
        {
            key: "set",
            value: function set(k, v) {
                var _$_class_private_field_get;
                if (typeof v === "number" && typeof k === "number" && k >= 0) {
                    if (k >= map_dense_class_private_field_get(this, _live).length) map_dense_class_private_method_get(this, map_dense_grow, src_map_dense_grow).call(this, k);
                    if (map_dense_class_private_field_get(this, _live)[k] === 0) {
                        map_dense_class_private_field_get(this, _live)[k] = 1;
                        map_dense_class_private_field_update(this, map_dense_size).value++;
                    }
                    map_dense_class_private_field_get(this, map_dense_vals)[k] = v;
                    return this;
                }
                map_dense_class_private_field_set(this, _odd, (_$_class_private_field_get = map_dense_class_private_field_get(this, _odd)) !== null && _$_class_private_field_get !== void 0 ? _$_class_private_field_get : new M2()).set(k, v);
                return this;
            }
        },
        {
            key: "delete",
            value: function _delete(k) {
                var l = map_dense_class_private_field_get(this, _live);
                if (typeof k === "number" && k >= 0) {
                    if (k >= l.length || l[k] === 0) return false;
                    l[k] = 0;
                    map_dense_class_private_field_update(this, map_dense_size).value--;
                    return true;
                }
                return map_dense_class_private_field_get(this, _odd) !== null && map_dense_class_private_field_get(this, _odd).delete(k);
            }
        },
        {
            key: "clear",
            value: function clear() {
                var _$_class_private_field_get;
                map_dense_class_private_field_get(this, _live).fill(0);
                map_dense_class_private_field_set(this, map_dense_size, 0);
                (_$_class_private_field_get = map_dense_class_private_field_get(this, _odd)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.clear();
            }
        },
        {
            key: "keys",
            value: function keys() {
                var l, n, k;
                return map_dense_ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            l = map_dense_class_private_field_get(this, _live), n = l.length;
                            k = 0;
                            _state.label = 1;
                        case 1:
                            if (!(k < n)) return [
                                3,
                                4
                            ];
                            if (!(l[k] === 1)) return [
                                3,
                                3
                            ];
                            return [
                                4,
                                k
                            ];
                        case 2:
                            _state.sent();
                            _state.label = 3;
                        case 3:
                            k++;
                            return [
                                3,
                                1
                            ];
                        case 4:
                            if (!(map_dense_class_private_field_get(this, _odd) !== null)) return [
                                3,
                                6
                            ];
                            return [
                                5,
                                _ts_values(map_dense_class_private_field_get(this, _odd).keys())
                            ];
                        case 5:
                            _state.sent();
                            _state.label = 6;
                        case 6:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: "values",
            value: function values() {
                var _$_class_private_field_get, l, n, odd, seen, k, seen1, k1;
                return map_dense_ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            l = map_dense_class_private_field_get(this, _live), n = map_dense_class_private_field_get(this, map_dense_size);
                            if (!((_$_class_private_field_get = map_dense_class_private_field_get(this, _odd)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.size)) return [
                                3,
                                6
                            ];
                            odd = _to_consumable_array(map_dense_class_private_field_get(this, _odd).values());
                            seen = 0;
                            k = 0;
                            _state.label = 1;
                        case 1:
                            if (!(k < l.length && seen < n)) return [
                                3,
                                4
                            ];
                            if (!(l[k] === 1)) return [
                                3,
                                3
                            ];
                            seen++;
                            return [
                                4,
                                map_dense_class_private_field_get(this, map_dense_vals)[k]
                            ];
                        case 2:
                            _state.sent();
                            _state.label = 3;
                        case 3:
                            k++;
                            return [
                                3,
                                1
                            ];
                        case 4:
                            return [
                                5,
                                _ts_values(odd)
                            ];
                        case 5:
                            _state.sent();
                            return [
                                2
                            ];
                        case 6:
                            seen1 = 0;
                            k1 = 0;
                            _state.label = 7;
                        case 7:
                            if (!(k1 < l.length && seen1 < n)) return [
                                3,
                                10
                            ];
                            if (!(l[k1] === 1)) return [
                                3,
                                9
                            ];
                            seen1++;
                            return [
                                4,
                                map_dense_class_private_field_get(this, map_dense_vals)[k1]
                            ];
                        case 8:
                            _state.sent();
                            _state.label = 9;
                        case 9:
                            k1++;
                            return [
                                3,
                                7
                            ];
                        case 10:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: "entries",
            value: function entries() {
                var l, k;
                return map_dense_ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            l = map_dense_class_private_field_get(this, _live);
                            k = 0;
                            _state.label = 1;
                        case 1:
                            if (!(k < l.length)) return [
                                3,
                                4
                            ];
                            if (!(l[k] === 1)) return [
                                3,
                                3
                            ];
                            return [
                                4,
                                [
                                    k,
                                    map_dense_class_private_field_get(this, map_dense_vals)[k]
                                ]
                            ];
                        case 2:
                            _state.sent();
                            _state.label = 3;
                        case 3:
                            k++;
                            return [
                                3,
                                1
                            ];
                        case 4:
                            if (!(map_dense_class_private_field_get(this, _odd) !== null)) return [
                                3,
                                6
                            ];
                            return [
                                5,
                                _ts_values(map_dense_class_private_field_get(this, _odd).entries())
                            ];
                        case 5:
                            _state.sent();
                            _state.label = 6;
                        case 6:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: Symbol.iterator,
            value: function value() {
                return this.entries();
            }
        },
        {
            key: "forEach",
            value: function forEach(fn, thisArg) {
                var _this = this;
                var _$_class_private_field_get;
                var l = map_dense_class_private_field_get(this, _live);
                for(var k = 0; k < l.length; k++)if (l[k] === 1) fn.call(thisArg, map_dense_class_private_field_get(this, map_dense_vals)[k], k, this);
                (_$_class_private_field_get = map_dense_class_private_field_get(this, _odd)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.forEach(function(v, k) {
                    return fn.call(thisArg, v, k, _this);
                });
            }
        },
        {
            // ---- binary lane -------------------------------------------------------
            /** read by pid — no typeof guard: pids are numbers */ key: "g",
            value: function g(pid) {
                return map_dense_class_private_field_get(this, _live)[pid] === 1 ? map_dense_class_private_field_get(this, map_dense_vals)[pid] : undefined;
            }
        },
        {
            /** write by pid */ key: "s",
            value: function s(v, pid) {
                if (pid >= map_dense_class_private_field_get(this, _live).length) map_dense_class_private_method_get(this, map_dense_grow, src_map_dense_grow).call(this, pid);
                if (map_dense_class_private_field_get(this, _live)[pid] === 0) {
                    map_dense_class_private_field_get(this, _live)[pid] = 1;
                    map_dense_class_private_field_update(this, map_dense_size).value++;
                }
                map_dense_class_private_field_get(this, map_dense_vals)[pid] = v;
                return this;
            }
        },
        {
            key: "getOr",
            value: function getOr(pid) {
                var dflt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
                return map_dense_class_private_field_get(this, _live)[pid] === 1 ? map_dense_class_private_field_get(this, map_dense_vals)[pid] : dflt;
            }
        },
        {
            /** pid += delta, returns the new value */ key: "add",
            value: function add(pid, delta) {
                if (pid >= map_dense_class_private_field_get(this, _live).length) map_dense_class_private_method_get(this, map_dense_grow, src_map_dense_grow).call(this, pid);
                if (map_dense_class_private_field_get(this, _live)[pid] === 0) {
                    map_dense_class_private_field_get(this, _live)[pid] = 1;
                    map_dense_class_private_field_update(this, map_dense_size).value++;
                }
                return map_dense_class_private_field_get(this, map_dense_vals)[pid] += delta;
            }
        },
        {
            key: "in",
            value: function _in(pid) {
                return map_dense_class_private_field_get(this, _live)[pid] === 1;
            }
        },
        {
            /** walk live pids without allocating an iterator */ key: "forEachRaw",
            value: function forEachRaw(fn) {
                var l = map_dense_class_private_field_get(this, _live);
                for(var k = 0; k < l.length; k++)if (l[k] === 1) fn(k, map_dense_class_private_field_get(this, map_dense_vals)[k]);
            }
        },
        {
            /** values for a list of pids, NaN where absent */ key: "gather",
            value: function gather(pids) {
                var out = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : new Float64Array(pids.length);
                for(var i = 0; i < pids.length; i++){
                    var p = pids[i];
                    out[i] = map_dense_class_private_field_get(this, _live)[p] === 1 ? map_dense_class_private_field_get(this, map_dense_vals)[p] : NaN;
                }
                return out;
            }
        }
    ]);
    return M2DI;
}();
function src_map_dense_grow(need) {
    var cap = map_dense_class_private_field_get(this, _live).length;
    while(cap <= need)cap *= 2;
    var v = new Float64Array(cap);
    v.set(map_dense_class_private_field_get(this, map_dense_vals));
    map_dense_class_private_field_set(this, map_dense_vals, v);
    var l = new Uint8Array(cap);
    l.set(map_dense_class_private_field_get(this, _live));
    map_dense_class_private_field_set(this, _live, l);
}
globalThis.M2D = map_dense_M2DI;

function map_bin_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function map_bin_check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function map_bin_class_apply_descriptor_get(receiver, descriptor) {
    if (descriptor.get) return descriptor.get.call(receiver);
    return descriptor.value;
}
function map_bin_class_apply_descriptor_set(receiver, descriptor, value) {
    if (descriptor.set) descriptor.set.call(receiver, value);
    else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
function map_bin_class_apply_descriptor_update(receiver, descriptor) {
    if (descriptor.set) {
        if (!descriptor.get) throw new TypeError("attempted to read set only private field");
        if (!("__destrWrapper" in descriptor)) {
            descriptor.__destrWrapper = {
                set value (v){
                    descriptor.set.call(receiver, v);
                },
                get value () {
                    return descriptor.get.call(receiver);
                }
            };
        }
        return descriptor.__destrWrapper;
    } else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        return descriptor;
    }
}
function map_bin_class_call_check(instance, Constructor) {
    if (!map_bin_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function map_bin_class_extract_field_descriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
    return privateMap.get(receiver);
}
function map_bin_class_private_field_get(receiver, privateMap) {
    var descriptor = map_bin_class_extract_field_descriptor(receiver, privateMap, "get");
    return map_bin_class_apply_descriptor_get(receiver, descriptor);
}
function map_bin_class_private_field_init(obj, privateMap, value) {
    map_bin_check_private_redeclaration(obj, privateMap);
    privateMap.set(obj, value);
}
function map_bin_class_private_field_set(receiver, privateMap, value) {
    var descriptor = map_bin_class_extract_field_descriptor(receiver, privateMap, "set");
    map_bin_class_apply_descriptor_set(receiver, descriptor, value);
    return value;
}
function map_bin_class_private_field_update(receiver, privateMap) {
    var descriptor = map_bin_class_extract_field_descriptor(receiver, privateMap, "update");
    return map_bin_class_apply_descriptor_update(receiver, descriptor);
}
function map_bin_class_private_method_get(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}
function map_bin_class_private_method_init(obj, privateSet) {
    map_bin_check_private_redeclaration(obj, privateSet);
    privateSet.add(obj);
}
function map_bin_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function map_bin_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) map_bin_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) map_bin_defineProperties(Constructor, staticProps);
    return Constructor;
}
function map_bin_ts_generator(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype), d = Object.defineProperty;
    return d(g, "next", {
        value: verb(0)
    }), d(g, "throw", {
        value: verb(1)
    }), d(g, "return", {
        value: verb(2)
    }), typeof Symbol === "function" && d(g, Symbol.iterator, {
        value: function value() {
            return this;
        }
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function map_bin_ts_values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) {
        return m.call(o);
    }
    if (o && typeof o.length === "number") {
        return {
            next: function next() {
                if (o && i >= o.length) {
                    o = void 0;
                }
                return {
                    value: o && o[i++],
                    done: !o
                };
            }
        };
    }
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
var map_bin_vals = /*#__PURE__*/ new WeakMap(), map_bin_pidToSlot = /*#__PURE__*/ new WeakMap(), map_bin_slotToPid = /*#__PURE__*/ new WeakMap(), map_bin_size = /*#__PURE__*/ new WeakMap(), map_bin_odd = /*#__PURE__*/ new WeakMap(), map_bin_open = /*#__PURE__*/ new WeakSet(), map_bin_grow = /*#__PURE__*/ new WeakSet();
var map_bin_M2BINI = /*#__PURE__*/ function() {
    "use strict";
    function M2BINI() {
        var capacity = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1024;
        map_bin_class_call_check(this, M2BINI);
        map_bin_class_private_method_init(this, map_bin_open);
        map_bin_class_private_method_init(this, map_bin_grow);
        map_bin_class_private_field_init(this, map_bin_vals, {
            writable: true,
            value: void 0
        });
        map_bin_class_private_field_init(this, map_bin_pidToSlot, {
            writable: true,
            value: void 0
        });
        map_bin_class_private_field_init(this, map_bin_slotToPid, {
            writable: true,
            value: void 0
        });
        map_bin_class_private_field_init(this, map_bin_size, {
            writable: true,
            value: 0
        });
        map_bin_class_private_field_init(this, map_bin_odd, {
            writable: true,
            value: null
        });
        var cap = Math.max(1, capacity | 0);
        map_bin_class_private_field_set(this, map_bin_pidToSlot, new Int32Array(cap).fill(-1));
        map_bin_class_private_field_set(this, map_bin_slotToPid, new Int32Array(cap).fill(-1));
        map_bin_class_private_field_set(this, map_bin_vals, new Float64Array(cap));
    }
    map_bin_create_class(M2BINI, [
        {
            key: "size",
            get: function get() {
                return map_bin_class_private_field_get(this, map_bin_size) + (map_bin_class_private_field_get(this, map_bin_odd) === null ? 0 : map_bin_class_private_field_get(this, map_bin_odd).size);
            }
        },
        {
            key: "capacity",
            get: function get() {
                return map_bin_class_private_field_get(this, map_bin_vals).length;
            }
        },
        {
            key: "buffer",
            get: /** live backing buffer: floating-point value of slot i is buffer[i] */ function get() {
                return map_bin_class_private_field_get(this, map_bin_vals);
            }
        },
        {
            // ---- Map API ----------------------------------------------------------
            key: "get",
            value: function get(k) {
                var p = map_bin_class_private_field_get(this, map_bin_pidToSlot);
                if (typeof k === "number" && k >= 0 && k < p.length) {
                    var i = p[k];
                    return i < 0 ? undefined : map_bin_class_private_field_get(this, map_bin_vals)[i];
                }
                return map_bin_class_private_field_get(this, map_bin_odd) === null ? undefined : map_bin_class_private_field_get(this, map_bin_odd).get(k);
            }
        },
        {
            key: "has",
            value: function has(k) {
                if (typeof k === "number" && k >= 0) return k < map_bin_class_private_field_get(this, map_bin_pidToSlot).length && map_bin_class_private_field_get(this, map_bin_pidToSlot)[k] !== -1;
                return map_bin_class_private_field_get(this, map_bin_odd) !== null && map_bin_class_private_field_get(this, map_bin_odd).has(k);
            }
        },
        {
            key: "set",
            value: function set(k, v) {
                var _$_class_private_field_get;
                if (typeof v === "number" && typeof k === "number" && k >= 0) {
                    map_bin_class_private_field_get(this, map_bin_vals)[map_bin_class_private_method_get(this, map_bin_open, src_map_bin_open).call(this, k)] = v;
                    return this;
                }
                map_bin_class_private_field_set(this, map_bin_odd, (_$_class_private_field_get = map_bin_class_private_field_get(this, map_bin_odd)) !== null && _$_class_private_field_get !== void 0 ? _$_class_private_field_get : new Map()).set(k, v);
                return this;
            }
        },
        {
            key: "delete",
            value: function _delete(k) {
                if (typeof k === "number" && k >= 0) {
                    if (k >= map_bin_class_private_field_get(this, map_bin_pidToSlot).length) return false;
                    var i = map_bin_class_private_field_get(this, map_bin_pidToSlot)[k];
                    if (i < 0) return false;
                    var last = --map_bin_class_private_field_update(this, map_bin_size).value;
                    var lastPid = map_bin_class_private_field_get(this, map_bin_slotToPid)[last];
                    if (i !== last) {
                        map_bin_class_private_field_get(this, map_bin_vals)[i] = map_bin_class_private_field_get(this, map_bin_vals)[last];
                        map_bin_class_private_field_get(this, map_bin_slotToPid)[i] = lastPid;
                        map_bin_class_private_field_get(this, map_bin_pidToSlot)[lastPid] = i;
                    }
                    map_bin_class_private_field_get(this, map_bin_pidToSlot)[k] = -1;
                    map_bin_class_private_field_get(this, map_bin_slotToPid)[last] = -1;
                    return true;
                }
                return map_bin_class_private_field_get(this, map_bin_odd) !== null && map_bin_class_private_field_get(this, map_bin_odd).delete(k);
            }
        },
        {
            key: "clear",
            value: function clear() {
                var _$_class_private_field_get;
                map_bin_class_private_field_get(this, map_bin_pidToSlot).fill(-1);
                map_bin_class_private_field_get(this, map_bin_slotToPid).fill(-1);
                map_bin_class_private_field_set(this, map_bin_size, 0);
                (_$_class_private_field_get = map_bin_class_private_field_get(this, map_bin_odd)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.clear();
            }
        },
        {
            key: "keys",
            value: function keys() {
                var i;
                return map_bin_ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            i = 0;
                            _state.label = 1;
                        case 1:
                            if (!(i < map_bin_class_private_field_get(this, map_bin_size))) return [
                                3,
                                4
                            ];
                            return [
                                4,
                                map_bin_class_private_field_get(this, map_bin_slotToPid)[i]
                            ];
                        case 2:
                            _state.sent();
                            _state.label = 3;
                        case 3:
                            i++;
                            return [
                                3,
                                1
                            ];
                        case 4:
                            if (!(map_bin_class_private_field_get(this, map_bin_odd) !== null)) return [
                                3,
                                6
                            ];
                            return [
                                5,
                                map_bin_ts_values(map_bin_class_private_field_get(this, map_bin_odd).keys())
                            ];
                        case 5:
                            _state.sent();
                            _state.label = 6;
                        case 6:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: "values",
            value: function values() {
                var i;
                return map_bin_ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            i = 0;
                            _state.label = 1;
                        case 1:
                            if (!(i < map_bin_class_private_field_get(this, map_bin_size))) return [
                                3,
                                4
                            ];
                            return [
                                4,
                                map_bin_class_private_field_get(this, map_bin_vals)[i]
                            ];
                        case 2:
                            _state.sent();
                            _state.label = 3;
                        case 3:
                            i++;
                            return [
                                3,
                                1
                            ];
                        case 4:
                            if (!(map_bin_class_private_field_get(this, map_bin_odd) !== null)) return [
                                3,
                                6
                            ];
                            return [
                                5,
                                map_bin_ts_values(map_bin_class_private_field_get(this, map_bin_odd).values())
                            ];
                        case 5:
                            _state.sent();
                            _state.label = 6;
                        case 6:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: "entries",
            value: function entries() {
                var i;
                return map_bin_ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            i = 0;
                            _state.label = 1;
                        case 1:
                            if (!(i < map_bin_class_private_field_get(this, map_bin_size))) return [
                                3,
                                4
                            ];
                            return [
                                4,
                                [
                                    map_bin_class_private_field_get(this, map_bin_slotToPid)[i],
                                    map_bin_class_private_field_get(this, map_bin_vals)[i]
                                ]
                            ];
                        case 2:
                            _state.sent();
                            _state.label = 3;
                        case 3:
                            i++;
                            return [
                                3,
                                1
                            ];
                        case 4:
                            if (!(map_bin_class_private_field_get(this, map_bin_odd) !== null)) return [
                                3,
                                6
                            ];
                            return [
                                5,
                                map_bin_ts_values(map_bin_class_private_field_get(this, map_bin_odd).entries())
                            ];
                        case 5:
                            _state.sent();
                            _state.label = 6;
                        case 6:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: Symbol.iterator,
            value: function value() {
                return this.entries();
            }
        },
        {
            key: "forEach",
            value: function forEach(fn, thisArg) {
                var _this = this;
                var _$_class_private_field_get;
                for(var i = 0; i < map_bin_class_private_field_get(this, map_bin_size); i++)fn.call(thisArg, map_bin_class_private_field_get(this, map_bin_vals)[i], map_bin_class_private_field_get(this, map_bin_slotToPid)[i], this);
                (_$_class_private_field_get = map_bin_class_private_field_get(this, map_bin_odd)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.forEach(function(v, k) {
                    return fn.call(thisArg, v, k, _this);
                });
            }
        },
        {
            // ---- binary lane: no Map ceremony, no boxing ---------------------------
            /** read by pid */ key: "g",
            value: function g(pid) {
                var i = map_bin_class_private_field_get(this, map_bin_pidToSlot)[pid];
                return i < 0 ? undefined : map_bin_class_private_field_get(this, map_bin_vals)[i];
            }
        },
        {
            /** write by pid */ key: "s",
            value: function s(v, pid) {
                map_bin_class_private_field_get(this, map_bin_vals)[map_bin_class_private_method_get(this, map_bin_open, src_map_bin_open).call(this, pid)] = v;
                return this;
            }
        },
        {
            /** read with fallback — the accumulator primitive */ key: "getOr",
            value: function getOr(pid) {
                var dflt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
                var i = map_bin_class_private_field_get(this, map_bin_pidToSlot)[pid];
                return i < 0 ? dflt : map_bin_class_private_field_get(this, map_bin_vals)[i];
            }
        },
        {
            /** pid += delta, returns the new value */ key: "add",
            value: function add(pid, delta) {
                var i = map_bin_class_private_method_get(this, map_bin_open, src_map_bin_open).call(this, pid);
                return map_bin_class_private_field_get(this, map_bin_vals)[i] += delta;
            }
        },
        {
            key: "in",
            value: function _in(pid) {
                return map_bin_class_private_field_get(this, map_bin_pidToSlot)[pid] !== -1;
            }
        },
        {
            key: "d",
            value: function d(pid) {
                return this.delete(pid);
            }
        },
        {
            /** walk (pid, slot) without allocating an iterator */ key: "forEachRaw",
            value: function forEachRaw(fn) {
                for(var i = 0; i < map_bin_class_private_field_get(this, map_bin_size); i++)fn(map_bin_class_private_field_get(this, map_bin_slotToPid)[i], i);
            }
        },
        {
            /** values for a list of pids, NaN where absent */ key: "gather",
            value: function gather(pids) {
                var out = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : new Float64Array(pids.length);
                for(var i = 0; i < pids.length; i++){
                    var s = map_bin_class_private_field_get(this, map_bin_pidToSlot)[pids[i]];
                    out[i] = s < 0 ? NaN : map_bin_class_private_field_get(this, map_bin_vals)[s];
                }
                return out;
            }
        }
    ]);
    return M2BINI;
}();
function src_map_bin_open(pid) {
    var p = map_bin_class_private_field_get(this, map_bin_pidToSlot);
    if (pid >= p.length) {
        map_bin_class_private_method_get(this, map_bin_grow, src_map_bin_grow).call(this, pid);
        p = map_bin_class_private_field_get(this, map_bin_pidToSlot);
    }
    var i = p[pid];
    if (i < 0) {
        if (map_bin_class_private_field_get(this, map_bin_size) === p.length) {
            map_bin_class_private_method_get(this, map_bin_grow, src_map_bin_grow).call(this, map_bin_class_private_field_get(this, map_bin_size));
            p = map_bin_class_private_field_get(this, map_bin_pidToSlot);
        }
        i = map_bin_class_private_field_update(this, map_bin_size).value++;
        p[pid] = i;
        map_bin_class_private_field_get(this, map_bin_slotToPid)[i] = pid;
    }
    return i;
}
function src_map_bin_grow(need) {
    var cap = map_bin_class_private_field_get(this, map_bin_pidToSlot).length;
    while(cap <= need)cap *= 2;
    var p2s = new Int32Array(cap).fill(-1);
    p2s.set(map_bin_class_private_field_get(this, map_bin_pidToSlot));
    map_bin_class_private_field_set(this, map_bin_pidToSlot, p2s);
    var s2p = new Int32Array(cap).fill(-1);
    s2p.set(map_bin_class_private_field_get(this, map_bin_slotToPid));
    map_bin_class_private_field_set(this, map_bin_slotToPid, s2p);
    var v = new Float64Array(cap);
    v.set(map_bin_class_private_field_get(this, map_bin_vals));
    map_bin_class_private_field_set(this, map_bin_vals, v);
}
Object.setPrototypeOf(map_bin_M2BINI.prototype, Map.prototype);
globalThis.M2BIN = map_bin_M2BINI;

function boolean_byte_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function boolean_byte_class_call_check(instance, Constructor) {
    if (!boolean_byte_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function boolean_byte_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function boolean_byte_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) boolean_byte_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) boolean_byte_defineProperties(Constructor, staticProps);
    return Constructor;
}
function boolean_byte_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
/*  ==========================================================================================================================
    SITH - PURE BINARY BYTE_BOOL
    Replaces boolean properties and boolean maps with a zero-allocation, PID-indexed Uint8Array lane.
    ================================================================================================================    ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [BYTE_BOOL] */ var boolean_byte_B2BI = /*#__PURE__*/ function() {
    "use strict";
    function B2BI() {
        var maxParticles = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 8192;
        boolean_byte_class_call_check(this, B2BI);
        boolean_byte_define_property(this, "flags", void 0);
        this.flags = new Uint8Array(maxParticles);
    }
    boolean_byte_create_class(B2BI, [
        {
            key: "set",
            value: function set(pid, value) {
                this.flags[pid] = value ? 1 : 0;
            }
        },
        {
            key: "true",
            value: function _true(pid, value) {
                this.flags[pid] = 1;
            }
        },
        {
            key: "false",
            value: function _false(pid, value) {
                this.flags[pid] = 0;
            }
        },
        {
            key: "get",
            value: /** Get the boolean state for a PID. O(1) time complexity. */ function get(pid) {
                return this.flags[pid] === 1;
            }
        },
        {
            key: "toggle",
            value: /** Toggle the boolean state for a PID. O(1) time complexity. */ function toggle(pid) {
                this.flags[pid] = this.flags[pid] === 1 ? 0 : 1;
                return this.flags[pid] === 1;
            } /** Clear all flags instantly without reallocating memory. */ 
        },
        {
            key: "clear",
            value: function clear() {
                this.flags.fill(0);
            }
        }
    ]);
    return B2BI;
}();
globalThis.B2B = boolean_byte_B2BI;

function map_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function map_array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function map_array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function map_array_without_holes(arr) {
    if (Array.isArray(arr)) return map_array_like_to_array(arr);
}
function _assert_this_initialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function _call_super(_this, derived, args) {
    derived = _get_prototype_of(derived);
    return _possible_constructor_return(_this, map_is_native_reflect_construct() ? Reflect.construct(derived, args || [], _get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function map_check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function map_class_apply_descriptor_get(receiver, descriptor) {
    if (descriptor.get) return descriptor.get.call(receiver);
    return descriptor.value;
}
function map_class_apply_descriptor_set(receiver, descriptor, value) {
    if (descriptor.set) descriptor.set.call(receiver, value);
    else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
function map_class_apply_descriptor_update(receiver, descriptor) {
    if (descriptor.set) {
        if (!descriptor.get) throw new TypeError("attempted to read set only private field");
        if (!("__destrWrapper" in descriptor)) {
            descriptor.__destrWrapper = {
                set value (v){
                    descriptor.set.call(receiver, v);
                },
                get value () {
                    return descriptor.get.call(receiver);
                }
            };
        }
        return descriptor.__destrWrapper;
    } else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        return descriptor;
    }
}
function map_class_call_check(instance, Constructor) {
    if (!map_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function map_class_extract_field_descriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
    return privateMap.get(receiver);
}
function map_class_private_field_get(receiver, privateMap) {
    var descriptor = map_class_extract_field_descriptor(receiver, privateMap, "get");
    return map_class_apply_descriptor_get(receiver, descriptor);
}
function map_class_private_field_init(obj, privateMap, value) {
    map_check_private_redeclaration(obj, privateMap);
    privateMap.set(obj, value);
}
function map_class_private_field_set(receiver, privateMap, value) {
    var descriptor = map_class_extract_field_descriptor(receiver, privateMap, "set");
    map_class_apply_descriptor_set(receiver, descriptor, value);
    return value;
}
function map_class_private_field_update(receiver, privateMap) {
    var descriptor = map_class_extract_field_descriptor(receiver, privateMap, "update");
    return map_class_apply_descriptor_update(receiver, descriptor);
}
function map_class_private_method_get(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}
function map_class_private_method_init(obj, privateSet) {
    map_check_private_redeclaration(obj, privateSet);
    privateSet.add(obj);
}
function _construct(Parent, args, Class) {
    if (map_is_native_reflect_construct()) _construct = Reflect.construct;
    else {
        _construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
}
function map_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function map_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) map_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) map_defineProperties(Constructor, staticProps);
    return Constructor;
}
function map_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) _get = Reflect.get;
    else {
        _get = function get(target, property, receiver) {
            var base = _super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) return desc.get.call(receiver || target);
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _instanceof1(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function _is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function map_is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (map_is_native_reflect_construct = function _is_native_reflect_construct() {
        return !!result;
    })();
}
function map_iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function map_iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function map_non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function map_non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            map_define_property(target, key, source[key]);
        });
    }
    return target;
}
function map_ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    else {
        map_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) return call;
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function map_sliced_to_array(arr, i) {
    return map_array_with_holes(arr) || map_iterable_to_array_limit(arr, i) || map_unsupported_iterable_to_array(arr, i) || map_non_iterable_rest();
}
function _super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _get_prototype_of(object);
        if (object === null) break;
    }
    return object;
}
function map_to_consumable_array(arr) {
    return map_array_without_holes(arr) || map_iterable_to_array(arr) || map_unsupported_iterable_to_array(arr) || map_non_iterable_spread();
}
function map_ts_generator(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype), d = Object.defineProperty;
    return d(g, "next", {
        value: verb(0)
    }), d(g, "throw", {
        value: verb(1)
    }), d(g, "return", {
        value: verb(2)
    }), typeof Symbol === "function" && d(g, Symbol.iterator, {
        value: function value() {
            return this;
        }
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function map_unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return map_array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return map_array_like_to_array(o, minLen);
}
function map_wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    map_wrap_native_super = function _wrap_native_super(Class) {
        if (Class === null || !_is_native_function(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return _construct(Class, arguments, _get_prototype_of(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _set_prototype_of(Wrapper, Class);
    };
    return map_wrap_native_super(Class);
}
var map_rv = function rv(v) {
    return typeof v === "function" ? v() : v;
};
var map_sameValue = function sameValue(a, b) {
    return Object.is(a, b) || _instanceof1(a, Date) && _instanceof1(b, Date) && +a === +b;
};
var _subs = /*#__PURE__*/ new WeakMap(), _hist = /*#__PURE__*/ new WeakMap(), _histLimit = /*#__PURE__*/ new WeakMap(), _strict = /*#__PURE__*/ new WeakMap(), _iterating = /*#__PURE__*/ new WeakMap(), _batching = /*#__PURE__*/ new WeakMap(), _pending = /*#__PURE__*/ new WeakMap(), _derived = /*#__PURE__*/ new WeakMap(), _dependents = /*#__PURE__*/ new WeakMap(), _emit = /*#__PURE__*/ new WeakSet(), _record = /*#__PURE__*/ new WeakSet(), _invalidate = /*#__PURE__*/ new WeakSet(), _computeDerived = /*#__PURE__*/ new WeakSet(), _assertNotIterating = /*#__PURE__*/ new WeakSet();
var map_M2I = /*#__PURE__*/ function(Map1) {
    "use strict";
    _inherits(M2I, Map1);
    function M2I() {
        map_class_call_check(this, M2I);
        var _this;
        _this = _call_super(this, M2I, arguments), map_class_private_method_init(_this, _emit), map_class_private_method_init(_this, _record), map_class_private_method_init(_this, _invalidate), map_class_private_method_init(_this, _computeDerived), map_class_private_method_init(_this, _assertNotIterating), // public h = this.has;
        // public d = this.delete;
        // public c = this.clear
        map_define_property(_this, "f", _this.forEach) //                                                     [FOR EACH]
        , map_class_private_field_init(_this, _subs, {
            writable: true,
            value: void 0
        }), map_class_private_field_init(_this, _hist, {
            writable: true,
            value: void 0
        }), map_class_private_field_init(_this, _histLimit, {
            writable: true,
            value: 0
        }), map_class_private_field_init(_this, _strict, {
            writable: true,
            value: false
        }), map_class_private_field_init(_this, _iterating, {
            writable: true,
            value: 0
        }), map_class_private_field_init(_this, _batching, {
            writable: true,
            value: 0
        }), map_class_private_field_init(_this, _pending, {
            writable: true,
            value: void 0
        }), map_class_private_field_init(_this, _derived, {
            writable: true,
            value: void 0
        }), map_class_private_field_init(_this, _dependents, {
            writable: true,
            value: void 0
        });
        return _this;
    }
    map_create_class(M2I, [
        {
            key: Symbol.iterator,
            value: function value() {
                return this.entries();
            }
        },
        {
            key: "on",
            value: function on(fn) {
                var _this = this;
                var _$_class_private_field_get;
                map_class_private_field_set(this, _subs, (_$_class_private_field_get = map_class_private_field_get(this, _subs)) !== null && _$_class_private_field_get !== void 0 ? _$_class_private_field_get : new Set()).add(fn);
                return function() {
                    return _this.off(fn);
                };
            }
        },
        {
            key: "off",
            value: function off(fn) {
                var _$_class_private_field_get;
                (_$_class_private_field_get = map_class_private_field_get(this, _subs)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.delete(fn);
            }
        },
        {
            key: "batch",
            value: function batch(fn) {
                var _$_class_private_field_get;
                map_class_private_field_update(this, _batching).value++;
                map_class_private_field_set(this, _pending, (_$_class_private_field_get = map_class_private_field_get(this, _pending)) !== null && _$_class_private_field_get !== void 0 ? _$_class_private_field_get : new M2I());
                try {
                    fn();
                } finally{
                    map_class_private_field_update(this, _batching).value--;
                    if (map_class_private_field_get(this, _batching) === 0) {
                        var events = map_to_consumable_array(map_class_private_field_get(this, _pending).values());
                        map_class_private_field_set(this, _pending, undefined);
                        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                        try {
                            var _this, _loop = function _loop() {
                                var e = _step.value;
                                var _$_class_private_field_get;
                                map_class_private_method_get(_this, _record, record).call(_this, e);
                                (_$_class_private_field_get = map_class_private_field_get(_this, _subs)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.forEach(function(sub) {
                                    return sub(e);
                                });
                            };
                            for(var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_this = this, _loop();
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "s",
            value: function s(v, k) {
                map_class_private_method_get(this, _assertNotIterating, assertNotIterating).call(this, "s");
                var next = map_rv(v);
                var has = this.h(k);
                var prev = has ? this.g(k) : undefined;
                _get(_get_prototype_of(M2I.prototype), "set", this).call(this, k, next);
                map_class_private_method_get(this, _invalidate, invalidate).call(this, k);
                map_class_private_method_get(this, _emit, emit).call(this, {
                    op: "set",
                    k: k,
                    v: next,
                    prev: prev,
                    has: has
                });
                return this;
            }
        },
        {
            key: "mutate",
            value: function mutate(k, fn) {
                map_class_private_method_get(this, _assertNotIterating, assertNotIterating).call(this, "mutate");
                if (!this.h(k)) return undefined;
                var old = this.g(k);
                var next = fn(old, true);
                this.s(next, k);
                return next;
            }
        },
        {
            key: "d",
            value: function d(k) {
                map_class_private_method_get(this, _assertNotIterating, assertNotIterating).call(this, "delete");
                if (!this.h(k)) return false;
                var prev = this.g(k);
                var out = _get(_get_prototype_of(M2I.prototype), "delete", this).call(this, k);
                map_class_private_method_get(this, _invalidate, invalidate).call(this, k);
                map_class_private_method_get(this, _emit, emit).call(this, {
                    op: "del",
                    k: k,
                    prev: prev,
                    has: false
                });
                return out;
            }
        },
        {
            key: "c",
            value: function c() {
                map_class_private_method_get(this, _assertNotIterating, assertNotIterating).call(this, "clear");
                var entries = map_to_consumable_array(this.entries());
                _get(_get_prototype_of(M2I.prototype), "clear", this).call(this);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], prev = _step_value[1];
                        map_class_private_method_get(this, _invalidate, invalidate).call(this, k);
                        map_class_private_method_get(this, _emit, emit).call(this, {
                            op: "del",
                            k: k,
                            prev: prev,
                            has: false
                        });
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            key: "dv",
            value: function dv(k, deps, fn) {
                var _$_class_private_field_get;
                map_class_private_field_set(this, _derived, (_$_class_private_field_get = map_class_private_field_get(this, _derived)) !== null && _$_class_private_field_get !== void 0 ? _$_class_private_field_get : new M2I()).set(k, {
                    deps: deps,
                    fn: fn,
                    dirty: true,
                    has: false
                });
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = deps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var dep = _step.value;
                        var _$_class_private_field_get1;
                        map_class_private_field_set(this, _dependents, (_$_class_private_field_get1 = map_class_private_field_get(this, _dependents)) !== null && _$_class_private_field_get1 !== void 0 ? _$_class_private_field_get1 : new M2I()).getOrM(function() {
                            return new Set();
                        }, dep).add(k);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "dirty",
            value: function dirty() {
                for(var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++){
                    keys[_key] = arguments[_key];
                }
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var k = _step.value;
                        var _$_class_private_field_get;
                        var d = (_$_class_private_field_get = map_class_private_field_get(this, _derived)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.get(k);
                        if (d && !d.dirty) {
                            d.dirty = true;
                            map_class_private_method_get(this, _emit, emit).call(this, {
                                op: "dirty",
                                k: k,
                                has: d.has
                            });
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "g",
            value: function g(k) {
                var _$_class_private_field_get;
                var d = (_$_class_private_field_get = map_class_private_field_get(this, _derived)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.get(k);
                if (d) {
                    if (d.dirty || !d.has) return map_class_private_method_get(this, _computeDerived, computeDerived).call(this, k, d);
                    return d.value;
                }
                return _get(_get_prototype_of(M2I.prototype), "get", this).call(this, k);
            }
        },
        {
            key: "h",
            value: function h(k) {
                var _$_class_private_field_get;
                var d = (_$_class_private_field_get = map_class_private_field_get(this, _derived)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.get(k);
                if (d) {
                    if (d.dirty || !d.has) map_class_private_method_get(this, _computeDerived, computeDerived).call(this, k, d);
                    return true;
                }
                return _get(_get_prototype_of(M2I.prototype), "has", this).call(this, k);
            }
        },
        {
            key: "$debug",
            value: function $debug() {
                var limit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 256;
                var _$_class_private_field_get;
                map_class_private_field_set(this, _hist, (_$_class_private_field_get = map_class_private_field_get(this, _hist)) !== null && _$_class_private_field_get !== void 0 ? _$_class_private_field_get : []);
                map_class_private_field_set(this, _histLimit, limit);
                return this;
            }
        },
        {
            key: "$strict",
            value: function $strict() {
                map_class_private_field_set(this, _strict, true);
                return this;
            }
        },
        {
            key: "$history",
            value: function $history() {
                return map_class_private_field_get(this, _hist) ? map_to_consumable_array(map_class_private_field_get(this, _hist)) : [];
            }
        },
        {
            key: "$why",
            value: function $why(k) {
                if (!map_class_private_field_get(this, _hist)) return undefined;
                for(var i = map_class_private_field_get(this, _hist).length - 1; i >= 0; i--){
                    if (Object.is(map_class_private_field_get(this, _hist)[i].k, k)) return map_class_private_field_get(this, _hist)[i];
                }
                return undefined;
            }
        },
        {
            key: "$diff",
            value: function $diff(other) {
                var add = [];
                var del = [];
                var chg = [];
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        if (!other.has(k)) {
                            add.push([
                                k,
                                v
                            ]);
                        } else if (!Object.is(other.get(k), v)) {
                            chg.push([
                                k,
                                v,
                                other.get(k)
                            ]);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                try {
                    for(var _iterator1 = other.keys()[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                        var k1 = _step1.value;
                        if (!this.has(k1)) del.push(k1);
                    }
                } catch (err) {
                    _didIteratorError1 = true;
                    _iteratorError1 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                            _iterator1.return();
                        }
                    } finally{
                        if (_didIteratorError1) {
                            throw _iteratorError1;
                        }
                    }
                }
                return {
                    add: add,
                    del: del,
                    chg: chg
                };
            }
        },
        {
            key: "entries",
            value: function entries() {
                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry, err;
                return map_ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            map_class_private_field_update(this, _iterating).value++;
                            _state.label = 1;
                        case 1:
                            _state.trys.push([
                                1,
                                ,
                                10,
                                11
                            ]);
                            _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            _state.label = 2;
                        case 2:
                            _state.trys.push([
                                2,
                                7,
                                8,
                                9
                            ]);
                            _iterator = _get(_get_prototype_of(M2I.prototype), "entries", this).call(this)[Symbol.iterator]();
                            _state.label = 3;
                        case 3:
                            if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                                3,
                                6
                            ];
                            entry = _step.value;
                            return [
                                4,
                                entry
                            ];
                        case 4:
                            _state.sent();
                            _state.label = 5;
                        case 5:
                            _iteratorNormalCompletion = true;
                            return [
                                3,
                                3
                            ];
                        case 6:
                            return [
                                3,
                                9
                            ];
                        case 7:
                            err = _state.sent();
                            _didIteratorError = true;
                            _iteratorError = err;
                            return [
                                3,
                                9
                            ];
                        case 8:
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                            return [
                                7
                            ];
                        case 9:
                            return [
                                3,
                                11
                            ];
                        case 10:
                            map_class_private_field_update(this, _iterating).value--;
                            return [
                                7
                            ];
                        case 11:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: "keys",
            value: function keys() {
                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, k, err;
                return map_ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            map_class_private_field_update(this, _iterating).value++;
                            _state.label = 1;
                        case 1:
                            _state.trys.push([
                                1,
                                ,
                                10,
                                11
                            ]);
                            _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            _state.label = 2;
                        case 2:
                            _state.trys.push([
                                2,
                                7,
                                8,
                                9
                            ]);
                            _iterator = _get(_get_prototype_of(M2I.prototype), "keys", this).call(this)[Symbol.iterator]();
                            _state.label = 3;
                        case 3:
                            if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                                3,
                                6
                            ];
                            k = _step.value;
                            return [
                                4,
                                k
                            ];
                        case 4:
                            _state.sent();
                            _state.label = 5;
                        case 5:
                            _iteratorNormalCompletion = true;
                            return [
                                3,
                                3
                            ];
                        case 6:
                            return [
                                3,
                                9
                            ];
                        case 7:
                            err = _state.sent();
                            _didIteratorError = true;
                            _iteratorError = err;
                            return [
                                3,
                                9
                            ];
                        case 8:
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                            return [
                                7
                            ];
                        case 9:
                            return [
                                3,
                                11
                            ];
                        case 10:
                            map_class_private_field_update(this, _iterating).value--;
                            return [
                                7
                            ];
                        case 11:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: "values",
            value: function values() {
                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, v, err;
                return map_ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            map_class_private_field_update(this, _iterating).value++;
                            _state.label = 1;
                        case 1:
                            _state.trys.push([
                                1,
                                ,
                                10,
                                11
                            ]);
                            _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            _state.label = 2;
                        case 2:
                            _state.trys.push([
                                2,
                                7,
                                8,
                                9
                            ]);
                            _iterator = _get(_get_prototype_of(M2I.prototype), "values", this).call(this)[Symbol.iterator]();
                            _state.label = 3;
                        case 3:
                            if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                                3,
                                6
                            ];
                            v = _step.value;
                            return [
                                4,
                                v
                            ];
                        case 4:
                            _state.sent();
                            _state.label = 5;
                        case 5:
                            _iteratorNormalCompletion = true;
                            return [
                                3,
                                3
                            ];
                        case 6:
                            return [
                                3,
                                9
                            ];
                        case 7:
                            err = _state.sent();
                            _didIteratorError = true;
                            _iteratorError = err;
                            return [
                                3,
                                9
                            ];
                        case 8:
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                            return [
                                7
                            ];
                        case 9:
                            return [
                                3,
                                11
                            ];
                        case 10:
                            map_class_private_field_update(this, _iterating).value--;
                            return [
                                7
                            ];
                        case 11:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: "swap",
            value: function swap(value, key) {
                var next = map_rv(value);
                var previous = this.has(key) ? this.get(key) : next;
                this.s(next, key);
                return previous;
            }
        },
        {
            key: "take",
            value: function take(k) {
                var value = this.g(k);
                this.d(k);
                return value;
            }
        },
        {
            key: "peek",
            value: function peek(k) {
                return this.h(k) ? this.g(k) : false;
            }
        },
        {
            key: "getOrI",
            value: function getOrI(value, k) {
                if (this.h(k)) return this.g(k);
                var next = map_rv(value);
                this.s(next, k);
                return next;
            }
        },
        {
            key: "getOrM",
            value: function getOrM(make, k) {
                if (this.h(k)) return this.g(k);
                var value = make();
                this.s(value, k);
                return value;
            }
        },
        {
            key: "update",
            value: function update(k, fn, initial) {
                var has = this.h(k);
                var old = has ? this.g(k) : initial === undefined ? undefined : map_rv(initial);
                var next = map_rv(fn(old, has));
                this.s(next, k);
                return next;
            }
        },
        {
            key: "setIfAbsent",
            value: function setIfAbsent(value, k) {
                if (this.h(k)) return false;
                var next = map_rv(value);
                this.s(next, k);
                return true;
            }
        },
        {
            key: "setIfPresent",
            value: function setIfPresent(value, k) {
                if (!this.h(k)) return false;
                var next = map_rv(value);
                this.s(next, k);
                return true;
            }
        },
        {
            key: "replace",
            value: function replace(value, k) {
                var next = map_rv(value);
                return this.setIfPresent(next, k);
            }
        },
        {
            key: "inc",
            value: function inc(key) {
                var by = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
                return this.update(key, function(old) {
                    return (old !== null && old !== void 0 ? old : 0) + by;
                }, 0);
            }
        },
        {
            key: "touch",
            value: function touch(k) {
                return this.setIfAbsent(undefined, k);
            }
        },
        {
            key: "mapValues",
            value: function mapValues(fn) {
                var out = new M2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        out.s(fn(v, k), k);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "mapKeys",
            value: function mapKeys(fn) {
                var out = new M2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        out.s(v, fn(v, k));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "filterKV",
            value: function filterKV(pred) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        if (!pred(v, k)) this.d(k);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "filterKeys",
            value: function filterKeys(pred) {
                return this.filterKV(pred);
            }
        },
        {
            key: "partition",
            value: function partition(pred) {
                var yes = new M2I();
                var no = new M2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        (pred(v, k) ? yes : no).s(v, k);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return [
                    yes,
                    no
                ];
            }
        },
        {
            key: "find",
            value: function find(pred) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        if (pred(v, k)) return [
                            k,
                            v
                        ];
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return undefined;
            }
        },
        {
            key: "findKey",
            value: function findKey(pred) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        if (pred(v, k)) return k;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return undefined;
            }
        },
        {
            key: "findValue",
            value: function findValue(pred) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        if (pred(v, k)) return v;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return undefined;
            }
        },
        {
            key: "some",
            value: function some(pred) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        if (pred(v, k)) return true;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return false;
            }
        },
        {
            key: "every",
            value: function every(pred) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        if (!pred(v, k)) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return true;
            }
        },
        {
            key: "reduce",
            value: function reduce(fn, initial) {
                var acc = initial;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        acc = fn(acc, v, k);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return acc;
            }
        },
        {
            key: "forEachKV",
            value: function forEachKV(fn) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        fn(v, k, this);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            key: "invert",
            value: function invert() {
                var out = new M2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        out.s(k, v);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "unique",
            value: function unique(fn) {
                var out = new M2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        var key = fn ? fn(v, k) : v;
                        if (!out.h(key)) out.s(v, key);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "pick",
            value: function pick(keys) {
                var out = new M2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var k = _step.value;
                        if (this.h(k)) out.s(this.g(k), k);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "omit",
            value: function omit(keys) {
                var omitted = new Set(keys);
                var out = new M2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        if (!omitted.has(k)) out.s(v, k);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "merge",
            value: function merge(other) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = other[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        var n = map_rv(v);
                        this.s(n, k);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "clearAndSet",
            value: function clearAndSet(entries) {
                var _this = this;
                return this.batch(function() {
                    _this.clear();
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                            var n = map_rv(v);
                            _this.s(n, k);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                });
            }
        },
        {
            key: "toObject",
            value: function toObject() {
                var out = {};
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        out[k] = v;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "toValues",
            value: function toValues() {
                return A2.from(this.values());
            } //                 [TOVALUES]
        },
        {
            key: "toKeys",
            value: function toKeys() {
                return A2.from(this.keys());
            } //                       [TOKEYS]
        },
        {
            key: "toArray",
            value: function toArray() {
                return A2.from(this.entries());
            } //             [TOARRAY]
        },
        {
            key: "group",
            value: function group(fn) {
                var out = new M2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        out.getOrM(function() {
                            return new A2();
                        }, fn(v, k)).push(v);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "clone",
            value: function clone() {
                return new M2I(this);
            }
        },
        {
            key: "equals",
            value: function equals(other) {
                if (other === this) return true;
                if (this.size !== other.size) return false;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_sliced_to_array(_step.value, 2), k = _step_value[0], v = _step_value[1];
                        if (!other.has(k) || !map_sameValue(other.get(k), v)) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return true;
            }
        }
    ], [
        {
            key: "fromObject",
            value: function fromObject(obj) {
                return new M2I(Object.entries(obj));
            }
        },
        {
            key: "fromEntries",
            value: function fromEntries(entries) {
                return new M2I(entries);
            }
        },
        {
            key: "from",
            value: function from(map) {
                return new M2I(map);
            }
        }
    ]);
    return M2I;
}(map_wrap_native_super(Map));
function emit(e) {
    var _$_class_private_field_get;
    if (map_class_private_field_get(this, _batching) > 0) {
        // coalesce: last write per key wins, keep prev from first event
        var pending = map_class_private_field_get(this, _pending).get(e.k);
        map_class_private_field_get(this, _pending).set(e.k, pending ? _object_spread_props(_object_spread({}, e), {
            prev: pending.prev,
            batch: true
        }) : _object_spread_props(_object_spread({}, e), {
            batch: true
        }));
        return;
    }
    map_class_private_method_get(this, _record, record).call(this, e);
    (_$_class_private_field_get = map_class_private_field_get(this, _subs)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.forEach(function(sub) {
        try {
            sub(e);
        } catch (err) {
            process.emitWarning(err);
        }
    });
}
function record(e) {
    if (!map_class_private_field_get(this, _hist)) return;
    map_class_private_field_get(this, _hist).push(e);
    if (map_class_private_field_get(this, _hist).length > map_class_private_field_get(this, _histLimit)) {
        map_class_private_field_get(this, _hist).splice(0, map_class_private_field_get(this, _hist).length - map_class_private_field_get(this, _histLimit));
    }
}
function invalidate(k) {
    var _$_class_private_field_get;
    var deps = (_$_class_private_field_get = map_class_private_field_get(this, _dependents)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.get(k);
    if (!deps) return;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = deps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var dk = _step.value;
            var _$_class_private_field_get1;
            var d = (_$_class_private_field_get1 = map_class_private_field_get(this, _derived)) === null || _$_class_private_field_get1 === void 0 ? void 0 : _$_class_private_field_get1.get(dk);
            if (!d || d.dirty) continue;
            d.dirty = true;
            map_class_private_method_get(this, _emit, emit).call(this, {
                op: "dirty",
                k: dk,
                has: d.has
            });
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
function computeDerived(k, d) {
    var _this = this;
    var _d;
    var vals = d.deps.map(function(dep) {
        return _this.g(dep);
    });
    var next = (_d = d).fn.apply(_d, map_to_consumable_array(vals));
    var had = d.has;
    var prev = d.value;
    d.value = next;
    d.has = true;
    d.dirty = false;
    if (!had || !map_sameValue(prev, next)) {
        map_class_private_method_get(this, _emit, emit).call(this, {
            op: had ? "upd" : "set",
            k: k,
            v: next,
            prev: prev,
            has: true
        });
    }
    return next;
}
function assertNotIterating(op) {
    if (map_class_private_field_get(this, _strict) && map_class_private_field_get(this, _iterating) > 0) {
        throw new Error("M2.".concat(op, "() during iteration. Use filterKV(), collect keys first, or disable $strict()."));
    }
}
globalThis.M2 = map_M2I; /*  ====================================================================================================
    
    ============================================================= ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [STORE] */ 

function map_byte_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function map_byte_array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function map_byte_array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function map_byte_array_without_holes(arr) {
    if (Array.isArray(arr)) return map_byte_array_like_to_array(arr);
}
function map_byte_check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function map_byte_class_apply_descriptor_get(receiver, descriptor) {
    if (descriptor.get) return descriptor.get.call(receiver);
    return descriptor.value;
}
function map_byte_class_apply_descriptor_set(receiver, descriptor, value) {
    if (descriptor.set) descriptor.set.call(receiver, value);
    else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
function map_byte_class_apply_descriptor_update(receiver, descriptor) {
    if (descriptor.set) {
        if (!descriptor.get) throw new TypeError("attempted to read set only private field");
        if (!("__destrWrapper" in descriptor)) {
            descriptor.__destrWrapper = {
                set value (v){
                    descriptor.set.call(receiver, v);
                },
                get value () {
                    return descriptor.get.call(receiver);
                }
            };
        }
        return descriptor.__destrWrapper;
    } else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        return descriptor;
    }
}
function map_byte_class_call_check(instance, Constructor) {
    if (!map_byte_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function map_byte_class_extract_field_descriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
    return privateMap.get(receiver);
}
function map_byte_class_private_field_get(receiver, privateMap) {
    var descriptor = map_byte_class_extract_field_descriptor(receiver, privateMap, "get");
    return map_byte_class_apply_descriptor_get(receiver, descriptor);
}
function map_byte_class_private_field_init(obj, privateMap, value) {
    map_byte_check_private_redeclaration(obj, privateMap);
    privateMap.set(obj, value);
}
function map_byte_class_private_field_set(receiver, privateMap, value) {
    var descriptor = map_byte_class_extract_field_descriptor(receiver, privateMap, "set");
    map_byte_class_apply_descriptor_set(receiver, descriptor, value);
    return value;
}
function map_byte_class_private_field_update(receiver, privateMap) {
    var descriptor = map_byte_class_extract_field_descriptor(receiver, privateMap, "update");
    return map_byte_class_apply_descriptor_update(receiver, descriptor);
}
function map_byte_class_private_method_get(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}
function map_byte_class_private_method_init(obj, privateSet) {
    map_byte_check_private_redeclaration(obj, privateSet);
    privateSet.add(obj);
}
function map_byte_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function map_byte_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) map_byte_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) map_byte_defineProperties(Constructor, staticProps);
    return Constructor;
}
function map_byte_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function map_byte_instanceof1(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function map_byte_iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function map_byte_iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function map_byte_non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function map_byte_non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function map_byte_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            map_byte_define_property(target, key, source[key]);
        });
    }
    return target;
}
function map_byte_ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function map_byte_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    else {
        map_byte_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function map_byte_sliced_to_array(arr, i) {
    return map_byte_array_with_holes(arr) || map_byte_iterable_to_array_limit(arr, i) || map_byte_unsupported_iterable_to_array(arr, i) || map_byte_non_iterable_rest();
}
function map_byte_to_consumable_array(arr) {
    return map_byte_array_without_holes(arr) || map_byte_iterable_to_array(arr) || map_byte_unsupported_iterable_to_array(arr) || map_byte_non_iterable_spread();
}
function map_byte_ts_generator(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype), d = Object.defineProperty;
    return d(g, "next", {
        value: verb(0)
    }), d(g, "throw", {
        value: verb(1)
    }), d(g, "return", {
        value: verb(2)
    }), typeof Symbol === "function" && d(g, Symbol.iterator, {
        value: function value() {
            return this;
        }
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function map_byte_unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return map_byte_array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return map_byte_array_like_to_array(o, minLen);
}
var map_byte_sameValue128 = function sameValue128(a, b) {
    if (a === b) return true;
    if (map_byte_instanceof1(a, Float64Array) && map_byte_instanceof1(b, Float64Array)) {
        if (a.length !== b.length) return false;
        for(var i = 0; i < a.length; i++)if (!Object.is(a[i], b[i])) return false;
        return true;
    }
    return Object.is(a, b);
};
var map_byte_size = /*#__PURE__*/ new WeakMap(), map_byte_subs = /*#__PURE__*/ new WeakMap(), map_byte_hist = /*#__PURE__*/ new WeakMap(), map_byte_histLimit = /*#__PURE__*/ new WeakMap(), map_byte_strict = /*#__PURE__*/ new WeakMap(), map_byte_iterating = /*#__PURE__*/ new WeakMap(), map_byte_batching = /*#__PURE__*/ new WeakMap(), map_byte_pending = /*#__PURE__*/ new WeakMap(), map_byte_derived = /*#__PURE__*/ new WeakMap(), map_byte_dependents = /*#__PURE__*/ new WeakMap(), map_byte_emit = /*#__PURE__*/ new WeakSet(), map_byte_record = /*#__PURE__*/ new WeakSet(), map_byte_invalidate = /*#__PURE__*/ new WeakSet(), map_byte_computeDerived = /*#__PURE__*/ new WeakSet(), map_byte_assertNotIterating = /*#__PURE__*/ new WeakSet(), _readSlot = /*#__PURE__*/ new WeakSet(), _writeSlot = /*#__PURE__*/ new WeakSet(), _fresh = /*#__PURE__*/ new WeakSet();
var map_byte_M2BI = /*#__PURE__*/ function() {
    "use strict";
    function M2BI() {
        var maxParticles = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 65536, stride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, seed = arguments.length > 2 ? arguments[2] : void 0;
        map_byte_class_call_check(this, M2BI);
        map_byte_class_private_method_init(this, map_byte_emit);
        map_byte_class_private_method_init(this, map_byte_record);
        map_byte_class_private_method_init(this, map_byte_invalidate);
        map_byte_class_private_method_init(this, map_byte_computeDerived);
        map_byte_class_private_method_init(this, map_byte_assertNotIterating);
        map_byte_class_private_method_init(this, _readSlot);
        map_byte_class_private_method_init(this, _writeSlot);
        map_byte_class_private_method_init(this, _fresh); //                     [sibling-store factory]
        map_byte_define_property(this, "cap", void 0);
        map_byte_define_property(this, "stride", void 0);
        map_byte_define_property(this, "pidToSlot", void 0);
        map_byte_define_property(this, "slotToPid", void 0);
        map_byte_define_property(this, "vals", void 0);
        map_byte_class_private_field_init(this, map_byte_size, {
            writable: true,
            value: 0
        });
        map_byte_class_private_field_init(this, map_byte_subs, {
            writable: true,
            value: void 0
        });
        map_byte_class_private_field_init(this, map_byte_hist, {
            writable: true,
            value: void 0
        });
        map_byte_class_private_field_init(this, map_byte_histLimit, {
            writable: true,
            value: 0
        });
        map_byte_class_private_field_init(this, map_byte_strict, {
            writable: true,
            value: false
        });
        map_byte_class_private_field_init(this, map_byte_iterating, {
            writable: true,
            value: 0
        });
        map_byte_class_private_field_init(this, map_byte_batching, {
            writable: true,
            value: 0
        });
        map_byte_class_private_field_init(this, map_byte_pending, {
            writable: true,
            value: void 0
        });
        map_byte_class_private_field_init(this, map_byte_derived, {
            writable: true,
            value: void 0
        });
        map_byte_class_private_field_init(this, map_byte_dependents, {
            writable: true,
            value: void 0
        });
        // ---------------------------------------------------------------- alias / has/has-not helpers
        map_byte_define_property(this, "has", this.h); //                                                                             [has alias]
        map_byte_define_property(this, "get", this.g); //                                                                             [get alias]
        map_byte_define_property(this, "delete", this.d); //                                                                        [delete alias]
        map_byte_define_property(this, "clear", this.c); //                                                                           [clear alias]
        map_byte_define_property(this, "f", this.forEach.bind(this)); //                                                            [FOR EACH]
        this.cap = maxParticles;
        this.stride = stride;
        this.pidToSlot = new Int32Array(maxParticles).fill(-1);
        this.slotToPid = new Int32Array(maxParticles).fill(-1);
        this.vals = new Float64Array(maxParticles * stride);
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        if (seed) try {
            for(var _iterator = seed[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                this.s(v, pid);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    map_byte_create_class(M2BI, [
        {
            key: "size",
            get: function get() {
                return map_byte_class_private_field_get(this, map_byte_size);
            }
        },
        {
            key: "on",
            value: function on(fn) {
                var _this = this;
                var _$_class_private_field_get;
                map_byte_class_private_field_set(this, map_byte_subs, (_$_class_private_field_get = map_byte_class_private_field_get(this, map_byte_subs)) !== null && _$_class_private_field_get !== void 0 ? _$_class_private_field_get : new Set()).add(fn);
                return function() {
                    return _this.off(fn);
                };
            } //      [ON]
        },
        {
            key: "off",
            value: function off(fn) {
                var _$_class_private_field_get;
                (_$_class_private_field_get = map_byte_class_private_field_get(this, map_byte_subs)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.delete(fn);
            } //                                                  [OFF]
        },
        {
            key: "batch",
            value: function batch(fn) {
                var _$_class_private_field_get;
                map_byte_class_private_field_update(this, map_byte_batching).value++;
                map_byte_class_private_field_set(this, map_byte_pending, (_$_class_private_field_get = map_byte_class_private_field_get(this, map_byte_pending)) !== null && _$_class_private_field_get !== void 0 ? _$_class_private_field_get : new Map());
                try {
                    fn();
                } finally{
                    map_byte_class_private_field_update(this, map_byte_batching).value--;
                    if (map_byte_class_private_field_get(this, map_byte_batching) === 0) {
                        var events = map_byte_to_consumable_array(map_byte_class_private_field_get(this, map_byte_pending).values());
                        map_byte_class_private_field_set(this, map_byte_pending, undefined);
                        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                        try {
                            var _this, _loop = function _loop() {
                                var e = _step.value;
                                var _$_class_private_field_get;
                                map_byte_class_private_method_get(_this, map_byte_record, src_map_byte_record).call(_this, e);
                                (_$_class_private_field_get = map_byte_class_private_field_get(_this, map_byte_subs)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.forEach(function(sub) {
                                    return sub(e);
                                });
                            };
                            for(var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_this = this, _loop();
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "s",
            value: function s(v, pid) {
                map_byte_class_private_method_get(this, map_byte_assertNotIterating, src_map_byte_assertNotIterating).call(this, "s");
                var slot = this.pidToSlot[pid];
                var has = slot !== -1;
                var prev = has ? map_byte_class_private_method_get(this, _readSlot, readSlot).call(this, slot) : undefined;
                if (!has) {
                    slot = map_byte_class_private_field_get(this, map_byte_size);
                    this.pidToSlot[pid] = slot;
                    this.slotToPid[slot] = pid;
                    map_byte_class_private_field_update(this, map_byte_size).value++;
                }
                map_byte_class_private_method_get(this, _writeSlot, writeSlot).call(this, slot, v);
                map_byte_class_private_method_get(this, map_byte_invalidate, src_map_byte_invalidate).call(this, pid);
                map_byte_class_private_method_get(this, map_byte_emit, src_map_byte_emit).call(this, {
                    op: has ? "upd" : "set",
                    pid: pid,
                    v: v,
                    prev: prev,
                    has: has
                });
                return this;
            }
        },
        {
            key: "mutate",
            value: function mutate(pid, fn) {
                map_byte_class_private_method_get(this, map_byte_assertNotIterating, src_map_byte_assertNotIterating).call(this, "mutate");
                if (!this.h(pid)) return undefined;
                var next = fn(this.g(pid), true);
                this.s(next, pid);
                return next;
            }
        },
        {
            key: "d",
            value: function d(pid) {
                map_byte_class_private_method_get(this, map_byte_assertNotIterating, src_map_byte_assertNotIterating).call(this, "delete");
                var slot = this.pidToSlot[pid];
                if (slot === -1) return false;
                var prev = map_byte_class_private_method_get(this, _readSlot, readSlot).call(this, slot);
                var lastSlot = map_byte_class_private_field_get(this, map_byte_size) - 1;
                var lastPid = this.slotToPid[lastSlot];
                if (slot !== lastSlot) {
                    map_byte_class_private_method_get(this, _writeSlot, writeSlot).call(this, slot, map_byte_class_private_method_get(this, _readSlot, readSlot).call(this, lastSlot));
                    this.slotToPid[slot] = lastPid;
                    this.pidToSlot[lastPid] = slot;
                }
                this.pidToSlot[pid] = -1;
                this.slotToPid[lastSlot] = -1;
                map_byte_class_private_field_update(this, map_byte_size).value--;
                map_byte_class_private_method_get(this, map_byte_invalidate, src_map_byte_invalidate).call(this, pid);
                map_byte_class_private_method_get(this, map_byte_emit, src_map_byte_emit).call(this, {
                    op: "del",
                    pid: pid,
                    prev: prev,
                    has: false
                });
                return true;
            }
        },
        {
            key: "c",
            value: function c() {
                map_byte_class_private_method_get(this, map_byte_assertNotIterating, src_map_byte_assertNotIterating).call(this, "clear");
                for(var i = map_byte_class_private_field_get(this, map_byte_size) - 1; i >= 0; i--){
                    var pid = this.slotToPid[i];
                    var prev = map_byte_class_private_method_get(this, _readSlot, readSlot).call(this, i);
                    this.pidToSlot[pid] = -1;
                    this.slotToPid[i] = -1;
                    map_byte_class_private_method_get(this, map_byte_invalidate, src_map_byte_invalidate).call(this, pid);
                    map_byte_class_private_method_get(this, map_byte_emit, src_map_byte_emit).call(this, {
                        op: "del",
                        pid: pid,
                        prev: prev,
                        has: false
                    });
                }
                map_byte_class_private_field_set(this, map_byte_size, 0);
            }
        },
        {
            key: "dv",
            value: function dv(pid, deps, fn) {
                var _$_class_private_field_get;
                map_byte_class_private_field_set(this, map_byte_derived, (_$_class_private_field_get = map_byte_class_private_field_get(this, map_byte_derived)) !== null && _$_class_private_field_get !== void 0 ? _$_class_private_field_get : new Map()).set(pid, {
                    deps: deps,
                    fn: fn,
                    dirty: true,
                    has: false
                });
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = deps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var dep = _step.value;
                        var _$_class_private_field_get1;
                        var set = map_byte_class_private_field_set(this, map_byte_dependents, (_$_class_private_field_get1 = map_byte_class_private_field_get(this, map_byte_dependents)) !== null && _$_class_private_field_get1 !== void 0 ? _$_class_private_field_get1 : new Map());
                        if (!set.has(dep)) set.set(dep, new Set());
                        set.get(dep).add(pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "dirty",
            value: function dirty() {
                for(var _len = arguments.length, pids = new Array(_len), _key = 0; _key < _len; _key++){
                    pids[_key] = arguments[_key];
                }
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = pids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        var _$_class_private_field_get;
                        var d = (_$_class_private_field_get = map_byte_class_private_field_get(this, map_byte_derived)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.get(pid);
                        if (d && !d.dirty) {
                            d.dirty = true;
                            map_byte_class_private_method_get(this, map_byte_emit, src_map_byte_emit).call(this, {
                                op: "dirty",
                                pid: pid,
                                has: d.has
                            });
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "g",
            value: function g(pid) {
                var _$_class_private_field_get;
                var d = (_$_class_private_field_get = map_byte_class_private_field_get(this, map_byte_derived)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.get(pid);
                if (d) return d.dirty || !d.has ? map_byte_class_private_method_get(this, map_byte_computeDerived, src_map_byte_computeDerived).call(this, pid, d) : d.value;
                var slot = this.pidToSlot[pid];
                return slot === -1 ? undefined : map_byte_class_private_method_get(this, _readSlot, readSlot).call(this, slot);
            }
        },
        {
            key: "h",
            value: function h(pid) {
                var _$_class_private_field_get;
                var d = (_$_class_private_field_get = map_byte_class_private_field_get(this, map_byte_derived)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.get(pid);
                if (d) {
                    if (d.dirty || !d.has) map_byte_class_private_method_get(this, map_byte_computeDerived, src_map_byte_computeDerived).call(this, pid, d);
                    return true;
                }
                return this.pidToSlot[pid] !== -1;
            }
        },
        {
            key: "$debug",
            value: function $debug() {
                var limit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 256;
                var _$_class_private_field_get;
                map_byte_class_private_field_set(this, map_byte_hist, (_$_class_private_field_get = map_byte_class_private_field_get(this, map_byte_hist)) !== null && _$_class_private_field_get !== void 0 ? _$_class_private_field_get : []);
                map_byte_class_private_field_set(this, map_byte_histLimit, limit);
                return this;
            } //  [$DEBUG]
        },
        {
            key: "$strict",
            value: function $strict() {
                map_byte_class_private_field_set(this, map_byte_strict, true);
                return this;
            } //                                     [$STRICT]
        },
        {
            key: "$history",
            value: function $history() {
                return map_byte_class_private_field_get(this, map_byte_hist) ? map_byte_to_consumable_array(map_byte_class_private_field_get(this, map_byte_hist)) : [];
            } //                    [$HISTORY]
        },
        {
            key: "$why",
            value: function $why(pid) {
                if (!map_byte_class_private_field_get(this, map_byte_hist)) return undefined;
                for(var i = map_byte_class_private_field_get(this, map_byte_hist).length - 1; i >= 0; i--)if (map_byte_class_private_field_get(this, map_byte_hist)[i].pid === pid) return map_byte_class_private_field_get(this, map_byte_hist)[i];
                return undefined;
            }
        },
        {
            key: "$diff",
            value: function $diff(other) {
                var add = [];
                var del = [];
                var chg = [];
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        if (!other.has(pid)) add.push([
                            pid,
                            v
                        ]);
                        else if (!map_byte_sameValue128(other.get(pid), v)) chg.push([
                            pid,
                            v,
                            other.get(pid)
                        ]);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                try {
                    for(var _iterator1 = other.keys()[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                        var pid1 = _step1.value;
                        if (!this.has(pid1)) del.push(pid1);
                    }
                } catch (err) {
                    _didIteratorError1 = true;
                    _iteratorError1 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                            _iterator1.return();
                        }
                    } finally{
                        if (_didIteratorError1) {
                            throw _iteratorError1;
                        }
                    }
                }
                return {
                    add: add,
                    del: del,
                    chg: chg
                };
            }
        },
        {
            key: "entries",
            value: function entries() {
                var i;
                return map_byte_ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            map_byte_class_private_field_update(this, map_byte_iterating).value++;
                            _state.label = 1;
                        case 1:
                            _state.trys.push([
                                1,
                                ,
                                6,
                                7
                            ]);
                            i = 0;
                            _state.label = 2;
                        case 2:
                            if (!(i < map_byte_class_private_field_get(this, map_byte_size))) return [
                                3,
                                5
                            ];
                            return [
                                4,
                                [
                                    this.slotToPid[i],
                                    map_byte_class_private_method_get(this, _readSlot, readSlot).call(this, i)
                                ]
                            ];
                        case 3:
                            _state.sent();
                            _state.label = 4;
                        case 4:
                            i++;
                            return [
                                3,
                                2
                            ];
                        case 5:
                            return [
                                3,
                                7
                            ];
                        case 6:
                            map_byte_class_private_field_update(this, map_byte_iterating).value--;
                            return [
                                7
                            ];
                        case 7:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: "keys",
            value: function keys() {
                var i;
                return map_byte_ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            map_byte_class_private_field_update(this, map_byte_iterating).value++;
                            _state.label = 1;
                        case 1:
                            _state.trys.push([
                                1,
                                ,
                                6,
                                7
                            ]);
                            i = 0;
                            _state.label = 2;
                        case 2:
                            if (!(i < map_byte_class_private_field_get(this, map_byte_size))) return [
                                3,
                                5
                            ];
                            return [
                                4,
                                this.slotToPid[i]
                            ];
                        case 3:
                            _state.sent();
                            _state.label = 4;
                        case 4:
                            i++;
                            return [
                                3,
                                2
                            ];
                        case 5:
                            return [
                                3,
                                7
                            ];
                        case 6:
                            map_byte_class_private_field_update(this, map_byte_iterating).value--;
                            return [
                                7
                            ];
                        case 7:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: "values",
            value: function values() {
                var i;
                return map_byte_ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            map_byte_class_private_field_update(this, map_byte_iterating).value++;
                            _state.label = 1;
                        case 1:
                            _state.trys.push([
                                1,
                                ,
                                6,
                                7
                            ]);
                            i = 0;
                            _state.label = 2;
                        case 2:
                            if (!(i < map_byte_class_private_field_get(this, map_byte_size))) return [
                                3,
                                5
                            ];
                            return [
                                4,
                                map_byte_class_private_method_get(this, _readSlot, readSlot).call(this, i)
                            ];
                        case 3:
                            _state.sent();
                            _state.label = 4;
                        case 4:
                            i++;
                            return [
                                3,
                                2
                            ];
                        case 5:
                            return [
                                3,
                                7
                            ];
                        case 6:
                            map_byte_class_private_field_update(this, map_byte_iterating).value--;
                            return [
                                7
                            ];
                        case 7:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: Symbol.iterator,
            value: function value() {
                return this.entries();
            }
        },
        {
            key: "forEach",
            value: function forEach(fn) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        fn(v, pid, this);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            key: "swap",
            value: function swap(value, pid) {
                var previous = this.has(pid) ? this.get(pid) : value;
                this.s(value, pid);
                return previous;
            }
        },
        {
            key: "take",
            value: function take(pid) {
                var value = this.g(pid);
                this.d(pid);
                return value;
            } //             [TAKE]
        },
        {
            key: "peek",
            value: function peek(pid) {
                return this.h(pid) ? this.g(pid) : false;
            } //            [PEEK]
        },
        {
            key: "getOrI",
            value: function getOrI(value, pid) {
                if (this.h(pid)) return this.g(pid);
                this.s(value, pid);
                return value;
            }
        },
        {
            key: "getOrM",
            value: function getOrM(make, pid) {
                if (this.h(pid)) return this.g(pid);
                var value = make();
                this.s(value, pid);
                return value;
            }
        },
        {
            key: "update",
            value: function update(pid, fn, initial) {
                var has = this.h(pid);
                var old = has ? this.g(pid) : initial === undefined ? 0 : initial;
                var next = fn(old, has);
                this.s(next, pid);
                return next;
            }
        },
        {
            key: "setIfAbsent",
            value: function setIfAbsent(value, pid) {
                if (this.h(pid)) return false;
                this.s(value, pid);
                return true;
            }
        },
        {
            key: "setIfPresent",
            value: function setIfPresent(value, pid) {
                if (!this.h(pid)) return false;
                this.s(value, pid);
                return true;
            }
        },
        {
            key: "replace",
            value: function replace(value, pid) {
                return this.setIfPresent(value, pid);
            } //                 [REPLACE]
        },
        {
            key: "inc",
            value: function inc(pid) {
                var by = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
                return this.update(pid, function(old) {
                    return (old !== null && old !== void 0 ? old : 0) + by;
                }, 0);
            }
        },
        {
            key: "touch",
            value: function touch(pid) {
                return this.setIfAbsent(0, pid);
            } //                            [SWTOUCHAP]
        },
        {
            key: "mapValues",
            value: function mapValues(fn) {
                var out = map_byte_class_private_method_get(this, _fresh, fresh).call(this);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        out.s(fn(v, pid), pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "mapKeys",
            value: function mapKeys(fn) {
                var out = map_byte_class_private_method_get(this, _fresh, fresh).call(this); // target pids must still fit within cap
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        out.s(v, fn(v, pid));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "filterKV",
            value: function filterKV(pred) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = map_byte_to_consumable_array(this.keys())[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        if (!pred(this.g(pid), pid)) this.d(pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "filterKeys",
            value: function filterKeys(pred) {
                return this.filterKV(pred);
            } //          [FILTERKEYS]
        },
        {
            key: "partition",
            value: function partition(pred) {
                var yes = map_byte_class_private_method_get(this, _fresh, fresh).call(this), no = map_byte_class_private_method_get(this, _fresh, fresh).call(this);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        (pred(v, pid) ? yes : no).s(v, pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return [
                    yes,
                    no
                ];
            }
        },
        {
            key: "find",
            value: function find(pred) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        if (pred(v, pid)) return [
                            pid,
                            v
                        ];
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return undefined;
            }
        },
        {
            key: "findKey",
            value: function findKey(pred) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        if (pred(v, pid)) return pid;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return undefined;
            }
        },
        {
            key: "findValue",
            value: function findValue(pred) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        if (pred(v, pid)) return v;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return undefined;
            }
        },
        {
            key: "some",
            value: function some(pred) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        if (pred(v, pid)) return true;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return false;
            }
        },
        {
            key: "every",
            value: function every(pred) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        if (!pred(v, pid)) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return true;
            }
        },
        {
            key: "reduce",
            value: function reduce(fn, initial) {
                var acc = initial;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        acc = fn(acc, v, pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return acc;
            }
        },
        {
            key: "forEachKV",
            value: function forEachKV(fn) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        fn(v, pid, this);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            } // [FOREACH]
        },
        {
            key: "invert",
            value: function invert() {
                var out = new Map(); // values aren't valid pids/Int32 slots in general -> plain Map, not M2BI
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        out.set(this.stride === 1 ? String(v) : Array.from(v).join(","), pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "unique",
            value: function unique(fn) {
                var out = map_byte_class_private_method_get(this, _fresh, fresh).call(this);
                var seen = new Set();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        var keyFor = fn ? fn(v, pid) : pid;
                        var dedupeKey = this.stride === 1 ? String(v) : Array.from(v).join(",");
                        if (!seen.has(dedupeKey)) {
                            seen.add(dedupeKey);
                            out.s(v, keyFor);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "pick",
            value: function pick(pids) {
                var out = map_byte_class_private_method_get(this, _fresh, fresh).call(this);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = pids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        if (this.h(pid)) out.s(this.g(pid), pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "omit",
            value: function omit(pids) {
                var omitted = new Set(pids);
                var out = map_byte_class_private_method_get(this, _fresh, fresh).call(this);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        if (!omitted.has(pid)) out.s(v, pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "merge",
            value: function merge(other) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = other[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        this.s(v, pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "clearAndSet",
            value: function clearAndSet(entries) {
                var _this = this;
                return this.batch(function() {
                    _this.clear();
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                            _this.s(v, pid);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                });
            }
        },
        {
            key: "toObject",
            value: function toObject() {
                var out = {};
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        out[pid] = v;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "toValues",
            value: function toValues() {
                return map_byte_to_consumable_array(this.values());
            } //                                       [TOVALUES]
        },
        {
            key: "toKeys",
            value: function toKeys() {
                return map_byte_to_consumable_array(this.keys());
            } //                                                [TOKEYS]
        },
        {
            key: "toArray",
            value: function toArray() {
                return map_byte_to_consumable_array(this.entries());
            } //                                   [TOARRAY]
        },
        {
            key: "group",
            value: function group(fn) {
                var out = new Map();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        var k = fn(v, pid);
                        if (!out.has(k)) out.set(k, []);
                        out.get(k).push(v);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "clone",
            value: function clone() {
                return new M2BI(this.cap, this.stride, this.entries());
            }
        },
        {
            key: "equals",
            value: function equals(other) {
                if (other === this) return true;
                if (this.size !== other.size) return false;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = map_byte_sliced_to_array(_step.value, 2), pid = _step_value[0], v = _step_value[1];
                        if (!other.has(pid) || !map_byte_sameValue128(other.get(pid), v)) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return true;
            }
        }
    ], [
        {
            key: "fromObject",
            value: function fromObject(obj, maxParticles) {
                var stride = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
                return new M2BI(maxParticles, stride, Object.entries(obj).map(function(param) {
                    var _param = map_byte_sliced_to_array(param, 2), k = _param[0], v = _param[1];
                    return [
                        Number(k),
                        v
                    ];
                }));
            }
        },
        {
            key: "fromEntries",
            value: function fromEntries(entries, maxParticles) {
                var stride = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
                return new M2BI(maxParticles, stride, entries);
            }
        },
        {
            key: "from",
            value: function from(map, maxParticles) {
                var stride = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
                return new M2BI(maxParticles, stride, map);
            }
        }
    ]);
    return M2BI;
}();
function src_map_byte_emit(e) {
    var _$_class_private_field_get;
    if (map_byte_class_private_field_get(this, map_byte_batching) > 0) {
        var _$_class_private_field_get1;
        map_byte_class_private_field_set(this, map_byte_pending, (_$_class_private_field_get1 = map_byte_class_private_field_get(this, map_byte_pending)) !== null && _$_class_private_field_get1 !== void 0 ? _$_class_private_field_get1 : new Map());
        var pending = map_byte_class_private_field_get(this, map_byte_pending).get(e.pid);
        map_byte_class_private_field_get(this, map_byte_pending).set(e.pid, pending ? map_byte_object_spread_props(map_byte_object_spread({}, e), {
            prev: pending.prev,
            batch: true
        }) : map_byte_object_spread_props(map_byte_object_spread({}, e), {
            batch: true
        }));
        return;
    }
    map_byte_class_private_method_get(this, map_byte_record, src_map_byte_record).call(this, e);
    (_$_class_private_field_get = map_byte_class_private_field_get(this, map_byte_subs)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.forEach(function(sub) {
        try {
            sub(e);
        } catch (err) {
            process.emitWarning(err);
        }
    });
}
function src_map_byte_record(e) {
    if (!map_byte_class_private_field_get(this, map_byte_hist)) return;
    map_byte_class_private_field_get(this, map_byte_hist).push(e);
    if (map_byte_class_private_field_get(this, map_byte_hist).length > map_byte_class_private_field_get(this, map_byte_histLimit)) map_byte_class_private_field_get(this, map_byte_hist).splice(0, map_byte_class_private_field_get(this, map_byte_hist).length - map_byte_class_private_field_get(this, map_byte_histLimit));
}
function src_map_byte_invalidate(pid) {
    var _$_class_private_field_get;
    var deps = (_$_class_private_field_get = map_byte_class_private_field_get(this, map_byte_dependents)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.get(pid);
    if (!deps) return;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = deps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var dk = _step.value;
            var _$_class_private_field_get1;
            var d = (_$_class_private_field_get1 = map_byte_class_private_field_get(this, map_byte_derived)) === null || _$_class_private_field_get1 === void 0 ? void 0 : _$_class_private_field_get1.get(dk);
            if (!d || d.dirty) continue;
            d.dirty = true;
            map_byte_class_private_method_get(this, map_byte_emit, src_map_byte_emit).call(this, {
                op: "dirty",
                pid: dk,
                has: d.has
            });
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
function src_map_byte_computeDerived(pid, d) {
    var _this = this;
    var _d;
    var vals = d.deps.map(function(dep) {
        return _this.g(dep);
    });
    var next = (_d = d).fn.apply(_d, map_byte_to_consumable_array(vals));
    var had = d.has;
    var prev = d.value;
    d.value = next;
    d.has = true;
    d.dirty = false;
    if (!had || !map_byte_sameValue128(prev, next)) {
        map_byte_class_private_method_get(this, map_byte_emit, src_map_byte_emit).call(this, {
            op: had ? "upd" : "set",
            pid: pid,
            v: next,
            prev: prev,
            has: true
        });
    }
    return next;
}
function src_map_byte_assertNotIterating(op) {
    if (map_byte_class_private_field_get(this, map_byte_strict) && map_byte_class_private_field_get(this, map_byte_iterating) > 0) {
        throw new Error("M2BI.".concat(op, "() during iteration. Snapshot keys first, or disable $strict()."));
    }
}
function readSlot(slot) {
    return this.stride === 1 ? this.vals[slot] : this.vals.subarray(slot * this.stride, slot * this.stride + this.stride);
}
function writeSlot(slot, v) {
    if (this.stride === 1) this.vals[slot] = v;
    else this.vals.set(v, slot * this.stride);
}
function fresh() {
    return new map_byte_M2BI(this.cap, this.stride);
}
globalThis.M2B = map_byte_M2BI;

function array_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function array_array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function array_array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function array_array_without_holes(arr) {
    if (Array.isArray(arr)) return array_array_like_to_array(arr);
}
function array_assert_this_initialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function array_call_super(_this, derived, args) {
    derived = array_get_prototype_of(derived);
    return array_possible_constructor_return(_this, array_is_native_reflect_construct() ? Reflect.construct(derived, args || [], array_get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function array_class_call_check(instance, Constructor) {
    if (!array_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function array_construct(Parent, args, Class) {
    if (array_is_native_reflect_construct()) array_construct = Reflect.construct;
    else {
        array_construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) array_set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return array_construct.apply(null, arguments);
}
function array_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function array_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) array_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) array_defineProperties(Constructor, staticProps);
    return Constructor;
}
function array_get_prototype_of(o) {
    array_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return array_get_prototype_of(o);
}
function array_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) array_set_prototype_of(subClass, superClass);
}
function array_instanceof1(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function array_is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function array_is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (array_is_native_reflect_construct = function _is_native_reflect_construct() {
        return !!result;
    })();
}
function array_iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function array_iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function array_non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function array_non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function array_possible_constructor_return(self, call) {
    if (call && (array_type_of(call) === "object" || typeof call === "function")) return call;
    return array_assert_this_initialized(self);
}
function array_set_prototype_of(o, p) {
    array_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return array_set_prototype_of(o, p);
}
function array_sliced_to_array(arr, i) {
    return array_array_with_holes(arr) || array_iterable_to_array_limit(arr, i) || array_unsupported_iterable_to_array(arr, i) || array_non_iterable_rest();
}
function array_to_consumable_array(arr) {
    return array_array_without_holes(arr) || array_iterable_to_array(arr) || array_unsupported_iterable_to_array(arr) || array_non_iterable_spread();
}
function array_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function array_unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return array_array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return array_array_like_to_array(o, minLen);
}
function array_wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    array_wrap_native_super = function _wrap_native_super(Class) {
        if (Class === null || !array_is_native_function(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return array_construct(Class, arguments, array_get_prototype_of(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return array_set_prototype_of(Wrapper, Class);
    };
    return array_wrap_native_super(Class);
}
var array_A2I = /*#__PURE__*/ function _target(Array1) {
    "use strict";
    array_inherits(A2I, Array1);
    function A2I() {
        for(var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++){
            items[_key] = arguments[_key];
        }
        array_class_call_check(this, A2I);
        var _this;
        _this = array_call_super(this, A2I, array_to_consumable_array(items));
        Object.setPrototypeOf(_this, (array_instanceof1(this, A2I) ? this.constructor : void 0).prototype);
        return _this;
    }
    array_create_class(A2I, [
        {
            key: "first",
            value: function first() {
                return this[0];
            }
        },
        {
            key: "last",
            value: function last() {
                return this[this.length - 1];
            }
        },
        {
            key: "isEmpty",
            value: function isEmpty() {
                return this.length === 0;
            }
        },
        {
            key: "isNotEmpty",
            value: function isNotEmpty() {
                return this.length !== 0;
            }
        },
        {
            key: "clear",
            value: function clear() {
                this.length = 0;
                return this;
            }
        },
        {
            key: "clone",
            value: function clone() {
                return array_construct(A2I, array_to_consumable_array(this));
            }
        },
        {
            key: "unique",
            value: function unique() {
                return array_construct(A2I, array_to_consumable_array(new Set(this)));
            }
        },
        {
            key: "compact",
            value: function compact() {
                return array_construct(A2, array_to_consumable_array(this.filter(function(value) {
                    return value != null;
                })));
            }
        },
        {
            key: "take",
            value: function take(count) {
                return array_construct(A2I, array_to_consumable_array(this.slice(0, Math.max(0, count))));
            }
        },
        {
            key: "takeLast",
            value: function takeLast(count) {
                return array_construct(A2I, array_to_consumable_array(this.slice(Math.max(0, this.length - Math.max(0, count)))));
            }
        },
        {
            key: "drop",
            value: function drop(count) {
                return array_construct(A2I, array_to_consumable_array(this.slice(Math.max(0, count))));
            }
        },
        {
            key: "dropLast",
            value: function dropLast(count) {
                return array_construct(A2I, array_to_consumable_array(this.slice(0, Math.max(0, this.length - Math.max(0, count)))));
            }
        },
        {
            key: "chunk",
            value: function chunk(size) {
                if (!Number.isInteger(size) || size < 1) {
                    throw new RangeError("Chunk size must be a positive integer.");
                }
                var result = new A2();
                for(var i = 0; i < this.length; i += size){
                    result.push(array_construct(A2I, array_to_consumable_array(this.slice(i, i + size))));
                }
                return result;
            }
        },
        {
            key: "flatten",
            value: function flatten() {
                var depth = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Infinity;
                return array_construct(A2, array_to_consumable_array(this.flat(depth)));
            }
        },
        {
            key: "flatMap",
            value: function flatMap(callback) {
                var _this = this;
                return array_construct(A2, array_to_consumable_array(this.flatMap(function(value, index) {
                    return callback(value, index, _this);
                })));
            }
        },
        {
            key: "distinctBy",
            value: function distinctBy(callback) {
                var seen = new Set();
                var result = new A2I();
                this.forEach(function(value, index) {
                    var key = callback(value, index);
                    if (!seen.has(key)) {
                        seen.add(key);
                        result.push(value);
                    }
                });
                return result;
            }
        },
        {
            key: "groupBy",
            value: function groupBy(callback) {
                var result = new Map();
                this.forEach(function(value, index) {
                    var key = callback(value, index);
                    var group = result.get(key);
                    if (!group) {
                        group = new A2I();
                        result.set(key, group);
                    }
                    group.push(value);
                });
                return result;
            }
        },
        {
            key: "partition",
            value: function partition(callback) {
                var yes = new A2I();
                var no = new A2I();
                this.forEach(function(value, index) {
                    (callback(value, index) ? yes : no).push(value);
                });
                return [
                    yes,
                    no
                ];
            }
        },
        {
            key: "insert",
            value: function insert(index) {
                for(var _len = arguments.length, items = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    items[_key - 1] = arguments[_key];
                }
                this.splice.apply(this, [
                    index,
                    0
                ].concat(array_to_consumable_array(items)));
                return this;
            }
        },
        {
            key: "removeAt",
            value: function removeAt(index) {
                var normalized = index < 0 ? this.length + index : index;
                if (normalized < 0 || normalized >= this.length) {
                    return undefined;
                }
                return this.splice(normalized, 1)[0];
            }
        },
        {
            key: "remove",
            value: function remove(value) {
                var index = this.indexOf(value);
                if (index === -1) {
                    return false;
                }
                this.splice(index, 1);
                return true;
            }
        },
        {
            key: "removeAll",
            value: function removeAll(value) {
                var removed = 0;
                for(var i = this.length - 1; i >= 0; i--){
                    if (Object.is(this[i], value)) {
                        this.splice(i, 1);
                        removed++;
                    }
                }
                return removed;
            }
        },
        {
            key: "replaceAt",
            value: function replaceAt(index, value) {
                var normalized = index < 0 ? this.length + index : index;
                if (normalized < 0 || normalized >= this.length) {
                    return undefined;
                }
                var previous = this[normalized];
                this[normalized] = value;
                return previous;
            }
        },
        {
            key: "move",
            value: function move(from, to) {
                var source = from < 0 ? this.length + from : from;
                var target = to < 0 ? this.length + to : to;
                if (source < 0 || source >= this.length || target < 0 || target >= this.length || source === target) {
                    return this;
                }
                var _this_splice = array_sliced_to_array(this.splice(source, 1), 1), item = _this_splice[0];
                this.splice(target, 0, item);
                return this;
            }
        },
        {
            key: "swap",
            value: function swap(first, second) {
                var a = first < 0 ? this.length + first : first;
                var b = second < 0 ? this.length + second : second;
                if (a < 0 || a >= this.length || b < 0 || b >= this.length) {
                    return this;
                }
                var ref;
                ref = [
                    this[b],
                    this[a]
                ], this[a] = ref[0], this[b] = ref[1], ref;
                return this;
            }
        },
        {
            key: "sample",
            value: function sample() {
                if (this.length === 0) {
                    return undefined;
                }
                return this[Math.floor(Math.random() * this.length)];
            }
        },
        {
            key: "shuffle",
            value: function shuffle() {
                for(var i = this.length - 1; i > 0; i--){
                    var j = Math.floor(Math.random() * (i + 1));
                    var ref;
                    ref = [
                        this[j],
                        this[i]
                    ], this[i] = ref[0], this[j] = ref[1], ref;
                }
                return this;
            }
        },
        {
            key: "countBy",
            value: function countBy(callback) {
                var count = 0;
                this.forEach(function(value, index) {
                    if (callback(value, index)) count++;
                });
                return count;
            }
        },
        {
            key: "sum",
            value: function sum(callback) {
                var total = 0;
                this.forEach(function(value, index) {
                    total += callback ? callback(value, index) : Number(value);
                });
                return total;
            }
        },
        {
            key: "average",
            value: function average(callback) {
                return this.length === 0 ? NaN : this.sum(callback) / this.length;
            }
        },
        {
            key: "min",
            value: function min(callback) {
                var _this = this;
                if (this.length === 0) return undefined;
                return this.reduce(function(best, value, index) {
                    var current = callback ? callback(value, index) : Number(value);
                    var bestValue = callback ? callback(best, _this.indexOf(best)) : Number(best);
                    return current < bestValue ? value : best;
                });
            }
        },
        {
            key: "max",
            value: function max(callback) {
                var _this = this;
                if (this.length === 0) return undefined;
                return this.reduce(function(best, value, index) {
                    var current = callback ? callback(value, index) : Number(value);
                    var bestValue = callback ? callback(best, _this.indexOf(best)) : Number(best);
                    return current > bestValue ? value : best;
                });
            }
        },
        {
            key: "equals",
            value: function equals(array) {
                return this.length === array.length && this.every(function(value, index) {
                    return Object.is(value, array[index]);
                });
            }
        },
        {
            key: "includesAll",
            value: function includesAll(values) {
                var _this = this;
                return values.every(function(value) {
                    return _this.includes(value);
                });
            }
        },
        {
            key: "intersects",
            value: function intersects(values) {
                var _this = this;
                return values.some(function(value) {
                    return _this.includes(value);
                });
            }
        }
    ], [
        {
            key: Symbol.species,
            get: function get() {
                return Array;
            }
        },
        {
            key: "from",
            value: function from(arrayLike) {
                return array_construct(A2I, array_to_consumable_array(Array.from(arrayLike)));
            }
        },
        {
            key: "of",
            value: function of() {
                for(var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++){
                    items[_key] = arguments[_key];
                }
                return array_construct(A2I, array_to_consumable_array(items));
            }
        }
    ]);
    return A2I;
}(array_wrap_native_super(Array));
globalThis.A2 = array_A2I;

function date_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function date_array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function date_array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function date_array_without_holes(arr) {
    if (Array.isArray(arr)) return date_array_like_to_array(arr);
}
function date_assert_this_initialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function date_call_super(_this, derived, args) {
    derived = date_get_prototype_of(derived);
    return date_possible_constructor_return(_this, date_is_native_reflect_construct() ? Reflect.construct(derived, args || [], date_get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function date_class_call_check(instance, Constructor) {
    if (!date_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function date_construct(Parent, args, Class) {
    if (date_is_native_reflect_construct()) date_construct = Reflect.construct;
    else {
        date_construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) date_set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return date_construct.apply(null, arguments);
}
function date_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function date_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) date_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) date_defineProperties(Constructor, staticProps);
    return Constructor;
}
function date_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function date_get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) date_get = Reflect.get;
    else {
        date_get = function get(target, property, receiver) {
            var base = date_super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) return desc.get.call(receiver || target);
            return desc.value;
        };
    }
    return date_get(target, property, receiver || target);
}
function date_get_prototype_of(o) {
    date_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return date_get_prototype_of(o);
}
function date_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) date_set_prototype_of(subClass, superClass);
}
function date_instanceof1(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function date_is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function date_is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (date_is_native_reflect_construct = function _is_native_reflect_construct() {
        return !!result;
    })();
}
function date_iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function date_iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function date_non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function date_non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function date_possible_constructor_return(self, call) {
    if (call && (date_type_of(call) === "object" || typeof call === "function")) return call;
    return date_assert_this_initialized(self);
}
function date_set_prototype_of(o, p) {
    date_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return date_set_prototype_of(o, p);
}
function date_sliced_to_array(arr, i) {
    return date_array_with_holes(arr) || date_iterable_to_array_limit(arr, i) || date_unsupported_iterable_to_array(arr, i) || date_non_iterable_rest();
}
function date_super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = date_get_prototype_of(object);
        if (object === null) break;
    }
    return object;
}
function date_to_consumable_array(arr) {
    return date_array_without_holes(arr) || date_iterable_to_array(arr) || date_unsupported_iterable_to_array(arr) || date_non_iterable_spread();
}
function date_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function date_unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return date_array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return date_array_like_to_array(o, minLen);
}
function date_wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    date_wrap_native_super = function _wrap_native_super(Class) {
        if (Class === null || !date_is_native_function(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return date_construct(Class, arguments, date_get_prototype_of(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return date_set_prototype_of(Wrapper, Class);
    };
    return date_wrap_native_super(Class);
}
var DATE_TAG = 0x4432; // "D2"
var D2_CODEC = (/* unused pure expression or super */ null && ({
    tag: DATE_TAG,
    test: function test(v) {
        return date_instanceof1(v, Date);
    },
    enc: function enc(d) {
        return d.getTime();
    },
    dec: function dec(ms) {
        return new date_D2I(ms);
    }
}));
var FORMAT = {
    full: {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    },
    dm: {
        month: "short",
        day: "numeric"
    },
    dmy: {
        year: "numeric",
        month: "short",
        day: "numeric"
    },
    dmyw: {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
    },
    t: {
        hour: "2-digit",
        minute: "2-digit"
    }
};
var date_D2I = /*#__PURE__*/ function(Date1) {
    "use strict";
    date_inherits(D2I, Date1);
    function D2I(value) {
        date_class_call_check(this, D2I);
        var _this;
        if (date_instanceof1(value, Date)) _this = date_call_super(this, D2I, [
            value.getTime()
        ]);
        else if (value === undefined) _this = date_call_super(this, D2I);
        else _this = date_call_super(this, D2I, [
            value
        ]);
        return date_assert_this_initialized(_this);
    }
    date_create_class(D2I, [
        {
            key: "toLocalString",
            value: function toLocalString() {
                var format = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : FORMAT.full;
                return date_get(date_get_prototype_of(D2I.prototype), "toLocaleString", this).call(this, "en-US", format);
            }
        },
        {
            key: "clone",
            value: function clone() {
                return new D2I(this);
            }
        },
        {
            key: "isValid",
            value: function isValid() {
                return Number.isFinite(this.getTime());
            }
        },
        {
            key: "month",
            value: function month() {
                return this.getMonth() + 1;
            }
        },
        {
            key: "dateOfWeek",
            value: function dateOfWeek() {
                return this.getDay();
            }
        },
        {
            key: "dayOfYear",
            value: function dayOfYear() {
                var start = new Date(this.getFullYear(), 0, 1);
                var current = new Date(this.getFullYear(), this.getMonth(), this.getDate());
                return Math.floor((current.getTime() - start.getTime()) / 86400000) + 1;
            }
        },
        {
            key: "quarter",
            value: function quarter() {
                return Math.floor(this.getMonth() / 3) + 1;
            }
        },
        {
            key: "unix",
            value: function unix() {
                return Math.floor(this.getTime() / 1000);
            }
        },
        {
            key: "addMs",
            value: function addMs(amount) {
                return new D2I(this.getTime() + amount);
            }
        },
        {
            key: "addSeconds",
            value: function addSeconds(amount) {
                return this.addMs(amount * 1000);
            }
        },
        {
            key: "addMinutes",
            value: function addMinutes(amount) {
                return this.addMs(amount * 60000);
            }
        },
        {
            key: "addHours",
            value: function addHours(amount) {
                return this.addMs(amount * 3600000);
            }
        },
        {
            key: "addDays",
            value: function addDays(amount) {
                var out = this.clone();
                out.setDate(out.getDate() + amount);
                return out;
            }
        },
        {
            key: "addWeeks",
            value: function addWeeks(amount) {
                return this.addDays(amount * 7);
            }
        },
        {
            key: "addMonths",
            value: function addMonths(amount) {
                var out = this.clone();
                var day = out.getDate();
                out.setDate(1);
                out.setMonth(out.getMonth() + amount);
                out.setDate(Math.min(day, out.daysInMonth()));
                return out;
            }
        },
        {
            key: "addYears",
            value: function addYears(amount) {
                var out = this.clone();
                var month = out.getMonth();
                var day = out.getDate();
                out.setDate(1);
                out.setFullYear(out.getFullYear() + amount);
                out.setMonth(month);
                out.setDate(Math.min(day, out.daysInMonth()));
                return out;
            }
        },
        {
            key: "subDays",
            value: function subDays(amount) {
                return this.addDays(-amount);
            }
        },
        {
            key: "subMonths",
            value: function subMonths(amount) {
                return this.addMonths(-amount);
            }
        },
        {
            key: "subYears",
            value: function subYears(amount) {
                return this.addYears(-amount);
            }
        },
        {
            key: "startOfDay",
            value: function startOfDay() {
                var out = this.clone();
                out.setHours(0, 0, 0, 0);
                return out;
            }
        },
        {
            key: "endOfDay",
            value: function endOfDay() {
                var out = this.clone();
                out.setHours(23, 59, 59, 999);
                return out;
            }
        },
        {
            key: "startOfWeek",
            value: function startOfWeek() {
                var weekStartsOn = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
                var out = this.startOfDay();
                out.setDate(out.getDate() - (out.getDay() - weekStartsOn + 7) % 7);
                return out;
            }
        },
        {
            key: "endOfWeek",
            value: function endOfWeek() {
                var weekStartsOn = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
                return this.startOfWeek(weekStartsOn).addDays(7).addMs(-1);
            }
        },
        {
            key: "startOfMonth",
            value: function startOfMonth() {
                var out = this.startOfDay();
                out.setDate(1);
                return out;
            }
        },
        {
            key: "endOfMonth",
            value: function endOfMonth() {
                return this.addMonths(1).startOfMonth().addMs(-1);
            }
        },
        {
            key: "startOfQuarter",
            value: function startOfQuarter() {
                var out = this.startOfDay();
                out.setMonth(Math.floor(out.getMonth() / 3) * 3, 1);
                return out;
            }
        },
        {
            key: "endOfQuarter",
            value: function endOfQuarter() {
                return this.startOfQuarter().addMonths(3).addMs(-1);
            }
        },
        {
            key: "startOfYear",
            value: function startOfYear() {
                var out = this.startOfDay();
                out.setMonth(0, 1);
                return out;
            }
        },
        {
            key: "endOfYear",
            value: function endOfYear() {
                return this.startOfYear().addYears(1).addMs(-1);
            }
        },
        {
            key: "daysInMonth",
            value: function daysInMonth() {
                return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
            }
        },
        {
            key: "daysInYear",
            value: function daysInYear() {
                return this.isLeapYear() ? 366 : 365;
            }
        },
        {
            key: "isLeapYear",
            value: function isLeapYear() {
                var year = this.getFullYear();
                return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
            }
        },
        {
            key: "isWeekend",
            value: function isWeekend() {
                return this.getDay() === 0 || this.getDay() === 6;
            }
        },
        {
            key: "isWeekday",
            value: function isWeekday() {
                return !this.isWeekend();
            }
        },
        {
            key: "isBefore",
            value: function isBefore(other) {
                return this.getTime() < other.getTime();
            }
        },
        {
            key: "isAfter",
            value: function isAfter(other) {
                return this.getTime() > other.getTime();
            }
        },
        {
            key: "isEqual",
            value: function isEqual(other) {
                return this.getTime() === other.getTime();
            }
        },
        {
            key: "isBetween",
            value: function isBetween(start, end) {
                return this.getTime() >= start.getTime() && this.getTime() <= end.getTime();
            }
        },
        {
            key: "diffMs",
            value: function diffMs(other) {
                return this.getTime() - other.getTime();
            }
        },
        {
            key: "diffSeconds",
            value: function diffSeconds(other) {
                return this.diffMs(other) / 1000;
            }
        },
        {
            key: "diffMinutes",
            value: function diffMinutes(other) {
                return this.diffMs(other) / 60000;
            }
        },
        {
            key: "diffHours",
            value: function diffHours(other) {
                return this.diffMs(other) / 3600000;
            }
        },
        {
            key: "diffDays",
            value: function diffDays(other) {
                return this.diffMs(other) / 86400000;
            }
        },
        {
            key: "sameDay",
            value: function sameDay(other) {
                return this.getFullYear() === other.getFullYear() && this.getMonth() === other.getMonth() && this.getDate() === other.getDate();
            }
        },
        {
            key: "sameMonth",
            value: function sameMonth(other) {
                return this.getFullYear() === other.getFullYear() && this.getMonth() === other.getMonth();
            }
        },
        {
            key: "sameYear",
            value: function sameYear(other) {
                return this.getFullYear() === other.getFullYear();
            }
        },
        {
            key: "toUnixMs",
            value: function toUnixMs() {
                return this.getTime();
            }
        },
        {
            key: "toUnix",
            value: function toUnix() {
                return this.unix();
            }
        },
        {
            key: "toD2",
            value: function toD2() {
                return this.clone();
            }
        },
        {
            key: "ago",
            value: function ago() {
                return this.fromNow();
            }
        },
        {
            key: "fromNow",
            value: function fromNow() {
                return this.from(new Date());
            }
        },
        {
            key: "from",
            value: function from(other) {
                var ms = this.getTime() - other.getTime();
                var abs = Math.abs(ms);
                var future = ms > 0;
                var units = [
                    [
                        1000,
                        "second"
                    ],
                    [
                        60000,
                        "minute"
                    ],
                    [
                        3600000,
                        "hour"
                    ],
                    [
                        86400000,
                        "day"
                    ],
                    [
                        604800000,
                        "week"
                    ],
                    [
                        2592000000,
                        "month"
                    ],
                    [
                        31536000000,
                        "year"
                    ]
                ];
                if (abs < 1000) return "just now";
                var n = 1;
                var unit = "second";
                for(var i = units.length - 1; i >= 0; i--){
                    var _units_i = date_sliced_to_array(units[i], 2), size = _units_i[0], name = _units_i[1];
                    if (abs >= size) {
                        n = Math.floor(abs / size);
                        unit = name;
                        break;
                    }
                }
                var plural = n === 1 ? "" : "s";
                return future ? "in ".concat(n, " ").concat(unit).concat(plural) : "".concat(n, " ").concat(unit).concat(plural, " ago");
            }
        },
        {
            key: "toInputDate",
            value: function toInputDate() {
                return this.fmt("YYYY-MM-DD");
            }
        },
        {
            key: "toInputTime",
            value: function toInputTime() {
                return this.fmt("HH:mm");
            }
        },
        {
            key: "toInputDateTime",
            value: function toInputDateTime() {
                return this.fmt("YYYY-MM-DDTHH:mm");
            }
        },
        {
            key: "toInputTimeWithSeconds",
            value: function toInputTimeWithSeconds() {
                return this.fmt("HH:mm:ss");
            }
        },
        {
            key: "next",
            value: function next(unit) {
                var days = [
                    "sunday",
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday"
                ];
                if (days.includes(unit)) {
                    var target = days.indexOf(unit);
                    var diff = (target - this.getDay() + 7) % 7 || 7;
                    return this.addDays(diff);
                }
                if (unit === "day") return this.addDays(1);
                if (unit === "week") return this.addWeeks(1);
                if (unit === "month") return this.addMonths(1);
                if (unit === "quarter") return this.addMonths(3);
                if (unit === "year") return this.addYears(1);
                return this.clone();
            }
        },
        {
            key: "prev",
            value: function prev(unit) {
                var days = [
                    "sunday",
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday"
                ];
                if (days.includes(unit)) {
                    var target = days.indexOf(unit);
                    var diff = (this.getDay() - target + 7) % 7 || 7;
                    return this.subDays(diff);
                }
                if (unit === "day") return this.subDays(1);
                if (unit === "week") return this.subWeeks(1);
                if (unit === "month") return this.subMonths(1);
                if (unit === "quarter") return this.subMonths(3);
                if (unit === "year") return this.subYears(1);
                return this.clone();
            }
        },
        {
            key: "nextWeek",
            value: function nextWeek() {
                return this.addWeeks(1);
            }
        },
        {
            key: "prevWeek",
            value: function prevWeek() {
                return this.subWeeks(1);
            }
        },
        {
            key: "nextMonth",
            value: function nextMonth() {
                return this.addMonths(1);
            }
        },
        {
            key: "prevMonth",
            value: function prevMonth() {
                return this.subMonths(1);
            }
        },
        {
            key: "nextQuarter",
            value: function nextQuarter() {
                return this.addMonths(3);
            }
        },
        {
            key: "prevQuarter",
            value: function prevQuarter() {
                return this.subMonths(3);
            }
        },
        {
            key: "nextYear",
            value: function nextYear() {
                return this.addYears(1);
            }
        },
        {
            key: "prevYear",
            value: function prevYear() {
                return this.subYears(1);
            }
        },
        {
            key: "subWeeks",
            value: function subWeeks(n) {
                return this.addWeeks(-n);
            }
        },
        {
            key: "at",
            value: function at(hour) {
                var minute = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, second = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, ms = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
                var out = this.clone();
                out.setHours(hour, minute, second, ms);
                return out;
            }
        },
        {
            key: "atNoon",
            value: function atNoon() {
                return this.at(12);
            }
        },
        {
            key: "midnight",
            value: function midnight() {
                return this.startOfDay();
            }
        },
        {
            key: "addBusinessDays",
            value: function addBusinessDays(n) {
                var out = this.clone();
                var left = Math.abs(n);
                var dir = n < 0 ? -1 : 1;
                while(left > 0){
                    out = out.addDays(dir);
                    if (out.isWeekday()) left--;
                }
                return out;
            }
        },
        {
            key: "nextBusinessDay",
            value: function nextBusinessDay() {
                return this.addBusinessDays(1);
            }
        },
        {
            key: "prevBusinessDay",
            value: function prevBusinessDay() {
                return this.addBusinessDays(-1);
            }
        },
        {
            key: "isBusinessDay",
            value: function isBusinessDay() {
                return this.isWeekday();
            }
        },
        {
            key: "calendarDays",
            value: function calendarDays(other) {
                var a = new D2I(this).startOfDay();
                var b = new D2I(other).startOfDay();
                return Math.round(b.diffDays(a));
            }
        },
        {
            key: "businessDays",
            value: function businessDays(other) {
                var a = new D2I(this).startOfDay();
                var b = new D2I(other).startOfDay();
                var n = 0;
                while(a.isBefore(b)){
                    if (a.isWeekday()) n++;
                    a = a.addDays(1);
                }
                return n;
            }
        },
        {
            key: "diffHuman",
            value: function diffHuman() {
                var other = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : new Date();
                var ms = Math.abs(this.diffMs(other));
                var units = [
                    [
                        31536000000,
                        "y"
                    ],
                    [
                        2592000000,
                        "mo"
                    ],
                    [
                        604800000,
                        "w"
                    ],
                    [
                        86400000,
                        "d"
                    ],
                    [
                        3600000,
                        "h"
                    ],
                    [
                        60000,
                        "m"
                    ],
                    [
                        1000,
                        "s"
                    ]
                ];
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = units[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = date_sliced_to_array(_step.value, 2), size = _step_value[0], label = _step_value[1];
                        if (ms >= size) return "".concat(Math.floor(ms / size)).concat(label);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return "".concat(ms, "ms");
            }
        },
        {
            key: "fmt",
            value: function fmt(format) {
                var pad = function pad(n) {
                    var len = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
                    return String(n).padStart(len, "0");
                };
                var map = {
                    YYYY: String(this.getFullYear()),
                    YY: pad(this.getFullYear() % 100),
                    MMMM: this.toLocaleString("en-US", {
                        month: "long"
                    }),
                    MMM: this.toLocaleString("en-US", {
                        month: "short"
                    }),
                    MM: pad(this.month()),
                    M: String(this.month()),
                    DD: pad(this.getDate()),
                    D: String(this.getDate()),
                    dddd: this.toLocaleString("en-US", {
                        weekday: "long"
                    }),
                    ddd: this.toLocaleString("en-US", {
                        weekday: "short"
                    }),
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
                    a: this.getHours() < 12 ? "am" : "pm"
                };
                return format.replace(/YYYY|YY|MMMM|MMM|MM|M|DD|D|dddd|ddd|HH|H|hh|h|mm|m|ss|s|SSS|A|a/g, function(token) {
                    return map[token];
                });
            }
        },
        {
            key: "set",
            value: function set(f) {
                var out = this.clone();
                if (f.year !== undefined || f.month !== undefined || f.day !== undefined) {
                    var _f_year, _f_month, _f_day;
                    var y = (_f_year = f.year) !== null && _f_year !== void 0 ? _f_year : out.getFullYear();
                    var m = ((_f_month = f.month) !== null && _f_month !== void 0 ? _f_month : out.getMonth() + 1) - 1;
                    var targetDay = (_f_day = f.day) !== null && _f_day !== void 0 ? _f_day : out.getDate();
                    out.setDate(1);
                    out.setFullYear(y, m, 1);
                    out.setDate(Math.min(targetDay, out.daysInMonth()));
                }
                if (f.hour !== undefined) out.setHours(f.hour);
                if (f.minute !== undefined) out.setMinutes(f.minute);
                if (f.second !== undefined) out.setSeconds(f.second);
                if (f.ms !== undefined) out.setMilliseconds(f.ms);
                return out;
            }
        },
        {
            key: "withDate",
            value: function withDate(year, month, day) {
                return this.set({
                    year: year,
                    month: month,
                    day: day
                });
            }
        },
        {
            key: "sameTimeOn",
            value: function sameTimeOn(other) {
                return this.set({
                    year: other.getFullYear(),
                    month: other.getMonth() + 1,
                    day: other.getDate()
                });
            }
        },
        {
            key: "to",
            value: function to(other) {
                return new date_R2I(this.clone(), D2I.from(other));
            }
        },
        {
            key: "isSameOrBefore",
            value: function isSameOrBefore(other) {
                return !this.isAfter(other);
            }
        },
        {
            key: "isSameOrAfter",
            value: function isSameOrAfter(other) {
                return !this.isBefore(other);
            }
        },
        {
            key: "clamp",
            value: function clamp(min, max) {
                if (this.isBefore(min)) return D2I.from(min);
                if (this.isAfter(max)) return D2I.from(max);
                return this.clone();
            }
        },
        {
            key: "isSame",
            value: function isSame(unit, other) {
                if (unit === "day") return this.sameDay(other);
                if (unit === "week") return this.startOfWeek(0).sameDay(D2I.from(other).startOfWeek());
                if (unit === "month") return this.sameMonth(other);
                if (unit === "quarter") return this.sameYear(other) && this.quarter() === D2I.from(other).quarter();
                if (unit === "year") return this.sameYear(other);
                return false;
            }
        },
        {
            key: "isToday",
            value: function isToday() {
                return this.sameDay(new D2I());
            }
        },
        {
            key: "isTomorrow",
            value: function isTomorrow() {
                return this.sameDay(new D2I().addDays(1));
            }
        },
        {
            key: "isYesterday",
            value: function isYesterday() {
                return this.sameDay(new D2I().subDays(1));
            }
        },
        {
            key: "age",
            value: function age() {
                var unit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "years";
                var now = new D2I();
                if (unit === "days") return Math.floor(now.diffDays(this));
                if (unit === "months") {
                    return (now.getFullYear() - this.getFullYear()) * 12 + (now.getMonth() - this.getMonth()) - (now.getDate() < this.getDate() ? 1 : 0);
                }
                var years = now.getFullYear() - this.getFullYear();
                if (now.getMonth() < this.getMonth() || now.getMonth() === this.getMonth() && now.getDate() < this.getDate()) years--;
                return years;
            }
        }
    ], [
        {
            key: "now",
            value: function now() {
                return Date.now();
            }
        },
        {
            key: "fromUnix",
            value: function fromUnix(seconds) {
                return new D2I(seconds * 1000);
            }
        },
        {
            key: "fromUnixMs",
            value: function fromUnixMs(ms) {
                return new D2I(ms);
            }
        },
        {
            key: "fromParts",
            value: function fromParts(year, month, day) {
                var hour = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, minute = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, second = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0, ms = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : 0;
                return new D2I(new Date(year, month - 1, day, hour, minute, second, ms));
            }
        },
        {
            key: "today",
            value: function today() {
                return new D2I().startOfDay();
            }
        },
        {
            key: "min",
            value: function min() {
                for(var _len = arguments.length, dates = new Array(_len), _key = 0; _key < _len; _key++){
                    dates[_key] = arguments[_key];
                }
                var _Math;
                return new D2I((_Math = Math).min.apply(_Math, date_to_consumable_array(dates.map(function(date) {
                    return date.getTime();
                }))));
            }
        },
        {
            key: "max",
            value: function max() {
                for(var _len = arguments.length, dates = new Array(_len), _key = 0; _key < _len; _key++){
                    dates[_key] = arguments[_key];
                }
                var _Math;
                return new D2I((_Math = Math).max.apply(_Math, date_to_consumable_array(dates.map(function(date) {
                    return date.getTime();
                }))));
            }
        },
        {
            key: "from",
            value: function from(v) {
                if (date_instanceof1(v, D2I)) return v.clone();
                if (date_instanceof1(v, Date)) return new D2I(v.getTime());
                if (typeof v === "number") return new D2I(v);
                if (typeof v === "string") {
                    var s = v.trim();
                    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return D2I.parseDate(s);
                    if (/^\d{4}-\d{2}-\d{2}T.*(Z|[+-]\d{2}:?\d{2})$/.test(s)) return new D2I(s);
                    if (/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}/.test(s)) return D2I.parseDateTime(s.replace("T", " "));
                    return new D2I(s);
                }
                if (Array.isArray(v)) {
                    var _v = date_sliced_to_array(v, 7), y = _v[0], m = _v[1], d = _v[2], tmp = _v[3], h = tmp === void 0 ? 0 : tmp, tmp1 = _v[4], min = tmp1 === void 0 ? 0 : tmp1, tmp2 = _v[5], sec = tmp2 === void 0 ? 0 : tmp2, tmp3 = _v[6], ms = tmp3 === void 0 ? 0 : tmp3;
                    return D2I.fromParts(y, m, d, h, min, sec, ms);
                }
                if ((typeof v === "undefined" ? "undefined" : date_type_of(v)) === "object" && v !== null) {
                    var o = v;
                    if ("date" in o || "time" in o) {
                        var _o_date, _o_time;
                        var dateStr = ((_o_date = o.date) !== null && _o_date !== void 0 ? _o_date : "").trim();
                        var timeStr = ((_o_time = o.time) !== null && _o_time !== void 0 ? _o_time : "").trim();
                        if (!dateStr) return new D2I(NaN);
                        var _dateStr_split_map = date_sliced_to_array(dateStr.split("-").map(Number), 3), y1 = _dateStr_split_map[0], m1 = _dateStr_split_map[1], d1 = _dateStr_split_map[2];
                        if (![
                            y1,
                            m1,
                            d1
                        ].every(Number.isFinite)) return new D2I(NaN);
                        var h1 = 0, min1 = 0, sec1 = 0, ms1 = 0;
                        if (timeStr) {
                            var parts = timeStr.split(":").map(Number);
                            var ref, ref1, ref2, ref3;
                            ref = date_sliced_to_array(parts, 3), ref1 = ref[0], h1 = ref1 === void 0 ? 0 : ref1, ref2 = ref[1], min1 = ref2 === void 0 ? 0 : ref2, ref3 = ref[2], sec1 = ref3 === void 0 ? 0 : ref3, ref;
                            if (parts.length > 3) ms1 = parts[3];
                            if (![
                                h1,
                                min1,
                                sec1,
                                ms1
                            ].every(Number.isFinite)) return new D2I(NaN);
                        }
                        return D2I.fromParts(y1, m1, d1, h1, min1, sec1, ms1);
                    }
                    if ("year" in o || "month" in o || "day" in o) {
                        var _o_year, _o_month, _o_day, _o_hour, _o_minute, _o_second, _o_ms;
                        var y2 = (_o_year = o.year) !== null && _o_year !== void 0 ? _o_year : NaN;
                        var m2 = (_o_month = o.month) !== null && _o_month !== void 0 ? _o_month : NaN;
                        var d2 = (_o_day = o.day) !== null && _o_day !== void 0 ? _o_day : NaN;
                        if (![
                            y2,
                            m2,
                            d2
                        ].every(Number.isFinite)) return new D2I(NaN);
                        return D2I.fromParts(y2, m2, d2, (_o_hour = o.hour) !== null && _o_hour !== void 0 ? _o_hour : 0, (_o_minute = o.minute) !== null && _o_minute !== void 0 ? _o_minute : 0, (_o_second = o.second) !== null && _o_second !== void 0 ? _o_second : 0, (_o_ms = o.ms) !== null && _o_ms !== void 0 ? _o_ms : 0);
                    }
                }
                return new D2I(NaN);
            }
        },
        {
            key: "parseDate",
            value: function parseDate(v) {
                var _v_split_map = date_sliced_to_array(v.split("-").map(Number), 3), y = _v_split_map[0], m = _v_split_map[1], d = _v_split_map[2];
                return D2I.fromParts(y, m, d);
            }
        },
        {
            key: "parseDateTime",
            value: function parseDateTime(v) {
                var _v_split = date_sliced_to_array(v.split(" "), 2), date = _v_split[0], tmp = _v_split[1], time = tmp === void 0 ? "00:00:00" : tmp;
                var _date_split_map = date_sliced_to_array(date.split("-").map(Number), 3), y = _date_split_map[0], m = _date_split_map[1], d = _date_split_map[2];
                var _time_split_map = date_sliced_to_array(time.split(":").map(Number), 3), h = _time_split_map[0], min = _time_split_map[1], tmp1 = _time_split_map[2], sec = tmp1 === void 0 ? 0 : tmp1;
                return D2I.fromParts(y, m, d, h, min, sec);
            }
        }
    ]);
    return D2I;
}(date_wrap_native_super(Date));
var date_R2I = /*#__PURE__*/ function() {
    "use strict";
    function R2I(start, end) {
        date_class_call_check(this, R2I);
        date_define_property(this, "start", void 0);
        date_define_property(this, "end", void 0);
        this.start = start;
        this.end = end;
    }
    date_create_class(R2I, [
        {
            key: "contains",
            value: function contains(d) {
                return date_D2I.from(d).isBetween(this.start, this.end);
            }
        },
        {
            key: "overlaps",
            value: function overlaps(other) {
                return this.start.isBefore(other.end) && other.start.isBefore(this.end);
            }
        },
        {
            key: "durationMs",
            value: function durationMs() {
                return this.end.diffMs(this.start);
            }
        },
        {
            key: "days",
            value: function days() {
                return Math.floor(this.durationMs() / 86400000);
            }
        },
        {
            key: "eachDay",
            value: function eachDay(fn) {
                var cur = this.start.startOfDay();
                for(var i = 0; cur.isBefore(this.end); i++){
                    fn(cur, i);
                    cur = cur.addDays(1);
                }
            }
        },
        {
            key: "toArray",
            value: function toArray() {
                var out = new A2();
                this.eachDay(function(d) {
                    return out.push(d);
                });
                return out;
            }
        }
    ]);
    return R2I;
}();
var date_R2II = function R2II(start, end) {
    return new date_R2I(new date_D2I(start), new date_D2I(end));
};
globalThis.D2 = date_D2I;
globalThis.R2 = date_R2I;
globalThis.R2FN = date_R2II; /*  ====================================================================================================
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
    =============================================================== ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [D2] */  /*  ====================================================================================================
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
    =============================================================== ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [D2] */  /**
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

function error_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function error_assert_this_initialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function error_call_super(_this, derived, args) {
    derived = error_get_prototype_of(derived);
    return error_possible_constructor_return(_this, error_is_native_reflect_construct() ? Reflect.construct(derived, args || [], error_get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function error_class_call_check(instance, Constructor) {
    if (!error_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function error_construct(Parent, args, Class) {
    if (error_is_native_reflect_construct()) error_construct = Reflect.construct;
    else {
        error_construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) error_set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return error_construct.apply(null, arguments);
}
function error_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function error_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) error_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) error_defineProperties(Constructor, staticProps);
    return Constructor;
}
function error_get_prototype_of(o) {
    error_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return error_get_prototype_of(o);
}
function error_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) error_set_prototype_of(subClass, superClass);
}
function error_instanceof1(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function error_is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function error_is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (error_is_native_reflect_construct = function _is_native_reflect_construct() {
        return !!result;
    })();
}
function error_possible_constructor_return(self, call) {
    if (call && (error_type_of(call) === "object" || typeof call === "function")) return call;
    return error_assert_this_initialized(self);
}
function error_set_prototype_of(o, p) {
    error_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return error_set_prototype_of(o, p);
}
function error_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function error_wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    error_wrap_native_super = function _wrap_native_super(Class) {
        if (Class === null || !error_is_native_function(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return error_construct(Class, arguments, error_get_prototype_of(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return error_set_prototype_of(Wrapper, Class);
    };
    return error_wrap_native_super(Class);
}
var error_ER2I = /*#__PURE__*/ function _target(Error1) {
    "use strict";
    error_inherits(ER2I, Error1);
    function ER2I() {
        var message = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", options = arguments.length > 1 ? arguments[1] : void 0;
        error_class_call_check(this, ER2I);
        var _this;
        _this = error_call_super(this, ER2I, [
            message,
            options
        ]);
        _this.name = (error_instanceof1(this, ER2I) ? this.constructor : void 0).name;
        Object.setPrototypeOf(_this, (error_instanceof1(this, ER2I) ? this.constructor : void 0).prototype);
        return _this;
    }
    error_create_class(ER2I, [
        {
            key: "clone",
            value: function clone() {
                var error = new ER2I(this.message, {
                    cause: this.cause
                });
                error.name = this.name;
                error.stack = this.stack;
                return error;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    name: this.name,
                    message: this.message,
                    stack: this.stack,
                    cause: this.cause
                };
            }
        },
        {
            key: "toString",
            value: function toString() {
                return "".concat(this.name, ": ").concat(this.message);
            }
        }
    ], [
        {
            key: "is",
            value: function is(value) {
                return error_instanceof1(value, Error);
            }
        },
        {
            key: "isER2",
            value: function isER2(value) {
                return error_instanceof1(value, ER2I);
            }
        },
        {
            key: "from",
            value: function from(value) {
                var fallback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "An unknown error occurred";
                if (error_instanceof1(value, ER2I)) return value;
                if (error_instanceof1(value, Error)) {
                    var error = new ER2I(value.message, {
                        cause: value
                    });
                    error.name = value.name;
                    error.stack = value.stack;
                    return error;
                }
                if (typeof value === "string") {
                    return new ER2I(value);
                }
                if (value === null || value === undefined) {
                    return new ER2I(fallback);
                }
                try {
                    return new ER2I(String(value));
                } catch (unused) {
                    return new ER2I(fallback);
                }
            }
        },
        {
            key: "wrap",
            value: function wrap(value, message) {
                var cause = ER2I.from(value);
                return new ER2I(message !== null && message !== void 0 ? message : cause.message, {
                    cause: cause
                });
            }
        },
        {
            key: "aggregate",
            value: function aggregate(errors) {
                var message = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Multiple errors occurred";
                return new AggregateError(Array.from(errors, function(error) {
                    return ER2I.from(error);
                }), message);
            }
        }
    ]);
    return ER2I;
}(error_wrap_native_super(Error));
globalThis.ER2 = error_ER2I;

function iterator_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function iterator_class_call_check(instance, Constructor) {
    if (!iterator_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function iterator_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function iterator_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) iterator_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) iterator_defineProperties(Constructor, staticProps);
    return Constructor;
}
function iterator_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
var iterator_I2I = /*#__PURE__*/ function() {
    "use strict";
    function I2I(source) {
        iterator_class_call_check(this, I2I);
        iterator_define_property(this, "source", void 0);
        iterator_define_property(this, "index", 0);
        iterator_define_property(this, "buffer", []);
        iterator_define_property(this, "done", false);
        iterator_define_property(this, "n", this.next);
        iterator_define_property(this, "r", this.return);
        iterator_define_property(this, "f", this.throw);
        this.source = Symbol.iterator in Object(source) ? source[Symbol.iterator]() : source;
    }
    iterator_create_class(I2I, [
        {
            key: "next",
            value: function next() {
                if (this.buffer.length) {
                    this.index++;
                    return {
                        done: false,
                        value: this.buffer.shift()
                    };
                }
                if (this.done) return {
                    done: true,
                    value: undefined
                };
                var result = this.source.next();
                if (result.done) this.done = true;
                else this.index++;
                return result;
            }
        },
        {
            key: "return",
            value: function _return(value) {
                this.done = true;
                this.buffer.length = 0;
                return this.source.return ? this.source.return(value) : {
                    done: true,
                    value: value
                };
            }
        },
        {
            key: "throw",
            value: function _throw(error) {
                this.done = true;
                this.buffer.length = 0;
                if (this.source.throw) return this.source.throw(error);
                throw error;
            }
        },
        {
            key: Symbol.iterator,
            value: function value() {
                return this;
            }
        },
        {
            key: "toArray",
            value: function toArray() {
                return Array.from(this);
            }
        },
        {
            key: "first",
            value: function first() {
                return this.next().value;
            }
        },
        {
            key: "last",
            value: function last() {
                var result;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        result = value;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            }
        },
        {
            key: "at",
            value: function at(index) {
                if (index < 0) {
                    var values = this.toArray();
                    return values[values.length + index];
                }
                var i = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (i++ === index) return value;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return undefined;
            }
        },
        {
            key: "peek",
            value: function peek() {
                if (!this.buffer.length && !this.done) {
                    var result = this.source.next();
                    if (result.done) this.done = true;
                    else this.buffer.push(result.value);
                }
                return this.buffer[0];
            }
        },
        {
            key: "nextValue",
            value: function nextValue() {
                return this.next().value;
            }
        },
        {
            key: "nextOr",
            value: function nextOr(value) {
                var result = this.next();
                return result.done ? value : result.value;
            }
        },
        {
            key: "nextOrM",
            value: function nextOrM(make) {
                var result = this.next();
                return result.done ? make() : result.value;
            }
        },
        {
            key: "nextOrThrow",
            value: function nextOrThrow() {
                var error = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : new Error("Iterator exhausted");
                var result = this.next();
                if (result.done) throw error;
                return result.value;
            }
        },
        {
            key: "map",
            value: function map(fn) {
                var source = this;
                var index = 0;
                return new I2I({
                    next: function next() {
                        var result = source.next();
                        return result.done ? result : {
                            done: false,
                            value: fn(result.value, index++)
                        };
                    },
                    return: function _return(value) {
                        var _source_return;
                        (_source_return = source.return) === null || _source_return === void 0 ? void 0 : _source_return.call(source);
                        return {
                            done: true,
                            value: value
                        };
                    }
                });
            }
        },
        {
            key: "filter",
            value: function filter(pred) {
                var source = this;
                var index = 0;
                return new I2I({
                    next: function next() {
                        var result;
                        while(!(result = source.next()).done){
                            if (pred(result.value, index++)) return result;
                        }
                        return result;
                    },
                    return: function _return(value) {
                        return source.return(value);
                    }
                });
            }
        },
        {
            key: "flatMap",
            value: function flatMap(fn) {
                var source = this;
                var index = 0;
                var inner;
                return new I2I({
                    next: function next() {
                        while(true){
                            if (inner) {
                                var result = inner.next();
                                if (!result.done) return result;
                                inner = undefined;
                            }
                            var outer = source.next();
                            if (outer.done) return {
                                done: true,
                                value: undefined
                            };
                            var mapped = fn(outer.value, index++);
                            inner = Symbol.iterator in Object(mapped) ? mapped[Symbol.iterator]() : mapped;
                        }
                    },
                    return: function _return(value) {
                        var _source_return;
                        (_source_return = source.return) === null || _source_return === void 0 ? void 0 : _source_return.call(source);
                        return {
                            done: true,
                            value: value
                        };
                    }
                });
            }
        },
        {
            key: "flat",
            value: function flat() {
                return this.flatMap(function(value) {
                    return value;
                });
            }
        },
        {
            key: "take",
            value: function take(limit) {
                var source = this;
                var count = 0;
                return new I2I({
                    next: function next() {
                        if (count >= limit) return {
                            done: true,
                            value: undefined
                        };
                        var result = source.next();
                        if (!result.done) count++;
                        return result;
                    },
                    return: function _return(value) {
                        return source.return(value);
                    }
                });
            }
        },
        {
            key: "drop",
            value: function drop(limit) {
                var source = this;
                var dropped = false;
                return new I2I({
                    next: function next() {
                        if (!dropped) {
                            for(var i = 0; i < limit; i++){
                                if (source.next().done) return {
                                    done: true,
                                    value: undefined
                                };
                            }
                            dropped = true;
                        }
                        return source.next();
                    },
                    return: function _return(value) {
                        return source.return(value);
                    }
                });
            }
        },
        {
            key: "unique",
            value: function unique(fn) {
                var source = this;
                var seen = new Set();
                var index = 0;
                return new I2I({
                    next: function next() {
                        var result;
                        while(!(result = source.next()).done){
                            var key = fn ? fn(result.value, index++) : result.value;
                            if (!seen.has(key)) {
                                seen.add(key);
                                return result;
                            }
                        }
                        return result;
                    },
                    return: function _return(value) {
                        return source.return(value);
                    }
                });
            }
        },
        {
            key: "chunk",
            value: function chunk(size) {
                if (!Number.isInteger(size) || size < 1) throw new RangeError("Chunk size must be a positive integer");
                var source = this;
                return new I2I({
                    next: function next() {
                        var chunk = [];
                        while(chunk.length < size){
                            var result = source.next();
                            if (result.done) break;
                            chunk.push(result.value);
                        }
                        return chunk.length ? {
                            done: false,
                            value: chunk
                        } : {
                            done: true,
                            value: undefined
                        };
                    },
                    return: function _return(value) {
                        var _source_return;
                        (_source_return = source.return) === null || _source_return === void 0 ? void 0 : _source_return.call(source);
                        return {
                            done: true,
                            value: value
                        };
                    }
                });
            }
        },
        {
            key: "zip",
            value: function zip(other) {
                var left = this;
                var right = new I2I(other);
                return new I2I({
                    next: function next() {
                        var a = left.next();
                        var b = right.next();
                        if (a.done || b.done) {
                            left.return();
                            right.return();
                            return {
                                done: true,
                                value: undefined
                            };
                        }
                        return {
                            done: false,
                            value: [
                                a.value,
                                b.value
                            ]
                        };
                    },
                    return: function _return(value) {
                        left.return();
                        right.return();
                        return {
                            done: true,
                            value: value
                        };
                    }
                });
            }
        },
        {
            key: "concat",
            value: function concat() {
                for(var _len = arguments.length, others = new Array(_len), _key = 0; _key < _len; _key++){
                    others[_key] = arguments[_key];
                }
                var source = this;
                var current = source;
                var index = 0;
                return new I2I({
                    next: function next() {
                        while(true){
                            var result = current.next();
                            if (!result.done) return result;
                            if (index >= others.length) return {
                                done: true,
                                value: undefined
                            };
                            var other = others[index++];
                            current = Symbol.iterator in Object(other) ? other[Symbol.iterator]() : other;
                        }
                    },
                    return: function _return(value) {
                        var _current_return;
                        (_current_return = current.return) === null || _current_return === void 0 ? void 0 : _current_return.call(current, value);
                        return {
                            done: true,
                            value: value
                        };
                    }
                });
            }
        },
        {
            key: "enumerate",
            value: function enumerate() {
                var source = this;
                var index = 0;
                return new I2I({
                    next: function next() {
                        var result = source.next();
                        return result.done ? result : {
                            done: false,
                            value: [
                                index++,
                                result.value
                            ]
                        };
                    },
                    return: function _return(value) {
                        var _source_return;
                        (_source_return = source.return) === null || _source_return === void 0 ? void 0 : _source_return.call(source);
                        return {
                            done: true,
                            value: value
                        };
                    }
                });
            }
        },
        {
            key: "find",
            value: function find(pred) {
                var index = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (pred(value, index++)) return value;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return undefined;
            }
        },
        {
            key: "findIndex",
            value: function findIndex(pred) {
                var index = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (pred(value, index)) return index;
                        index++;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return -1;
            }
        },
        {
            key: "some",
            value: function some(pred) {
                var index = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (pred(value, index++)) return true;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return false;
            }
        },
        {
            key: "every",
            value: function every(pred) {
                var index = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (!pred(value, index++)) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return true;
            }
        },
        {
            key: "reduce",
            value: function reduce(fn, initial) {
                var acc = initial;
                var index = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        acc = fn(acc, value, index++);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return acc;
            }
        },
        {
            key: "forEach",
            value: function forEach(fn) {
                var index = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        fn(value, index++);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            key: "count",
            value: function count() {
                var count = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _ = _step.value;
                        count++;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return count;
            }
        },
        {
            key: "sum",
            value: function sum(fn) {
                var sum = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        sum += fn ? fn(value) : value;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return sum;
            }
        },
        {
            key: "join",
            value: function join() {
                var separator = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ",";
                return this.toArray().join(separator);
            }
        },
        {
            key: "partition",
            value: function partition(pred) {
                var yes = [];
                var no = [];
                var index = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        (pred(value, index++) ? yes : no).push(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return [
                    yes,
                    no
                ];
            }
        },
        {
            key: "group",
            value: function group(fn) {
                var out = new Map();
                var index = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        var key = fn(value, index++);
                        var group = out.get(key);
                        if (!group) out.set(key, group = []);
                        group.push(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "toSet",
            value: function toSet() {
                return new Set(this);
            }
        },
        {
            key: "toMap",
            value: function toMap(keyFn, valueFn) {
                var out = new Map();
                var index = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        out.set(keyFn(value, index), valueFn ? valueFn(value, index) : value);
                        index++;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "isEmpty",
            value: function isEmpty() {
                return this.peek() === undefined;
            }
        },
        {
            key: "exhaust",
            value: function exhaust() {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _ = _step.value;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            key: "clone",
            value: function clone() {
                return new I2I(this.toArray());
            }
        }
    ]);
    return I2I;
}();
globalThis.I2 = iterator_I2I;

function number_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function number_assert_this_initialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function number_call_super(_this, derived, args) {
    derived = number_get_prototype_of(derived);
    return number_possible_constructor_return(_this, number_is_native_reflect_construct() ? Reflect.construct(derived, args || [], number_get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function number_class_call_check(instance, Constructor) {
    if (!number_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function number_construct(Parent, args, Class) {
    if (number_is_native_reflect_construct()) number_construct = Reflect.construct;
    else {
        number_construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) number_set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return number_construct.apply(null, arguments);
}
function number_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function number_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) number_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) number_defineProperties(Constructor, staticProps);
    return Constructor;
}
function number_get_prototype_of(o) {
    number_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return number_get_prototype_of(o);
}
function number_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) number_set_prototype_of(subClass, superClass);
}
function number_is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function number_is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (number_is_native_reflect_construct = function _is_native_reflect_construct() {
        return !!result;
    })();
}
function number_possible_constructor_return(self, call) {
    if (call && (number_type_of(call) === "object" || typeof call === "function")) return call;
    return number_assert_this_initialized(self);
}
function number_set_prototype_of(o, p) {
    number_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return number_set_prototype_of(o, p);
}
function number_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function number_wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    number_wrap_native_super = function _wrap_native_super(Class) {
        if (Class === null || !number_is_native_function(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return number_construct(Class, arguments, number_get_prototype_of(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return number_set_prototype_of(Wrapper, Class);
    };
    return number_wrap_native_super(Class);
}
var number_N2I = /*#__PURE__*/ function(Number1) {
    "use strict";
    number_inherits(N2I, Number1);
    function N2I() {
        number_class_call_check(this, N2I);
        return number_call_super(this, N2I, arguments);
    }
    number_create_class(N2I, [
        {
            key: "abs",
            value: function abs() {
                return new N2I(Math.abs(this.valueOf()));
            }
        },
        {
            key: "sign",
            value: function sign() {
                return new N2I(Math.sign(this.valueOf()));
            }
        },
        {
            key: "neg",
            value: function neg() {
                return new N2I(-this.valueOf());
            }
        },
        {
            key: "inv",
            value: function inv() {
                return new N2I(1 / this.valueOf());
            }
        },
        {
            key: "clamp",
            value: function clamp(min, max) {
                return new N2I(Math.min(Math.max(this.valueOf(), min), max));
            }
        },
        {
            key: "wrap",
            value: function wrap(min, max) {
                var range = max - min;
                if (range <= 0) throw new RangeError("max must be greater than min");
                return new N2I(((this.valueOf() - min) % range + range) % range + min);
            }
        },
        {
            key: "lerp",
            value: function lerp(to, t) {
                return new N2I(this.valueOf() + (to - this.valueOf()) * t);
            }
        },
        {
            key: "map",
            value: function map(inMin, inMax, outMin, outMax) {
                if (inMax === inMin) throw new RangeError("Input range cannot be zero");
                return new N2I(outMin + (this.valueOf() - inMin) / (inMax - inMin) * (outMax - outMin));
            }
        },
        {
            key: "remap",
            value: function remap(inMin, inMax, outMin, outMax) {
                return this.map(inMin, inMax, outMin, outMax);
            }
        },
        {
            key: "roundTo",
            value: function roundTo() {
                var precision = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
                var factor = Math.pow(10, precision);
                return new N2I(Math.round((this.valueOf() + Number.EPSILON) * factor) / factor);
            }
        },
        {
            key: "floorTo",
            value: function floorTo() {
                var precision = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
                var factor = Math.pow(10, precision);
                return new N2I(Math.floor(this.valueOf() * factor) / factor);
            }
        },
        {
            key: "ceilTo",
            value: function ceilTo() {
                var precision = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
                var factor = Math.pow(10, precision);
                return new N2I(Math.ceil(this.valueOf() * factor) / factor);
            }
        },
        {
            key: "truncTo",
            value: function truncTo() {
                var precision = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
                var factor = Math.pow(10, precision);
                return new N2I(Math.trunc(this.valueOf() * factor) / factor);
            }
        },
        {
            key: "isFinite",
            value: function isFinite() {
                return Number.isFinite(this.valueOf());
            }
        },
        {
            key: "isInteger",
            value: function isInteger() {
                return Number.isInteger(this.valueOf());
            }
        },
        {
            key: "isSafeInteger",
            value: function isSafeInteger() {
                return Number.isSafeInteger(this.valueOf());
            }
        },
        {
            key: "isNaN",
            value: function isNaN() {
                return Number.isNaN(this.valueOf());
            }
        },
        {
            key: "isBetween",
            value: function isBetween(min, max) {
                var inclusive = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
                var value = this.valueOf();
                return inclusive ? value >= min && value <= max : value > min && value < max;
            }
        },
        {
            key: "isPositive",
            value: function isPositive() {
                return this.valueOf() > 0;
            }
        },
        {
            key: "isNegative",
            value: function isNegative() {
                return this.valueOf() < 0;
            }
        },
        {
            key: "isZero",
            value: function isZero() {
                return this.valueOf() === 0;
            }
        },
        {
            key: "isEven",
            value: function isEven() {
                var value = this.valueOf();
                return Number.isInteger(value) && value % 2 === 0;
            }
        },
        {
            key: "isOdd",
            value: function isOdd() {
                var value = this.valueOf();
                return Number.isInteger(value) && Math.abs(value % 2) === 1;
            }
        },
        {
            key: "squared",
            value: function squared() {
                return new N2I(Math.pow(this.valueOf(), 2));
            }
        },
        {
            key: "cubed",
            value: function cubed() {
                return new N2I(Math.pow(this.valueOf(), 3));
            }
        },
        {
            key: "sqrt",
            value: function sqrt() {
                return new N2I(Math.sqrt(this.valueOf()));
            }
        },
        {
            key: "cbrt",
            value: function cbrt() {
                return new N2I(Math.cbrt(this.valueOf()));
            }
        },
        {
            key: "pow",
            value: function pow(exponent) {
                return new N2I(Math.pow(this.valueOf(), exponent));
            }
        },
        {
            key: "root",
            value: function root(degree) {
                if (degree === 0) throw new RangeError("Root degree cannot be zero");
                var value = this.valueOf();
                if (value < 0 && Number.isInteger(degree) && Math.abs(degree % 2) === 1) {
                    return new N2I(-Math.pow(-value, 1 / degree));
                }
                return new N2I(Math.pow(value, 1 / degree));
            }
        },
        {
            key: "mod",
            value: function mod(divisor) {
                if (divisor === 0) throw new RangeError("Divisor cannot be zero");
                return new N2I((this.valueOf() % divisor + divisor) % divisor);
            }
        },
        {
            key: "percentOf",
            value: function percentOf(total) {
                return new N2I(this.valueOf() / 100 * total);
            }
        },
        {
            key: "percentChange",
            value: function percentChange(from) {
                if (from === 0) throw new RangeError("Cannot calculate percentage change from zero");
                return new N2I((this.valueOf() - from) / Math.abs(from) * 100);
            }
        },
        {
            key: "toRadians",
            value: function toRadians() {
                return new N2I(this.valueOf() * (Math.PI / 180));
            }
        },
        {
            key: "toDegrees",
            value: function toDegrees() {
                return new N2I(this.valueOf() * (180 / Math.PI));
            }
        },
        {
            key: "toOrdinal",
            value: function toOrdinal() {
                var _;
                var value = this.valueOf();
                var integer = Math.trunc(value);
                var abs = Math.abs(integer);
                var suffix = abs % 100 >= 11 && abs % 100 <= 13 ? "th" : (_ = ({
                    1: "st",
                    2: "nd",
                    3: "rd"
                })[abs % 10]) !== null && _ !== void 0 ? _ : "th";
                return "".concat(value).concat(suffix);
            }
        },
        {
            key: "toBytes",
            value: function toBytes(unit) {
                var decimals = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
                var value = this.valueOf();
                var units = [
                    "B",
                    "KB",
                    "MB",
                    "GB",
                    "TB",
                    "PB",
                    "EB"
                ];
                var index = unit === undefined ? value === 0 ? 0 : Math.min(Math.floor(Math.log(Math.abs(value)) / Math.log(1024)), units.length - 1) : Math.max(0, Math.min(Math.trunc(unit), units.length - 1));
                return "".concat((value / Math.pow(1024, index)).toFixed(decimals), " ").concat(units[index]);
            }
        },
        {
            key: "toCompact",
            value: function toCompact(locales) {
                return new Intl.NumberFormat(locales, {
                    notation: "compact",
                    maximumFractionDigits: 2
                }).format(this.valueOf());
            }
        },
        {
            key: "toCurrency",
            value: function toCurrency() {
                var currency = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "USD", locales = arguments.length > 1 ? arguments[1] : void 0;
                return new Intl.NumberFormat(locales, {
                    style: "currency",
                    currency: currency
                }).format(this.valueOf());
            }
        },
        {
            key: "toPercent",
            value: function toPercent() {
                var decimals = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, locales = arguments.length > 1 ? arguments[1] : void 0;
                return new Intl.NumberFormat(locales, {
                    style: "percent",
                    maximumFractionDigits: decimals
                }).format(this.valueOf());
            }
        },
        {
            key: "times",
            value: function times(fn) {
                var count = this.valueOf();
                for(var i = 0; i < count; i++)fn(i);
                return this;
            }
        },
        {
            key: "upTo",
            value: function upTo(end) {
                var step = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
                if (step <= 0) throw new RangeError("step must be positive");
                var out = [];
                for(var value = this.valueOf(); value <= end; value += step)out.push(value);
                return out;
            }
        },
        {
            key: "downTo",
            value: function downTo(end) {
                var step = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
                if (step <= 0) throw new RangeError("step must be positive");
                var out = [];
                for(var value = this.valueOf(); value >= end; value -= step)out.push(value);
                return out;
            }
        }
    ]);
    return N2I;
}(number_wrap_native_super(Number));
globalThis.N2 = number_N2I;

function object_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function object_array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function object_array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function object_class_call_check(instance, Constructor) {
    if (!object_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function object_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function object_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) object_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) object_defineProperties(Constructor, staticProps);
    return Constructor;
}
function object_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function object_instanceof1(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function object_iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function object_non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function object_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            object_define_property(target, key, source[key]);
        });
    }
    return target;
}
function object_ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function object_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    else {
        object_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function object_sliced_to_array(arr, i) {
    return object_array_with_holes(arr) || object_iterable_to_array_limit(arr, i) || object_unsupported_iterable_to_array(arr, i) || object_non_iterable_rest();
}
function object_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function object_unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return object_array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return object_array_like_to_array(o, minLen);
}
var object_O2I = /*#__PURE__*/ function() {
    "use strict";
    function O2I() {
        object_class_call_check(this, O2I);
    }
    object_create_class(O2I, null, [
        {
            key: "isEmpty",
            value: function isEmpty(value) {
                return Reflect.ownKeys(value).length === 0;
            }
        },
        {
            key: "isNotEmpty",
            value: function isNotEmpty(value) {
                return Reflect.ownKeys(value).length !== 0;
            }
        },
        {
            key: "size",
            value: function size(value) {
                return Reflect.ownKeys(value).length;
            }
        },
        {
            key: "isPlainObject",
            value: function isPlainObject(value) {
                if (value === null || (typeof value === "undefined" ? "undefined" : object_type_of(value)) !== "object") return false;
                var prototype = Object.getPrototypeOf(value);
                return prototype === Object.prototype || prototype === null;
            }
        },
        {
            key: "isObject",
            value: function isObject(value) {
                return value !== null && (typeof value === "undefined" ? "undefined" : object_type_of(value)) === "object";
            }
        },
        {
            key: "get",
            value: function get(value, path, fallback) {
                var parts = typeof path === "string" ? path.split(".") : path;
                var current = value;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var key = _step.value;
                        if (current === null || (typeof current === "undefined" ? "undefined" : object_type_of(current)) !== "object" && typeof current !== "function") {
                            return fallback;
                        }
                        current = current[key];
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return current === undefined ? fallback : current;
            }
        },
        {
            key: "getOr",
            value: function getOr(value, path, fallback) {
                return this.get(value, path, fallback);
            }
        },
        {
            key: "set",
            value: function set(value, path, next) {
                var parts = typeof path === "string" ? path.split(".") : path;
                if (!parts.length) return value;
                var current = value;
                for(var i = 0; i < parts.length - 1; i++){
                    var key = parts[i];
                    var child = current[key];
                    if (child === null || (typeof child === "undefined" ? "undefined" : object_type_of(child)) !== "object" && typeof child !== "function") {
                        current[key] = {};
                    }
                    current = current[key];
                }
                current[parts[parts.length - 1]] = next;
                return value;
            }
        },
        {
            key: "unset",
            value: function unset(value, path) {
                var parts = typeof path === "string" ? path.split(".") : path;
                if (!parts.length) return false;
                var current = value;
                for(var i = 0; i < parts.length - 1; i++){
                    var child = current[parts[i]];
                    if (child === null || (typeof child === "undefined" ? "undefined" : object_type_of(child)) !== "object") return false;
                    current = child;
                }
                return Reflect.deleteProperty(current, parts[parts.length - 1]);
            }
        },
        {
            key: "hasPath",
            value: function hasPath(value, path) {
                var parts = typeof path === "string" ? path.split(".") : path;
                var current = value;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var key = _step.value;
                        if (current === null || (typeof current === "undefined" ? "undefined" : object_type_of(current)) !== "object" && typeof current !== "function") {
                            return false;
                        }
                        if (!Object.prototype.hasOwnProperty.call(current, key)) return false;
                        current = current[key];
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return true;
            }
        },
        {
            key: "clone",
            value: function clone(value) {
                if (value === null || (typeof value === "undefined" ? "undefined" : object_type_of(value)) !== "object") return value;
                if (Array.isArray(value)) return value.slice();
                return Object.assign(Object.create(Object.getPrototypeOf(value)), value);
            }
        },
        {
            key: "deepClone",
            value: function deepClone(value) {
                return structuredClone(value);
            }
        },
        {
            key: "deepMerge",
            value: function deepMerge(target, source) {
                var result = object_object_spread({}, target);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = Reflect.ownKeys(source)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var key = _step.value;
                        var incoming = source[key];
                        var current = result[key];
                        result[key] = this.isPlainObject(current) && this.isPlainObject(incoming) ? this.deepMerge(current, incoming) : incoming;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            }
        },
        {
            key: "defaults",
            value: function defaults(target, _defaults) {
                return Object.assign({}, _defaults, target);
            }
        },
        {
            key: "getOrCreate",
            value: function getOrCreate(value, key, create) {
                var object = value;
                if (!Object.prototype.hasOwnProperty.call(object, key) || object[key] === undefined) {
                    object[key] = create();
                }
                return object;
            }
        },
        {
            key: "pick",
            value: function pick(value, keys) {
                var result = {};
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var key = _step.value;
                        if (Object.prototype.hasOwnProperty.call(value, key)) result[key] = value[key];
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            }
        },
        {
            key: "omit",
            value: function omit(value, keys) {
                var result = object_object_spread({}, value);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var key = _step.value;
                        delete result[key];
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            }
        },
        {
            key: "pickBy",
            value: function pickBy(value, predicate) {
                var result = {};
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = Object.keys(value)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var key = _step.value;
                        if (predicate(value[key], key)) result[key] = value[key];
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            }
        },
        {
            key: "omitBy",
            value: function omitBy(value, predicate) {
                var result = {};
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = Object.keys(value)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var key = _step.value;
                        if (!predicate(value[key], key)) result[key] = value[key];
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            }
        },
        {
            key: "mapKeys",
            value: function mapKeys(value, mapper) {
                var result = {};
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = Object.keys(value)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var key = _step.value;
                        result[mapper(key, value[key])] = value[key];
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            }
        },
        {
            key: "mapValues",
            value: function mapValues(value, mapper) {
                var result = {};
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = Object.keys(value)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var key = _step.value;
                        result[key] = mapper(value[key], key);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            }
        },
        {
            key: "mapEntries",
            value: function mapEntries(value, mapper) {
                var result = {};
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = Object.keys(value)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var key = _step.value;
                        var _mapper = object_sliced_to_array(mapper([
                            key,
                            value[key]
                        ]), 2), nextKey = _mapper[0], nextValue = _mapper[1];
                        result[nextKey] = nextValue;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            }
        },
        {
            key: "filter",
            value: function filter(value, predicate) {
                return this.pickBy(value, predicate);
            }
        },
        {
            key: "isEqual",
            value: function isEqual(first, second) {
                var _this = this;
                if (Object.is(first, second)) return true;
                if (first === null || second === null || (typeof first === "undefined" ? "undefined" : object_type_of(first)) !== "object" || (typeof second === "undefined" ? "undefined" : object_type_of(second)) !== "object") {
                    return false;
                }
                if (object_instanceof1(first, Date) && object_instanceof1(second, Date)) {
                    return first.getTime() === second.getTime();
                }
                if (Array.isArray(first) || Array.isArray(second)) {
                    return Array.isArray(first) && Array.isArray(second) && first.length === second.length && first.every(function(value, index) {
                        return _this.isEqual(value, second[index]);
                    });
                }
                var firstKeys = Reflect.ownKeys(first);
                var secondKeys = Reflect.ownKeys(second);
                return firstKeys.length === secondKeys.length && firstKeys.every(function(key) {
                    return secondKeys.includes(key) && _this.isEqual(first[key], second[key]);
                });
            }
        },
        {
            key: "isShallowEqual",
            value: function isShallowEqual(first, second) {
                if (Object.is(first, second)) return true;
                var firstKeys = Reflect.ownKeys(first);
                var secondKeys = Reflect.ownKeys(second);
                return firstKeys.length === secondKeys.length && firstKeys.every(function(key) {
                    return secondKeys.includes(key) && Object.is(first[key], second[key]);
                });
            }
        },
        {
            key: "hasAll",
            value: function hasAll(value, keys) {
                return keys.every(function(key) {
                    return Object.prototype.hasOwnProperty.call(value, key);
                });
            }
        },
        {
            key: "hasAny",
            value: function hasAny(value, keys) {
                return keys.some(function(key) {
                    return Object.prototype.hasOwnProperty.call(value, key);
                });
            }
        },
        {
            key: "assertKeys",
            value: function assertKeys(value, keys) {
                var missing = keys.filter(function(key) {
                    return !Object.prototype.hasOwnProperty.call(value, key);
                });
                if (missing.length) {
                    throw new TypeError("Missing required keys: ".concat(missing.map(String).join(", ")));
                }
            }
        },
        {
            key: "with",
            value: function _with(value, key, next) {
                return object_object_spread_props(object_object_spread({}, value), object_define_property({}, key, next));
            }
        },
        {
            key: "without",
            value: function without(value, key) {
                var result = object_object_spread({}, value);
                delete result[key];
                return result;
            }
        },
        {
            key: "update",
            value: function update(value, key, updater) {
                return object_object_spread_props(object_object_spread({}, value), object_define_property({}, key, updater(value[key])));
            }
        }
    ]);
    return O2I;
}();
globalThis.O2 = object_O2I;

function promise_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function promise_array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function promise_array_without_holes(arr) {
    if (Array.isArray(arr)) return promise_array_like_to_array(arr);
}
function promise_assert_this_initialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function promise_call_super(_this, derived, args) {
    derived = promise_get_prototype_of(derived);
    return promise_possible_constructor_return(_this, promise_is_native_reflect_construct() ? Reflect.construct(derived, args || [], promise_get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function promise_check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function promise_class_apply_descriptor_get(receiver, descriptor) {
    if (descriptor.get) return descriptor.get.call(receiver);
    return descriptor.value;
}
function promise_class_apply_descriptor_set(receiver, descriptor, value) {
    if (descriptor.set) descriptor.set.call(receiver, value);
    else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
function promise_class_call_check(instance, Constructor) {
    if (!promise_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function promise_class_extract_field_descriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
    return privateMap.get(receiver);
}
function promise_class_private_field_get(receiver, privateMap) {
    var descriptor = promise_class_extract_field_descriptor(receiver, privateMap, "get");
    return promise_class_apply_descriptor_get(receiver, descriptor);
}
function promise_class_private_field_init(obj, privateMap, value) {
    promise_check_private_redeclaration(obj, privateMap);
    privateMap.set(obj, value);
}
function promise_class_private_field_set(receiver, privateMap, value) {
    var descriptor = promise_class_extract_field_descriptor(receiver, privateMap, "set");
    promise_class_apply_descriptor_set(receiver, descriptor, value);
    return value;
}
function promise_construct(Parent, args, Class) {
    if (promise_is_native_reflect_construct()) promise_construct = Reflect.construct;
    else {
        promise_construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) promise_set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return promise_construct.apply(null, arguments);
}
function promise_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function promise_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) promise_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) promise_defineProperties(Constructor, staticProps);
    return Constructor;
}
function promise_get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) promise_get = Reflect.get;
    else {
        promise_get = function get(target, property, receiver) {
            var base = promise_super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) return desc.get.call(receiver || target);
            return desc.value;
        };
    }
    return promise_get(target, property, receiver || target);
}
function promise_get_prototype_of(o) {
    promise_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return promise_get_prototype_of(o);
}
function promise_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) promise_set_prototype_of(subClass, superClass);
}
function promise_is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function promise_is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (promise_is_native_reflect_construct = function _is_native_reflect_construct() {
        return !!result;
    })();
}
function promise_iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function promise_non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function promise_possible_constructor_return(self, call) {
    if (call && (promise_type_of(call) === "object" || typeof call === "function")) return call;
    return promise_assert_this_initialized(self);
}
function promise_set_prototype_of(o, p) {
    promise_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return promise_set_prototype_of(o, p);
}
function promise_super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = promise_get_prototype_of(object);
        if (object === null) break;
    }
    return object;
}
function promise_to_consumable_array(arr) {
    return promise_array_without_holes(arr) || promise_iterable_to_array(arr) || promise_unsupported_iterable_to_array(arr) || promise_non_iterable_spread();
}
function promise_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function promise_unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return promise_array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return promise_array_like_to_array(o, minLen);
}
function promise_wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    promise_wrap_native_super = function _wrap_native_super(Class) {
        if (Class === null || !promise_is_native_function(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return promise_construct(Class, arguments, promise_get_prototype_of(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return promise_set_prototype_of(Wrapper, Class);
    };
    return promise_wrap_native_super(Class);
}
var _createdAt = /*#__PURE__*/ new WeakMap(), _status = /*#__PURE__*/ new WeakMap(), _val = /*#__PURE__*/ new WeakMap(), _err = /*#__PURE__*/ new WeakMap(), _settledAt = /*#__PURE__*/ new WeakMap(), _label = /*#__PURE__*/ new WeakMap();
var promise_P2I = /*#__PURE__*/ function(Promise1) {
    "use strict";
    promise_inherits(P2I, Promise1);
    function P2I(executor) {
        promise_class_call_check(this, P2I);
        var _this;
        _this = promise_call_super(this, P2I, [
            executor
        ]), promise_class_private_field_init(_this, _createdAt, {
            writable: true,
            value: Date.now()
        }), promise_class_private_field_init(_this, _status, {
            writable: true,
            value: "pending"
        }), promise_class_private_field_init(_this, _val, {
            writable: true,
            value: void 0
        }), promise_class_private_field_init(_this, _err, {
            writable: true,
            value: void 0
        }), promise_class_private_field_init(_this, _settledAt, {
            writable: true,
            value: void 0
        }), promise_class_private_field_init(_this, _label, {
            writable: true,
            value: void 0
        });
        promise_get((promise_assert_this_initialized(_this), promise_get_prototype_of(P2I.prototype)), "then", _this).call(_this, function(v) {
            promise_class_private_field_set(_this, _status, "fulfilled");
            promise_class_private_field_set(_this, _val, v);
            promise_class_private_field_set(_this, _settledAt, Date.now());
        }, function(e) {
            promise_class_private_field_set(_this, _status, "rejected");
            promise_class_private_field_set(_this, _err, e);
            promise_class_private_field_set(_this, _settledAt, Date.now());
        });
        return _this;
    }
    promise_create_class(P2I, [
        {
            key: "then",
            value: function then(onfulfilled, onrejected) {
                return promise_get(promise_get_prototype_of(P2I.prototype), "then", this).call(this, onfulfilled, onrejected);
            }
        },
        {
            key: "catch",
            value: function _catch(onrejected) {
                return promise_get(promise_get_prototype_of(P2I.prototype), "catch", this).call(this, onrejected);
            }
        },
        {
            key: "finally",
            value: function _finally(onfinally) {
                return promise_get(promise_get_prototype_of(P2I.prototype), "finally", this).call(this, onfinally);
            }
        },
        {
            //                                                                                     [STATUS]
            // ══════════════════════════════════════════════════════════════════════════════════════════════════════
            key: "status",
            value: function status() {
                return promise_class_private_field_get(this, _status);
            }
        },
        {
            key: "isPending",
            value: function isPending() {
                return promise_class_private_field_get(this, _status) === "pending";
            }
        },
        {
            key: "isFulfilled",
            value: function isFulfilled() {
                return promise_class_private_field_get(this, _status) === "fulfilled";
            }
        },
        {
            key: "isRejected",
            value: function isRejected() {
                return promise_class_private_field_get(this, _status) === "rejected";
            }
        },
        {
            key: "value",
            value: function value() {
                return promise_class_private_field_get(this, _status) === "fulfilled" ? promise_class_private_field_get(this, _val) : undefined;
            }
        },
        {
            key: "error",
            value: function error() {
                return promise_class_private_field_get(this, _status) === "rejected" ? promise_class_private_field_get(this, _err) : undefined;
            }
        },
        {
            key: "elapsed",
            value: function elapsed() {
                return promise_class_private_field_get(this, _settledAt) ? promise_class_private_field_get(this, _settledAt) - promise_class_private_field_get(this, _createdAt) : undefined;
            }
        },
        {
            key: "tap",
            value: function tap(fn) {
                return this.then(function(value) {
                    return P2I.resolve(fn(value)).then(function() {
                        return value;
                    });
                });
            }
        },
        {
            key: "tapError",
            value: function tapError(fn) {
                return this.catch(function(error) {
                    return P2I.resolve(fn(error)).then(function() {
                        throw error;
                    });
                });
            }
        },
        {
            key: "recover",
            value: function recover(fn) {
                return this.catch(fn);
            }
        },
        {
            key: "fallback",
            value: function fallback(value) {
                return this.catch(function() {
                    return value;
                });
            }
        },
        {
            key: "timeout",
            value: function timeout(ms) {
                var _this = this;
                var error = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : new Error("Promise timed out");
                return new P2I(function(resolve, reject) {
                    var timer = setTimeout(function() {
                        return reject(error);
                    }, ms);
                    _this.then(function(value) {
                        clearTimeout(timer);
                        resolve(value);
                    }, function(reason) {
                        clearTimeout(timer);
                        reject(reason);
                    });
                });
            }
        },
        {
            key: "delay",
            value: function delay(ms) {
                return this.then(function(value) {
                    return new P2I(function(resolve) {
                        return setTimeout(function() {
                            return resolve(value);
                        }, ms);
                    });
                });
            }
        },
        {
            key: "withDeadline",
            value: function withDeadline(deadline) {
                var error = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : new Error("Deadline exceeded");
                return this.timeout(Math.max(0, deadline - Date.now()), error);
            }
        },
        {
            key: "map",
            value: function map(fn) {
                return this.then(fn);
            }
        },
        {
            key: "flatMap",
            value: function flatMap(fn) {
                return this.then(fn);
            }
        },
        {
            key: "or",
            value: function or(other) {
                return this.catch(function() {
                    return other;
                });
            }
        },
        {
            key: "and",
            value: function and(other) {
                return this.then(function(value) {
                    return P2I.resolve(other).then(function(result) {
                        return [
                            value,
                            result
                        ];
                    });
                });
            }
        },
        {
            key: "zip",
            value: function zip(other) {
                return this.and(other);
            }
        },
        {
            key: "unwrap",
            value: function unwrap() {
                return this;
            }
        },
        {
            key: "toResult",
            value: function toResult() {
                return this.then(function(value) {
                    return {
                        ok: true,
                        value: value
                    };
                }, function(error) {
                    return {
                        ok: false,
                        error: error
                    };
                });
            }
        },
        {
            key: "onResolve",
            value: function onResolve(fn) {
                return this.tap(fn);
            }
        },
        {
            key: "onReject",
            value: function onReject(fn) {
                return this.tapError(fn);
            }
        },
        {
            key: "finallyDo",
            value: function finallyDo(fn) {
                return this.finally(fn);
            }
        },
        {
            //                                                                                      [DEBUG]
            // ══════════════════════════════════════════════════════════════════════════════════════════════════════
            key: "$label",
            value: function $label(name) {
                promise_class_private_field_set(this, _label, name);
                return this;
            }
        },
        {
            key: "$debug",
            value: function $debug() {
                var _this = this;
                var tag = promise_class_private_field_get(this, _label) ? ":".concat(promise_class_private_field_get(this, _label)) : "";
                promise_get(promise_get_prototype_of(P2I.prototype), "then", this).call(this, function(v) {
                    return console.log("[P2".concat(tag, "] ✓ resolved"), v, "(".concat(_this.elapsed(), "ms)"));
                }, function(e) {
                    return console.log("[P2".concat(tag, "] ✗ rejected"), e, "(".concat(_this.elapsed(), "ms)"));
                });
                return this;
            }
        }
    ], [
        {
            key: Symbol.species,
            get: function get() {
                return P2I;
            }
        },
        {
            key: "resolve",
            value: function resolve(value) {
                return new P2I(function(resolve) {
                    return resolve(value);
                });
            }
        },
        {
            key: "reject",
            value: function reject(reason) {
                return new P2I(function(_, reject) {
                    return reject(reason);
                });
            }
        },
        {
            key: "all",
            value: function all(values) {
                return new P2I(function(resolve, reject) {
                    Promise.all(values).then(resolve, reject);
                });
            }
        },
        {
            key: "allSettled",
            value: function allSettled(values) {
                return new P2I(function(resolve, reject) {
                    Promise.allSettled(values).then(resolve, reject);
                });
            }
        },
        {
            key: "race",
            value: function race(values) {
                return new P2I(function(resolve, reject) {
                    Promise.race(values).then(resolve, reject);
                });
            }
        },
        {
            key: "any",
            value: function any(values) {
                return new P2I(function(resolve, reject) {
                    Promise.any(values).then(resolve, reject);
                });
            }
        },
        {
            key: "retry",
            value: function retry(fn) {
                var times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3, delay = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
                var run = function run1(remaining) {
                    return P2I.try(fn).catch(function(error) {
                        if (remaining <= 0) throw error;
                        return new P2I(function(resolve) {
                            if (delay > 0) setTimeout(resolve, delay);
                            else resolve();
                        }).then(function() {
                            return run(remaining - 1);
                        });
                    });
                };
                return run(times);
            }
        },
        {
            key: "deferred",
            value: function deferred() {
                var resolve;
                var reject;
                var promise = new P2I(function(res, rej) {
                    resolve = res;
                    reject = rej;
                });
                return {
                    promise: promise,
                    resolve: resolve,
                    reject: reject
                };
            }
        },
        {
            key: "try",
            value: function _try(fn) {
                return new P2I(function(resolve, reject) {
                    try {
                        resolve(fn());
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        },
        {
            key: "sleep",
            value: // ══════════════════════════════════════════════════════════════════════════════════════════════════════
            function sleep(ms) {
                return new P2I(function(resolve) {
                    return setTimeout(resolve, ms);
                });
            }
        },
        {
            key: "fromCallback",
            value: function fromCallback(fn) {
                return new P2I(function(resolve, reject) {
                    fn(function(err, value) {
                        if (err) reject(err);
                        else resolve(value);
                    });
                });
            }
        },
        {
            key: "mapLimit",
            value: function mapLimit(items, limit, fn) {
                return new P2I(function(resolve, reject) {
                    var results = new Array(items.length);
                    var next = 0;
                    var active = 0;
                    var done = 0;
                    var failed = false;
                    var run = function run1() {
                        var _loop = function _loop() {
                            var i = next++;
                            active++;
                            P2I.try(function() {
                                return fn(items[i], i);
                            }).then(function(v) {
                                results[i] = v;
                                active--;
                                done++;
                                run();
                            }, function(e) {
                                failed = true;
                                reject(e);
                            });
                        };
                        if (failed) return;
                        if (done === items.length) {
                            resolve(results);
                            return;
                        }
                        while(active < limit && next < items.length)_loop();
                    };
                    run();
                });
            }
        },
        {
            key: "series",
            value: function series(fns) {
                return fns.reduce(function(acc, fn) {
                    return acc.then(function(results) {
                        return P2I.resolve(fn()).then(function(v) {
                            return promise_to_consumable_array(results).concat([
                                v
                            ]);
                        });
                    });
                }, P2I.resolve([]));
            }
        }
    ]);
    return P2I;
}(promise_wrap_native_super(Promise));
globalThis.P2 = promise_P2I;

function reg_ex_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function reg_ex_array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function reg_ex_array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function reg_ex_array_without_holes(arr) {
    if (Array.isArray(arr)) return reg_ex_array_like_to_array(arr);
}
function reg_ex_check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function reg_ex_class_apply_descriptor_get(receiver, descriptor) {
    if (descriptor.get) return descriptor.get.call(receiver);
    return descriptor.value;
}
function reg_ex_class_apply_descriptor_set(receiver, descriptor, value) {
    if (descriptor.set) descriptor.set.call(receiver, value);
    else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
function reg_ex_class_call_check(instance, Constructor) {
    if (!reg_ex_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function reg_ex_class_extract_field_descriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
    return privateMap.get(receiver);
}
function reg_ex_class_private_field_get(receiver, privateMap) {
    var descriptor = reg_ex_class_extract_field_descriptor(receiver, privateMap, "get");
    return reg_ex_class_apply_descriptor_get(receiver, descriptor);
}
function reg_ex_class_private_field_init(obj, privateMap, value) {
    reg_ex_check_private_redeclaration(obj, privateMap);
    privateMap.set(obj, value);
}
function reg_ex_class_private_field_set(receiver, privateMap, value) {
    var descriptor = reg_ex_class_extract_field_descriptor(receiver, privateMap, "set");
    reg_ex_class_apply_descriptor_set(receiver, descriptor, value);
    return value;
}
function reg_ex_class_private_method_get(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}
function reg_ex_class_private_method_init(obj, privateSet) {
    reg_ex_check_private_redeclaration(obj, privateSet);
    privateSet.add(obj);
}
function reg_ex_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function reg_ex_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) reg_ex_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) reg_ex_defineProperties(Constructor, staticProps);
    return Constructor;
}
function reg_ex_instanceof1(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function reg_ex_iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function reg_ex_iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function reg_ex_non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function reg_ex_non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function reg_ex_sliced_to_array(arr, i) {
    return reg_ex_array_with_holes(arr) || reg_ex_iterable_to_array_limit(arr, i) || reg_ex_unsupported_iterable_to_array(arr, i) || reg_ex_non_iterable_rest();
}
function reg_ex_to_consumable_array(arr) {
    return reg_ex_array_without_holes(arr) || reg_ex_iterable_to_array(arr) || reg_ex_unsupported_iterable_to_array(arr) || reg_ex_non_iterable_spread();
}
function reg_ex_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function reg_ex_unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return reg_ex_array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return reg_ex_array_like_to_array(o, minLen);
}
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function escapeForClass(chars) {
    return chars.replace(/[\]\\^-]/g, "\\$&");
}
function toSource(input) {
    if (typeof input === "string") return input;
    return input.source;
}
function isBalancedGroup(src) {
    if (src[0] !== "(" || src[src.length - 1] !== ")") return false;
    var depth = 0;
    for(var i = 0; i < src.length; i++){
        if (src[i] === "\\") {
            i++;
            continue;
        }
        if (src[i] === "(") depth++;
        else if (src[i] === ")") {
            depth--;
            if (depth === 0 && i !== src.length - 1) return false;
        }
    }
    return true;
}
function isBalancedClass(src) {
    if (src[0] !== "[" || src[src.length - 1] !== "]") return false;
    for(var i = 1; i < src.length - 1; i++){
        if (src[i] === "\\") {
            i++;
            continue;
        }
        if (src[i] === "]") return false;
    }
    return true;
}
function wrapForConcat(src) {
    if (src.length === 1) return src;
    if (/^\\.$/.test(src)) return src;
    if (/^\[.*\]$/.test(src) && isBalancedClass(src)) return src;
    if (/^\(.*\)$/.test(src) && isBalancedGroup(src)) return src;
    return "(?:".concat(src, ")");
}
function mergeFlags(base, parts) {
    var set = new Set(base.split(""));
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var p = _step.value;
            if (reg_ex_instanceof1(p, reg_ex_REC2) || reg_ex_instanceof1(p, RegExp)) p.flags.split("").forEach(function(f) {
                return set.add(f);
            });
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return reg_ex_to_consumable_array(set).join("");
}
var _re = /*#__PURE__*/ new WeakMap(), //                                                                                             [REPLACE]
// #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
_parseArgs = /*#__PURE__*/ new WeakSet(), _forceGlobal = /*#__PURE__*/ new WeakSet();
var reg_ex_REC2 = /*#__PURE__*/ function() {
    "use strict";
    function REC2(source) {
        var flags = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        reg_ex_class_call_check(this, REC2);
        reg_ex_class_private_method_init(this, _parseArgs);
        reg_ex_class_private_method_init(this, _forceGlobal);
        reg_ex_class_private_field_init(this, _re, {
            writable: true,
            value: void 0
        });
        reg_ex_class_private_field_set(this, _re, new RegExp(source, flags));
    }
    reg_ex_create_class(REC2, [
        {
            key: "source",
            get: // #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
            function get() {
                return reg_ex_class_private_field_get(this, _re).source;
            }
        },
        {
            key: "flags",
            get: function get() {
                return reg_ex_class_private_field_get(this, _re).flags;
            }
        },
        {
            key: "global",
            get: function get() {
                return reg_ex_class_private_field_get(this, _re).global;
            }
        },
        {
            key: "ignoreCase",
            get: function get() {
                return reg_ex_class_private_field_get(this, _re).ignoreCase;
            }
        },
        {
            key: "multiline",
            get: function get() {
                return reg_ex_class_private_field_get(this, _re).multiline;
            }
        },
        {
            key: "sticky",
            get: function get() {
                return reg_ex_class_private_field_get(this, _re).sticky;
            }
        },
        {
            key: "unicode",
            get: function get() {
                return reg_ex_class_private_field_get(this, _re).unicode;
            }
        },
        {
            key: "dotAll",
            get: function get() {
                return reg_ex_class_private_field_get(this, _re).dotAll;
            }
        },
        {
            key: "hasIndices",
            get: function get() {
                return reg_ex_class_private_field_get(this, _re).hasIndices;
            }
        },
        {
            key: "toRegExp",
            value: function toRegExp() {
                return new RegExp(reg_ex_class_private_field_get(this, _re).source, reg_ex_class_private_field_get(this, _re).flags);
            }
        },
        {
            // #endregion
            //                                                                                                [BASE]
            // #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
            key: "test",
            value: function test(str) {
                return new RegExp(reg_ex_class_private_field_get(this, _re).source, reg_ex_class_private_field_get(this, _re).flags).test(str);
            }
        },
        {
            key: "h",
            value: function h(str) {
                return this.test(str);
            }
        },
        {
            key: "exec",
            value: function exec(str) {
                return new RegExp(reg_ex_class_private_field_get(this, _re).source, reg_ex_class_private_field_get(this, _re).flags).exec(str);
            }
        },
        {
            key: "g",
            value: function g(str) {
                var _this_exec;
                return (_this_exec = this.exec(str)) === null || _this_exec === void 0 ? void 0 : _this_exec[0];
            }
        },
        {
            key: "at",
            value: function at(str, n) {
                var _all_i;
                var all = this.matches(str);
                var i = n < 0 ? all.length + n : n;
                return (_all_i = all[i]) === null || _all_i === void 0 ? void 0 : _all_i.match;
            }
        },
        {
            key: "groups",
            value: function groups(str) {
                var _this_exec;
                return (_this_exec = this.exec(str)) === null || _this_exec === void 0 ? void 0 : _this_exec.groups;
            }
        },
        {
            key: "group",
            value: function group(str, name) {
                var _m_groups;
                var m = this.exec(str);
                if (!m) return undefined;
                return typeof name === "number" ? m[name] : (_m_groups = m.groups) === null || _m_groups === void 0 ? void 0 : _m_groups[name];
            }
        },
        {
            key: "index",
            value: function index(str) {
                var _ref;
                var _this_exec;
                return (_ref = (_this_exec = this.exec(str)) === null || _this_exec === void 0 ? void 0 : _this_exec.index) !== null && _ref !== void 0 ? _ref : -1;
            }
        },
        {
            key: "lastIndexOf",
            value: function lastIndexOf(str) {
                var all = this.matches(str);
                return all.length ? all[all.length - 1].index : -1;
            }
        },
        {
            key: "span",
            value: function span(str) {
                var m = this.exec(str);
                return m ? [
                    m.index,
                    m.index + m[0].length
                ] : undefined;
            }
        },
        {
            // #endregion
            //                                                                                             [COLLECT]
            // #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
            key: "all",
            value: function all(str) {
                return this.matches(str).map(function(m) {
                    return m.match;
                });
            }
        },
        {
            key: "matches",
            value: function matches(str) {
                var out = [];
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = str.matchAll(reg_ex_class_private_method_get(this, _forceGlobal, forceGlobal).call(this))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var m = _step.value;
                        out.push({
                            match: m[0],
                            index: m.index,
                            lastIndex: m.index + m[0].length,
                            groups: m.groups,
                            raw: m
                        });
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "allGroups",
            value: function allGroups(str) {
                return this.matches(str).map(function(m) {
                    var _m_groups;
                    return (_m_groups = m.groups) !== null && _m_groups !== void 0 ? _m_groups : {};
                });
            }
        },
        {
            key: "allSpans",
            value: function allSpans(str) {
                return this.matches(str).map(function(m) {
                    return [
                        m.index,
                        m.lastIndex
                    ];
                });
            }
        },
        {
            key: "count",
            value: function count(str) {
                return this.matches(str).length;
            }
        },
        {
            key: "positions",
            value: function positions(str) {
                return this.matches(str).map(function(m) {
                    return m.index;
                });
            }
        },
        {
            key: "replace",
            value: function replace(str, fn) {
                var _this = this;
                var re = new RegExp(reg_ex_class_private_field_get(this, _re).source, reg_ex_class_private_field_get(this, _re).flags);
                if (typeof fn === "string") return str.replace(re, fn);
                return str.replace(re, function() {
                    for(var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++){
                        a[_key] = arguments[_key];
                    }
                    var _class_private_method_get_call = reg_ex_sliced_to_array(reg_ex_class_private_method_get(_this, _parseArgs, parseArgs).call(_this, a, str), 3), raw = _class_private_method_get_call[0], groups = _class_private_method_get_call[1], index = _class_private_method_get_call[2];
                    return fn(raw, groups, index, str);
                });
            }
        },
        {
            key: "replaceFirst",
            value: function replaceFirst(str, fn) {
                var _this = this;
                var re = new RegExp(reg_ex_class_private_field_get(this, _re).source, reg_ex_class_private_field_get(this, _re).flags.replace("g", ""));
                if (typeof fn === "string") return str.replace(re, fn);
                return str.replace(re, function() {
                    for(var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++){
                        a[_key] = arguments[_key];
                    }
                    var _class_private_method_get_call = reg_ex_sliced_to_array(reg_ex_class_private_method_get(_this, _parseArgs, parseArgs).call(_this, a, str), 3), raw = _class_private_method_get_call[0], groups = _class_private_method_get_call[1], index = _class_private_method_get_call[2];
                    return fn(raw, groups, index, str);
                });
            }
        },
        {
            key: "replaceAt",
            value: function replaceAt(str, n, fn) {
                var _this = this;
                var total = this.matches(str).length;
                var target = n < 0 ? total + n : n;
                var i = 0;
                return str.replace(reg_ex_class_private_method_get(this, _forceGlobal, forceGlobal).call(this), function() {
                    for(var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++){
                        a[_key] = arguments[_key];
                    }
                    var match = a[0];
                    var isTarget = i === target;
                    i++;
                    if (!isTarget) return match;
                    if (typeof fn === "string") return fn;
                    var _class_private_method_get_call = reg_ex_sliced_to_array(reg_ex_class_private_method_get(_this, _parseArgs, parseArgs).call(_this, a, str), 3), raw = _class_private_method_get_call[0], groups = _class_private_method_get_call[1], index = _class_private_method_get_call[2];
                    return fn(raw, groups, index, str);
                });
            }
        },
        {
            key: "remove",
            value: function remove(str) {
                return this.replace(str, "");
            }
        },
        {
            key: "removeFirst",
            value: function removeFirst(str) {
                return this.replaceFirst(str, "");
            }
        },
        {
            key: "split",
            value: function split(str, limit) {
                return str.split(new RegExp(reg_ex_class_private_field_get(this, _re).source, reg_ex_class_private_field_get(this, _re).flags), limit);
            }
        },
        {
            key: "splitKeep",
            value: function splitKeep(str) {
                var flags = this.flags.includes("g") ? this.flags : this.flags + "g";
                var re = new RegExp("(".concat(reg_ex_class_private_field_get(this, _re).source, ")"), flags);
                return str.split(re).filter(function(s) {
                    return s !== "";
                });
            }
        },
        {
            // #endregion
            //                                                                                               [BUILD]
            // #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
            key: "withFlags",
            value: function withFlags(flags) {
                return new REC2(reg_ex_class_private_field_get(this, _re).source, flags);
            }
        },
        {
            key: "addFlag",
            value: function addFlag(flag) {
                return this.flags.includes(flag) ? this.clone() : new REC2(reg_ex_class_private_field_get(this, _re).source, this.flags + flag);
            }
        },
        {
            key: "removeFlag",
            value: function removeFlag(flag) {
                return new REC2(reg_ex_class_private_field_get(this, _re).source, this.flags.replace(flag, ""));
            }
        },
        {
            key: "toggleFlag",
            value: function toggleFlag(flag) {
                return this.flags.includes(flag) ? this.removeFlag(flag) : this.addFlag(flag);
            }
        },
        {
            key: "withSource",
            value: function withSource(src) {
                return new REC2(src, this.flags);
            }
        },
        {
            key: "and",
            value: function and() {
                for(var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++){
                    parts[_key] = arguments[_key];
                }
                var src = [
                    reg_ex_class_private_field_get(this, _re).source
                ].concat(reg_ex_to_consumable_array(parts.map(toSource))).map(wrapForConcat).join("");
                return new REC2(src, mergeFlags(this.flags, parts));
            }
        },
        {
            key: "or",
            value: function or() {
                for(var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++){
                    parts[_key] = arguments[_key];
                }
                var src = "(?:".concat([
                    reg_ex_class_private_field_get(this, _re).source
                ].concat(reg_ex_to_consumable_array(parts.map(toSource))).join("|"), ")");
                return new REC2(src, mergeFlags(this.flags, parts));
            }
        },
        {
            key: "cap",
            value: function cap(expr) {
                return new REC2("(".concat(expr === undefined ? reg_ex_class_private_field_get(this, _re).source : toSource(expr), ")"), this.flags);
            }
        },
        {
            key: "namedGroup",
            value: function namedGroup(name, expr) {
                return new REC2("(?<".concat(name, ">").concat(toSource(expr), ")"), this.flags);
            }
        },
        {
            key: "nonCap",
            value: function nonCap(expr) {
                return new REC2("(?:".concat(toSource(expr), ")"), this.flags);
            }
        },
        {
            key: "lookahead",
            value: function lookahead(expr) {
                return new REC2("(?=".concat(toSource(expr), ")"), this.flags);
            }
        },
        {
            key: "notLookahead",
            value: function notLookahead(expr) {
                return new REC2("(?!".concat(toSource(expr), ")"), this.flags);
            }
        },
        {
            key: "lookbehind",
            value: function lookbehind(expr) {
                return new REC2("(?<=".concat(toSource(expr), ")"), this.flags);
            }
        },
        {
            key: "notLookbehind",
            value: function notLookbehind(expr) {
                return new REC2("(?<!".concat(toSource(expr), ")"), this.flags);
            }
        },
        {
            key: "optional",
            value: function optional(expr) {
                return new REC2("".concat(wrapForConcat(expr === undefined ? reg_ex_class_private_field_get(this, _re).source : toSource(expr)), "?"), this.flags);
            }
        },
        {
            key: "many",
            value: function many(expr) {
                return new REC2("".concat(wrapForConcat(expr === undefined ? reg_ex_class_private_field_get(this, _re).source : toSource(expr)), "+"), this.flags);
            }
        },
        {
            key: "maybeMany",
            value: function maybeMany(expr) {
                return new REC2("".concat(wrapForConcat(expr === undefined ? reg_ex_class_private_field_get(this, _re).source : toSource(expr)), "*"), this.flags);
            }
        },
        {
            key: "repeat",
            value: function repeat(n, max, expr) {
                var src = wrapForConcat(expr === undefined ? reg_ex_class_private_field_get(this, _re).source : toSource(expr));
                return new REC2("".concat(src).concat(max === undefined ? "{".concat(n, "}") : "{".concat(n, ",").concat(max, "}")), this.flags);
            }
        },
        {
            /**
	 * [BEST-EFFORT] Appends `?` after a trailing `*`/`+`/`?`/`{n,m}` to make it lazy.
	 * Only looks at the END of the source — it's not a regex parser, it won't find
	 * quantifiers buried mid-pattern. Meant to be chained right after .optional()/
	 * .many()/.maybeMany()/.repeat(), where the quantifier IS the last token.
	 * If no trailing quantifier is found, returns an unchanged clone.
	 */ key: "lazy",
            value: function lazy() {
                var src = reg_ex_class_private_field_get(this, _re).source;
                if (/[*+?]$/.test(src) || /\{\d+(,\d*)?\}$/.test(src)) return new REC2("".concat(src, "?"), this.flags);
                return this.clone();
            }
        },
        {
            // #endregion
            //                                                                                        [DEBUG/SAFETY]
            // #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
            key: "$trace",
            value: function $trace(str) {
                return this.matches(str);
            }
        },
        {
            key: "$explain",
            value: function $explain() {
                var flagNotes = [];
                if (this.global) flagNotes.push("matches all occurrences (g)");
                if (this.ignoreCase) flagNotes.push("case-insensitive (i)");
                if (this.multiline) flagNotes.push("^/$ match per line (m)");
                if (this.dotAll) flagNotes.push(". matches newlines (s)");
                if (this.sticky) flagNotes.push("sticky from lastIndex (y)");
                if (this.unicode) flagNotes.push("unicode mode (u)");
                return reg_ex_to_consumable_array(flagNotes).concat([
                    "pattern:"
                ], reg_ex_to_consumable_array(explainSource(reg_ex_class_private_field_get(this, _re).source).map(function(l) {
                    return "  ".concat(l);
                })));
            }
        },
        {
            key: "$risky",
            value: function $risky() {
                return /\([^)]*[+*][^)]*\)[+*]/.test(reg_ex_class_private_field_get(this, _re).source);
            }
        },
        {
            key: "$bench",
            value: function $bench(str) {
                var iterations = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1000;
                var re = new RegExp(reg_ex_class_private_field_get(this, _re).source, this.flags);
                var start = performance.now();
                for(var i = 0; i < iterations; i++)re.test(str);
                return performance.now() - start;
            }
        },
        {
            // #endregion
            //                                                                                              [CODECS]
            // #region ══════════════════════════════════════════════════════════════════════════════════════════════════════
            key: "toString",
            value: function toString() {
                return reg_ex_class_private_field_get(this, _re).toString();
            }
        },
        {
            key: "equals",
            value: function equals(other) {
                var o = typeof other === "string" ? new RegExp(other) : reg_ex_instanceof1(other, RegExp) ? other : other; // remaining case is RE2_IF, which has .source/.flags already
                return reg_ex_class_private_field_get(this, _re).source === o.source && reg_ex_class_private_field_get(this, _re).flags === o.flags;
            }
        },
        {
            key: "clone",
            value: function clone() {
                return new REC2(reg_ex_class_private_field_get(this, _re).source, this.flags);
            }
        }
    ], [
        {
            key: "fromRegExp",
            value: function fromRegExp(re) {
                return new REC2(re.source, re.flags);
            }
        }
    ]);
    return REC2;
}();
function parseArgs(args, str) {
    var groups = reg_ex_type_of(args[args.length - 1]) === "object" ? args.pop() : undefined;
    var index = args[args.length - 2];
    var raw = [
        args[0]
    ].concat(reg_ex_to_consumable_array(args.slice(1, -2)));
    raw.index = index;
    raw.input = str;
    raw.groups = groups;
    return [
        raw,
        groups,
        index
    ];
}
function forceGlobal() {
    var flags = this.flags.includes("g") ? this.flags : this.flags + "g";
    return new RegExp(reg_ex_class_private_field_get(this, _re).source, flags);
}
function explainSource(source) {
    var i = 0;
    var n = source.length;
    var peek = function peek() {
        return source[i];
    };
    var eof = function eof() {
        return i >= n;
    };
    function parseAlt() {
        var branches = [
            parseSeq()
        ];
        while(!eof() && peek() === "|"){
            i++;
            branches.push(parseSeq());
        }
        return branches.length === 1 ? branches[0] : {
            desc: "one of:",
            children: branches
        };
    }
    function parseSeq() {
        var items = [];
        while(!eof() && peek() !== "|" && peek() !== ")")items.push(parseQuantified());
        if (items.length === 0) return {
            desc: "(empty)"
        };
        return items.length === 1 ? items[0] : {
            desc: "in sequence:",
            children: items
        };
    }
    function parseQuantified() {
        var atom = parseAtom();
        if (eof()) return atom;
        var quant;
        var c = peek();
        if (c === "*") {
            i++;
            quant = "zero or more";
        } else if (c === "+") {
            i++;
            quant = "one or more";
        } else if (c === "?") {
            i++;
            quant = "optional (zero or one)";
        } else if (c === "{") {
            var m = /^\{(\d+)(,(\d*))?\}/.exec(source.slice(i));
            if (m) {
                i += m[0].length;
                quant = m[2] === undefined ? "exactly ".concat(m[1], " time").concat(m[1] === "1" ? "" : "s") : m[3] === "" ? "".concat(m[1], " or more times") : "between ".concat(m[1], " and ").concat(m[3], " times");
            }
        }
        if (!quant) return atom;
        var lazy = false;
        if (!eof() && peek() === "?") {
            i++;
            lazy = true;
        }
        return {
            desc: "".concat(atom.desc, " — ").concat(quant).concat(lazy ? " (lazy, as few as possible)" : ""),
            children: atom.children
        };
    }
    function parseAtom() {
        var c = peek();
        if (c === "(") return parseGroup();
        if (c === "[") return parseClass();
        if (c === "^") {
            i++;
            return {
                desc: "start of string/line"
            };
        }
        if (c === "$") {
            i++;
            return {
                desc: "end of string/line"
            };
        }
        if (c === ".") {
            i++;
            return {
                desc: "any character"
            };
        }
        if (c === "\\") return parseEscape();
        var lit = "";
        while(!eof() && !"\\^$.|?*+()[]{}".includes(peek()))lit += source[i++];
        if (lit) return {
            desc: 'literally "'.concat(lit, '"')
        };
        i++;
        return {
            desc: 'literally "'.concat(c, '"')
        };
    }
    function parseEscape() {
        var _map_c;
        i++;
        var c = source[i++];
        var map = {
            d: "a digit",
            D: "a non-digit",
            w: "a word character",
            W: "a non-word character",
            s: "whitespace",
            S: "non-whitespace",
            b: "a word boundary",
            B: "not a word boundary",
            n: "a newline",
            t: "a tab",
            r: "a carriage return"
        };
        return {
            desc: (_map_c = map[c]) !== null && _map_c !== void 0 ? _map_c : 'literally "'.concat(c, '"')
        };
    }
    function parseClass() {
        i++;
        var negate = false;
        if (peek() === "^") {
            negate = true;
            i++;
        }
        var body = "";
        while(!eof() && peek() !== "]"){
            body += peek() === "\\" ? source[i++] + source[i++] : source[i++];
        }
        i++;
        return {
            desc: "".concat(negate ? "any character NOT" : "any character", " in [").concat(body, "]")
        };
    }
    function parseGroup() {
        i++; // consume '('
        var kind = "capturing group";
        if (peek() === "?") {
            var c2 = source[i + 1];
            if (c2 === ":") {
                i += 2;
                kind = "non-capturing group";
            } else if (c2 === "=") {
                i += 2;
                kind = "lookahead — must be followed by";
            } else if (c2 === "!") {
                i += 2;
                kind = "negative lookahead — must NOT be followed by";
            } else if (c2 === "<" && source[i + 2] === "=") {
                i += 3;
                kind = "lookbehind — must be preceded by";
            } else if (c2 === "<" && source[i + 2] === "!") {
                i += 3;
                kind = "negative lookbehind — must NOT be preceded by";
            } else if (c2 === "<") {
                i += 2;
                var nm = "";
                while(source[i] !== ">")nm += source[i++];
                i++;
                kind = 'named capturing group "'.concat(nm, '"');
            }
        }
        var inner = parseAlt();
        if (peek() === ")") i++;
        return {
            desc: kind,
            children: [
                inner
            ]
        };
    }
    var tree = parseAlt();
    var lines = [];
    (function render(node, depth) {
        var _node_children;
        lines.push("".concat("  ".repeat(depth)).concat(node.desc));
        (_node_children = node.children) === null || _node_children === void 0 ? void 0 : _node_children.forEach(function(c) {
            return render(c, depth + 1);
        });
    })(tree, 0);
    return lines;
}
//                                                                                       [STATICS / PRESETS]
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
var RECC2 = Object.assign(function(input, flags) {
    return RECC2.of(input, flags);
}, {
    of: function of(input, flags) {
        if (typeof input === "string") return new reg_ex_REC2(input, flags !== null && flags !== void 0 ? flags : "");
        if (reg_ex_instanceof1(input, RegExp)) return new reg_ex_REC2(input.source, flags !== null && flags !== void 0 ? flags : input.flags);
        // remaining case is RE2_IF
        return flags !== undefined ? input.withFlags(flags) : input.clone();
    },
    escape: escapeRegex,
    literal: function literal(str) {
        return new reg_ex_REC2(escapeRegex(str));
    },
    seq: function seq() {
        for(var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++){
            parts[_key] = arguments[_key];
        }
        return new reg_ex_REC2(parts.map(function(p) {
            return wrapForConcat(toSource(p));
        }).join(""), mergeFlags("", parts));
    },
    alt: function alt() {
        for(var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++){
            parts[_key] = arguments[_key];
        }
        return new reg_ex_REC2("(?:".concat(parts.map(toSource).join("|"), ")"), mergeFlags("", parts));
    },
    digit: new reg_ex_REC2("\\d"),
    word: new reg_ex_REC2("\\w"),
    space: new reg_ex_REC2("\\s"),
    any: new reg_ex_REC2("."),
    notDigit: new reg_ex_REC2("\\D"),
    notWord: new reg_ex_REC2("\\W"),
    notSpace: new reg_ex_REC2("\\S"),
    range: function range(from, to) {
        return new reg_ex_REC2("[".concat(from, "-").concat(to, "]"));
    },
    oneOf: function oneOf(chars) {
        return new reg_ex_REC2("[".concat(escapeForClass(chars), "]"));
    },
    noneOf: function noneOf(chars) {
        return new reg_ex_REC2("[^".concat(escapeForClass(chars), "]"));
    },
    email: new reg_ex_REC2("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"),
    url: new reg_ex_REC2("https?:\\/\\/[^\\s/$.?#].[^\\s]*", "i"),
    uuid: new reg_ex_REC2("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", "i"),
    ipv4: new reg_ex_REC2("(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)"),
    ipv6: new reg_ex_REC2("(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}"),
    hex: new reg_ex_REC2("[0-9a-fA-F]+"),
    hexColor: new reg_ex_REC2("#(?:[0-9a-fA-F]{3}){1,2}\\b"),
    slug: new reg_ex_REC2("[a-z0-9]+(?:-[a-z0-9]+)*"),
    alphaNumeric: new reg_ex_REC2("[a-zA-Z0-9]+"),
    integer: new reg_ex_REC2("-?\\d+"),
    float: new reg_ex_REC2("-?\\d+(?:\\.\\d+)?"),
    phoneLoose: new reg_ex_REC2("\\+?\\d[\\d\\s().-]{6,}\\d"),
    isoDate: new reg_ex_REC2("\\d{4}-\\d{2}-\\d{2}"),
    base64: new reg_ex_REC2("(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?"),
    jwt: new reg_ex_REC2("[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+"),
    semver: new reg_ex_REC2("\\d+\\.\\d+\\.\\d+(?:-[0-9A-Za-z.-]+)?(?:\\+[0-9A-Za-z.-]+)?"),
    creditCard: new reg_ex_REC2("\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{1,4}"),
    htmlTag: new reg_ex_REC2("<\\/?[a-zA-Z][^>]*>"),
    whitespaceOnly: new reg_ex_REC2("^\\s*$")
});
globalThis.RE2 = reg_ex_REC2;
globalThis.RES2 = RECC2; /*  ====================================================================================================
    
    ============================================================= ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [REGEX] */ 

function set_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function set_array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function set_array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function set_array_without_holes(arr) {
    if (Array.isArray(arr)) return set_array_like_to_array(arr);
}
function set_assert_this_initialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function set_call_super(_this, derived, args) {
    derived = set_get_prototype_of(derived);
    return set_possible_constructor_return(_this, set_is_native_reflect_construct() ? Reflect.construct(derived, args || [], set_get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function set_class_call_check(instance, Constructor) {
    if (!set_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function set_construct(Parent, args, Class) {
    if (set_is_native_reflect_construct()) set_construct = Reflect.construct;
    else {
        set_construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) set_set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return set_construct.apply(null, arguments);
}
function set_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function set_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) set_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) set_defineProperties(Constructor, staticProps);
    return Constructor;
}
function set_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function set_get_prototype_of(o) {
    set_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return set_get_prototype_of(o);
}
function set_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) set_set_prototype_of(subClass, superClass);
}
function set_is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function set_is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (set_is_native_reflect_construct = function _is_native_reflect_construct() {
        return !!result;
    })();
}
function set_iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function set_iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function set_non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function set_non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function set_possible_constructor_return(self, call) {
    if (call && (set_type_of(call) === "object" || typeof call === "function")) return call;
    return set_assert_this_initialized(self);
}
function set_set_prototype_of(o, p) {
    set_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return set_set_prototype_of(o, p);
}
function set_sliced_to_array(arr, i) {
    return set_array_with_holes(arr) || set_iterable_to_array_limit(arr, i) || set_unsupported_iterable_to_array(arr, i) || set_non_iterable_rest();
}
function set_to_consumable_array(arr) {
    return set_array_without_holes(arr) || set_iterable_to_array(arr) || set_unsupported_iterable_to_array(arr) || set_non_iterable_spread();
}
function set_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function set_unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return set_array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return set_array_like_to_array(o, minLen);
}
function set_wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    set_wrap_native_super = function _wrap_native_super(Class) {
        if (Class === null || !set_is_native_function(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return set_construct(Class, arguments, set_get_prototype_of(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return set_set_prototype_of(Wrapper, Class);
    };
    return set_wrap_native_super(Class);
}
var set_SET2I = /*#__PURE__*/ function(Set1) {
    "use strict";
    set_inherits(SET2I, Set1);
    function SET2I() {
        set_class_call_check(this, SET2I);
        var _this;
        _this = set_call_super(this, SET2I, arguments), set_define_property(_this, "s", _this.add);
        return _this;
    }
    set_create_class(SET2I, [
        {
            key: "take",
            value: function take(value) {
                if (!this.delete(value)) return undefined;
                return value;
            }
        },
        {
            key: "peek",
            value: function peek(value) {
                return this.has(value) ? value : false;
            }
        },
        {
            key: "toggle",
            value: function toggle(value) {
                if (this.has(value)) {
                    this.delete(value);
                    return false;
                }
                this.add(value);
                return true;
            }
        },
        {
            key: "first",
            value: function first() {
                var result = this.values().next();
                return result.done ? undefined : result.value;
            }
        },
        {
            key: "last",
            value: function last() {
                var result = undefined;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        result = value;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            }
        },
        {
            key: "union",
            value: function union(other) {
                var out = new SET2I(this);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = other[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        out.add(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "intersection",
            value: function intersection(other) {
                var values = new Set(other);
                var out = new SET2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (values.has(value)) out.add(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "difference",
            value: function difference(other) {
                var values = new Set(other);
                var out = new SET2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (!values.has(value)) out.add(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "symmetricDifference",
            value: function symmetricDifference(other) {
                var values = new Set(other);
                var out = new SET2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (!values.has(value)) out.add(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                try {
                    for(var _iterator1 = values[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                        var value1 = _step1.value;
                        if (!this.has(value1)) out.add(value1);
                    }
                } catch (err) {
                    _didIteratorError1 = true;
                    _iteratorError1 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                            _iterator1.return();
                        }
                    } finally{
                        if (_didIteratorError1) {
                            throw _iteratorError1;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "isSubsetOf",
            value: function isSubsetOf(other) {
                var values = new Set(other);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (!values.has(value)) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return true;
            }
        },
        {
            key: "isSupersetOf",
            value: function isSupersetOf(other) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = other[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (!this.has(value)) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return true;
            }
        },
        {
            key: "isDisjointFrom",
            value: function isDisjointFrom(other) {
                var values = new Set(other);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (values.has(value)) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return true;
            }
        },
        {
            key: "equals",
            value: function equals(other) {
                var values = new Set(other);
                return this.size === values.size && this.isSubsetOf(values);
            }
        },
        {
            key: "filter",
            value: function filter(fn) {
                var out = new SET2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (fn(value, this)) out.add(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "map",
            value: function map(fn) {
                var out = new SET2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        out.add(fn(value, this));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "partition",
            value: function partition(fn) {
                var yes = new SET2I();
                var no = new SET2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        (fn(value, this) ? yes : no).add(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return [
                    yes,
                    no
                ];
            }
        },
        {
            key: "differenceBy",
            value: function differenceBy(other, fn) {
                var keys = new Set();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = other[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        keys.add(fn(value));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                var out = new SET2I();
                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                try {
                    for(var _iterator1 = this[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                        var value1 = _step1.value;
                        if (!keys.has(fn(value1))) out.add(value1);
                    }
                } catch (err) {
                    _didIteratorError1 = true;
                    _iteratorError1 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                            _iterator1.return();
                        }
                    } finally{
                        if (_didIteratorError1) {
                            throw _iteratorError1;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "uniqueBy",
            value: function uniqueBy(fn) {
                var keys = new Set();
                var out = new SET2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        var key = fn(value);
                        if (keys.has(key)) continue;
                        keys.add(key);
                        out.add(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "find",
            value: function find(fn) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (fn(value, this)) return value;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return undefined;
            }
        },
        {
            key: "every",
            value: function every(fn) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (!fn(value, this)) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return true;
            }
        },
        {
            key: "some",
            value: function some(fn) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (fn(value, this)) return true;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return false;
            }
        },
        {
            key: "reduce",
            value: function reduce(fn, initial) {
                var result = initial;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        result = fn(result, value, this);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            }
        },
        {
            key: "addAll",
            value: function addAll(values) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        this.add(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "deleteAll",
            value: function deleteAll(values) {
                var count = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (this.delete(value)) count++;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return count;
            }
        },
        {
            key: "retainAll",
            value: function retainAll(values) {
                var keep = new Set(values);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (!keep.has(value)) this.delete(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "update",
            value: function update(values) {
                return this.addAll(values);
            }
        },
        {
            key: "replace",
            value: function replace(values) {
                var replacement = new Set(values);
                this.clear();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = replacement[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        this.add(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "swap",
            value: function swap(a, b) {
                if (!this.has(a)) return false;
                this.delete(a);
                this.add(b);
                return true;
            }
        },
        {
            key: "clone",
            value: function clone() {
                return new SET2I(this);
            }
        },
        {
            key: "toArray",
            value: function toArray() {
                return set_to_consumable_array(this);
            }
        },
        {
            key: "toMap",
            value: function toMap(fn) {
                var out = new M2();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        var _fn = set_sliced_to_array(fn(value), 2), key = _fn[0], result = _fn[1];
                        out.set(key, result);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "toObject",
            value: function toObject(fn) {
                var out = {};
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        out[fn ? fn(value) : String(value)] = value;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return this.toArray();
            }
        }
    ], [
        {
            key: "fromArray",
            value: function fromArray(values) {
                return new SET2I(values);
            }
        },
        {
            key: "fromObject",
            value: function fromObject(obj) {
                return new SET2I(Object.values(obj));
            }
        },
        {
            key: "fromEntries",
            value: function fromEntries(entries) {
                var out = new SET2I();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = set_sliced_to_array(_step.value, 2), value = _step_value[1];
                        out.add(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "from",
            value: function from(values) {
                return new SET2I(values);
            }
        }
    ]);
    return SET2I;
}(set_wrap_native_super(Set));
globalThis.SET2 = set_SET2I;

function set_byte_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function set_byte_array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function set_byte_array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function set_byte_array_without_holes(arr) {
    if (Array.isArray(arr)) return set_byte_array_like_to_array(arr);
}
function set_byte_check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function set_byte_class_apply_descriptor_get(receiver, descriptor) {
    if (descriptor.get) return descriptor.get.call(receiver);
    return descriptor.value;
}
function set_byte_class_apply_descriptor_set(receiver, descriptor, value) {
    if (descriptor.set) descriptor.set.call(receiver, value);
    else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
function set_byte_class_apply_descriptor_update(receiver, descriptor) {
    if (descriptor.set) {
        if (!descriptor.get) throw new TypeError("attempted to read set only private field");
        if (!("__destrWrapper" in descriptor)) {
            descriptor.__destrWrapper = {
                set value (v){
                    descriptor.set.call(receiver, v);
                },
                get value () {
                    return descriptor.get.call(receiver);
                }
            };
        }
        return descriptor.__destrWrapper;
    } else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        return descriptor;
    }
}
function set_byte_class_call_check(instance, Constructor) {
    if (!set_byte_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function set_byte_class_extract_field_descriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
    return privateMap.get(receiver);
}
function set_byte_class_private_field_get(receiver, privateMap) {
    var descriptor = set_byte_class_extract_field_descriptor(receiver, privateMap, "get");
    return set_byte_class_apply_descriptor_get(receiver, descriptor);
}
function set_byte_class_private_field_init(obj, privateMap, value) {
    set_byte_check_private_redeclaration(obj, privateMap);
    privateMap.set(obj, value);
}
function set_byte_class_private_field_set(receiver, privateMap, value) {
    var descriptor = set_byte_class_extract_field_descriptor(receiver, privateMap, "set");
    set_byte_class_apply_descriptor_set(receiver, descriptor, value);
    return value;
}
function set_byte_class_private_field_update(receiver, privateMap) {
    var descriptor = set_byte_class_extract_field_descriptor(receiver, privateMap, "update");
    return set_byte_class_apply_descriptor_update(receiver, descriptor);
}
function set_byte_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function set_byte_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) set_byte_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) set_byte_defineProperties(Constructor, staticProps);
    return Constructor;
}
function set_byte_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function set_byte_iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function set_byte_iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function set_byte_non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function set_byte_non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function set_byte_sliced_to_array(arr, i) {
    return set_byte_array_with_holes(arr) || set_byte_iterable_to_array_limit(arr, i) || set_byte_unsupported_iterable_to_array(arr, i) || set_byte_non_iterable_rest();
}
function set_byte_to_consumable_array(arr) {
    return set_byte_array_without_holes(arr) || set_byte_iterable_to_array(arr) || set_byte_unsupported_iterable_to_array(arr) || set_byte_non_iterable_spread();
}
function set_byte_ts_generator(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype), d = Object.defineProperty;
    return d(g, "next", {
        value: verb(0)
    }), d(g, "throw", {
        value: verb(1)
    }), d(g, "return", {
        value: verb(2)
    }), typeof Symbol === "function" && d(g, Symbol.iterator, {
        value: function value() {
            return this;
        }
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function set_byte_unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return set_byte_array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return set_byte_array_like_to_array(o, minLen);
}
var set_byte_size = /*#__PURE__*/ new WeakMap();
var set_byte_SET2BI = /*#__PURE__*/ function() {
    "use strict";
    function SET2BI() {
        var maxParticles = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 8192, seed = arguments.length > 1 ? arguments[1] : void 0;
        set_byte_class_call_check(this, SET2BI);
        set_byte_define_property(this, "cap", void 0);
        set_byte_define_property(this, "flags", void 0); // [pid] -> 0/1, O(1) has()
        set_byte_define_property(this, "slots", void 0); // [idx] -> pid, dense, for iteration
        set_byte_define_property(this, "pidToIdx", void 0); // [pid] -> idx into slots, -1 = absent
        set_byte_class_private_field_init(this, set_byte_size, {
            writable: true,
            value: 0
        });
        // ---------------------------------------------------------------- core
        set_byte_define_property(this, "s", this.add.bind(this)); //                                                                    [s alias]
        this.cap = maxParticles;
        this.flags = new Uint8Array(maxParticles);
        this.slots = new Int32Array(maxParticles).fill(-1);
        this.pidToIdx = new Int32Array(maxParticles).fill(-1);
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        if (seed) try {
            for(var _iterator = seed[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var pid = _step.value;
                this.add(pid);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    set_byte_create_class(SET2BI, [
        {
            key: "size",
            get: function get() {
                return set_byte_class_private_field_get(this, set_byte_size);
            }
        },
        {
            key: "add",
            value: function add(pid) {
                if (this.flags[pid] === 0) {
                    this.flags[pid] = 1;
                    var idx = set_byte_class_private_field_get(this, set_byte_size);
                    this.slots[idx] = pid;
                    this.pidToIdx[pid] = idx;
                    set_byte_class_private_field_update(this, set_byte_size).value++;
                }
                return this;
            }
        },
        {
            key: "has",
            value: function has(pid) {
                return this.flags[pid] === 1;
            } //                                              [HAS]
        },
        {
            key: "delete",
            value: function _delete(pid) {
                if (this.flags[pid] !== 1) return false;
                this.flags[pid] = 0;
                var idx = this.pidToIdx[pid];
                var lastIdx = set_byte_class_private_field_get(this, set_byte_size) - 1;
                var lastPid = this.slots[lastIdx];
                if (idx !== lastIdx) {
                    this.slots[idx] = lastPid;
                    this.pidToIdx[lastPid] = idx;
                }
                this.slots[lastIdx] = -1;
                this.pidToIdx[pid] = -1;
                set_byte_class_private_field_update(this, set_byte_size).value--;
                return true;
            }
        },
        {
            key: "clear",
            value: function clear() {
                for(var i = 0; i < set_byte_class_private_field_get(this, set_byte_size); i++)this.flags[this.slots[i]] = 0;
                this.slots.fill(-1, 0, set_byte_class_private_field_get(this, set_byte_size));
                this.pidToIdx.fill(-1); // cheap enough; or loop same range if cap is huge
                set_byte_class_private_field_set(this, set_byte_size, 0);
            }
        },
        {
            key: Symbol.iterator,
            value: function value() {
                var i;
                return set_byte_ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            i = 0;
                            _state.label = 1;
                        case 1:
                            if (!(i < set_byte_class_private_field_get(this, set_byte_size))) return [
                                3,
                                4
                            ];
                            return [
                                4,
                                this.slots[i]
                            ];
                        case 2:
                            _state.sent();
                            _state.label = 3;
                        case 3:
                            i++;
                            return [
                                3,
                                1
                            ];
                        case 4:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: "values",
            value: function values() {
                return this[Symbol.iterator]();
            }
        },
        {
            key: "keys",
            value: function keys() {
                return this[Symbol.iterator]();
            }
        },
        {
            key: "entries",
            value: function entries() {
                var i;
                return set_byte_ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            i = 0;
                            _state.label = 1;
                        case 1:
                            if (!(i < set_byte_class_private_field_get(this, set_byte_size))) return [
                                3,
                                4
                            ];
                            return [
                                4,
                                [
                                    this.slots[i],
                                    this.slots[i]
                                ]
                            ];
                        case 2:
                            _state.sent();
                            _state.label = 3;
                        case 3:
                            i++;
                            return [
                                3,
                                1
                            ];
                        case 4:
                            return [
                                2
                            ];
                    }
                });
            }
        },
        {
            key: "take",
            value: function take(pid) {
                return this.delete(pid) ? pid : undefined;
            } //                          [TAKE]
        },
        {
            key: "peek",
            value: function peek(pid) {
                return this.has(pid) ? pid : false;
            } //                              [PEEK]
        },
        {
            key: "toggle",
            value: function toggle(pid) {
                if (this.has(pid)) {
                    this.delete(pid);
                    return false;
                }
                this.add(pid);
                return true;
            }
        },
        {
            key: "first",
            value: function first() {
                return set_byte_class_private_field_get(this, set_byte_size) === 0 ? undefined : this.slots[0];
            } //                    [FIRST]
        },
        {
            key: "last",
            value: function last() {
                return set_byte_class_private_field_get(this, set_byte_size) === 0 ? undefined : this.slots[set_byte_class_private_field_get(this, set_byte_size) - 1];
            } //         [LAST]
        },
        {
            key: "union",
            value: function union(other) {
                var out = new SET2BI(this.cap, this);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = other[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        out.add(pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "intersection",
            value: function intersection(other) {
                var probe = new SET2BI(this.cap, other);
                var out = new SET2BI(this.cap);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        if (probe.has(pid)) out.add(pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "difference",
            value: function difference(other) {
                var probe = new SET2BI(this.cap, other);
                var out = new SET2BI(this.cap);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        if (!probe.has(pid)) out.add(pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "symmetricDifference",
            value: function symmetricDifference(other) {
                var probe = new SET2BI(this.cap, other);
                var out = new SET2BI(this.cap);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        if (!probe.has(pid)) out.add(pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                try {
                    for(var _iterator1 = probe[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                        var pid1 = _step1.value;
                        if (!this.has(pid1)) out.add(pid1);
                    }
                } catch (err) {
                    _didIteratorError1 = true;
                    _iteratorError1 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                            _iterator1.return();
                        }
                    } finally{
                        if (_didIteratorError1) {
                            throw _iteratorError1;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "isSubsetOf",
            value: function isSubsetOf(other) {
                var probe = new SET2BI(this.cap, other);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        if (!probe.has(pid)) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return true;
            }
        },
        {
            key: "isSupersetOf",
            value: function isSupersetOf(other) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = other[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        if (!this.has(pid)) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return true;
            }
        },
        {
            key: "isDisjointFrom",
            value: function isDisjointFrom(other) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = other[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        if (this.has(pid)) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return true;
            }
        },
        {
            key: "equals",
            value: function equals(other) {
                var probe = new SET2BI(this.cap, other);
                return set_byte_class_private_field_get(this, set_byte_size) === probe.size && this.isSubsetOf(probe);
            }
        },
        {
            key: "filter",
            value: function filter(fn) {
                var out = new SET2BI(this.cap);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        if (fn(pid, this)) out.add(pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "map",
            value: function map(fn) {
                var out = new SET2BI(this.cap); // fn must still yield in-range pids
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        out.add(fn(pid, this));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "partition",
            value: function partition(fn) {
                var yes = new SET2BI(this.cap), no = new SET2BI(this.cap);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        (fn(pid, this) ? yes : no).add(pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return [
                    yes,
                    no
                ];
            }
        },
        {
            key: "differenceBy",
            value: function differenceBy(other, fn) {
                var keys = new Set();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = other[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        keys.add(fn(pid));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                var out = new SET2BI(this.cap);
                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                try {
                    for(var _iterator1 = this[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                        var pid1 = _step1.value;
                        if (!keys.has(fn(pid1))) out.add(pid1);
                    }
                } catch (err) {
                    _didIteratorError1 = true;
                    _iteratorError1 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                            _iterator1.return();
                        }
                    } finally{
                        if (_didIteratorError1) {
                            throw _iteratorError1;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "uniqueBy",
            value: function uniqueBy(fn) {
                var keys = new Set();
                var out = new SET2BI(this.cap);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        var key = fn(pid);
                        if (keys.has(key)) continue;
                        keys.add(key);
                        out.add(pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "find",
            value: function find(fn) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        if (fn(pid, this)) return pid;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return undefined;
            }
        },
        {
            key: "every",
            value: function every(fn) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        if (!fn(pid, this)) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return true;
            }
        },
        {
            key: "some",
            value: function some(fn) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        if (fn(pid, this)) return true;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return false;
            }
        },
        {
            key: "reduce",
            value: function reduce(fn, initial) {
                var result = initial;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        result = fn(result, pid, this);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            }
        },
        {
            key: "addAll",
            value: function addAll(pids) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = pids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        this.add(pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return this;
            } //    [ADDALL]
        },
        {
            key: "deleteAll",
            value: function deleteAll(pids) {
                var count = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = pids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        if (this.delete(pid)) count++;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return count;
            }
        },
        {
            key: "retainAll",
            value: function retainAll(pids) {
                var keep = new SET2BI(this.cap, pids);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = set_byte_to_consumable_array(this)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        if (!keep.has(pid)) this.delete(pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "update",
            value: function update(pids) {
                return this.addAll(pids);
            } //                              [UPDATE]
        },
        {
            key: "replace",
            value: function replace(pids) {
                this.clear();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = pids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        this.add(pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "swap",
            value: function swap(a, b) {
                if (!this.has(a)) return false;
                this.delete(a);
                this.add(b);
                return true;
            }
        },
        {
            key: "clone",
            value: function clone() {
                return new SET2BI(this.cap, this);
            } //                                     [CLONE]
        },
        {
            key: "toArray",
            value: function toArray() {
                return set_byte_to_consumable_array(this);
            } //                                                   [TOARRAY]
        },
        {
            key: "toMap",
            value: function toMap(fn) {
                var out = new Map();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        var _fn = set_byte_sliced_to_array(fn(pid), 2), key = _fn[0], result = _fn[1];
                        out.set(key, result);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "toObject",
            value: function toObject(fn) {
                var out = {};
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pid = _step.value;
                        out[fn ? fn(pid) : String(pid)] = pid;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return this.toArray();
            } //                                                 [TOJSON]
        }
    ], [
        {
            key: "fromArray",
            value: function fromArray(pids, maxParticles) {
                var _Math;
                return new SET2BI(maxParticles !== null && maxParticles !== void 0 ? maxParticles : (_Math = Math).max.apply(_Math, set_byte_to_consumable_array(pids).concat([
                    0
                ])) + 1, pids);
            }
        },
        {
            key: "fromObject",
            value: function fromObject(obj, maxParticles) {
                return SET2BI.fromArray(Object.values(obj), maxParticles);
            }
        },
        {
            key: "fromEntries",
            value: function fromEntries(entries, maxParticles) {
                var pids = [];
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _step_value = set_byte_sliced_to_array(_step.value, 2), pid = _step_value[1];
                        pids.push(pid);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return SET2BI.fromArray(pids, maxParticles);
            }
        },
        {
            key: "from",
            value: function from(pids, maxParticles) {
                return new SET2BI(maxParticles !== null && maxParticles !== void 0 ? maxParticles : 8192, pids);
            }
        }
    ]);
    return SET2BI;
}();
globalThis.SET2B = set_byte_SET2BI;

function soa_codec_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function soa_codec_class_call_check(instance, Constructor) {
    if (!soa_codec_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function soa_codec_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function soa_codec_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) soa_codec_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) soa_codec_defineProperties(Constructor, staticProps);
    return Constructor;
}
function soa_codec_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
var soa_codec_SOA_CODEC = /*#__PURE__*/ function() {
    "use strict";
    function SOA_CODEC() {
        var maxPids = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 8192 * 2;
        soa_codec_class_call_check(this, SOA_CODEC);
        soa_codec_define_property(this, "maxPids", void 0);
        // SoA Memory Layout (Typed Arrays for Cache Locality)
        soa_codec_define_property(this, "channelMap", void 0);
        soa_codec_define_property(this, "subChannelMap", void 0);
        soa_codec_define_property(this, "tripChannelMap", void 0);
        soa_codec_define_property(this, "keyMap", void 0);
        soa_codec_define_property(this, "listeners", void 0);
        soa_codec_define_property(this, "nextPid", 1);
        this.maxPids = maxPids;
        this.channelMap = new Int32Array(maxPids);
        this.subChannelMap = new Int32Array(maxPids);
        this.tripChannelMap = new Int32Array(maxPids);
        this.keyMap = new Int32Array(maxPids);
        this.listeners = new Array(maxPids);
    }
    soa_codec_create_class(SOA_CODEC, [
        {
            key: "allocatePid",
            value: function allocatePid(rId, mId, sId, kId) {
                var pid = this.nextPid++;
                if (pid >= this.maxPids) throw new Error("PID capacity exceeded");
                this.channelMap[pid] = rId;
                this.subChannelMap[pid] = mId;
                this.tripChannelMap[pid] = sId;
                this.keyMap[pid] = kId;
                return pid;
            }
        }
    ]);
    return SOA_CODEC;
}();
var soa_codeci = new soa_codec_SOA_CODEC();
globalThis.soa_codec = soa_codeci;

function string_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function string_assert_this_initialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function string_call_super(_this, derived, args) {
    derived = string_get_prototype_of(derived);
    return string_possible_constructor_return(_this, string_is_native_reflect_construct() ? Reflect.construct(derived, args || [], string_get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function string_class_call_check(instance, Constructor) {
    if (!string_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function string_construct(Parent, args, Class) {
    if (string_is_native_reflect_construct()) string_construct = Reflect.construct;
    else {
        string_construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) string_set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return string_construct.apply(null, arguments);
}
function string_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function string_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) string_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) string_defineProperties(Constructor, staticProps);
    return Constructor;
}
function string_get_prototype_of(o) {
    string_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return string_get_prototype_of(o);
}
function string_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) string_set_prototype_of(subClass, superClass);
}
function string_is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function string_is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (string_is_native_reflect_construct = function _is_native_reflect_construct() {
        return !!result;
    })();
}
function string_possible_constructor_return(self, call) {
    if (call && (string_type_of(call) === "object" || typeof call === "function")) return call;
    return string_assert_this_initialized(self);
}
function string_set_prototype_of(o, p) {
    string_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return string_set_prototype_of(o, p);
}
function string_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function string_wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    string_wrap_native_super = function _wrap_native_super(Class) {
        if (Class === null || !string_is_native_function(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return string_construct(Class, arguments, string_get_prototype_of(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return string_set_prototype_of(Wrapper, Class);
    };
    return string_wrap_native_super(Class);
}
var string_S2I = /*#__PURE__*/ function(String1) {
    "use strict";
    string_inherits(S2I, String1);
    function S2I() {
        var value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        string_class_call_check(this, S2I);
        return string_call_super(this, S2I, [
            value
        ]);
    }
    string_create_class(S2I, [
        {
            key: "empty",
            value: function empty() {
                return this.length === 0;
            }
        },
        {
            key: "notEmpty",
            value: function notEmpty() {
                return this.length > 0;
            }
        },
        {
            key: "blank",
            value: function blank() {
                return this.trim().length === 0;
            }
        },
        {
            key: "notBlank",
            value: function notBlank() {
                return !this.blank();
            }
        },
        {
            key: "equals",
            value: function equals(value) {
                return this.toString() === value;
            }
        },
        {
            key: "equalsIgnoreCase",
            value: function equalsIgnoreCase(value) {
                return this.toLowerCase() === value.toLowerCase();
            }
        },
        {
            key: "contains",
            value: function contains(value) {
                return this.includes(value);
            }
        },
        {
            key: "starts",
            value: function starts(value) {
                return this.startsWith(value);
            }
        },
        {
            key: "ends",
            value: function ends(value) {
                return this.endsWith(value);
            }
        },
        {
            key: "first",
            value: function first() {
                return this.charAt(0);
            }
        },
        {
            key: "last",
            value: function last() {
                return this.charAt(this.length - 1);
            }
        },
        {
            key: "reverse",
            value: function reverse() {
                return Array.from(this.toString()).reverse().join("");
            }
        },
        {
            key: "capitalize",
            value: function capitalize() {
                return this.length ? this.charAt(0).toUpperCase() + this.slice(1) : "";
            }
        },
        {
            key: "uncapitalize",
            value: function uncapitalize() {
                return this.length ? this.charAt(0).toLowerCase() + this.slice(1) : "";
            }
        },
        {
            key: "titleCase",
            value: function titleCase() {
                return this.toLowerCase().replace(/\b\w/g, function(char) {
                    return char.toUpperCase();
                });
            }
        },
        {
            key: "camelCase",
            value: function camelCase() {
                return this.toString().replace(/([a-z\d])([A-Z])/g, "$1 $2").split(/[^a-zA-Z\d]+/).filter(Boolean).map(function(word, index) {
                    return index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }).join("");
            }
        },
        {
            key: "kebabCase",
            value: function kebabCase() {
                return this.toString().replace(/([a-z\d])([A-Z])/g, "$1-$2").replace(/[^a-zA-Z\d]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
            }
        },
        {
            key: "snakeCase",
            value: function snakeCase() {
                return this.kebabCase().replace(/-/g, "_");
            }
        },
        {
            key: "pascalCase",
            value: function pascalCase() {
                return this.toString().replace(/([a-z\d])([A-Z])/g, "$1 $2").split(/[^a-zA-Z\d]+/).filter(Boolean).map(function(word) {
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }).join("");
            }
        },
        {
            key: "words",
            value: function words() {
                var _this_toString_match;
                return (_this_toString_match = this.toString().match(RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376-\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0560-\\u0588\\u05D0-\\u05EA\\u05EF-\\u05F2\\u0620-\\u064A\\u066E-\\u066F\\u0671-\\u06D3\\u06D5\\u06E5-\\u06E6\\u06EE-\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4-\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u0860-\\u086A\\u0870-\\u0887\\u0889-\\u088F\\u08A0-\\u08C9\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F-\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC-\\u09DD\\u09DF-\\u09E1\\u09F0-\\u09F1\\u09FC\\u0A05-\\u0A0A\\u0A0F-\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32-\\u0A33\\u0A35-\\u0A36\\u0A38-\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2-\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0-\\u0AE1\\u0AF9\\u0B05-\\u0B0C\\u0B0F-\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32-\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C-\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99-\\u0B9A\\u0B9C\\u0B9E-\\u0B9F\\u0BA3-\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58-\\u0C5A\\u0C5C-\\u0C5D\\u0C60-\\u0C61\\u0C80\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDC-\\u0CDE\\u0CE0-\\u0CE1\\u0CF1-\\u0CF2\\u0D04-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D54-\\u0D56\\u0D5F-\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32-\\u0E33\\u0E40-\\u0E46\\u0E81-\\u0E82\\u0E84\\u0E86-\\u0E8A\\u0E8C-\\u0EA3\\u0EA5\\u0EA7-\\u0EB0\\u0EB2-\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065-\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F5\\u13F8-\\u13FD\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16F1-\\u16F8\\u1700-\\u1711\\u171F-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1878\\u1880-\\u1884\\u1887-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4C\\u1B83-\\u1BA0\\u1BAE-\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1C80-\\u1C8A\\u1C90-\\u1CBA\\u1CBD-\\u1CBF\\u1CE9-\\u1CEC\\u1CEE-\\u1CF3\\u1CF5-\\u1CF6\\u1CFA\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183-\\u2184\\u2C00-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2-\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3006\\u3031-\\u3035\\u303B-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312F\\u3131-\\u318E\\u31A0-\\u31BF\\u31F0-\\u31FF\\u3400-\\u4DBF\\u4E00-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A-\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6E5\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA7DC\\uA7F1-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA8FD-\\uA8FE\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5-\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB69\\uAB70-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40-\\uFB41\\uFB43-\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC\\u{10000}-\\u{1000B}\\u{1000D}-\\u{10026}\\u{10028}-\\u{1003A}\\u{1003C}-\\u{1003D}\\u{1003F}-\\u{1004D}\\u{10050}-\\u{1005D}\\u{10080}-\\u{100FA}\\u{10280}-\\u{1029C}\\u{102A0}-\\u{102D0}\\u{10300}-\\u{1031F}\\u{1032D}-\\u{10340}\\u{10342}-\\u{10349}\\u{10350}-\\u{10375}\\u{10380}-\\u{1039D}\\u{103A0}-\\u{103C3}\\u{103C8}-\\u{103CF}\\u{10400}-\\u{1049D}\\u{104B0}-\\u{104D3}\\u{104D8}-\\u{104FB}\\u{10500}-\\u{10527}\\u{10530}-\\u{10563}\\u{10570}-\\u{1057A}\\u{1057C}-\\u{1058A}\\u{1058C}-\\u{10592}\\u{10594}-\\u{10595}\\u{10597}-\\u{105A1}\\u{105A3}-\\u{105B1}\\u{105B3}-\\u{105B9}\\u{105BB}-\\u{105BC}\\u{105C0}-\\u{105F3}\\u{10600}-\\u{10736}\\u{10740}-\\u{10755}\\u{10760}-\\u{10767}\\u{10780}-\\u{10785}\\u{10787}-\\u{107B0}\\u{107B2}-\\u{107BA}\\u{10800}-\\u{10805}\\u{10808}\\u{1080A}-\\u{10835}\\u{10837}-\\u{10838}\\u{1083C}\\u{1083F}-\\u{10855}\\u{10860}-\\u{10876}\\u{10880}-\\u{1089E}\\u{108E0}-\\u{108F2}\\u{108F4}-\\u{108F5}\\u{10900}-\\u{10915}\\u{10920}-\\u{10939}\\u{10940}-\\u{10959}\\u{10980}-\\u{109B7}\\u{109BE}-\\u{109BF}\\u{10A00}\\u{10A10}-\\u{10A13}\\u{10A15}-\\u{10A17}\\u{10A19}-\\u{10A35}\\u{10A60}-\\u{10A7C}\\u{10A80}-\\u{10A9C}\\u{10AC0}-\\u{10AC7}\\u{10AC9}-\\u{10AE4}\\u{10B00}-\\u{10B35}\\u{10B40}-\\u{10B55}\\u{10B60}-\\u{10B72}\\u{10B80}-\\u{10B91}\\u{10C00}-\\u{10C48}\\u{10C80}-\\u{10CB2}\\u{10CC0}-\\u{10CF2}\\u{10D00}-\\u{10D23}\\u{10D4A}-\\u{10D65}\\u{10D6F}-\\u{10D85}\\u{10E80}-\\u{10EA9}\\u{10EB0}-\\u{10EB1}\\u{10EC2}-\\u{10EC7}\\u{10F00}-\\u{10F1C}\\u{10F27}\\u{10F30}-\\u{10F45}\\u{10F70}-\\u{10F81}\\u{10FB0}-\\u{10FC4}\\u{10FE0}-\\u{10FF6}\\u{11003}-\\u{11037}\\u{11071}-\\u{11072}\\u{11075}\\u{11083}-\\u{110AF}\\u{110D0}-\\u{110E8}\\u{11103}-\\u{11126}\\u{11144}\\u{11147}\\u{11150}-\\u{11172}\\u{11176}\\u{11183}-\\u{111B2}\\u{111C1}-\\u{111C4}\\u{111DA}\\u{111DC}\\u{11200}-\\u{11211}\\u{11213}-\\u{1122B}\\u{1123F}-\\u{11240}\\u{11280}-\\u{11286}\\u{11288}\\u{1128A}-\\u{1128D}\\u{1128F}-\\u{1129D}\\u{1129F}-\\u{112A8}\\u{112B0}-\\u{112DE}\\u{11305}-\\u{1130C}\\u{1130F}-\\u{11310}\\u{11313}-\\u{11328}\\u{1132A}-\\u{11330}\\u{11332}-\\u{11333}\\u{11335}-\\u{11339}\\u{1133D}\\u{11350}\\u{1135D}-\\u{11361}\\u{11380}-\\u{11389}\\u{1138B}\\u{1138E}\\u{11390}-\\u{113B5}\\u{113B7}\\u{113D1}\\u{113D3}\\u{11400}-\\u{11434}\\u{11447}-\\u{1144A}\\u{1145F}-\\u{11461}\\u{11480}-\\u{114AF}\\u{114C4}-\\u{114C5}\\u{114C7}\\u{11580}-\\u{115AE}\\u{115D8}-\\u{115DB}\\u{11600}-\\u{1162F}\\u{11644}\\u{11680}-\\u{116AA}\\u{116B8}\\u{11700}-\\u{1171A}\\u{11740}-\\u{11746}\\u{11800}-\\u{1182B}\\u{118A0}-\\u{118DF}\\u{118FF}-\\u{11906}\\u{11909}\\u{1190C}-\\u{11913}\\u{11915}-\\u{11916}\\u{11918}-\\u{1192F}\\u{1193F}\\u{11941}\\u{119A0}-\\u{119A7}\\u{119AA}-\\u{119D0}\\u{119E1}\\u{119E3}\\u{11A00}\\u{11A0B}-\\u{11A32}\\u{11A3A}\\u{11A50}\\u{11A5C}-\\u{11A89}\\u{11A9D}\\u{11AB0}-\\u{11AF8}\\u{11BC0}-\\u{11BE0}\\u{11C00}-\\u{11C08}\\u{11C0A}-\\u{11C2E}\\u{11C40}\\u{11C72}-\\u{11C8F}\\u{11D00}-\\u{11D06}\\u{11D08}-\\u{11D09}\\u{11D0B}-\\u{11D30}\\u{11D46}\\u{11D60}-\\u{11D65}\\u{11D67}-\\u{11D68}\\u{11D6A}-\\u{11D89}\\u{11D98}\\u{11DB0}-\\u{11DDB}\\u{11EE0}-\\u{11EF2}\\u{11F02}\\u{11F04}-\\u{11F10}\\u{11F12}-\\u{11F33}\\u{11FB0}\\u{12000}-\\u{12399}\\u{12480}-\\u{12543}\\u{12F90}-\\u{12FF0}\\u{13000}-\\u{1342F}\\u{13441}-\\u{13446}\\u{13460}-\\u{143FA}\\u{14400}-\\u{14646}\\u{16100}-\\u{1611D}\\u{16800}-\\u{16A38}\\u{16A40}-\\u{16A5E}\\u{16A70}-\\u{16ABE}\\u{16AD0}-\\u{16AED}\\u{16B00}-\\u{16B2F}\\u{16B40}-\\u{16B43}\\u{16B63}-\\u{16B77}\\u{16B7D}-\\u{16B8F}\\u{16D40}-\\u{16D6C}\\u{16E40}-\\u{16E7F}\\u{16EA0}-\\u{16EB8}\\u{16EBB}-\\u{16ED3}\\u{16F00}-\\u{16F4A}\\u{16F50}\\u{16F93}-\\u{16F9F}\\u{16FE0}-\\u{16FE1}\\u{16FE3}\\u{16FF2}-\\u{16FF3}\\u{17000}-\\u{18CD5}\\u{18CFF}-\\u{18D1E}\\u{18D80}-\\u{18DF2}\\u{1AFF0}-\\u{1AFF3}\\u{1AFF5}-\\u{1AFFB}\\u{1AFFD}-\\u{1AFFE}\\u{1B000}-\\u{1B122}\\u{1B132}\\u{1B150}-\\u{1B152}\\u{1B155}\\u{1B164}-\\u{1B167}\\u{1B170}-\\u{1B2FB}\\u{1BC00}-\\u{1BC6A}\\u{1BC70}-\\u{1BC7C}\\u{1BC80}-\\u{1BC88}\\u{1BC90}-\\u{1BC99}\\u{1D400}-\\u{1D454}\\u{1D456}-\\u{1D49C}\\u{1D49E}-\\u{1D49F}\\u{1D4A2}\\u{1D4A5}-\\u{1D4A6}\\u{1D4A9}-\\u{1D4AC}\\u{1D4AE}-\\u{1D4B9}\\u{1D4BB}\\u{1D4BD}-\\u{1D4C3}\\u{1D4C5}-\\u{1D505}\\u{1D507}-\\u{1D50A}\\u{1D50D}-\\u{1D514}\\u{1D516}-\\u{1D51C}\\u{1D51E}-\\u{1D539}\\u{1D53B}-\\u{1D53E}\\u{1D540}-\\u{1D544}\\u{1D546}\\u{1D54A}-\\u{1D550}\\u{1D552}-\\u{1D6A5}\\u{1D6A8}-\\u{1D6C0}\\u{1D6C2}-\\u{1D6DA}\\u{1D6DC}-\\u{1D6FA}\\u{1D6FC}-\\u{1D714}\\u{1D716}-\\u{1D734}\\u{1D736}-\\u{1D74E}\\u{1D750}-\\u{1D76E}\\u{1D770}-\\u{1D788}\\u{1D78A}-\\u{1D7A8}\\u{1D7AA}-\\u{1D7C2}\\u{1D7C4}-\\u{1D7CB}\\u{1DF00}-\\u{1DF1E}\\u{1DF25}-\\u{1DF2A}\\u{1E030}-\\u{1E06D}\\u{1E100}-\\u{1E12C}\\u{1E137}-\\u{1E13D}\\u{1E14E}\\u{1E290}-\\u{1E2AD}\\u{1E2C0}-\\u{1E2EB}\\u{1E4D0}-\\u{1E4EB}\\u{1E5D0}-\\u{1E5ED}\\u{1E5F0}\\u{1E6C0}-\\u{1E6DE}\\u{1E6E0}-\\u{1E6E2}\\u{1E6E4}-\\u{1E6E5}\\u{1E6E7}-\\u{1E6ED}\\u{1E6F0}-\\u{1E6F4}\\u{1E6FE}-\\u{1E6FF}\\u{1E7E0}-\\u{1E7E6}\\u{1E7E8}-\\u{1E7EB}\\u{1E7ED}-\\u{1E7EE}\\u{1E7F0}-\\u{1E7FE}\\u{1E800}-\\u{1E8C4}\\u{1E900}-\\u{1E943}\\u{1E94B}\\u{1EE00}-\\u{1EE03}\\u{1EE05}-\\u{1EE1F}\\u{1EE21}-\\u{1EE22}\\u{1EE24}\\u{1EE27}\\u{1EE29}-\\u{1EE32}\\u{1EE34}-\\u{1EE37}\\u{1EE39}\\u{1EE3B}\\u{1EE42}\\u{1EE47}\\u{1EE49}\\u{1EE4B}\\u{1EE4D}-\\u{1EE4F}\\u{1EE51}-\\u{1EE52}\\u{1EE54}\\u{1EE57}\\u{1EE59}\\u{1EE5B}\\u{1EE5D}\\u{1EE5F}\\u{1EE61}-\\u{1EE62}\\u{1EE64}\\u{1EE67}-\\u{1EE6A}\\u{1EE6C}-\\u{1EE72}\\u{1EE74}-\\u{1EE77}\\u{1EE79}-\\u{1EE7C}\\u{1EE7E}\\u{1EE80}-\\u{1EE89}\\u{1EE8B}-\\u{1EE9B}\\u{1EEA1}-\\u{1EEA3}\\u{1EEA5}-\\u{1EEA9}\\u{1EEAB}-\\u{1EEBB}\\u{20000}-\\u{2A6DF}\\u{2A700}-\\u{2B81D}\\u{2B820}-\\u{2CEAD}\\u{2CEB0}-\\u{2EBE0}\\u{2EBF0}-\\u{2EE5D}\\u{2F800}-\\u{2FA1D}\\u{30000}-\\u{3134A}\\u{31350}-\\u{33479}\\u0030-\\u0039\\u00B2-\\u00B3\\u00B9\\u00BC-\\u00BE\\u0660-\\u0669\\u06F0-\\u06F9\\u07C0-\\u07C9\\u0966-\\u096F\\u09E6-\\u09EF\\u09F4-\\u09F9\\u0A66-\\u0A6F\\u0AE6-\\u0AEF\\u0B66-\\u0B6F\\u0B72-\\u0B77\\u0BE6-\\u0BF2\\u0C66-\\u0C6F\\u0C78-\\u0C7E\\u0CE6-\\u0CEF\\u0D58-\\u0D5E\\u0D66-\\u0D78\\u0DE6-\\u0DEF\\u0E50-\\u0E59\\u0ED0-\\u0ED9\\u0F20-\\u0F33\\u1040-\\u1049\\u1090-\\u1099\\u1369-\\u137C\\u16EE-\\u16F0\\u17E0-\\u17E9\\u17F0-\\u17F9\\u1810-\\u1819\\u1946-\\u194F\\u19D0-\\u19DA\\u1A80-\\u1A89\\u1A90-\\u1A99\\u1B50-\\u1B59\\u1BB0-\\u1BB9\\u1C40-\\u1C49\\u1C50-\\u1C59\\u2070\\u2074-\\u2079\\u2080-\\u2089\\u2150-\\u2182\\u2185-\\u2189\\u2460-\\u249B\\u24EA-\\u24FF\\u2776-\\u2793\\u2CFD\\u3007\\u3021-\\u3029\\u3038-\\u303A\\u3192-\\u3195\\u3220-\\u3229\\u3248-\\u324F\\u3251-\\u325F\\u3280-\\u3289\\u32B1-\\u32BF\\uA620-\\uA629\\uA6E6-\\uA6EF\\uA830-\\uA835\\uA8D0-\\uA8D9\\uA900-\\uA909\\uA9D0-\\uA9D9\\uA9F0-\\uA9F9\\uAA50-\\uAA59\\uABF0-\\uABF9\\uFF10-\\uFF19\\u{10107}-\\u{10133}\\u{10140}-\\u{10178}\\u{1018A}-\\u{1018B}\\u{102E1}-\\u{102FB}\\u{10320}-\\u{10323}\\u{10341}\\u{1034A}\\u{103D1}-\\u{103D5}\\u{104A0}-\\u{104A9}\\u{10858}-\\u{1085F}\\u{10879}-\\u{1087F}\\u{108A7}-\\u{108AF}\\u{108FB}-\\u{108FF}\\u{10916}-\\u{1091B}\\u{109BC}-\\u{109BD}\\u{109C0}-\\u{109CF}\\u{109D2}-\\u{109FF}\\u{10A40}-\\u{10A48}\\u{10A7D}-\\u{10A7E}\\u{10A9D}-\\u{10A9F}\\u{10AEB}-\\u{10AEF}\\u{10B58}-\\u{10B5F}\\u{10B78}-\\u{10B7F}\\u{10BA9}-\\u{10BAF}\\u{10CFA}-\\u{10CFF}\\u{10D30}-\\u{10D39}\\u{10D40}-\\u{10D49}\\u{10E60}-\\u{10E7E}\\u{10F1D}-\\u{10F26}\\u{10F51}-\\u{10F54}\\u{10FC5}-\\u{10FCB}\\u{11052}-\\u{1106F}\\u{110F0}-\\u{110F9}\\u{11136}-\\u{1113F}\\u{111D0}-\\u{111D9}\\u{111E1}-\\u{111F4}\\u{112F0}-\\u{112F9}\\u{11450}-\\u{11459}\\u{114D0}-\\u{114D9}\\u{11650}-\\u{11659}\\u{116C0}-\\u{116C9}\\u{116D0}-\\u{116E3}\\u{11730}-\\u{1173B}\\u{118E0}-\\u{118F2}\\u{11950}-\\u{11959}\\u{11BF0}-\\u{11BF9}\\u{11C50}-\\u{11C6C}\\u{11D50}-\\u{11D59}\\u{11DA0}-\\u{11DA9}\\u{11DE0}-\\u{11DE9}\\u{11F50}-\\u{11F59}\\u{11FC0}-\\u{11FD4}\\u{12400}-\\u{1246E}\\u{16130}-\\u{16139}\\u{16A60}-\\u{16A69}\\u{16AC0}-\\u{16AC9}\\u{16B50}-\\u{16B59}\\u{16B5B}-\\u{16B61}\\u{16D70}-\\u{16D79}\\u{16E80}-\\u{16E96}\\u{16FF4}-\\u{16FF6}\\u{1CCF0}-\\u{1CCF9}\\u{1D2C0}-\\u{1D2D3}\\u{1D2E0}-\\u{1D2F3}\\u{1D360}-\\u{1D378}\\u{1D7CE}-\\u{1D7FF}\\u{1E140}-\\u{1E149}\\u{1E2F0}-\\u{1E2F9}\\u{1E4F0}-\\u{1E4F9}\\u{1E5F1}-\\u{1E5FA}\\u{1E8C7}-\\u{1E8CF}\\u{1E950}-\\u{1E959}\\u{1EC71}-\\u{1ECAB}\\u{1ECAD}-\\u{1ECAF}\\u{1ECB1}-\\u{1ECB4}\\u{1ED01}-\\u{1ED2D}\\u{1ED2F}-\\u{1ED3D}\\u{1F100}-\\u{1F10C}\\u{1FBF0}-\\u{1FBF9}]+", "gu"))) !== null && _this_toString_match !== void 0 ? _this_toString_match : [];
            }
        },
        {
            key: "lines",
            value: function lines() {
                return this.split(/\r\n|\r|\n/);
            }
        },
        {
            key: "chars",
            value: function chars() {
                return Array.from(this.toString());
            }
        },
        {
            key: "unique",
            value: function unique() {
                return Array.from(new Set(this.chars())).join("");
            }
        },
        {
            key: "escapeRegExp",
            value: function escapeRegExp() {
                return this.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            }
        },
        {
            key: "stripHtml",
            value: function stripHtml() {
                return this.replace(/<[^>]*>/g, "");
            }
        },
        {
            key: "stripWhitespace",
            value: function stripWhitespace() {
                return this.replace(/\s+/g, "");
            }
        },
        {
            key: "truncate",
            value: function truncate(length) {
                var suffix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "...";
                if (this.length <= length) return this.toString();
                return this.slice(0, Math.max(0, length - suffix.length)) + suffix;
            }
        },
        {
            key: "limit",
            value: function limit(length) {
                var suffix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "...";
                return this.truncate(length, suffix);
            }
        },
        {
            key: "toNumber",
            value: function toNumber() {
                return Number(this.toString());
            }
        },
        {
            key: "toInt",
            value: function toInt(radix) {
                return Number.parseInt(this.toString(), radix);
            }
        },
        {
            key: "toFloat",
            value: function toFloat() {
                return Number.parseFloat(this.toString());
            }
        },
        {
            key: "toBoolean",
            value: function toBoolean() {
                var value = this.trim().toLowerCase();
                return value === "true" || value === "1" || value === "yes" || value === "on";
            }
        },
        {
            key: "toArray",
            value: function toArray() {
                return this.chars();
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return JSON.stringify(this.toString());
            }
        },
        {
            key: "isWellFormed",
            value: function isWellFormed() {
                return !RegExp("[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?<![\\uD800-\\uDBFF])[\\uDC00-\\uDFFF]", "u").test(this.toString());
            }
        },
        {
            key: "toWellFormed",
            value: function toWellFormed() {
                return this.toString().replace(RegExp("[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?<![\\uD800-\\uDBFF])[\\uDC00-\\uDFFF]", "gu"), "\uFFFD");
            }
        }
    ]);
    return S2I;
}(string_wrap_native_super(String));
globalThis.S2 = string_S2I;

function unit8array_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function unit8array_array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function unit8array_array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function unit8array_array_without_holes(arr) {
    if (Array.isArray(arr)) return unit8array_array_like_to_array(arr);
}
function unit8array_assert_this_initialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function unit8array_call_super(_this, derived, args) {
    derived = unit8array_get_prototype_of(derived);
    return unit8array_possible_constructor_return(_this, unit8array_is_native_reflect_construct() ? Reflect.construct(derived, args || [], unit8array_get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function unit8array_class_call_check(instance, Constructor) {
    if (!unit8array_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function unit8array_construct(Parent, args, Class) {
    if (unit8array_is_native_reflect_construct()) unit8array_construct = Reflect.construct;
    else {
        unit8array_construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) unit8array_set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return unit8array_construct.apply(null, arguments);
}
function unit8array_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function unit8array_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) unit8array_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) unit8array_defineProperties(Constructor, staticProps);
    return Constructor;
}
function unit8array_get_prototype_of(o) {
    unit8array_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return unit8array_get_prototype_of(o);
}
function unit8array_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) unit8array_set_prototype_of(subClass, superClass);
}
function unit8array_instanceof1(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function unit8array_is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function unit8array_is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (unit8array_is_native_reflect_construct = function _is_native_reflect_construct() {
        return !!result;
    })();
}
function unit8array_iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function unit8array_iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function unit8array_non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function unit8array_non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function unit8array_possible_constructor_return(self, call) {
    if (call && (unit8array_type_of(call) === "object" || typeof call === "function")) return call;
    return unit8array_assert_this_initialized(self);
}
function unit8array_set_prototype_of(o, p) {
    unit8array_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return unit8array_set_prototype_of(o, p);
}
function unit8array_sliced_to_array(arr, i) {
    return unit8array_array_with_holes(arr) || unit8array_iterable_to_array_limit(arr, i) || unit8array_unsupported_iterable_to_array(arr, i) || unit8array_non_iterable_rest();
}
function unit8array_to_consumable_array(arr) {
    return unit8array_array_without_holes(arr) || unit8array_iterable_to_array(arr) || unit8array_unsupported_iterable_to_array(arr) || unit8array_non_iterable_spread();
}
function unit8array_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function unit8array_unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return unit8array_array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return unit8array_array_like_to_array(o, minLen);
}
function unit8array_wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    unit8array_wrap_native_super = function _wrap_native_super(Class) {
        if (Class === null || !unit8array_is_native_function(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return unit8array_construct(Class, arguments, unit8array_get_prototype_of(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return unit8array_set_prototype_of(Wrapper, Class);
    };
    return unit8array_wrap_native_super(Class);
}
var unit8array_U82I = /*#__PURE__*/ function _target(Array1) {
    "use strict";
    unit8array_inherits(U82I, Array1);
    function U82I() {
        for(var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++){
            items[_key] = arguments[_key];
        }
        unit8array_class_call_check(this, U82I);
        var _this;
        _this = unit8array_call_super(this, U82I, unit8array_to_consumable_array(items));
        Object.setPrototypeOf(_this, (unit8array_instanceof1(this, U82I) ? this.constructor : void 0).prototype);
        return _this;
    }
    unit8array_create_class(U82I, [
        {
            key: "first",
            value: function first() {
                return this[0];
            }
        },
        {
            key: "last",
            value: function last() {
                return this[this.length - 1];
            }
        },
        {
            key: "second",
            value: function second() {
                return this[1];
            }
        },
        {
            key: "third",
            value: function third() {
                return this[2];
            }
        },
        {
            key: "random",
            value: function random() {
                return this.length ? this[Math.floor(Math.random() * this.length)] : undefined;
            }
        },
        {
            key: "isEmpty",
            value: function isEmpty() {
                return this.length === 0;
            }
        },
        {
            key: "isNotEmpty",
            value: function isNotEmpty() {
                return this.length > 0;
            }
        },
        {
            key: "isNotEmptyAndDefined",
            value: function isNotEmptyAndDefined() {
                return this.some(function(value) {
                    return value !== undefined && value !== null;
                });
            }
        },
        {
            key: "clear",
            value: function clear() {
                this.length = 0;
                return this;
            }
        },
        {
            key: "clone",
            value: function clone() {
                return unit8array_construct(U82I, unit8array_to_consumable_array(this));
            }
        },
        {
            key: "unique",
            value: function unique() {
                return unit8array_construct(U82I, unit8array_to_consumable_array(new Set(this)));
            }
        },
        {
            key: "compact",
            value: function compact() {
                return unit8array_construct(U82I, unit8array_to_consumable_array(this.filter(function(value) {
                    return value != null;
                })));
            }
        },
        {
            key: "chunk",
            value: function chunk(size) {
                if (size <= 0) throw new RangeError("Chunk size must be greater than zero");
                var result = new U82I();
                for(var i = 0; i < this.length; i += size){
                    result.push(unit8array_construct(U82I, unit8array_to_consumable_array(this.slice(i, i + size))));
                }
                return result;
            }
        },
        {
            key: "flatten",
            value: function flatten(depth) {
                return unit8array_construct(U82I, unit8array_to_consumable_array(this.flat(depth)));
            }
        },
        {
            key: "shuffle",
            value: function shuffle() {
                return this.shuffleInPlace();
            }
        },
        {
            key: "sample",
            value: function sample() {
                var count = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
                return this.pick(count);
            }
        },
        {
            key: "count",
            value: function count(predicate) {
                return predicate ? this.filter(predicate).length : this.length;
            }
        },
        {
            key: "sum",
            value: function sum() {
                return this.reduce(function(total, value) {
                    return total + value;
                }, 0);
            }
        },
        {
            key: "average",
            value: function average() {
                return this.length ? this.sum() / this.length : 0;
            }
        },
        {
            key: "min",
            value: function min() {
                var _Math;
                return this.length ? (_Math = Math).min.apply(_Math, unit8array_to_consumable_array(this)) : undefined;
            }
        },
        {
            key: "max",
            value: function max() {
                var _Math;
                return this.length ? (_Math = Math).max.apply(_Math, unit8array_to_consumable_array(this)) : undefined;
            }
        },
        {
            key: "groupBy",
            value: function groupBy(keyFn) {
                var result = new Map();
                this.forEach(function(value, index) {
                    var key = keyFn(value, index);
                    if (!result.has(key)) result.set(key, new U82I());
                    result.get(key).push(value);
                });
                return result;
            }
        },
        {
            key: "keyBy",
            value: function keyBy(keyFn) {
                var result = new Map();
                this.forEach(function(value, index) {
                    return result.set(keyFn(value, index), value);
                });
                return result;
            }
        },
        {
            key: "partition",
            value: function partition(predicate) {
                var yes = new U82I();
                var no = new U82I();
                this.forEach(function(value, index, array) {
                    (predicate(value, index, array) ? yes : no).push(value);
                });
                return [
                    yes,
                    no
                ];
            }
        },
        {
            key: "difference",
            value: function difference(other) {
                var values = new Set(other);
                return unit8array_construct(U82I, unit8array_to_consumable_array(this.filter(function(value) {
                    return !values.has(value);
                })));
            }
        },
        {
            key: "intersection",
            value: function intersection(other) {
                var values = new Set(other);
                return unit8array_construct(U82I, unit8array_to_consumable_array(this.filter(function(value) {
                    return values.has(value);
                })));
            }
        },
        {
            key: "union",
            value: function union(other) {
                return unit8array_construct(U82I, unit8array_to_consumable_array(new Set(unit8array_to_consumable_array(this).concat(unit8array_to_consumable_array(other)))));
            }
        },
        {
            key: "symmetricDifference",
            value: function symmetricDifference(other) {
                var values = new Set(other);
                var own = new Set(this);
                return unit8array_construct(U82I, unit8array_to_consumable_array(unit8array_to_consumable_array(this.filter(function(value) {
                    return !values.has(value);
                })).concat(unit8array_to_consumable_array(Array.from(values).filter(function(value) {
                    return !own.has(value);
                })))));
            }
        },
        {
            key: "take",
            value: function take(count) {
                return unit8array_construct(U82I, unit8array_to_consumable_array(this.slice(0, Math.max(0, count))));
            }
        },
        {
            key: "takeLast",
            value: function takeLast(count) {
                return unit8array_construct(U82I, unit8array_to_consumable_array(this.slice(-Math.max(0, count))));
            }
        },
        {
            key: "drop",
            value: function drop(count) {
                return unit8array_construct(U82I, unit8array_to_consumable_array(this.slice(Math.max(0, count))));
            }
        },
        {
            key: "dropLast",
            value: function dropLast(count) {
                return unit8array_construct(U82I, unit8array_to_consumable_array(this.slice(0, Math.max(0, this.length - count))));
            }
        },
        {
            key: "pluck",
            value: function pluck(key) {
                return unit8array_construct(U82I, unit8array_to_consumable_array(this.map(function(value) {
                    return value[key];
                })));
            }
        },
        {
            key: "flattenDeep",
            value: function flattenDeep() {
                return unit8array_construct(U82I, unit8array_to_consumable_array(this.flat(Infinity)));
            }
        },
        {
            key: "insert",
            value: function insert(index) {
                for(var _len = arguments.length, items = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    items[_key - 1] = arguments[_key];
                }
                this.splice.apply(this, [
                    index,
                    0
                ].concat(unit8array_to_consumable_array(items)));
                return this;
            }
        },
        {
            key: "removeAt",
            value: function removeAt(index) {
                if (index < 0 || index >= this.length) return undefined;
                return this.splice(index, 1)[0];
            }
        },
        {
            key: "remove",
            value: function remove(value) {
                var index = this.indexOf(value);
                if (index === -1) return false;
                this.splice(index, 1);
                return true;
            }
        },
        {
            key: "removeWhere",
            value: function removeWhere(predicate) {
                for(var i = this.length - 1; i >= 0; i--){
                    if (predicate(this[i], i, this)) this.splice(i, 1);
                }
                return this;
            }
        },
        {
            key: "replace",
            value: function replace(oldValue, newValue) {
                var index = this.indexOf(oldValue);
                if (index === -1) return false;
                this[index] = newValue;
                return true;
            }
        },
        {
            key: "move",
            value: function move(from, to) {
                if (from < 0 || from >= this.length || to < 0 || to >= this.length) return this;
                var _this_splice = unit8array_sliced_to_array(this.splice(from, 1), 1), value = _this_splice[0];
                this.splice(to, 0, value);
                return this;
            }
        },
        {
            key: "swap",
            value: function swap(i, j) {
                if (i < 0 || j < 0 || i >= this.length || j >= this.length) return this;
                var ref;
                ref = [
                    this[j],
                    this[i]
                ], this[i] = ref[0], this[j] = ref[1], ref;
                return this;
            }
        },
        {
            key: "shuffleInPlace",
            value: function shuffleInPlace() {
                for(var i = this.length - 1; i > 0; i--){
                    var j = Math.floor(Math.random() * (i + 1));
                    var ref;
                    ref = [
                        this[j],
                        this[i]
                    ], this[i] = ref[0], this[j] = ref[1], ref;
                }
                return this;
            }
        },
        {
            key: "pick",
            value: function pick() {
                var count = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
                var values = unit8array_to_consumable_array(this);
                var result = new U82I();
                for(var i = 0; i < Math.min(Math.max(0, count), values.length); i++){
                    var j = Math.floor(Math.random() * values.length);
                    result.push(values.splice(j, 1)[0]);
                }
                return result;
            }
        },
        {
            key: "toSet",
            value: function toSet() {
                return new Set(this);
            }
        },
        {
            key: "toMap",
            value: function toMap(keyFn) {
                return this.keyBy(keyFn);
            }
        },
        {
            key: "equals",
            value: function equals(other) {
                return this.length === other.length && this.every(function(value, index) {
                    return Object.is(value, other[index]);
                });
            }
        },
        {
            key: "startsWith",
            value: function startsWith(other) {
                var _this = this;
                return other.length <= this.length && other.every(function(value, index) {
                    return Object.is(_this[index], value);
                });
            }
        },
        {
            key: "endsWith",
            value: function endsWith(other) {
                var _this = this;
                return other.length <= this.length && other.every(function(value, index) {
                    return Object.is(_this[_this.length - other.length + index], value);
                });
            }
        },
        {
            key: "isSorted",
            value: function isSorted() {
                var compareFn = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function(a, b) {
                    return a < b ? -1 : a > b ? 1 : 0;
                };
                for(var i = 1; i < this.length; i++){
                    if (compareFn(this[i - 1], this[i]) > 0) return false;
                }
                return true;
            }
        },
        {
            key: "frequencies",
            value: function frequencies() {
                var result = new Map();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        var _result_get;
                        result.set(value, ((_result_get = result.get(value)) !== null && _result_get !== void 0 ? _result_get : 0) + 1);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            }
        },
        {
            key: "findLast",
            value: function findLast(predicate, thisArg) {
                for(var i = this.length - 1; i >= 0; i--){
                    if (predicate.call(thisArg, this[i], i, this)) return this[i];
                }
                return undefined;
            }
        },
        {
            key: "findLastIndex",
            value: function findLastIndex(predicate, thisArg) {
                for(var i = this.length - 1; i >= 0; i--){
                    if (predicate.call(thisArg, this[i], i, this)) return i;
                }
                return -1;
            }
        },
        {
            key: "toReversed",
            value: function toReversed() {
                return unit8array_to_consumable_array(this).reverse();
            }
        },
        {
            key: "toSorted",
            value: function toSorted(compareFn) {
                return unit8array_to_consumable_array(this).sort(compareFn);
            }
        },
        {
            key: "toSpliced",
            value: function toSpliced(start, deleteCount) {
                for(var _len = arguments.length, items = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
                    items[_key - 2] = arguments[_key];
                }
                var _result;
                var result = unit8array_to_consumable_array(this);
                (_result = result).splice.apply(_result, [
                    start,
                    deleteCount
                ].concat(unit8array_to_consumable_array(items)));
                return result;
            }
        },
        {
            key: "with",
            value: function _with(index, value) {
                var result = unit8array_to_consumable_array(this);
                var actualIndex = index < 0 ? result.length + index : index;
                if (actualIndex < 0 || actualIndex >= result.length) {
                    throw new RangeError("Invalid index");
                }
                result[actualIndex] = value;
                return result;
            }
        }
    ], [
        {
            key: Symbol.species,
            get: function get() {
                return Array;
            }
        },
        {
            key: "from",
            value: function from(iterable, mapFn, thisArg) {
                var values = Symbol.iterator in Object(iterable) ? Array.from(iterable) : Array.from(iterable);
                var result = mapFn ? values.map(function(value, index) {
                    return mapFn.call(thisArg, value, index);
                }) : values;
                return unit8array_construct(U82I, unit8array_to_consumable_array(result));
            }
        },
        {
            key: "of",
            value: function of() {
                for(var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++){
                    items[_key] = arguments[_key];
                }
                return unit8array_construct(U82I, unit8array_to_consumable_array(items));
            }
        }
    ]);
    return U82I;
}(unit8array_wrap_native_super(Array));
globalThis.U82 = unit8array_U82I;

function url_search_params_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function url_search_params_array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function url_search_params_array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function url_search_params_assert_this_initialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function url_search_params_call_super(_this, derived, args) {
    derived = url_search_params_get_prototype_of(derived);
    return url_search_params_possible_constructor_return(_this, url_search_params_is_native_reflect_construct() ? Reflect.construct(derived, args || [], url_search_params_get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function url_search_params_class_call_check(instance, Constructor) {
    if (!url_search_params_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function url_search_params_construct(Parent, args, Class) {
    if (url_search_params_is_native_reflect_construct()) url_search_params_construct = Reflect.construct;
    else {
        url_search_params_construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) url_search_params_set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return url_search_params_construct.apply(null, arguments);
}
function url_search_params_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function url_search_params_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) url_search_params_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) url_search_params_defineProperties(Constructor, staticProps);
    return Constructor;
}
function url_search_params_get_prototype_of(o) {
    url_search_params_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return url_search_params_get_prototype_of(o);
}
function url_search_params_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) url_search_params_set_prototype_of(subClass, superClass);
}
function url_search_params_instanceof1(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function url_search_params_is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function url_search_params_is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (url_search_params_is_native_reflect_construct = function _is_native_reflect_construct() {
        return !!result;
    })();
}
function url_search_params_iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function url_search_params_non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function url_search_params_possible_constructor_return(self, call) {
    if (call && (url_search_params_type_of(call) === "object" || typeof call === "function")) return call;
    return url_search_params_assert_this_initialized(self);
}
function url_search_params_set_prototype_of(o, p) {
    url_search_params_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return url_search_params_set_prototype_of(o, p);
}
function url_search_params_sliced_to_array(arr, i) {
    return url_search_params_array_with_holes(arr) || url_search_params_iterable_to_array_limit(arr, i) || url_search_params_unsupported_iterable_to_array(arr, i) || url_search_params_non_iterable_rest();
}
function url_search_params_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function url_search_params_unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return url_search_params_array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return url_search_params_array_like_to_array(o, minLen);
}
function url_search_params_wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    url_search_params_wrap_native_super = function _wrap_native_super(Class) {
        if (Class === null || !url_search_params_is_native_function(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return url_search_params_construct(Class, arguments, url_search_params_get_prototype_of(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return url_search_params_set_prototype_of(Wrapper, Class);
    };
    return url_search_params_wrap_native_super(Class);
}
var url_search_params_USP2I = /*#__PURE__*/ function(URLSearchParams1) {
    "use strict";
    url_search_params_inherits(USP2I, URLSearchParams1);
    function USP2I(init) {
        url_search_params_class_call_check(this, USP2I);
        return url_search_params_call_super(this, USP2I, [
            init
        ]);
    }
    url_search_params_create_class(USP2I, [
        {
            key: "size",
            get: function get() {
                return Array.from(this).length;
            }
        },
        {
            key: "getOr",
            value: function getOr(name, fallback) {
                var _this_get;
                return (_this_get = this.get(name)) !== null && _this_get !== void 0 ? _this_get : fallback;
            }
        },
        {
            key: "getOrNull",
            value: function getOrNull(name) {
                return this.get(name);
            }
        },
        {
            key: "getOrThrow",
            value: function getOrThrow(name) {
                var error = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : new Error("Missing URL parameter: ".concat(name));
                var value = this.get(name);
                if (value === null) throw error;
                return value;
            }
        },
        {
            key: "getNumber",
            value: function getNumber(name, fallback) {
                var value = this.get(name);
                if (value === null || value.trim() === "") return fallback;
                var number = Number(value);
                return Number.isFinite(number) ? number : fallback;
            }
        },
        {
            key: "getInt",
            value: function getInt(name) {
                var radix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 10;
                var value = this.get(name);
                if (value === null || value.trim() === "") return undefined;
                var number = Number.parseInt(value, radix);
                return Number.isNaN(number) ? undefined : number;
            }
        },
        {
            key: "getFloat",
            value: function getFloat(name) {
                var value = this.get(name);
                if (value === null || value.trim() === "") return undefined;
                var number = Number.parseFloat(value);
                return Number.isNaN(number) ? undefined : number;
            }
        },
        {
            key: "getBoolean",
            value: function getBoolean(name) {
                var fallback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                var value = this.get(name);
                if (value === null) return fallback;
                switch(value.trim().toLowerCase()){
                    case "true":
                    case "1":
                    case "yes":
                    case "on":
                        return true;
                    case "false":
                    case "0":
                    case "no":
                    case "off":
                        return false;
                    default:
                        return fallback;
                }
            }
        },
        {
            key: "getJSON",
            value: function getJSON(name) {
                var value = this.get(name);
                if (value === null) return undefined;
                try {
                    return JSON.parse(value);
                } catch (unused) {
                    return undefined;
                }
            }
        },
        {
            key: "getArray",
            value: function getArray(name) {
                var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
                var value = this.get(name);
                return value === null || value === "" ? [] : value.split(separator);
            }
        },
        {
            key: "getObject",
            value: function getObject() {
                var result = {};
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = new Set(this.keys())[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var key = _step.value;
                        var values = this.getAll(key);
                        result[key] = values.length > 1 ? values : values[0];
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            }
        },
        {
            key: "setNumber",
            value: function setNumber(name, value) {
                this.set(name, String(value));
                return this;
            }
        },
        {
            key: "setBoolean",
            value: function setBoolean(name, value) {
                this.set(name, String(value));
                return this;
            }
        },
        {
            key: "setJSON",
            value: function setJSON(name, value) {
                this.set(name, JSON.stringify(value));
                return this;
            }
        },
        {
            key: "setArray",
            value: function setArray(name, values) {
                var separator = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ",";
                this.set(name, Array.from(values, String).join(separator));
                return this;
            }
        },
        {
            key: "setIfAbsent",
            value: function setIfAbsent(name, value) {
                if (!this.has(name)) this.set(name, value);
                return this;
            }
        },
        {
            key: "setIfPresent",
            value: function setIfPresent(name, value) {
                if (this.has(name)) this.set(name, value);
                return this;
            }
        },
        {
            key: "appendAll",
            value: function appendAll(params) {
                var _this = this;
                if (url_search_params_instanceof1(params, URLSearchParams)) {
                    params.forEach(function(value, key) {
                        return _this.append(key, value);
                    });
                } else {
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = Object.entries(params)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var _step_value = url_search_params_sliced_to_array(_step.value, 2), key = _step_value[0], value = _step_value[1];
                            if (value != null) {
                                if (Array.isArray(value)) {
                                    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                                    try {
                                        for(var _iterator1 = value[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                                            var item = _step1.value;
                                            this.append(key, String(item));
                                        }
                                    } catch (err) {
                                        _didIteratorError1 = true;
                                        _iteratorError1 = err;
                                    } finally{
                                        try {
                                            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                                _iterator1.return();
                                            }
                                        } finally{
                                            if (_didIteratorError1) {
                                                throw _iteratorError1;
                                            }
                                        }
                                    }
                                } else {
                                    this.append(key, String(value));
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "merge",
            value: function merge(params) {
                var _this = this;
                var overwrite = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
                if (url_search_params_instanceof1(params, URLSearchParams)) {
                    params.forEach(function(value, key) {
                        if (overwrite || !_this.has(key)) _this.set(key, value);
                    });
                } else {
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = Object.entries(params)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var _step_value = url_search_params_sliced_to_array(_step.value, 2), key = _step_value[0], value = _step_value[1];
                            if (value != null && (overwrite || !this.has(key))) {
                                this.set(key, String(value));
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "clone",
            value: function clone() {
                return new USP2I(this);
            }
        },
        {
            key: "clear",
            value: function clear() {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = new Set(this.keys())[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var key = _step.value;
                        this.delete(key);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            key: "isEmpty",
            value: function isEmpty() {
                return this.size === 0;
            }
        },
        {
            key: "isNotEmpty",
            value: function isNotEmpty() {
                return this.size > 0;
            }
        },
        {
            key: "toObject",
            value: function toObject() {
                return this.getObject();
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return this.toObject();
            }
        },
        {
            key: "toURLSearchParams",
            value: function toURLSearchParams() {
                return new URLSearchParams(this);
            }
        },
        {
            key: "toURL",
            value: function toURL(url) {
                var result = new URL(url);
                this.forEach(function(value, key) {
                    return result.searchParams.append(key, value);
                });
                return result;
            }
        }
    ]);
    return USP2I;
}(url_search_params_wrap_native_super(URLSearchParams));
globalThis.USP2 = url_search_params_USP2I;

function weak_map_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function weak_map_assert_this_initialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function weak_map_call_super(_this, derived, args) {
    derived = weak_map_get_prototype_of(derived);
    return weak_map_possible_constructor_return(_this, weak_map_is_native_reflect_construct() ? Reflect.construct(derived, args || [], weak_map_get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function weak_map_class_call_check(instance, Constructor) {
    if (!weak_map_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function weak_map_construct(Parent, args, Class) {
    if (weak_map_is_native_reflect_construct()) weak_map_construct = Reflect.construct;
    else {
        weak_map_construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) weak_map_set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return weak_map_construct.apply(null, arguments);
}
function weak_map_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function weak_map_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) weak_map_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) weak_map_defineProperties(Constructor, staticProps);
    return Constructor;
}
function weak_map_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function weak_map_get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) weak_map_get = Reflect.get;
    else {
        weak_map_get = function get(target, property, receiver) {
            var base = weak_map_super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) return desc.get.call(receiver || target);
            return desc.value;
        };
    }
    return weak_map_get(target, property, receiver || target);
}
function weak_map_get_prototype_of(o) {
    weak_map_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return weak_map_get_prototype_of(o);
}
function weak_map_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) weak_map_set_prototype_of(subClass, superClass);
}
function weak_map_is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function weak_map_is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (weak_map_is_native_reflect_construct = function _is_native_reflect_construct() {
        return !!result;
    })();
}
function weak_map_possible_constructor_return(self, call) {
    if (call && (weak_map_type_of(call) === "object" || typeof call === "function")) return call;
    return weak_map_assert_this_initialized(self);
}
function weak_map_set_prototype_of(o, p) {
    weak_map_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return weak_map_set_prototype_of(o, p);
}
function weak_map_super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = weak_map_get_prototype_of(object);
        if (object === null) break;
    }
    return object;
}
function weak_map_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function weak_map_wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    weak_map_wrap_native_super = function _wrap_native_super(Class) {
        if (Class === null || !weak_map_is_native_function(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return weak_map_construct(Class, arguments, weak_map_get_prototype_of(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return weak_map_set_prototype_of(Wrapper, Class);
    };
    return weak_map_wrap_native_super(Class);
}
var weak_map_WM2I = /*#__PURE__*/ function(WeakMap1) {
    "use strict";
    weak_map_inherits(WM2I, WeakMap1);
    function WM2I() {
        weak_map_class_call_check(this, WM2I);
        var _this;
        _this = weak_map_call_super(this, WM2I, arguments), weak_map_define_property(_this, "g", _this.get), weak_map_define_property(_this, "h", _this.has), weak_map_define_property(_this, "d", _this.delete), weak_map_define_property(_this, "_tracked", void 0);
        return _this;
    }
    weak_map_create_class(WM2I, [
        {
            key: "s",
            value: function s(k, v) {
                var n = typeof v === "function" ? v() : v;
                weak_map_get(weak_map_get_prototype_of(WM2I.prototype), "set", this).call(this, k, n);
                return this;
            }
        },
        {
            key: "swap",
            value: function swap(key, value) {
                var previous = this.h(key) ? this.g(key) : undefined;
                this.s(key, value);
                return previous;
            }
        },
        {
            key: "take",
            value: function take(key) {
                var value = this.g(key);
                this.d(key);
                return value;
            }
        },
        {
            key: "getAndDelete",
            value: function getAndDelete(key) {
                return this.take(key);
            }
        },
        {
            key: "peek",
            value: function peek(key) {
                return this.h(key) ? this.g(key) : false;
            }
        },
        {
            key: "getOrI",
            value: function getOrI(key, value) {
                if (this.h(key)) return this.g(key);
                this.s(key, value);
                return value;
            }
        },
        {
            key: "getOrM",
            value: function getOrM(key, make) {
                if (this.h(key)) return this.g(key);
                var value = make();
                this.s(key, value);
                return value;
            }
        },
        {
            key: "getOr",
            value: function getOr(key, fallback) {
                return this.h(key) ? this.g(key) : fallback;
            }
        },
        {
            key: "getOrThrow",
            value: function getOrThrow(key) {
                var error = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : new Error("WeakMap key not found");
                if (!this.h(key)) throw error;
                return this.g(key);
            }
        },
        {
            key: "getOrCreate",
            value: function getOrCreate(key, make) {
                return this.getOrM(key, make);
            }
        },
        {
            key: "ensure",
            value: function ensure(key, make) {
                return this.getOrM(key, make);
            }
        },
        {
            key: "update",
            value: function update(key, fn, initial) {
                var has = this.h(key);
                var value = fn(has ? this.g(key) : initial, has);
                this.s(key, value);
                return value;
            }
        },
        {
            key: "setIfAbsent",
            value: function setIfAbsent(key, value) {
                if (this.h(key)) return false;
                this.s(key, value);
                return true;
            }
        },
        {
            key: "setIfPresent",
            value: function setIfPresent(key, value) {
                if (!this.h(key)) return false;
                this.s(key, value);
                return true;
            }
        },
        {
            key: "hasOrSet",
            value: function hasOrSet(key, value) {
                if (this.h(key)) return true;
                this.s(key, value);
                return false;
            }
        },
        {
            key: "replace",
            value: function replace(key, value) {
                return this.setIfPresent(key, value);
            }
        },
        {
            key: "touch",
            value: function touch(key) {
                return this.setIfAbsent(key, undefined);
            }
        },
        {
            key: "tracked",
            get: function get() {
                return this._tracked !== undefined;
            }
        },
        {
            key: "trackedSize",
            get: function get() {
                var _ref;
                var _this__tracked;
                return (_ref = (_this__tracked = this._tracked) === null || _this__tracked === void 0 ? void 0 : _this__tracked.size) !== null && _ref !== void 0 ? _ref : 0;
            }
        },
        {
            key: "track",
            value: function track(key) {
                var _this__tracked;
                ((_this__tracked = this._tracked) !== null && _this__tracked !== void 0 ? _this__tracked : this._tracked = new Set()).add(key);
                return this;
            }
        },
        {
            key: "untrack",
            value: function untrack(key) {
                var _ref;
                var _this__tracked;
                return (_ref = (_this__tracked = this._tracked) === null || _this__tracked === void 0 ? void 0 : _this__tracked.delete(key)) !== null && _ref !== void 0 ? _ref : false;
            }
        },
        {
            key: "trackedKeys",
            value: function trackedKeys() {
                return this._tracked ? Array.from(this._tracked) : [];
            }
        },
        {
            key: "trackedValues",
            value: function trackedValues() {
                var out = [];
                if (this._tracked) {
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = this._tracked[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var key = _step.value;
                            if (this.h(key)) out.push(this.g(key));
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "trackedEntries",
            value: function trackedEntries() {
                var out = [];
                if (this._tracked) {
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = this._tracked[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var key = _step.value;
                            if (this.h(key)) out.push([
                                key,
                                this.g(key)
                            ]);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
                return out;
            }
        },
        {
            key: "forEachTracked",
            value: function forEachTracked(fn) {
                if (this._tracked) {
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = this._tracked[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var key = _step.value;
                            if (this.h(key)) fn(this.g(key), key, this);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            }
        },
        {
            key: "clearTracked",
            value: function clearTracked() {
                if (this._tracked) {
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = this._tracked[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var key = _step.value;
                            this.d(key);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    this._tracked.clear();
                }
            }
        }
    ]);
    return WM2I;
}(weak_map_wrap_native_super(WeakMap));
globalThis.WM2 = weak_map_WM2I;

function weak_set_instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function weak_set_assert_this_initialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function weak_set_call_super(_this, derived, args) {
    derived = weak_set_get_prototype_of(derived);
    return weak_set_possible_constructor_return(_this, weak_set_is_native_reflect_construct() ? Reflect.construct(derived, args || [], weak_set_get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function weak_set_class_call_check(instance, Constructor) {
    if (!weak_set_instanceof(instance, Constructor)) throw new TypeError("Cannot call a class as a function");
}
function weak_set_construct(Parent, args, Class) {
    if (weak_set_is_native_reflect_construct()) weak_set_construct = Reflect.construct;
    else {
        weak_set_construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) weak_set_set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return weak_set_construct.apply(null, arguments);
}
function weak_set_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function weak_set_create_class(Constructor, protoProps, staticProps) {
    if (protoProps) weak_set_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) weak_set_defineProperties(Constructor, staticProps);
    return Constructor;
}
function weak_set_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function weak_set_get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) weak_set_get = Reflect.get;
    else {
        weak_set_get = function get(target, property, receiver) {
            var base = weak_set_super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) return desc.get.call(receiver || target);
            return desc.value;
        };
    }
    return weak_set_get(target, property, receiver || target);
}
function weak_set_get_prototype_of(o) {
    weak_set_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return weak_set_get_prototype_of(o);
}
function weak_set_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) weak_set_set_prototype_of(subClass, superClass);
}
function weak_set_is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function weak_set_is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (weak_set_is_native_reflect_construct = function _is_native_reflect_construct() {
        return !!result;
    })();
}
function weak_set_possible_constructor_return(self, call) {
    if (call && (weak_set_type_of(call) === "object" || typeof call === "function")) return call;
    return weak_set_assert_this_initialized(self);
}
function weak_set_set_prototype_of(o, p) {
    weak_set_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return weak_set_set_prototype_of(o, p);
}
function weak_set_super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = weak_set_get_prototype_of(object);
        if (object === null) break;
    }
    return object;
}
function weak_set_type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function weak_set_wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    weak_set_wrap_native_super = function _wrap_native_super(Class) {
        if (Class === null || !weak_set_is_native_function(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return weak_set_construct(Class, arguments, weak_set_get_prototype_of(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return weak_set_set_prototype_of(Wrapper, Class);
    };
    return weak_set_wrap_native_super(Class);
}
var weak_set_WS2I = /*#__PURE__*/ function(WeakSet1) {
    "use strict";
    weak_set_inherits(WS2I, WeakSet1);
    function WS2I(values) {
        weak_set_class_call_check(this, WS2I);
        var _this;
        _this = weak_set_call_super(this, WS2I, [
            values == null ? undefined : Array.from(values)
        ]), weak_set_define_property(_this, "_tracked", new Set());
        return _this;
    }
    weak_set_create_class(WS2I, [
        {
            key: "add",
            value: function add(value) {
                return weak_set_get(weak_set_get_prototype_of(WS2I.prototype), "add", this).call(this, value);
            }
        },
        {
            key: "delete",
            value: function _delete(value) {
                this._tracked.delete(value);
                return weak_set_get(weak_set_get_prototype_of(WS2I.prototype), "delete", this).call(this, value);
            }
        },
        {
            key: "has",
            value: function has(value) {
                return weak_set_get(weak_set_get_prototype_of(WS2I.prototype), "has", this).call(this, value);
            }
        },
        {
            key: "addIfAbsent",
            value: function addIfAbsent(value) {
                if (this.has(value)) return false;
                this.add(value);
                return true;
            }
        },
        {
            key: "toggle",
            value: function toggle(value) {
                if (this.has(value)) {
                    this.delete(value);
                    return false;
                }
                this.add(value);
                return true;
            }
        },
        {
            key: "deleteIfPresent",
            value: function deleteIfPresent(value) {
                return this.delete(value);
            }
        },
        {
            key: "hasAll",
            value: function hasAll(values) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (!this.has(value)) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return true;
            }
        },
        {
            key: "hasAny",
            value: function hasAny(values) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (this.has(value)) return true;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return false;
            }
        },
        {
            key: "addAll",
            value: function addAll(values) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        this.add(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return this;
            }
        },
        {
            key: "deleteAll",
            value: function deleteAll(values) {
                var count = 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        if (this.delete(value)) count++;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return count;
            }
        },
        {
            key: "replace",
            value: function replace(oldValue, newValue) {
                if (!this.has(oldValue)) return false;
                this.delete(oldValue);
                this.add(newValue);
                return true;
            }
        },
        {
            key: "track",
            value: function track(value) {
                this.add(value);
                this._tracked.add(value);
                return this;
            }
        },
        {
            key: "untrack",
            value: function untrack(value) {
                return this._tracked.delete(value);
            }
        },
        {
            key: "trackedKeys",
            value: function trackedKeys() {
                return Array.from(this._tracked);
            }
        },
        {
            key: "forEachTracked",
            value: function forEachTracked(callback, thisArg) {
                var _this = this;
                this._tracked.forEach(function(value) {
                    if (_this.has(value)) callback.call(thisArg, value, _this);
                    else _this._tracked.delete(value);
                });
            }
        },
        {
            key: "clearTracked",
            value: function clearTracked() {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this._tracked[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var value = _step.value;
                        weak_set_get(weak_set_get_prototype_of(WS2I.prototype), "delete", this).call(this, value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                this._tracked.clear();
            }
        }
    ]);
    return WS2I;
}(weak_set_wrap_native_super(WeakSet));
globalThis.WS2 = weak_set_WS2I;























function MaybePromisei(v) {
    return v !== undefined ? v : Promise.resolve(v);
}
globalThis.MaybePromise = MaybePromisei;


export { MaybePromisei, RECC2 as RES2, array_A2I as A2, boolean_byte_B2BI as B2B, date_D2I as D2, date_R2I as R2, date_R2II as R2I, error_ER2I as ER2, iterator_I2I as I2, map_M2I as M2, map_bin_M2BINI as M2BIN, map_byte_M2BI as M2B, map_dense_M2DI as M2D, map_rows_M2RI as M2R, number_N2I as N2, object_O2I as O2, promise_P2I as P2, reg_ex_REC2 as RE2, set_SET2I as SET2, set_byte_SET2BI as SET2B, soa_codec_SOA_CODEC as SOA_CODEC, soa_codeci as soa_codec, string_S2I as S2, unit8array_U82I as U82, url_search_params_USP2I as USP2, weak_map_WM2I as WM2, weak_set_WS2I as WS2 };
