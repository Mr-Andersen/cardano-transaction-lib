module Internal.Affjax where

import Affjax (AffjaxDriver)
import Affjax.Node (driver) as Node
import Affjax.Web (driver) as Web

foreign import isBrowser :: Boolean

driver :: AffjaxDriver
driver = if isBrowser then Web.driver else Node.driver
