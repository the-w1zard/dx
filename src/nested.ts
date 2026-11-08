type ALL_MAPS = M2<K, V> | Map<K, V> | M2B | M2BIN<K, V> | M2D<K, V> | M2R<K> | NU

export class nestedi<K = A, V = A> {
    public r = 'ROOT' 
    public m = 'MASTER' 
    public s = 'SLAVE' 
    public CACHE: ALL_MAPS
    public FALLBACK = new M2<A, M2<A, M2<K, V>>>();

    constructor(CACHE: ALL_MAPS = null) { this.CACHE = CACHE }

    public map<K, V>(s: A = 'map', m: A = this.m , r: A = this.r): Map<A, A> {
        // 1. Root Lookup via Module Cache (Fast path)
        let root = (globalThis as A)[r] 
        if (!root) {
            root = new Map<A, Map<A, Map<A, A>>>();
			(globalThis as A)[r] = root;
        }
        // 2. Master Map Lookup
        let masterMap = root.get(m);
        if (!masterMap) {
            masterMap = new Map<A, Map<A, A>>();
            root.set(m, masterMap);
        }
        // 3. Slave Map Lookup
        let slaveMap = masterMap.get(s);
        if (!slaveMap) {
            slaveMap = new Map<A, A>();
            masterMap.set(s, slaveMap);
        }
        return slaveMap;
    }
    public m2<K, V>(s: A = 'm2', m: A = this.m , r: A = this.r): M2<A, A> {
        // 1. Root Lookup via Module Cache (Fast path)
        let root = (globalThis as A)[r] 
        if (!root) {
            root = new M2<A, Map<A, Map<A, A>>>();
			(globalThis as A)[r] = root;
        }
        // 2. Master Map Lookup
        let masterMap = root.get(m);
        if (!masterMap) {
            masterMap = new M2<A, Map<A, A>>();
            root.set(m, masterMap);
        }
        // 3. Slave Map Lookup
        let slaveMap = masterMap.get(s);
        if (!slaveMap) {
            slaveMap = new M2<A, A>();
            masterMap.set(s, slaveMap);
        }
        return slaveMap;
    }
    public m2b<K, V>(s: A = 'm2b', m: A = this.m , r: A = this.r): M2B<A, A> {
        // 1. Root Lookup via Module Cache (Fast path)
        let root = (globalThis as A)[r] 
        if (!root) {
            root = new M2B();
			(globalThis as A)[r] = root;
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
    public m2bin<K, V>(s: A = 'm2bin', m: A = this.m , r: A = this.r): M2BIN<A, A> {
        // 1. Root Lookup via Module Cache (Fast path)
        let root = (globalThis as A)[r] 
        if (!root) {
            root = new M2BIN<A, Map<A, Map<A, A>>>();
			(globalThis as A)[r] = root;
        }
        // 2. Master Map Lookup
        let masterMap = root.get(m);
        if (!masterMap) {
            masterMap = new M2BIN<A, Map<A, A>>();
            root.set(m, masterMap);
        }
        // 3. Slave Map Lookup
        let slaveMap = masterMap.get(s);
        if (!slaveMap) {
            slaveMap = new M2BIN<A, A>();
            masterMap.set(s, slaveMap);
        }
        return slaveMap;
    }
    public m2d<K, V>(s: A = 'm2d', m: A = this.m , r: A = this.r): M2D<A, A> {
        // 1. Root Lookup via Module Cache (Fast path)
        let root = (globalThis as A)[r] 
        if (!root) {
            root = new M2D<A, Map<A, Map<A, A>>>();
			(globalThis as A)[r] = root;
        }
        // 2. Master Map Lookup
        let masterMap = root.get(m);
        if (!masterMap) {
            masterMap = new M2D<A, Map<A, A>>();
            root.set(m, masterMap);
        }
        // 3. Slave Map Lookup
        let slaveMap = masterMap.get(s);
        if (!slaveMap) {
            slaveMap = new M2D<A, A>();
            masterMap.set(s, slaveMap);
        }
        return slaveMap;
    }
    public m2r<K>(s: A = 'm2r', m: A = this.m , r: A = this.r): M2R<A> {
        // 1. Root Lookup via Module Cache (Fast path)
        let root = (globalThis as A)[r] 
        if (!root) {
            root = new M2R();
			(globalThis as A)[r] = root;
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
    public cache<K, V>(s: A = 'cache', m: A = this.m , r: A = this.r): M2<A, A> {
        // 1. Root Lookup via Module Cache (Fast path)
        let root = this.CACHE ? this.CACHE.get(r) : this.FALLBACK.get(r)
        if (!root) {
            root = new M2<A, M2<A, M2<A, A>>>();
			this.CACHE ? this.CACHE.set(r, root) : this.FALLBACK.set(r, root)
        }
        // 2. Master Map Lookup
        let masterMap = root.get(m);
        if (!masterMap) {
            masterMap = new M2<A, M2<A, A>>();
            root.set(m, masterMap);
        }
        // 3. Slave Map Lookup
        let slaveMap = masterMap.get(s);
        if (!slaveMap) {
            slaveMap = new M2<A, A>();
            masterMap.set(s, slaveMap);
        }
        return slaveMap;
    }
}

export const nested = new nestedi();

(globalThis as any).nested = new nestedi()
