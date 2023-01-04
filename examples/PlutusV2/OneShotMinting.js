/* global BROWSER_RUNTIME */

let script;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  script = require("Scripts/one-shot-minting-v2.plutus");
} else {
  import * as fs from "fs";
  import * as path from "path";
  script = fs.readFileSync(
    path.resolve(
      __dirname,
      "../../fixtures/scripts/one-shot-minting-v2.plutus"
    ),
    "utf8"
  );
}

export const oneShotMinting = script;
