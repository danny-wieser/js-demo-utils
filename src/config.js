export const config = {
  useLogger: true,
  useThunk: true,
};

export function configure(opts) {
  config.userLogger = opts.useLogger;
  config.useThunk = opts.useThunk;
}
