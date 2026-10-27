import { M2I } from "./map";
import { SET2I } from "./set";
import { D2I } from "./date";
import { A2I } from "./array";
import { O2I } from "./object";
import { WM2I } from "./weak_map";
import { I2I } from "./iterator";
import { N2I } from "./number";
import { P2I } from "./promise";
import { S2I } from "./string";
import { U82I } from "./unit8array";
import { WS2I } from "./weak_set";
import { USP2I } from "./url_search_params";
import { ER2I } from "./error";
import {MaybePromise} from '../bag_of_tricks/maybe_promise'
export {};



declare global {
/*  ==========================================================================================================================
	 The entire goal is to take what is already available and give them the upgrades / updates that they need to improve the 
     ux/dx. That is it.
     Not to wildy go off and create 400 fn's to throw on.
     Create a class, extends the original api and throw it into global this so it is accessible without the need of importing
     it.
	================================================================================== ⇦✦──⇦✦──✦──✦──← 'pew pew' 🧙 [UX/DX] */
	type MaybePromise<R = any> = R;
	var MaybePromise: MaybePromise;
	var M2: typeof M2I; // map
	var SET2: typeof SET2I; // set
	var D2: typeof D2I; // Date
	var A2: typeof A2I; // Array
	var O2: typeof O2I; // Object
	var WM2: typeof WM2I; // Weakmap
	var WS2: typeof WS2I; // Weakset
	var P2: typeof P2I; // Promise
	var S2: typeof S2I; // String
	var N2: typeof N2I; // Number
	var USP2: typeof USP2I; // URLSearchParams
	var ER2: typeof ER2I; // Error
	var U82: typeof U82I; // Uint8Array
	var I2: typeof I2I; // Iterator
}
