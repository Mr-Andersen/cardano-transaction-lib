/* global BROWSER_RUNTIME */

let lib;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  lib = require("@emurgo/cardano-serialization-lib-browser");
} else {
  lib = require("@emurgo/cardano-serialization-lib-nodejs");
}

export const newTransactionWitnessSet = () => lib.TransactionWitnessSet.new();

export const newPublicKey = bech32 => () => lib.PublicKey.from_bech32(bech32);

export const newVkeyFromPublicKey = public_key => () =>
  lib.Vkey.new(public_key);

export const newVkeywitnesses = () => lib.Vkeywitnesses.new();

export const newVkeywitness = vkey => signature => () =>
  lib.Vkeywitness.new(vkey, signature);

export const addVkeywitness = witnesses => witness => () =>
  witnesses.add(witness);

export const newPlutusScripts = () => lib.PlutusScripts.new();

export const addPlutusScript = scripts => script => () => scripts.add(script);

export const transactionWitnessSetSetVkeys = ws => vkeys => () =>
  ws.set_vkeys(vkeys);

export const txWitnessSetSetPlutusScripts = ws => scripts => () =>
  ws.set_plutus_scripts(scripts);

export const transactionWitnessSetSetNativeScripts = ws => scripts => () =>
  ws.set_native_scripts(scripts);

export const _wsSetBootstraps = helper => ws => bootstraps => () =>
  ws.set_bootstraps(helper.pack(lib.BootstrapWitnesses, bootstraps));

export const newBootstrapWitness =
  vkey => signature => chain_code => attributes => () => {
    lib.BootstrapWitness.new(vkey, signature, chain_code, attributes);
  };

export const _wsSetPlutusData = helper => ws => plutus_data => () =>
  ws.set_plutus_data(helper.pack(lib.PlutusList, plutus_data));

export const newRedeemer = tag => index => data => ex_units => () =>
  lib.Redeemer.new(tag, index, data, ex_units);

export const _newRedeemerTag = tag => () => lib.RedeemerTag["new_" + tag]();

export const newExUnits = mem => steps => lib.ExUnits.new(mem, steps);

export const _wsSetRedeemers = helper => ws => redeemers => () =>
  ws.set_redeemers(helper.pack(lib.Redeemers, redeemers));

export const _mkRedeemers = helper => redeemers =>
  helper.pack(lib.Redeemers, redeemers);

export const _wsSetPlutusScripts = helper => ws => scripts => () =>
  ws.set_plutus_scripts(helper.pack(lib.PlutusScripts, scripts));
