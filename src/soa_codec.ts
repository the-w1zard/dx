export class SOA_CODEC {// HIGH_PERFORMANCE_SOA_CODEC
	public readonly maxPids: number;
	// SoA Memory Layout (Typed Arrays for Cache Locality)
	public readonly channelMap: Int32Array;
	public readonly subChannelMap: Int32Array;
	public readonly tripChannelMap: Int32Array;
	public readonly keyMap: Int32Array;
	public readonly listeners: Array<((pid: number, val?: number) => void) | undefined>;
	public nextPid = 1;
	constructor( maxPids = 8192) {
		this.maxPids = maxPids;
		this.channelMap = new Int32Array(maxPids);
		this.subChannelMap = new Int32Array(maxPids);
		this.tripChannelMap = new Int32Array(maxPids);
		this.keyMap = new Int32Array(maxPids);
		this.listeners = new Array(maxPids);
	}// Hot path lookup or allocation: O(1) inline integer assignment
	public allocatePid(rId: number, mId: number, sId: number, kId: number): number {
		const pid = this.nextPid++;
		if (pid >= this.maxPids) throw new Error("PID capacity exceeded");
		this.channelMap[pid] = rId;
		this.subChannelMap[pid] = mId;
		this.tripChannelMap[pid] = sId;
		this.keyMap[pid] = kId;
		return pid;
	}
}
