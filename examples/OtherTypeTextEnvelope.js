/* global BROWSER_RUNTIME */

let script;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  script = require("Scripts/other-type-text-envelope.plutus");
} else {
  import * as fs from "fs";
  import * as path from "path";
  script = fs.readFileSync(
    path.resolve(
      __dirname,
      "../../fixtures/scripts/other-type-text-envelope.plutus"
    ),
    "utf8"
  );
}
export const otherTypeTextEnvelope = script;
