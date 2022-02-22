/* global exports */

// _enableNami :: Effect (Promise NamiConnection)
exports._enableNami = () => window.cardano.nami.enable();

// _getNamiAddress :: NamiConnection -> Effect (Promise String)
exports._getNamiAddress = (nami) => () =>
  nami.getUsedAddresses().then((addrs) => addrs[0]);

// _getNamiCollateral
//   :: NamiConnection
//   -> Effect (Promise String)
exports._getNamiCollateral = (nami) => () =>
  nami.experimental.getCollateral().then((utxos) => utxos[0]);

// _signTxNami :: String -> NamiConnection -> Effect (Promise String)
exports._signTxNami = (txHex) => (nami) => () => nami.signTx(txHex);

// _submitTxNami :: String -> NamiConnection -> Effect (Promise String)
exports._submitTxNami = (txHex) => (nami) => () => {
  try {
    nami.submitTx(txHex);
  } catch (e) {
    console.log(e);
  }
};