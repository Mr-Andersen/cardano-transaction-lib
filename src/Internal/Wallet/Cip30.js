/* global BROWSER_RUNTIME */

export const _getNetworkId = conn => () => conn.getNetworkId();

export const _getUtxos = maybe => conn => () =>
  conn.getUtxos().then(res => (res === null ? maybe.nothing : maybe.just(res)));

export const _getCollateral = maybe => conn => () =>
  conn.experimental
    .getCollateral()
    .then(utxos =>
      utxos !== null && utxos.length ? maybe.just(utxos) : maybe.nothing
    );

export const _getBalance = conn => () => conn.getBalance();

export const _getAddresses = conn => conn.getUsedAddresses;

export const _getUnusedAddresses = conn => () => conn.getUnusedAddresses();

export const _getChangeAddress = conn => () => conn.getChangeAddress();

export const _getRewardAddresses = conn => () => conn.getRewardAddresses();

export const _signTx = txHex => conn => () =>
  conn.signTx(txHex, true).catch(e => {
    throw JSON.stringify(e);
  });

export const _signData = address => payload => conn => () =>
  conn.signData(address, payload).catch(e => {
    throw JSON.stringify(e);
  });
