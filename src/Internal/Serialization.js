/* global BROWSER_RUNTIME */

let lib;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  lib = require("@emurgo/cardano-serialization-lib-browser");
} else {
  lib = require("@emurgo/cardano-serialization-lib-nodejs");
}

const setter = prop => obj => value => () => obj["set_" + prop](value);

export const hashTransaction = body => () => lib.hash_transaction(body);

export const newValue = coin => () => lib.Value.new(coin);

export const newValueFromAssets = multiasset => () =>
  lib.Value.new_from_assets(multiasset);

export const valueSetCoin = setter("coin");

export const newTransactionInput = transaction_id => index => () =>
  lib.TransactionInput.new(transaction_id, index);

export const newTransactionInputs = () => lib.TransactionInputs.new();

export const addTransactionInput = inputs => input => () => inputs.add(input);

export const newTransactionOutput = address => amount => () =>
  lib.TransactionOutput.new(address, amount);

export const newTransactionOutputs = () => lib.TransactionOutputs.new();

export const addTransactionOutput = outputs => output => () =>
  outputs.add(output);

export const newTransactionBody = inputs => outputs => fee => () =>
  lib.TransactionBody.new_tx_body(inputs, outputs, fee);

export const setTxIsValid = tx => isValid => () => tx.set_is_valid(isValid);

export const newTransaction = body => witness_set => auxiliary_data => () =>
  lib.Transaction.new(body, witness_set, auxiliary_data);

export const newTransaction_ = body => witness_set => () =>
  lib.Transaction.new(body, witness_set);

export const newTransactionUnspentOutput = input => output => () =>
  lib.TransactionUnspentOutput.new(input, output);

export const newMultiAsset = () => lib.MultiAsset.new();

export const insertMultiAsset = multiasset => key => value => () =>
  multiasset.insert(key, value);

export const newAssets = () => lib.Assets.new();

export const insertAssets = assets => key => value => () =>
  assets.insert(key, value);

export const newAssetName = name => () => lib.AssetName.new(name);

export const transactionOutputSetDataHash = setter("data_hash");

export const transactionOutputSetPlutusData = setter("plutus_data");

export const transactionOutputSetScriptRef = setter("script_ref");

export const scriptRefNewNativeScript = nativeScript =>
  lib.ScriptRef.new_native_script(nativeScript);

export const scriptRefNewPlutusScript = plutusScript =>
  lib.ScriptRef.new_plutus_script(plutusScript);

export const newVkeywitnesses = () => lib.Vkeywitnesses.new();

export const makeVkeywitness = hash => key => () =>
  lib.make_vkey_witness(hash, key);

export const newVkeywitness = vkey => signature => () =>
  lib.Vkeywitness.new(vkey, signature);

export const addVkeywitness = witnesses => witness => () =>
  witnesses.add(witness);

export const newVkeyFromPublicKey = public_key => () =>
  lib.Vkey.new(public_key);

export const publicKeyHash = pk => pk.hash();

export const transactionWitnessSetSetVkeys = setter("vkeys");

export const newCostmdls = () => lib.Costmdls.new();

export const defaultCostmdls = () =>
  lib.TxBuilderConstants.plutus_vasil_cost_models();

export const costmdlsSetCostModel = cms => lang => cm => () =>
  cms.insert(lang, cm);

export const newCostModel = () => lib.CostModel.new();

export const costModelSetCost = cm => op => cost => () => cm.set(op, cost);

export const newPlutusV1 = () => lib.Language.new_plutus_v1();

export const newPlutusV2 = () => lib.Language.new_plutus_v2();

export const _hashScriptData = rs => cms => ds => () => {
  const list = lib.PlutusList.new();
  ds.forEach(d => list.add(d));
  return lib.hash_script_data(rs, cms, list);
};

export const _hashScriptDataNoDatums = rs => cms => () =>
  lib.hash_script_data(rs, cms);

export const newRedeemers = () => lib.Redeemers.new();

export const addRedeemer = rs => r => () => rs.add(r);

export const setTxBodyReferenceInputs = txBody => referenceInputs => () =>
  txBody.set_reference_inputs(referenceInputs);

export const setTxBodyScriptDataHash = setter("script_data_hash");

export const setTxBodyMint = setter("mint");

export const newMint = () => lib.Mint.new();

export const _bigIntToInt = maybe => bigInt => {
  try {
    const str = bigInt.to_str();
    if (str[0] == "-") {
      return maybe.just(
        lib.Int.new_negative(lib.BigNum.from_str(str.slice(1)))
      );
    } else {
      return maybe.just(lib.Int.new(lib.BigNum.from_str(str)));
    }
  } catch (_) {
    return maybe.nothing;
  }
};

export const newMintAssets = lib.MintAssets.new;

export const insertMintAssets = mint => scriptHash => mintAssets => () =>
  mint.insert(scriptHash, mintAssets);

export const insertMintAsset = mintAssets => assetName => int => () =>
  mintAssets.insert(assetName, int);

export const networkIdTestnet = () => lib.NetworkId.testnet();

export const networkIdMainnet = () => lib.NetworkId.mainnet();

export const setTxBodyCollateralReturn = txBody => collateralReturn => () =>
  txBody.set_collateral_return(collateralReturn);

export const setTxBodyTotalCollateral = txBody => totalCollateral => () =>
  txBody.set_total_collateral(totalCollateral);

export const setTxBodyTtl = setter("ttl");

export const setTxBodyCerts = setter("certs");

export const newCertificates = () => lib.Certificates.new();

export const newStakeRegistrationCertificate = stakeCredential => () =>
  lib.Certificate.new_stake_registration(
    lib.StakeRegistration.new(stakeCredential)
  );

export const newStakeDeregistrationCertificate = stakeCredential => () =>
  lib.Certificate.new_stake_deregistration(
    lib.StakeDeregistration.new(stakeCredential)
  );

export const newStakeDelegationCertificate =
  stakeCredential => ed25519KeyHash => () =>
    lib.Certificate.new_stake_delegation(
      lib.StakeDelegation.new(stakeCredential, ed25519KeyHash)
    );

export const newPoolRegistrationCertificate =
  operator =>
  vrfKeyhash =>
  pledge =>
  cost =>
  margin =>
  reward_account =>
  poolOwners =>
  relays =>
  poolMetadata =>
  () =>
    lib.Certificate.new_pool_registration(
      lib.PoolRegistration.new(
        lib.PoolParams.new(
          operator,
          vrfKeyhash,
          pledge,
          cost,
          margin,
          reward_account,
          poolOwners,
          relays,
          poolMetadata
        )
      )
    );

export const newUnitInterval = numerator => denominator => () =>
  lib.UnitInterval.new(numerator, denominator);

export const newPoolRetirementCertificate = poolKeyHash => epoch => () =>
  lib.Certificate.new_pool_retirement(
    lib.PoolRetirement.new(poolKeyHash, epoch)
  );

export const newGenesisKeyDelegationCertificate =
  genesisHash => genesisDelegateHash => vrfKeyhash => () =>
    lib.Certificate.new_genesis_key_delegation(
      lib.GenesisKeyDelegation.new(genesisHash, genesisDelegateHash, vrfKeyhash)
    );

export const addCert = certificates => certificate => () =>
  certificates.add(certificate);

export const setTxBodyCollateral = setter("collateral");

export const setTxBodyNetworkId = setter("network_id");

export const transactionBodySetRequiredSigners =
  containerHelper => body => keyHashes => () =>
    body.set_required_signers(
      containerHelper.pack(lib.Ed25519KeyHashes, keyHashes)
    );

export const transactionBodySetValidityStartInterval = setter(
  "validity_start_interval_bignum"
);

export const transactionBodySetAuxiliaryDataHash = txBody => hash => () =>
  txBody.set_auxiliary_data_hash(hash);

export const convertPoolOwners = containerHelper => keyHashes => () =>
  containerHelper.pack(lib.Ed25519KeyHashes, keyHashes);

export const packRelays = containerHelper => relays =>
  containerHelper.pack(lib.Relays, relays);

export const newIpv4 = data => () => lib.Ipv4.new(data);

export const newIpv6 = data => () => lib.Ipv6.new(data);

export const newSingleHostAddr = port => ipv4 => ipv6 => () =>
  lib.Relay.new_single_host_addr(lib.SingleHostAddr.new(port, ipv4, ipv6));

export const newSingleHostName = port => dnsName => () =>
  lib.Relay.new_single_host_name(
    lib.SingleHostName.new(port, lib.DNSRecordAorAAAA.new(dnsName))
  );

export const newMultiHostName = dnsName => () =>
  lib.Relay.new_multi_host_name(
    lib.MultiHostName.new(lib.DNSRecordSRV.new(dnsName))
  );

export const newPoolMetadata = url => hash => () =>
  lib.PoolMetadata.new(lib.URL.new(url), hash);

export const newMoveInstantaneousRewardToOtherPot = pot => amount => () =>
  lib.MoveInstantaneousReward.new_to_other_pot(pot, amount);

export const newMoveInstantaneousRewardToStakeCreds = pot => amounts => () =>
  lib.MoveInstantaneousReward.new_to_stake_creds(pot, amounts);

export const newMIRToStakeCredentials = containerHelper => entries => () =>
  containerHelper.packMap(lib.MIRToStakeCredentials, entries);

export const newMoveInstantaneousRewardsCertificate = mir => () =>
  lib.Certificate.new_move_instantaneous_rewards_cert(
    lib.MoveInstantaneousRewardsCert.new(mir)
  );

export const newWithdrawals = containerHelper => entries => () =>
  containerHelper.packMap(lib.Withdrawals, entries);

export const setTxBodyWithdrawals = setter("withdrawals");

export const setTxBodyUpdate = setter("update");

export const newUpdate = ppUpdates => epoch => () =>
  lib.Update.new(ppUpdates, epoch);

export const ppuSetMinfeeA = setter("minfee_a");

export const ppuSetMinfeeB = setter("minfee_b");

export const ppuSetMaxBlockBodySize = setter("max_block_body_size");

export const ppuSetMaxTxSize = setter("max_tx_size");

export const ppuSetMaxBlockHeaderSize = setter("max_block_header_size");

export const ppuSetKeyDeposit = setter("key_deposit");

export const ppuSetPoolDeposit = setter("pool_deposit");

export const ppuSetMaxEpoch = setter("max_epoch");

export const ppuSetNOpt = setter("n_opt");

export const ppuSetPoolPledgeInfluence = setter("pool_pledge_influence");

export const ppuSetExpansionRate = setter("expansion_rate");

export const ppuSetTreasuryGrowthRate = setter("treasury_growth_rate");

export const newProtocolVersion = major => minor => () =>
  lib.ProtocolVersion.new(major, minor);

export const ppuSetProtocolVersion = ppu => version => () =>
  ppu.set_protocol_version(version);

export const ppuSetMinPoolCost = setter("min_pool_cost");

export const ppuSetAdaPerUtxoByte = setter("ada_per_utxo_byte");

export const ppuSetCostModels = setter("cost_models");

export const newExUnitPrices = mem_price => step_price => () =>
  lib.ExUnitPrices.new(mem_price, step_price);

export const ppuSetExecutionCosts = setter("execution_costs");

export const ppuSetMaxTxExUnits = setter("max_tx_ex_units");

export const ppuSetMaxBlockExUnits = setter("max_block_ex_units");

export const ppuSetMaxValueSize = setter("max_value_size");

export const ppuSetCollateralPercentage = setter("collateral_percentage");

export const ppuSetMaxCollateralInputs = setter("max_collateral_inputs");

export const newProtocolParamUpdate = () => lib.ProtocolParamUpdate.new();

export const newProposedProtocolParameterUpdates =
  containerHelper => kvs => () =>
    containerHelper.packMap(lib.ProposedProtocolParameterUpdates, kvs);
