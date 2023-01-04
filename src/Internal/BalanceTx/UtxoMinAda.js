/* global BROWSER_RUNTIME */

let lib;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  lib = require("@emurgo/cardano-serialization-lib-browser");
} else {
  lib = require("@emurgo/cardano-serialization-lib-nodejs");
}

export const minAdaForOutput = maybe => txOutput => dataCost => {
  try {
    return maybe.just(lib.min_ada_for_output(txOutput, dataCost));
  } catch (_) {
    return maybe.nothing;
  }
};

export const newCoinsPerWord = n => lib.DataCost.new_coins_per_word(n);
export const newCoinsPerByte = n => lib.DataCost.new_coins_per_byte(n);
