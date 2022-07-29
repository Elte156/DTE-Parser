import { Rate } from "./rate";

export class DynamicPeakRate implements Rate {
  public static readonly RATE_OFF_PEAK = 0.11;
  public static readonly RATE_MID_PEAK = 0.16;
  public static readonly RATE_ON_PEAK = 0.23;

  getRateName(datetime: Date): string {
      throw new Error("Method not implemented.");
  }

  getRate(datetime: Date): number {
    // Weekend check
    if (datetime.getDay() === 6 || datetime.getDay() === 0) {
      return DynamicPeakRate.RATE_OFF_PEAK;
    }

    // Holiday check
    // New Year's Day
    if (datetime.getMonth() === 0 && datetime.getDate() === 1) {
      return DynamicPeakRate.RATE_OFF_PEAK;
    }
    // Good Friday
    // Memorial Day
    // Independence Day
    if (datetime.getMonth() === 6 && datetime.getDate() === 4) {
      return DynamicPeakRate.RATE_OFF_PEAK;
    }
    // Labor Day
    // Thanksgiving Day
    // Christmas Day
    if (datetime.getMonth() === 11 && datetime.getDate() === 25) {
      return DynamicPeakRate.RATE_OFF_PEAK;
    }

    // Mid peak check
    if (datetime.getHours() >= 7 && datetime.getHours() < 15) {
      return DynamicPeakRate.RATE_MID_PEAK;
    }
    if (datetime.getHours() >= 19 && datetime.getHours() < 23) {
      return DynamicPeakRate.RATE_MID_PEAK;
    }

    // On peak check
    if (datetime.getHours() >= 15 && datetime.getHours() < 19) {
      return DynamicPeakRate.RATE_ON_PEAK;
    }

    return DynamicPeakRate.RATE_OFF_PEAK;
  }

  getRateDescription(datetime: Date): string {
      throw new Error("Method not implemented.");
  }

  /**
   * Get Memorial Date date
   * Source: https://stackoverflow.com/a/15507916/1583548
   * @param year
   * @returns
   */
  getMemorialDay(year: number): Date {
    // Memorial Day always last Monday of May
    const d = new Date();
    if (year) { d.setFullYear(year); }
    d.setDate(1); // Roll to the first day of ...
    d.setMonth(5 || d.getMonth() + 1); // ... the next month.
    do { // Roll the days backwards until Monday.
      d.setDate(d.getDate() - 1);
    } while (d.getDay() !== 1);
    return new Date(d.toDateString());
  }
}
