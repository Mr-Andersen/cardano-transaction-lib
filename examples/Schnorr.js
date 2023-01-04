/* global BROWSER_RUNTIME */

let script;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  script = require("Scripts/validate-schnorr.plutus");
} else {
  import * as fs from "fs";
  import * as path from "path";
  script = fs.readFileSync(
    path.resolve(__dirname, "../../fixtures/scripts/validate-schnorr.plutus"),
    "utf8"
  );
}

export const validateSchnorr = script;
