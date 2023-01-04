/* global BROWSER_RUNTIME */

let lib;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  lib = require("@emurgo/cardano-serialization-lib-browser");
} else {
  lib = require("@emurgo/cardano-serialization-lib-nodejs");
}

export const _mkPlutusData_bytes = bytes => lib.PlutusData.new_bytes(bytes);
export const _mkPlutusData_list = list => lib.PlutusData.new_list(list);
export const _mkPlutusData_map = list => lib.PlutusData.new_map(list);
export const _mkPlutusData_integer = int => lib.PlutusData.new_integer(int);
export const _mkPlutusData_constr = constr =>
  lib.PlutusData.new_constr_plutus_data(constr);

export const _packPlutusList = containerHelper => elems =>
  containerHelper.pack(lib.PlutusList, elems);
export const _mkConstrPlutusData = n => list =>
  lib.ConstrPlutusData.new(n, list);

export const _bigIntFromString = maybe => str => {
  try {
    return maybe.just(lib.BigInt.from_str(str));
  } catch (_) {
    return maybe.nothing;
  }
};

export const _packMap = first => second => kvs => {
  const res = lib.PlutusMap.new();
  for (let kv of kvs) {
    res.insert(first(kv), second(kv));
  }
  return res;
};
