export const environment = {
  isDevelopment: () =>
    process.env.NODE_ENV == 'development' || process.env.NODE_ENV === 'test',
  isProduction: () => process.env.NODE_ENV === 'production',
};
