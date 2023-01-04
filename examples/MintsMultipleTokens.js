/* global BROWSER_RUNTIME */

let redeemerInt1, redeemerInt2, redeemerInt3;

if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  redeemerInt1 = require("Scripts/redeemer1.plutus");
  redeemerInt2 = require("Scripts/redeemer2.plutus");
  redeemerInt3 = require("Scripts/redeemer3.plutus");
} else {
  import * as fs from "fs";
  import * as path from "path";
  const readScript = name =>
    fs.readFileSync(
      path.resolve(__dirname, `../../fixtures/scripts/${name}.plutus`),
      "utf8"
    );
  redeemerInt1 = readScript("redeemer1");
  redeemerInt2 = readScript("redeemer2");
  redeemerInt3 = readScript("redeemer3");
}

export const redeemerInt1 = redeemerInt1;
export const redeemerInt2 = redeemerInt2;
export const redeemerInt3 = redeemerInt3;
