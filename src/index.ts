
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

import { wait_and_promise as wait_and_promisei} from './dlc/wait_and_promise'
import { twx as twxi} from './dlc/twx'
import { lwwState as lwwStatei} from './dlc/lww'
import { ignoreArg as ignoreArgi} from './dlc/ignore_arg'
import { barrier as barrieri} from './dlc/barrier'
import { callIf as callIfi} from './dlc/call_if'
import { clamp as clampi} from './dlc/clamp'
import { createLiveScope as createLiveScopei} from './dlc/create_live_scope'
import { deferred as deferredi} from './dlc/deferred'
import { evaluator as evaluatori} from './dlc/evaluator'
import { Finally as Finallyi} from './dlc/finally'
import { gate as gatei} from './dlc/gate'
import { invoke as invokei} from './dlc/invoke'
import { isDefined as isDefinedi} from './dlc/is_defined'
import { isNotDefined as isNotDefinedi} from './dlc/is_not_defined'
import { Lazy as Lazyi} from './dlc/lazy'
import { once as oncei} from './dlc/once'
import { orDefault as orDefaulti} from './dlc/or_default'
import { patchState as patchStatei} from './dlc/patch_state'
import { retryWithBackoff as retryWithBackoffi} from './dlc/retry_with_backoff'
import { runWithRetry as runWithRetryi} from './dlc/run_with_retry'
import { _serialExecutor as _serialExecutori} from './dlc/serial_executor'
import { setKey as setKeyi} from './dlc/set_keys'
import { setPrev as setPrevi} from './dlc/set_prev'
import { sleep as sleepi} from './dlc/sleep'
import { timedPromise as timedPromisei} from './dlc/timed_promise'
import { toPromise as toPromisei} from './dlc/to_promise'
import { tryCatch as tryCatchi} from './dlc/try_catch'
import { unreachable as unreachablei} from './dlc/unreachable'
import { MDisruptor as MDisruptorI } from "./map_disruptor";
import { MTracer as MTracerI } from "./map_tracer";
import { AVROWriter as AVROWriterI, AVROReader as AVROReaderI, BINARY_AVRO as BINARY_AVROI  } from "./avro";
import { CBORI  } from "./cbor";
import { STracer, STracer  as STracerI} from "./set_tracer";
import { OTracer, OTracer  as OTracerI} from "./object_tracer";

export type MaybePromise<R = any> = R;
export function MaybePromisei<R = any>(v: R): MaybePromise {
    return v !== undefined ? v as R : Promise.resolve(v) as Promise<R> 
}
const nestedInstace =  new nestedi()
globalThis.MaybePromise = MaybePromisei;
globalThis.CBOR = CBORI;
globalThis.AVRO = BINARY_AVROI;
globalThis.AVROReader = AVROReaderI;
globalThis.AVROWriter = AVROWriterI;
globalThis.MDisruptor = MDisruptorI;
globalThis.MTracer = MTracerI;
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
globalThis.callIf = callIfi
globalThis.clamp = clampi
globalThis.createLiveScope = createLiveScopei
globalThis.deferred = deferredi
globalThis.evaluator = evaluatori
globalThis.Finally = Finallyi
globalThis.gate = gatei
globalThis.invoke = invokei
globalThis.isDefined = isDefinedi
globalThis.isNotDefined = isNotDefinedi
globalThis.Lazy = Lazyi
globalThis.once = oncei
globalThis.orDefault = orDefaulti
globalThis.patchState = patchStatei
globalThis.retryWithBackoff = retryWithBackoffi
globalThis.runWithRetry = runWithRetryi
globalThis._serialExecutor = _serialExecutori
globalThis.setKey = setKeyi
globalThis.setPrev = setPrevi
globalThis.sleep = sleepi
globalThis.timedPromise = timedPromisei
globalThis.toPromise = toPromisei
globalThis.tryCatch = tryCatchi
globalThis.unreachable = unreachablei
globalThis.wait_and_promise = wait_and_promisei
globalThis.twx = twxi
globalThis.lwwState = lwwStatei
globalThis.ignoreArg = ignoreArgi
globalThis.barrier = barrieri
globalThis.STracer = STracerI
globalThis.OTracer = OTracerI

export {
    STracer,
    OTracer, 
    AVROWriterI as  AVROWriter,
     AVROReaderI as AVROReader,
     BINARY_AVROI as AVRO,
CBORI as CBOR, 
     MDisruptorI as MDisruptor,
 MTracerI as MTracer,
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
