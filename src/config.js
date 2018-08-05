export const config = {
  useLogger: true,
  title: 'Redux Service Demo',
};

export function configure(opts) {
  config.useLogger = opts.useLogger;
  config.title = opts.title;
}
