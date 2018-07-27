const defaultSeparator = ':';

export const config = {
  separator: defaultSeparator,
};

export function configure(opts) {
  config.separator = opts.separator || defaultSeparator;
}
