/* global BROWSER_RUNTIME */

let lib;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  lib = require("@emurgo/cardano-serialization-lib-browser");
} else {
  lib = require("@emurgo/cardano-serialization-lib-nodejs");
}

const call = property => object => object[property]();
const callMaybe = property => maybe => object => {
  const res = object[property]();
  return res != null ? maybe.just(res) : maybe.nothing;
};

export const _txIsValid = tx => tx.is_valid();
export const _txWitnessSet = tx => tx.witness_set();
export const _txBody = tx => tx.body();
export const _txAuxiliaryData = maybe => tx => {
  const ad = tx.auxiliary_data();
  return ad == null ? maybe.nothing : maybe.just(ad);
};

const maybeGetter_ = fmap => propstr => maybe => obj => {
  if (typeof propstr != "string") {
    const s = "maybeGetter_ propstr must be a string, got " + propstr;
    throw s;
  }
  const res = obj[propstr]();
  return res == null ? maybe.nothing : maybe.just(fmap(res));
};
const maybeGetter = maybeGetter_(a => a);
const maybeGetterMulti = propstr => containerHelper =>
  maybeGetter_(o => containerHelper.unpack(o))(propstr);

export const _txAuxiliaryData = maybeGetter("auxiliary_data");
export const _adGeneralMetadata = maybeGetter("metadata");
export const _adNativeScripts = maybeGetter("native_scripts");
export const _adPlutusScripts = maybeGetter("plutus_scripts");

// inputs(): TransactionInputs;
export const _txBodyInputs = containerhelper => body =>
  containerhelper.unpack(body.inputs());
// outputs(): TransactionOutputs;
export const _txBodyOutputs = containerhelper => body =>
  containerhelper.unpack(body.outputs());
// fee(): BigNum;
export const _txBodyFee = body => body.fee();
// ttl(): number | void;
export const _txBodyTtl = maybeGetter("ttl_bignum");
// certs(): Certificates | void;
export const _txBodyCerts = maybeGetterMulti("certs");
// withdrawals(): Withdrawals | void;
export const _txBodyWithdrawals = maybeGetter("withdrawals");
// update(): Update | void;
export const _txBodyUpdate = maybeGetter("update");
// auxiliary_data_hash(): AuxiliaryDataHash | void;
export const _txBodyAuxiliaryDataHash = maybeGetter("auxiliary_data_hash");
// validity_start_interval(): number | void;
export const _txBodyValidityStartInterval = maybeGetter(
  "validity_start_interval_bignum"
);
// multiassets(): Mint | void;
export const _txBodyMultiAssets = maybeGetter("multiassets");
export const _txBodyReferenceInputs = maybe => containerhelper => body =>
  body.reference_inputs()
    ? maybe.just(containerhelper.unpack(body.reference_inputs()))
    : maybe.nothing;
// script_data_hash(): ScriptDataHash | void;
export const _txBodyScriptDataHash = maybeGetter("script_data_hash");
// collateral(): Array TransactionInput | void;
export const _txBodyCollateral = maybeGetterMulti("collateral");
// required_signers(): Ed25519KeyHashes | void;
export const _txBodyRequiredSigners = maybeGetterMulti("required_signers");
// network_id(): number | void;
export const _txBodyNetworkId = testnet => mainnet =>
  maybeGetter_(o => {
    switch (o.kind()) {
      case lib.NetworkIdKind.Testnet:
        return testnet;
      case lib.NetworkIdKind.Mainnet:
        return mainnet;
      default:
        throw "Unknown NetworkIdKind: " + o.kind();
    }
  })("network_id");

// collateral_return(): TransactionOutput | void;
export const _txBodyCollateralReturn = maybeGetter("collateral_return");

// total_collateral(): BigNum | void
export const _txBodyTotalCollateral = maybeGetter("total_collateral");

// foreign import _unpackWithdrawals :: ContainerHelper -> CSL.Withdrawals -> Array(Tuple CSL.RewardAddress CSL.BigNum)
export const _unpackWithdrawals = containerhelper =>
  containerhelper.unpackKeyIndexed;

export const _unpackUpdate = containerhelper => update => {
  const pppus = containerhelper.unpackKeyIndexed(
    update.proposed_protocol_parameter_updates()
  );
  return { epoch: update.epoch(), paramUpdates: pppus };
};

export const _unpackMint = containerhelper => containerhelper.unpackKeyIndexed;

export const _unpackMintAssets = containerhelper =>
  containerhelper.unpackKeyIndexed;

export const _convertCert = certConvHelper => cert => {
  switch (cert.kind()) {
    case lib.CertificateKind.StakeRegistration:
      return certConvHelper.stakeRegistration(
        cert.as_stake_registration().stake_credential()
      );
    case lib.CertificateKind.StakeDeregistration:
      return certConvHelper.stakeDeregistration(
        cert.as_stake_deregistration().stake_credential()
      );
    case lib.CertificateKind.StakeDelegation:
      return certConvHelper.stakeDelegation(
        cert.as_stake_delegation().stake_credential()
      )(cert.as_stake_delegation().pool_keyhash());
    case lib.CertificateKind.PoolRegistration:
      return certConvHelper.poolRegistration(
        cert.as_pool_registration().pool_params()
      );
    case lib.CertificateKind.PoolRetirement:
      return certConvHelper.poolRetirement(
        cert.as_pool_retirement().pool_keyhash()
      )(cert.as_pool_retirement().epoch());
    case lib.CertificateKind.GenesisKeyDelegation:
      return certConvHelper.genesisKeyDelegation(
        cert.as_genesis_key_delegation().genesishash()
      )(cert.as_genesis_key_delegation().genesis_delegate_hash())(
        cert.as_genesis_key_delegation().vrf_keyhash()
      );
    case lib.CertificateKind.MoveInstantaneousRewardsCert:
      const mirCert = cert.as_move_instantaneous_rewards_cert();
      const mir = mirCert.move_instantaneous_reward();
      switch (mir.kind()) {
        case lib.MIRKind.ToOtherPot:
          return certConvHelper.moveInstantaneousRewardsToOtherPotCert(
            mir.pot()
          )(mir.as_to_other_pot());
        case lib.MIRKind.ToStakeCredentials:
          return certConvHelper.moveInstantaneousRewardsToStakeCreds(mir.pot())(
            mir.as_to_stake_creds()
          );
        default:
          throw (
            "MoveInstantaneousReward convertion failed for kind" + mir.kind()
          );
      }
    default:
      throw ("Cert conversion failed for kind: ", cert.kind());
  }
};

export const _unpackProtocolParamUpdate = maybe => ppu => {
  const optional = x => (x == null ? maybe.nothing : maybe.just(x));

  return {
    minfeeA: optional(ppu.minfee_a()),
    minfeeB: optional(ppu.minfee_b()),
    maxBlockBodySize: optional(ppu.max_block_body_size()),
    maxTxSize: optional(ppu.max_tx_size()),
    maxBlockHeaderSize: optional(ppu.max_block_header_size()),
    keyDeposit: optional(ppu.key_deposit()),
    poolDeposit: optional(ppu.pool_deposit()),
    maxEpoch: optional(ppu.max_epoch()),
    nOpt: optional(ppu.n_opt()),
    poolPledgeInfluence: optional(ppu.pool_pledge_influence()),
    expansionRate: optional(ppu.expansion_rate()),
    treasuryGrowthRate: optional(ppu.treasury_growth_rate()),
    protocolVersion: optional(ppu.protocol_version()),
    minPoolCost: optional(ppu.min_pool_cost()),
    adaPerUtxoByte: optional(ppu.ada_per_utxo_byte()),
    costModels: optional(ppu.cost_models()),
    executionCosts: optional(ppu.execution_costs()),
    maxTxExUnits: optional(ppu.max_tx_ex_units()),
    maxBlockExUnits: optional(ppu.max_block_ex_units()),
    maxValueSize: optional(ppu.max_value_size()),
    collateralPercentage: optional(ppu.collateral_percentage()),
    maxCollateralInputs: optional(ppu.max_collateral_inputs()),
  };
};

export const _unpackCostModels = containerhelper =>
  containerhelper.unpackKeyIndexed;

export const _unpackCostModel = cm => {
  const res = [];
  for (let op = 0; op < cm.len(); op++) {
    res.push(cm.get(op).to_str());
  }
  return res;
};

export const _convertNonce = nonceCtors => cslNonce => {
  const hashBytes = cslNonce.get_hash();
  return hashBytes == null
    ? nonceCtors.identityNonce
    : nonceCtors.hashNonce(hashBytes);
};

export const _unpackMetadatums = containerHelper =>
  containerHelper.unpackKeyIndexed;

export const _unpackMetadataMap = containerHelper =>
  containerHelper.unpackKeyIndexed;

export const _unpackMetadataList = containerHelper => containerHelper.unpack;

export const _convertMetadatum = metadataCtors => cslMetadatum => {
  switch (cslMetadatum.kind()) {
    case lib.TransactionMetadatumKind.MetadataMap:
      return metadataCtors.from_map(cslMetadatum.as_map());
    case lib.TransactionMetadatumKind.MetadataList:
      return metadataCtors.from_list(cslMetadatum.as_list());
    case lib.TransactionMetadatumKind.Int:
      return metadataCtors.from_int(cslMetadatum.as_int());
    case lib.TransactionMetadatumKind.Bytes:
      return metadataCtors.from_bytes(cslMetadatum.as_bytes());
    case lib.TransactionMetadatumKind.Text:
      return metadataCtors.from_text(cslMetadatum.as_text());
    default:
      throw "Could not convert to known types.";
  }
};

export const _unpackExUnits = exunits => {
  return {
    mem: exunits.mem(),
    steps: exunits.steps(),
  };
};

export const _unpackUnitInterval = ui => {
  return {
    numerator: ui.numerator(),
    denominator: ui.denominator(),
  };
};

export const _unpackProtocolVersion = cslPV => ({
  major: cslPV.major(),
  minor: cslPV.minor(),
});

export const _unpackExUnitsPrices = cslEup => {
  return {
    memPrice: cslEup.mem_price(),
    stepPrice: cslEup.step_price(),
  };
};

export const poolParamsOperator = call("operator");
export const poolParamsVrfKeyhash = call("vrf_keyhash");
export const poolParamsPledge = call("pledge");
export const poolParamsCost = call("cost");
export const poolParamsMargin = call("margin");
export const poolParamsRewardAccount = call("reward_account");
export const poolParamsPoolOwners = containerHelper => poolParams =>
  containerHelper.unpack(poolParams.pool_owners());
export const poolParamsRelays = containerHelper => poolParams =>
  containerHelper.unpack(poolParams.relays());
export const poolParamsPoolMetadata = callMaybe("pool_metadata");

export const convertRelay_ = helper => relay => {
  switch (relay.kind()) {
    case lib.RelayKind.SingleHostAddr:
      return helper.asSingleHostAddr(relay.as_single_host_addr());
    case lib.RelayKind.SingleHostName:
      return helper.asSingleHostName(relay.as_single_host_name());
    case lib.RelayKind.MultiHostName:
      return helper.asMultiHostName(relay.as_multi_host_name());
    default:
      throw "convertRelay_: impossible happened: invalid Relay";
  }
};

export const convertIpv6_ = ipv6 => ipv6.ip();

export const convertIpv4_ = ipv6 => ipv6.ip();

export const convertSingleHostAddr_ = maybe => cont => singleHostAddr => {
  const port = singleHostAddr.port();
  const ipv4 = singleHostAddr.ipv4();
  const ipv6 = singleHostAddr.ipv6();

  return cont(port ? maybe.just(port) : maybe.nothing)(
    ipv4 ? maybe.just(ipv4) : maybe.nothing
  )(ipv6 ? maybe.just(ipv6) : maybe.nothing);
};

export const convertSingleHostName_ = maybe => cont => singleHostName => {
  const port = singleHostName.port();
  return cont(port ? maybe.just(port) : maybe.nothing)(
    singleHostName.dns_name().record()
  );
};

export const convertMultiHostName_ = multiHostName =>
  multiHostName.dns_name().record();

export const unpackMIRToStakeCredentials_ =
  containerHelper => mirToStakeCredentials =>
    containerHelper.unpackKeyIndexed(mirToStakeCredentials);

export const convertPoolMetadata_ = cont => poolMetadata =>
  cont(poolMetadata.url().url())(poolMetadata.pool_metadata_hash());
