type AppEnv = 'development' | 'test' | 'production' | undefined;

export const getAppEnv = () => {
  const appEnv = process.env.APP_ENV as AppEnv | undefined;
  if (!appEnv || !['development', 'test', 'production'].includes(appEnv)) {
    throw new Error(`APP_ENV is set to ${appEnv}`);
  }
  return appEnv;
};
