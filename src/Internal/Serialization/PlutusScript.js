/* global BROWSER_RUNTIME */

let lib;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  lib = require("@emurgo/cardano-serialization-lib-browser");
} else {
  lib = require("@emurgo/cardano-serialization-lib-nodejs");
}

export const newPlutusV1Script = bytes => lib.PlutusScript.new(bytes);

export const newPlutusV2Script = bytes => lib.PlutusScript.new_v2(bytes);

export const plutusScriptBytes = script => script.bytes();
