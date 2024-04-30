import { shouldIgnorePath } from './request-path.utils';

describe('RequestPathUtils', () => {
  const testCaseList = [
    {
      path: '/hc',
      shouldIgnore: true,
    },
    {
      path: '/liveness',
      shouldIgnore: true,
    },
    {
      path: '/swagger',
      shouldIgnore: true,
    },
    {
      path: '/swagger/#/customer',
      shouldIgnore: true,
    },
    {
      path: '/swaggerr',
      shouldIgnore: true,
    },
    {
      path: '/api',
      shouldIgnore: false,
    },
    {
      path: '/api/v1/',
      shouldIgnore: false,
    },
    {
      path: '/api/v1/CreditAnalysis',
      shouldIgnore: false,
    },
    {
      path: '/api/v1/CreditAnalysis/customer',
      shouldIgnore: false,
    },
    {
      path: '',
      shouldIgnore: false,
    },
    {
      path: '/hcc',
      shouldIgnore: false,
    },
    {
      path: '/livenessss',
      shouldIgnore: false,
    },
  ];
  it.each(testCaseList)(
    'should path $path be ignored? ($shouldIgnore)',
    ({ path, shouldIgnore }) => {
      expect(shouldIgnorePath(path)).toBe(shouldIgnore);
    },
  );
});
