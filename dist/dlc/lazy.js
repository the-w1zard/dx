export class Lazy {
    _factory;
    _isValueCreated = false;
    _value = null;
    get isValueCreated() { return this._isValueCreated; }
    get value() {
        if (!this._isValueCreated) {
            this._value = this._factory();
            this._isValueCreated = true;
        }
        return this._value;
    }
    constructor(factory) { this._factory = factory; }
}
