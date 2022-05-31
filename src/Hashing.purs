module Hashing
  ( blake2b256Hash
  , blake2b256HashHex
  , datumHash
  , plutusScriptHash
  ) where

import Prelude

import Data.Maybe (Maybe)
import Data.Newtype (wrap, unwrap)
import Serialization.Hash (ScriptHash, scriptHashFromBytes)
import Serialization.PlutusData (convertPlutusData)
import Serialization.Types (PlutusData) as Serialization
import Types.ByteArray (ByteArray)
import Types.Datum (Datum)
import Types.Scripts (PlutusScript)
import Types.Transaction (DataHash)

foreign import blake2b256Hash :: ByteArray -> ByteArray

foreign import blake2b256HashHex :: ByteArray -> String

foreign import hashPlutusData :: Serialization.PlutusData -> ByteArray

foreign import hashPlutusScript :: PlutusScript -> ByteArray

datumHash :: Datum -> Maybe DataHash
datumHash =
  map (wrap <<< hashPlutusData) <<< convertPlutusData <<< unwrap

plutusScriptHash :: PlutusScript -> Maybe ScriptHash
plutusScriptHash =
  scriptHashFromBytes <<< wrap <<< hashPlutusScript
