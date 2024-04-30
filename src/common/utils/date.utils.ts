export class DateUtils {
  private static MS_PER_DAY = 1000 * 60 * 60 * 24;

  static IsAfter(d1: Date, d2: Date) {
    const utc1 = Date.UTC(
      d1.getUTCFullYear(),
      d1.getUTCMonth(),
      d1.getUTCDate(),
    );
    const utc2 = Date.UTC(
      d2.getUTCFullYear(),
      d2.getUTCMonth(),
      d2.getUTCDate(),
    );
    return utc1 > utc2;
  }

  static AddDays(date: Date, daysToAdd: number) {
    return new Date(date.getTime() + daysToAdd * 1000 * 60 * 60 * 24);
  }

  static DateDiffInDays(d1: Date, d2: Date): number {
    const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());

    return Math.floor((utc2 - utc1) / DateUtils.MS_PER_DAY);
  }

  static SubtractDays(date: Date, daysToSubtract: number) {
    return new Date(date.getTime() - daysToSubtract * 1000 * 60 * 60 * 24);
  }

  static ToUTCMidDay(date: Date): Date {
    return new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        12,
        date.getUTCMinutes(),
        date.getUTCSeconds(),
      ),
    );
  }

  static ConvertTimeZoneToSP(date: Date): Date {
    return new Date(
      date.toLocaleString('en-us', { timeZone: 'America/Sao_Paulo' }),
    );
  }
}

export const formatDateToYearMonthDay = (date: Date): string => {
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  return [year, month, day].join('-');
};

export const addMonth = (date: Date, monthsToAdd: number): Date => {
  return new Date(date.setMonth(date.getMonth() + monthsToAdd));
};

export const addDays = (date: Date, daysToAdd: number): Date => {
  return new Date(date.getTime() + daysToAdd * 1000 * 60 * 60 * 24);
};
