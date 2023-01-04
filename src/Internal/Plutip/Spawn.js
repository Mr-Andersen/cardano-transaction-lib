"use strict";

export const clearLineHandler = readline => () => {
  readline.removeAllListeners("line");
};

import * as fs from "fs";

export const _rmdirSync = path => () => fs.rmdirSync(path, { recursive: true });

export const removeOnSignal =
  ({ signal, callback }) =>
  () => {
    process.removeListener(signal, callback);
  };

export const onSignalImpl = signal => callback => () => {
  process.on(signal, callback);
  return { signal, callback };
};
