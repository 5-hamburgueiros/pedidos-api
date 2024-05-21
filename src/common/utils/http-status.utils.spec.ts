import { getHttpStatusKeyByValue } from './http-status.utils';

describe('http-status-utils', () => {
  describe('getHttpStatusKeyByValue', () => {
    it('should return a string for said http error', () => {
      const result = getHttpStatusKeyByValue(404);
      expect(result).toBe('NOT_FOUND');
    });
    it('should return INTERNAL_SERVER_ERROR as default if code is not in HttpStatus enum', () => {
      const result = getHttpStatusKeyByValue(123);
      expect(result).toBe('INTERNAL_SERVER_ERROR');
    });
  });
});
