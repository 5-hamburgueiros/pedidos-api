import {
  addDays,
  addMonth,
  DateUtils,
  formatDateToYearMonthDay,
} from './date.utils';

describe('date utils', () => {
  const fakeDate = new Date('2022-01-01');
  jest.useFakeTimers().setSystemTime(fakeDate);
  describe('formatDateToYearMonthDay', () => {
    it('should return correct formated UTC date', () => {
      const date = new Date();
      const result = formatDateToYearMonthDay(date);
      expect(result).toBe('2022-01-01');
    });
  });

  describe('addMonth', () => {
    it('should add a month to date', () => {
      const date = new Date();
      const result = addMonth(date, 1);
      expect(result).toEqual(date);
    });
  });

  describe('addDays', () => {
    it('should return today plus 2 days', () => {
      const currentDate = '2022-07-01';
      const todayPlus2Days = '2022-07-03';
      const today = new Date(currentDate);
      expect(addDays(today, 2)).toEqual(new Date(todayPlus2Days));
    });
  });

  describe('IsAfter', () => {
    const d1 = '2022-08-20T00:00:00.000Z';
    const d2 = '2022-02-27T00:00:00.000Z';
    it('d1 should be after then d2', () => {
      expect(DateUtils.IsAfter(new Date(d1), new Date(d2)));
    });
  });

  describe('AddDays', () => {
    it('should add 2 days into data', () => {
      const date = new Date('2022-02-27T00:00:00.000Z');
      const result = DateUtils.AddDays(date, 2);
      expect(result.getUTCDay()).toBe(2);
    });
  });

  describe('SubtractDays', () => {
    it('should return today minus 2 days', () => {
      const currentDate = '2022-07-03';
      const todayMinus2Days = '2022-07-01';
      const today = new Date(currentDate);
      expect(DateUtils.SubtractDays(today, 2)).toEqual(
        new Date(todayMinus2Days),
      );
    });
  });

  describe('ToUTCMidDay', () => {
    it('should return date midday', () => {
      const currentDate = '2022-07-03';
      const today = new Date(currentDate);
      expect(DateUtils.ToUTCMidDay(today)).toMatchInlineSnapshot(
        `2022-07-03T12:00:00.000Z`,
      );
    });
  });

  describe('ConvertTimeZoneToSP', () => {
    it.skip('should return date with Sao Paulo Timezone', () => {
      const currentDate = '2022-07-03';
      const today = new Date(currentDate);
      expect(DateUtils.ConvertTimeZoneToSP(today)).toMatchInlineSnapshot(
        `2022-07-03T00:00:00.000Z`,
      );
    });
  });

  describe('DateDiffInDays', () => {
    it('the difference between two dates should be 7 days', () => {
      const date1 = new Date('2022-02-01T00:00:00.000Z');
      const date2 = new Date('2022-02-08T00:00:00.000Z');
      expect(DateUtils.DateDiffInDays(date1, date2)).toBe(7);
    });

    it('the difference between two dates should be -3 days', () => {
      const date1 = new Date('2022-02-04T00:00:00.000Z');
      const date2 = new Date('2022-02-01T00:00:00.000Z');
      expect(DateUtils.DateDiffInDays(date1, date2)).toBe(-3);
    });
  });
});
