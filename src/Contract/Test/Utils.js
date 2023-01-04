export const exitCode = code => () => {
  process.exitCode = code;
};
