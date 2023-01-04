/* global BROWSER_RUNTIME */

import * as Blake2 from "blakejs";
import * as SHA256 from "jssha/dist/sha256";
import * as SHA3 from "jssha/dist/sha3";

let lib;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  lib = require("@emurgo/cardano-serialization-lib-browser");
} else {
  lib = require("@emurgo/cardano-serialization-lib-nodejs");
}

export const blake2b256Hash = bytesToHash => {
  return Blake2.blake2b(bytesToHash, null, 32);
};

export const blake2b256HashHex = bytesToHash => {
  return Blake2.blake2bHex(bytesToHash, null, 32);
};

export const hashPlutusData = plutusData => {
  return lib.hash_plutus_data(plutusData);
};

export const hashPlutusScript = script => script.hash();

const SHA256_HASH_VARIANT = "SHA-256";
const SHA3_256_HASH_VARIANT = "SHA3-256";

const UINT8ARRAY_FORMAT = "UINT8ARRAY";
const HEX_FORMAT = "HEX";

export const sha256Hash = bytesToHash => {
  const shaObj = new SHA256(SHA256_HASH_VARIANT, UINT8ARRAY_FORMAT);
  shaObj.update(bytesToHash);
  return shaObj.getHash(UINT8ARRAY_FORMAT);
};

export const sha256HashHex = bytesToHash => {
  const shaObj = new SHA256(SHA256_HASH_VARIANT, UINT8ARRAY_FORMAT);
  shaObj.update(bytesToHash);
  return shaObj.getHash(HEX_FORMAT);
};

export const sha3_256Hash = bytesToHash => {
  const shaObj = new SHA3(SHA3_256_HASH_VARIANT, UINT8ARRAY_FORMAT);
  shaObj.update(bytesToHash);
  return shaObj.getHash(UINT8ARRAY_FORMAT);
};

export const sha3_256HashHex = bytesToHash => {
  const shaObj = new SHA3(SHA3_256_HASH_VARIANT, UINT8ARRAY_FORMAT);
  shaObj.update(bytesToHash);
  return shaObj.getHash(HEX_FORMAT);
};
