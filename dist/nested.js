const cache = new M2();
export class nestedi {
    r = 'ROOT';
    m = 'MASTER';
    s = 'SLAVE';
    CACHE;
    FALLBACK = new M2();
    constructor(CACHE = cache) { this.CACHE = CACHE; }
    map(s = 'map', m = this.m, r = this.r) {
        // 1. Root Lookup via Module Cache (Fast path)
        let root = globalThis[r];
        if (!root) {
            root = new Map();
            globalThis[r] = root;
        }
        // 2. Master Map Lookup
        let masterMap = root.get(m);
        if (!masterMap) {
            masterMap = new Map();
            root.set(m, masterMap);
        }
        // 3. Slave Map Lookup
        let slaveMap = masterMap.get(s);
        if (!slaveMap) {
            slaveMap = new Map();
            masterMap.set(s, slaveMap);
        }
        return slaveMap;
    }
    m2(s = 'm2', m = this.m, r = this.r) {
        // 1. Root Lookup via Module Cache (Fast path)
        let root = globalThis[r];
        if (!root) {
            root = new M2();
            globalThis[r] = root;
        }
        // 2. Master Map Lookup
        let masterMap = root.get(m);
        if (!masterMap) {
            masterMap = new M2();
            root.set(m, masterMap);
        }
        // 3. Slave Map Lookup
        let slaveMap = masterMap.get(s);
        if (!slaveMap) {
            slaveMap = new M2();
            masterMap.set(s, slaveMap);
        }
        return slaveMap;
    }
    m2b(s = 'm2b', m = this.m, r = this.r) {
        // 1. Root Lookup via Module Cache (Fast path)
        let root = globalThis[r];
        if (!root) {
            root = new M2B();
            globalThis[r] = root;
        }
        // 2. Master Map Lookup
        let masterMap = root.get(m);
        if (!masterMap) {
            masterMap = new M2B();
            root.set(m, masterMap);
        }
        // 3. Slave Map Lookup
        let slaveMap = masterMap.get(s);
        if (!slaveMap) {
            slaveMap = new M2B();
            masterMap.set(s, slaveMap);
        }
        return slaveMap;
    }
    m2bin(s = 'm2bin', m = this.m, r = this.r) {
        // 1. Root Lookup via Module Cache (Fast path)
        let root = globalThis[r];
        if (!root) {
            root = new M2BIN();
            globalThis[r] = root;
        }
        // 2. Master Map Lookup
        let masterMap = root.get(m);
        if (!masterMap) {
            masterMap = new M2BIN();
            root.set(m, masterMap);
        }
        // 3. Slave Map Lookup
        let slaveMap = masterMap.get(s);
        if (!slaveMap) {
            slaveMap = new M2BIN();
            masterMap.set(s, slaveMap);
        }
        return slaveMap;
    }
    m2d(s = 'm2d', m = this.m, r = this.r) {
        // 1. Root Lookup via Module Cache (Fast path)
        let root = globalThis[r];
        if (!root) {
            root = new M2D();
            globalThis[r] = root;
        }
        // 2. Master Map Lookup
        let masterMap = root.get(m);
        if (!masterMap) {
            masterMap = new M2D();
            root.set(m, masterMap);
        }
        // 3. Slave Map Lookup
        let slaveMap = masterMap.get(s);
        if (!slaveMap) {
            slaveMap = new M2D();
            masterMap.set(s, slaveMap);
        }
        return slaveMap;
    }
    m2r(s = 'm2r', m = this.m, r = this.r) {
        // 1. Root Lookup via Module Cache (Fast path)
        let root = globalThis[r];
        if (!root) {
            root = new M2R();
            globalThis[r] = root;
        }
        // 2. Master Map Lookup
        let masterMap = root.get(m);
        if (!masterMap) {
            masterMap = new M2R();
            root.set(m, masterMap);
        }
        // 3. Slave Map Lookup
        let slaveMap = masterMap.get(s);
        if (!slaveMap) {
            slaveMap = new M2R();
            masterMap.set(s, slaveMap);
        }
        return slaveMap;
    }
    cache(s = 'cache', m = this.m, r = this.r) {
        // 1. Root Lookup via Module Cache (Fast path)
        let root = this.CACHE ? this.CACHE.get(r) : this.FALLBACK.get(r);
        if (!root) {
            root = new M2();
            this.CACHE ? this.CACHE.set(r, root) : this.FALLBACK.set(r, root);
        }
        // 2. Master Map Lookup
        let masterMap = root.get(m);
        if (!masterMap) {
            masterMap = new M2();
            root.set(m, masterMap);
        }
        // 3. Slave Map Lookup
        let slaveMap = masterMap.get(s);
        if (!slaveMap) {
            slaveMap = new M2();
            masterMap.set(s, slaveMap);
        }
        return slaveMap;
    }
}
export const nested = new nestedi();
