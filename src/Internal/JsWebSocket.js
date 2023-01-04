/* global BROWSER_RUNTIME */

import * as ReconnectingWebSocket from "reconnecting-websocket";

let OurWebSocket;
if (typeof BROWSER_RUNTIME == "undefined" || !BROWSER_RUNTIME) {
  OurWebSocket = require("ws");
} else {
  OurWebSocket = WebSocket;
}

class NoPerMessageDeflateWebSocket extends OurWebSocket {
  constructor(url, protocols, options) {
    options = options || {};
    options.perMessageDeflate = false;
    super(url, protocols, options);
  }
}

export const _mkWebSocket = logger => url => () => {
  try {
    let ws;
    if (typeof BROWSER_RUNTIME != "undefined" && BROWSER_RUNTIME) {
      ws = new ReconnectingWebSocket.default(url);
    } else {
      ws = new ReconnectingWebSocket(url, [], {
        WebSocket: NoPerMessageDeflateWebSocket,
      });
    }
    ws.finalizers = [];
    logger("Created a new WebSocket")();
    return ws;
  } catch (e) {
    logger("Failed to create a new WebSocket");
    throw e;
  }
};

export const _onWsConnect = ws => fn => () => {
  ws.addEventListener("open", fn);
  ws.finalizers.push(() => {
    ws.removeEventListener("open", fn);
  });
};

export const _onWsError = ws => fn => () => {
  const listener = function (event) {
    fn(event.toString())();
  };
  ws.addEventListener("error", listener);
  ws.finalizers.push(() => {
    ws.removeEventListener("error", listener);
  });
  return listener;
};

export const _removeOnWsError = ws => listener => () =>
  ws.removeEventListener("error", listener);

export const _onWsMessage = ws => logger => fn => () => {
  const listener = function func(event) {
    const str = event.data;
    logger(`message: ${str}`)();
    fn(str)();
  };
  ws.addEventListener("message", listener);
  ws.finalizers.push(() => {
    ws.removeEventListener("message", listener);
  });
};

export const _wsFinalize = ws => () => {
  for (let finalizer of ws.finalizers) {
    /* eslint-disable no-empty */
    try {
      finalizer();
    } catch (_) {}
    /* eslint-enable */
  }
  ws.finalizers = [];
};

export const _wsSend = ws => logger => str => () => {
  logger(`sending: ${str}`)();
  ws.send(str);
};

export const _wsReconnect = ws => () => {
  ws.reconnect();
};

export const _wsClose = ws => () => {
  ws.close();
};
