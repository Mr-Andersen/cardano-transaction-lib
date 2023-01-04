/* global BROWSER_RUNTIME */

let lib;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  lib = require("@emurgo/cardano-serialization-lib-browser");
} else {
  lib = require("@emurgo/cardano-serialization-lib-nodejs");
}

const setter = prop => obj => value => () => obj["set_" + prop](value);

export const newAuxiliaryData = () => lib.AuxiliaryData.new();

export const _hashAuxiliaryData = auxiliaryData =>
  lib.hash_auxiliary_data(auxiliaryData);

export const setAuxiliaryDataNativeScripts = setter("native_scripts");

export const setAuxiliaryDataPlutusScripts = setter("plutus_scripts");

export const setAuxiliaryDataGeneralTransactionMetadata = setter("metadata");

export const newGeneralTransactionMetadata = containerHelper => entries => () =>
  containerHelper.packMap(lib.GeneralTransactionMetadata, entries);

export const newMetadataMap = containerHelper => entries => () =>
  lib.TransactionMetadatum.new_map(
    containerHelper.packMap(lib.MetadataMap, entries)
  );

export const newMetadataList = containerHelper => entries => () =>
  lib.TransactionMetadatum.new_list(
    containerHelper.pack(lib.MetadataList, entries)
  );

export const newMetadataInt = int => () =>
  lib.TransactionMetadatum.new_int(int);

export const newMetadataBytes = bytes => () =>
  lib.TransactionMetadatum.new_bytes(bytes);

export const newMetadataText = text => () =>
  lib.TransactionMetadatum.new_text(text);
