import { IGNORED_PATHS } from '../constants';

export const shouldIgnorePath = (requestPath: string): boolean => {
  return IGNORED_PATHS.some((hp) => hp.test(requestPath));
};
