"use strict";

import * as crypto from "crypto";

export const md5 = function (message) {
  return crypto.createHash("md5").update(message).digest("hex");
};
