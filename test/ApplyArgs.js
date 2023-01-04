/* global BROWSER_RUNTIME */

let _scripts = {};
if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
  _scripts["always-fails"] = require("Scripts/always-fails.plutus");
  _scripts["include-datum"] = require("Scripts/include-datum.plutus");
  _scripts["one-shot-minting"] = require("Scripts/one-shot-minting.plutus");
  _scripts[
    "redeemer1-validator"
  ] = require("Scripts/redeemer1-validator.plutus");
  _scripts["always-succeeds-v2"] = require("Scripts/always-succeeds-v2.plutus");
  _scripts[
    "one-shot-minting-v2"
  ] = require("Scripts/one-shot-minting-v2.plutus");
  _scripts[
    "check-datum-is-inline"
  ] = require("Scripts/check-datum-is-inline.plutus");

  _scripts[
    "always-fails-big-arg"
  ] = require("Scripts/applied/always-fails-big-arg.plutus");
  _scripts[
    "always-fails-no-args"
  ] = require("Scripts/applied/always-fails-no-args.plutus");
  _scripts[
    "always-fails-unit"
  ] = require("Scripts/applied/always-fails-unit.plutus");
  _scripts[
    "always-succeeds-v2-big-arg"
  ] = require("Scripts/applied/always-succeeds-v2-big-arg.plutus");
  _scripts[
    "always-succeeds-v2-no-args"
  ] = require("Scripts/applied/always-succeeds-v2-no-args.plutus");
  _scripts[
    "always-succeeds-v2-unit"
  ] = require("Scripts/applied/always-succeeds-v2-unit.plutus");
  _scripts[
    "check-datum-is-inline-big-arg"
  ] = require("Scripts/applied/check-datum-is-inline-big-arg.plutus");
  _scripts[
    "check-datum-is-inline-no-args"
  ] = require("Scripts/applied/check-datum-is-inline-no-args.plutus");
  _scripts[
    "check-datum-is-inline-unit"
  ] = require("Scripts/applied/check-datum-is-inline-unit.plutus");
  _scripts[
    "include-datum-big-arg"
  ] = require("Scripts/applied/include-datum-big-arg.plutus");
  _scripts[
    "include-datum-no-args"
  ] = require("Scripts/applied/include-datum-no-args.plutus");
  _scripts[
    "include-datum-unit"
  ] = require("Scripts/applied/include-datum-unit.plutus");
  _scripts[
    "one-shot-minting-big-arg"
  ] = require("Scripts/applied/one-shot-minting-big-arg.plutus");
  _scripts[
    "one-shot-minting-no-args"
  ] = require("Scripts/applied/one-shot-minting-no-args.plutus");
  _scripts[
    "one-shot-minting-unit"
  ] = require("Scripts/applied/one-shot-minting-unit.plutus");
  _scripts[
    "one-shot-minting-v2-big-arg"
  ] = require("Scripts/applied/one-shot-minting-v2-big-arg.plutus");
  _scripts[
    "one-shot-minting-v2-no-args"
  ] = require("Scripts/applied/one-shot-minting-v2-no-args.plutus");
  _scripts[
    "one-shot-minting-v2-unit"
  ] = require("Scripts/applied/one-shot-minting-v2-unit.plutus");
  _scripts[
    "redeemer1-validator-big-arg"
  ] = require("Scripts/applied/redeemer1-validator-big-arg.plutus");
  _scripts[
    "redeemer1-validator-no-args"
  ] = require("Scripts/applied/redeemer1-validator-no-args.plutus");
  _scripts[
    "redeemer1-validator-unit"
  ] = require("Scripts/applied/redeemer1-validator-unit.plutus");
} else {
  import * as fs from "fs";
  import * as path from "path";
  const read_script = fp => {
    return fs.readFileSync(
      path.resolve(__dirname, "../../fixtures/_scripts/".concat(fp)),
      "utf8"
    );
  };

  _scripts["always-fails"] = read_script("always-fails.plutus");
  _scripts["include-datum"] = read_script("include-datum.plutus");
  _scripts["one-shot-minting"] = read_script("one-shot-minting.plutus");
  _scripts["redeemer1-validator"] = read_script("redeemer1-validator.plutus");
  _scripts["always-succeeds-v2"] = read_script("always-succeeds-v2.plutus");
  _scripts["one-shot-minting-v2"] = read_script("one-shot-minting-v2.plutus");
  _scripts["check-datum-is-inline"] = read_script(
    "check-datum-is-inline.plutus"
  );

  _scripts["always-fails-big-arg"] = read_script(
    "applied/always-fails-big-arg.plutus"
  );
  _scripts["always-fails-no-args"] = read_script(
    "applied/always-fails-no-args.plutus"
  );
  _scripts["always-fails-unit"] = read_script(
    "applied/always-fails-unit.plutus"
  );
  _scripts["always-succeeds-v2-big-arg"] = read_script(
    "applied/always-succeeds-v2-big-arg.plutus"
  );
  _scripts["always-succeeds-v2-no-args"] = read_script(
    "applied/always-succeeds-v2-no-args.plutus"
  );
  _scripts["always-succeeds-v2-unit"] = read_script(
    "applied/always-succeeds-v2-unit.plutus"
  );
  _scripts["check-datum-is-inline-big-arg"] = read_script(
    "applied/check-datum-is-inline-big-arg.plutus"
  );
  _scripts["check-datum-is-inline-no-args"] = read_script(
    "applied/check-datum-is-inline-no-args.plutus"
  );
  _scripts["check-datum-is-inline-unit"] = read_script(
    "applied/check-datum-is-inline-unit.plutus"
  );
  _scripts["include-datum-big-arg"] = read_script(
    "applied/include-datum-big-arg.plutus"
  );
  _scripts["include-datum-no-args"] = read_script(
    "applied/include-datum-no-args.plutus"
  );
  _scripts["include-datum-unit"] = read_script(
    "applied/include-datum-unit.plutus"
  );
  _scripts["one-shot-minting-big-arg"] = read_script(
    "applied/one-shot-minting-big-arg.plutus"
  );
  _scripts["one-shot-minting-no-args"] = read_script(
    "applied/one-shot-minting-no-args.plutus"
  );
  _scripts["one-shot-minting-unit"] = read_script(
    "applied/one-shot-minting-unit.plutus"
  );
  _scripts["one-shot-minting-v2-big-arg"] = read_script(
    "applied/one-shot-minting-v2-big-arg.plutus"
  );
  _scripts["one-shot-minting-v2-no-args"] = read_script(
    "applied/one-shot-minting-v2-no-args.plutus"
  );
  _scripts["one-shot-minting-v2-unit"] = read_script(
    "applied/one-shot-minting-v2-unit.plutus"
  );
  _scripts["redeemer1-validator-big-arg"] = read_script(
    "applied/redeemer1-validator-big-arg.plutus"
  );
  _scripts["redeemer1-validator-no-args"] = read_script(
    "applied/redeemer1-validator-no-args.plutus"
  );
  _scripts["redeemer1-validator-unit"] = read_script(
    "applied/redeemer1-validator-unit.plutus"
  );
}

exports.scripts = _scripts;
