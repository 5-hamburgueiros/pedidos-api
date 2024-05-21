import { NumberUtils } from './number.utils';

describe('NumberUtils', () => {
  describe('roundValue', () => {
    it('should round a value', () => {
      const result = NumberUtils.roundValue(100.9922333112);
      expect(result).toBe(100.99);
    });
  });
});
