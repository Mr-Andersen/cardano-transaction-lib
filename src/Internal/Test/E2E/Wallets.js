export const _typeInto = selector => text => page => () =>
  page.focus(selector).then(() => page.keyboard.type(text));

export const pageUrl = page => () => page.url();
