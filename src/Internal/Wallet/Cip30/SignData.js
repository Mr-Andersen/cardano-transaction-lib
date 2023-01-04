/* global BROWSER_RUNTIME */

let lib;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  lib = require("@emurgo/cardano-message-signing-browser");
} else {
  lib = require("@emurgo/cardano-message-signing-nodejs");
}

// -----------------------------------------------------------------------------
// COSESign1Builder
// -----------------------------------------------------------------------------

// newCoseSign1Builder :: ByteArray -> Headers -> Effect COSESign1Builder
export const newCoseSign1Builder = payload => headers => () => {
  return lib.COSESign1Builder.new(headers, payload, false);
};

// makeDataToSign :: COSESign1Builder -> ByteArray
export const makeDataToSign = builder => {
  return builder.make_data_to_sign().to_bytes();
};

// sign :: PrivateKey -> ByteArray -> ByteArray
export const sign = privateKey => message => {
  return privateKey.sign(message).to_bytes();
};

// buildSignature :: COSESign1Builder -> ByteArray -> ByteArray
export const buildSignature = builder => signedSigStruct => {
  return builder.build(signedSigStruct).to_bytes();
};

// -----------------------------------------------------------------------------
// Headers
// -----------------------------------------------------------------------------

// newHeaders :: HeaderMap -> ProtectedHeaderMap -> Headers
export const newHeaders = unprotectedHeaders => protectedHeaders => {
  return lib.Headers.new(protectedHeaders, unprotectedHeaders);
};

// -----------------------------------------------------------------------------
// ProtectedHeaderMap
// -----------------------------------------------------------------------------

// newProtectedHeaderMap :: HeaderMap -> ProtectedHeaderMap
export const newProtectedHeaderMap = headerMap => {
  return lib.ProtectedHeaderMap.new(headerMap);
};

// -----------------------------------------------------------------------------
// HeaderMap
// -----------------------------------------------------------------------------

// newHeaderMap :: Effect HeaderMap
export const newHeaderMap = () => {
  return lib.HeaderMap.new();
};

// setAlgHeaderToEdDsa :: HeaderMap -> Effect Unit
export const setAlgHeaderToEdDsa = headerMap => () => {
  const label = lib.Label.from_algorithm_id(lib.AlgorithmId.EdDSA);
  headerMap.set_algorithm_id(label);
};

// setAddressHeader :: ByteArray -> HeaderMap -> Effect Unit
export const setAddressHeader = addressBytes => headerMap => () => {
  const label = lib.Label.new_text("address");
  const value = lib.CBORValue.new_bytes(addressBytes);
  headerMap.set_header(label, value);
};

// -----------------------------------------------------------------------------
// COSEKey
// -----------------------------------------------------------------------------

// newCoseKeyWithOkpType :: Effect COSEKey
export const newCoseKeyWithOkpType = () => {
  return lib.COSEKey.new(lib.Label.from_key_type(lib.KeyType.OKP));
};

// setCoseKeyAlgHeaderToEdDsa :: COSEKey -> Effect Unit
export const setCoseKeyAlgHeaderToEdDsa = key => () => {
  key.set_algorithm_id(lib.Label.from_algorithm_id(lib.AlgorithmId.EdDSA));
};

// setCoseKeyCrvHeaderToEd25519 :: COSEKey -> Effect Unit
export const setCoseKeyCrvHeaderToEd25519 = key => () => {
  key.set_header(
    lib.Label.new_int(
      lib.Int.new_negative(lib.BigNum.from_str("1")) // crv (-1)
    ),
    lib.CBORValue.new_int(
      lib.Int.new_i32(6) // Ed25519 (6)
    )
  );
};

// setCoseKeyXHeader :: RawBytes -> COSEKey -> Effect Unit
export const setCoseKeyXHeader = publicKeyBytes => key => () => {
  key.set_header(
    lib.Label.new_int(
      lib.Int.new_negative(lib.BigNum.from_str("2")) // x (-2)
    ),
    lib.CBORValue.new_bytes(publicKeyBytes) // public key bytes
  );
};

// bytesFromCoseKey :: COSEKey -> CborBytes
export const bytesFromCoseKey = key => key.to_bytes();
