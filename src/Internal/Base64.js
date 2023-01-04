import * as base64 from "base64-js";

export const fromByteArray = base64.fromByteArray;

export const toByteArray = base64.toByteArray;

export const _decodeBase64 = maybe => str => {
  try {
    return maybe.just(base64.toByteArray(str));
  } catch (_) {
    return maybe.nothing;
  }
};
