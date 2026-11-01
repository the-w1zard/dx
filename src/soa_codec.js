export class SOA_CODEC {
    maxPids;
    // SoA Memory Layout (Typed Arrays for Cache Locality)
    channelMap;
    subChannelMap;
    tripChannelMap;
    keyMap;
    listeners;
    nextPid = 1;
    constructor(maxPids = 8192) {
        this.maxPids = maxPids;
        this.channelMap = new Int32Array(maxPids);
        this.subChannelMap = new Int32Array(maxPids);
        this.tripChannelMap = new Int32Array(maxPids);
        this.keyMap = new Int32Array(maxPids);
        this.listeners = new Array(maxPids);
    } // Hot path lookup or allocation: O(1) inline integer assignment
    allocatePid(rId, mId, sId, kId) {
        const pid = this.nextPid++;
        if (pid >= this.maxPids)
            throw new Error("PID capacity exceeded");
        this.channelMap[pid] = rId;
        this.subChannelMap[pid] = mId;
        this.tripChannelMap[pid] = sId;
        this.keyMap[pid] = kId;
        return pid;
    }
}
