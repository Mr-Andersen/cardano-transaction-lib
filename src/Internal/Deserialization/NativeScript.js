/* global BROWSER_RUNTIME */

let lib;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  lib = require("@emurgo/cardano-serialization-lib-browser");
} else {
  lib = require("@emurgo/cardano-serialization-lib-nodejs");
}

export const _convertNativeScript = handler => ns => {
  switch (ns.kind()) {
    case lib.NativeScriptKind.ScriptPubkey:
      return handler.scriptPubkey(ns.as_script_pubkey());
    case lib.NativeScriptKind.ScriptAll:
      return handler.scriptAll(ns.as_script_all());
    case lib.NativeScriptKind.ScriptAny:
      return handler.scriptAny(ns.as_script_any());
    case lib.NativeScriptKind.ScriptNOfK:
      return handler.scriptNOfK(ns.as_script_n_of_k());
    case lib.NativeScriptKind.TimelockStart:
      return handler.timelockStart(ns.as_timelock_start());
    case lib.NativeScriptKind.TimelockExpiry:
      return handler.timelockExpiry(ns.as_timelock_expiry());
    default:
      throw "Impossible native script kind: " + ns.kind();
  }
};

const call = property => object => object[property]();

export const scriptPubkey_addr_keyhash = call("addr_keyhash");
export const scriptAllScripts = helper =>
  helper.unpackFromProperty("native_scripts");
export const scriptAnyScripts = helper =>
  helper.unpackFromProperty("native_scripts");
export const scriptNOfKScripts = helper =>
  helper.unpackFromProperty("native_scripts");
export const scriptNOfK_n = call("n");
export const timelockStart_slot = call("slot_bignum");
export const timelockExpiry_slot = call("slot_bignum");
