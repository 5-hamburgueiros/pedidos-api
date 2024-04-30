export class NumberUtils {
  static roundValue(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
