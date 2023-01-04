/* global BROWSER_RUNTIME */

let lib;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  lib = require("@emurgo/cardano-serialization-lib-browser");
} else {
  lib = require("@emurgo/cardano-serialization-lib-nodejs");
}

export const hashToBytes = hash => {
  return hash.to_bytes();
};

export const hashFromBytes = name => maybe => bytes => {
  return hashFromImpl(lib[name].from_bytes)(maybe)(bytes);
};

export const hashToBech32Unsafe = prefix => hash => {
  return hash.to_bech32(prefix);
};

const hashFromImpl = hashClassFrom => maybe => input => {
  let ret = null;
  try {
    ret = hashClassFrom(input);
  } catch (e) {
    // Do nothing
  }
  if (ret == null) {
    return maybe.nothing;
  }
  return maybe.just(ret);
};

export const hashToBech32Impl = maybe => prefix => hash => {
  let ret = null;
  try {
    ret = hash.to_bech32(prefix);
  } catch (e) {
    // Do nothing
  }
  if (ret == null) {
    return maybe.nothing;
  }
  return maybe.just(ret);
};

export const _ed25519KeyHashFromBech32Impl = maybe => bech32str => {
  return hashFromImpl(lib.Ed25519KeyHash.from_bech32)(maybe)(bech32str);
};

export const _scriptHashFromBech32Impl = maybe => bech32str => {
  return hashFromImpl(lib.ScriptHash.from_bech32)(maybe)(bech32str);
};

export const nativeScriptHash = script => script.hash();
