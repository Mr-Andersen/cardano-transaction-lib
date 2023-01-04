/* global BROWSER_RUNTIME */

let lib;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  lib = require("@emurgo/cardano-serialization-lib-browser");
} else {
  lib = require("@emurgo/cardano-serialization-lib-nodejs");
}

export const _publicKeyFromBech32 = maybe => bech32 => {
  try {
    return maybe.just(lib.PublicKey.from_bech32(bech32));
  } catch (_) {
    return maybe.nothing;
  }
};

export const _ed25519SignatureFromBech32 = maybe => bech32 => {
  try {
    return maybe.just(lib.Ed25519Signature.from_bech32(bech32));
  } catch (_) {
    return maybe.nothing;
  }
};

export const _privateKeyFromBytes = maybe => bytes => {
  try {
    return maybe.just(lib.PrivateKey.from_normal_bytes(bytes));
  } catch (_) {
    return maybe.nothing;
  }
};

export const privateKeyToBech32 = privateKey => privateKey.to_bech32();

export const _privateKeyFromBech32 = maybe => bech32 => {
  try {
    return maybe.just(lib.PrivateKey.from_bech32(bech32));
  } catch (_) {
    return maybe.nothing;
  }
};
