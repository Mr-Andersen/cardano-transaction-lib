/* global BROWSER_RUNTIME */

const bytesFromKey = key => key.as_bytes();

export const bytesFromPublicKey = bytesFromKey;
export const bytesFromPrivateKey = bytesFromKey;

export const publicKeyFromPrivateKey = private_key => private_key.to_public();

const bech32FromX = key => key.to_bech32();

export const bech32FromPublicKey = bech32FromX;
export const bech32FromPrivateKey = bech32FromX;
export const bech32FromEd25519Signature = bech32FromX;
