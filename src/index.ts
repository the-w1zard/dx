import { M2RI } from "./map_rows";
import { M2DI } from "./map_dense";
import { M2BINI } from "./map_bin";
import { B2BI } from "./boolean_byte";
import { M2I } from "./map";
import { M2BI } from "./map_byte";
import { A2I } from './array'
import { D2I,  R2I, R2II } from './date'
import { ER2I } from './error'
import { I2I } from './iterator'
import { N2I } from './number'
import { O2I } from './object'
import { P2I } from './promise'
import { REC2, RECC2 } from './reg_ex'
import { SET2I } from './set'
import { SET2BI } from './set_byte'
import { SOA_CODEC, soa_codeci  } from './soa_codec'
import { S2I } from './string'
import { U82I } from './unit8array'
import { USP2I } from './url_search_params'
import { WM2I } from './weak_map'
import { WS2I } from './weak_set'
import { nestedi } from './nested'

export type MaybePromise<R = any> = R;
export function MaybePromisei<R = any>(v: R): MaybePromise {
    return v !== undefined ? v as R : Promise.resolve(v) as Promise<R> 
}
const nestedInstace =  new nestedi()
globalThis.MaybePromise = MaybePromisei;
globalThis.A2 = A2I;
globalThis.B2B = B2BI;
globalThis.D2 = D2I;
globalThis.R2 = R2I;
globalThis.R2FN = R2II;
globalThis.ER2 = ER2I 
globalThis.I2 = I2I;
globalThis.M2 = M2I;
globalThis.M2BIN = M2BINI;
globalThis.M2B = M2BI;
globalThis.M2D = M2DI;
globalThis.M2R = M2RI;
globalThis.nested = nestedInstace
globalThis.N2 = N2I;
globalThis.O2 = O2I;
globalThis.P2 = P2I 
globalThis.RE2 = REC2;
globalThis.RES2 = RECC2;
globalThis.SET2 = SET2I;
globalThis.SET2B = SET2BI;
globalThis.soa_codec = soa_codeci 
globalThis.S2 = S2I ;
globalThis.U82 = U82I;
globalThis.USP2 = USP2I 
globalThis.WM2 = WM2I;
globalThis.WS2 = WS2I
globalThis.M2BIN = M2BINI;

export {
    M2RI as M2R,
    M2DI as M2D, 
    M2BINI as M2BIN, 
    A2I as A2,
    B2BI as B2B,
    D2I as D2,
    ER2I as ER2,
    I2I as I2,
    M2BI as M2B,
    M2I as M2,
    N2I as N2,
    O2I as O2,
    P2I as P2,
    REC2 as RE2,
    RECC2 as RES2,
    SET2I as SET2,
    SET2BI as SET2B,
    SOA_CODEC ,
    soa_codeci as soa_codec,
    S2I as S2,
    U82I as U82,
    USP2I as USP2,
    WM2I as WM2,
    WS2I as WS2,
    R2I as R2,
    R2II as R2I 
}
