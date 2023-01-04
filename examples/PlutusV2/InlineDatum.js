/* global BROWSER_RUNTIME */

let script;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  script = require("Scripts/check-datum-is-inline.plutus");
} else {
  import * as fs from "fs";
  import * as path from "path";
  script = fs.readFileSync(
    path.resolve(
      __dirname,
      "../../fixtures/scripts/check-datum-is-inline.plutus"
    ),
    "utf8"
  );
}

export const checkDatumIsInline = script;
