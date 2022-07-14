export const pluralize = (suffix, count) =>
  count > 1 ? `${count} ${suffix}s` : `${count} ${suffix}`;
