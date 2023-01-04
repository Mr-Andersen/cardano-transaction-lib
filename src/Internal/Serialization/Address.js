/* global BROWSER_RUNTIME */

let lib;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  lib = require("@emurgo/cardano-serialization-lib-browser");
} else {
  lib = require("@emurgo/cardano-serialization-lib-nodejs");
}

const callClassStaticMaybe = (classname, functionname) => maybe => input => {
  let ret = null;
  try {
    ret = lib[classname][functionname](input);
  } catch (_) {
    // ignored
  }
  if (ret == null) {
    return maybe.nothing;
  }
  return maybe.just(ret);
};

const callMethodParameterless = methodname => object => {
  return object[methodname]();
};
const callToAddress = callMethodParameterless("to_address");
const callToBytes = callMethodParameterless("to_bytes");
const callToBech32 = callMethodParameterless("to_bech32");
const callNetworkId = callMethodParameterless("network_id");
const callPaymentCred = callMethodParameterless("payment_cred");
const callStakeCred = callMethodParameterless("stake_cred");

export const withStakeCredential = cbObj => stakeCred => {
  return stakeCred.kind() == lib.StakeCredKind.Key
    ? cbObj.onKeyHash(stakeCred.to_keyhash())
    : cbObj.onScriptHash(stakeCred.to_scripthash());
};

export const keyHashCredential = lib.StakeCredential.from_keyhash;
export const scriptHashCredential = lib.StakeCredential.from_scripthash;

export const addressBytes = callToBytes;
export const byronAddressBytes = callToBytes;
export const stakeCredentialToBytes = callToBytes;

export const addressBech32 = callToBech32;
export const _addressNetworkId = toAdt => addr => {
  return toAdt(callNetworkId(addr));
};
export const _byronAddressNetworkId = toAdt => addr => {
  return toAdt(callNetworkId(addr));
};

export const _addressFromBytes = callClassStaticMaybe("Address", "from_bytes");
export const _stakeCredentialFromBytes = callClassStaticMaybe(
  "StakeCredential",
  "from_bytes"
);
export const _byronAddressFromBytes = callClassStaticMaybe(
  "ByronAddress",
  "from_bytes"
);

export const _addressFromBech32 = callClassStaticMaybe(
  "Address",
  "from_bech32"
);

export const _byronAddressFromBase58 = callClassStaticMaybe(
  "ByronAddress",
  "from_base58"
);

export const _baseAddressFromAddress = callClassStaticMaybe(
  "BaseAddress",
  "from_address"
);
export const _byronAddressFromAddress = callClassStaticMaybe(
  "ByronAddress",
  "from_address"
);
export const _enterpriseAddressFromAddress = callClassStaticMaybe(
  "EnterpriseAddress",
  "from_address"
);
export const _pointerAddressFromAddress = callClassStaticMaybe(
  "PointerAddress",
  "from_address"
);
export const _rewardAddressFromAddress = callClassStaticMaybe(
  "RewardAddress",
  "from_address"
);

export const baseAddressToAddress = callToAddress;
export const byronAddressToAddress = callToAddress;
export const enterpriseAddressToAddress = callToAddress;
export const pointerAddressToAddress = callToAddress;
export const rewardAddressToAddress = callToAddress;

export const baseAddressPaymentCred = callPaymentCred;
export const rewardAddressPaymentCred = callPaymentCred;
export const enterpriseAddressPaymentCred = callPaymentCred;
export const pointerAddressPaymentCred = callPaymentCred;

export const baseAddressDelegationCred = callStakeCred;

export const byronAddressAttributes = callMethodParameterless("attributes");
export const byronAddressIsValid = lib.ByronAddress.is_valid;
export const byronAddressToBase58 = callMethodParameterless("to_base58");
export const byronProtocolMagic = callMethodParameterless(
  "byron_protocol_magic"
);

export const icarusFromKey = bip32pubkey => byronProtocolMagic => {
  return lib.ByronAddress.icarus_from_key(bip32pubkey, byronProtocolMagic);
};

export const pointerAddressStakePointer = pa => {
  const pointerForeign = pa.stake_pointer();
  return {
    slot: pointerForeign.slot_bignum(),
    txIx: pointerForeign.tx_index_bignum(),
    certIx: pointerForeign.cert_index_bignum(),
  };
};

export const _enterpriseAddress = netIdToInt => inpRec => {
  return lib.EnterpriseAddress.new(
    netIdToInt(inpRec.network),
    inpRec.paymentCred
  );
};

export const _rewardAddress = netIdToInt => inpRec => {
  return lib.RewardAddress.new(netIdToInt(inpRec.network), inpRec.paymentCred);
};

export const _baseAddress = netIdToInt => inpRec => {
  return lib.BaseAddress.new(
    netIdToInt(inpRec.network),
    inpRec.paymentCred,
    inpRec.delegationCred
  );
};

export const _pointerAddress = netIdToInt => inpRec => {
  const p = inpRec.stakePointer;
  const pointerForeign = lib.Pointer.new_pointer(p.slot, p.txIx, p.certIx);
  return lib.PointerAddress.new(
    netIdToInt(inpRec.network),
    inpRec.paymentCred,
    pointerForeign
  );
};
