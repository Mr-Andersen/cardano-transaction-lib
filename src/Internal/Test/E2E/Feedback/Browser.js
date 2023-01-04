export const _pushBrowserEvent = message => () => {
  if (typeof window.ctlE2ECommunications != "object") {
    window.ctlE2ECommunications = [];
  }
  window.ctlE2ECommunications.push(message);
};

export const _getClusterSetup = maybe => () =>
  window.ctlE2EClusterSetup
    ? maybe.just(window.ctlE2EClusterSetup)
    : maybe.nothing;
