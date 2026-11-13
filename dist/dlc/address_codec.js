export class ADDRESS_CODEC {
    ids = new Map();
    names = [];
    pids = new Map();
    addresses = new Map();
    nextId = 0;
    nextPid = 1; // 0 is TRACER_PID
    intern(value) {
        let id = this.ids.get(value);
        if (id === undefined) {
            id = this.nextId++;
            this.ids.set(value, id);
            this.names[id] = value;
        }
        return id;
    }
    encode(key, sl, ms, rt) {
        const a = this.intern(rt);
        const b = this.intern(ms);
        const c = this.intern(sl);
        const d = this.intern(key);
        const addressKey = `${a}:${b}:${c}:${d}`;
        let pid = this.pids.get(addressKey);
        if (pid === undefined) {
            pid = this.nextPid++;
            this.pids.set(addressKey, pid);
            this.addresses.set(pid, [a, b, c, d]);
        }
        return pid;
    }
    decode(pid) {
        const address = this.addresses.get(pid);
        if (!address)
            throw new Error(`HC_ADDRESS_CODEC: unknown pid ${pid}`);
        const [a, b, c, d] = address;
        return {
            rt: this.names[a],
            ms: this.names[b],
            sl: this.names[c],
            key: this.names[d],
        };
    }
}
