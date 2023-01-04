/* global BROWSER_RUNTIME */

let script;
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  script = require("Scripts/always-succeeds-v2.plutus");
} else {
  import * as fs from "fs";
  import * as path from "path";
  script = fs.readFileSync(
    path.resolve(__dirname, "../../fixtures/scripts/always-succeeds-v2.plutus"),
    "utf8"
  );
}

export const alwaysSucceedsV2 = script;
