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
   * Get Memorial Day date
   * Source: https://stackoverflow.com/a/15507916/1583548
   * @param year
   * @returns
   */
  getMemorialDay(year: number): Date {
    // Look up table
    const lookUp = [
      { year: 2020, date: '05/25/2020' },
      { year: 2021, date: '05/31/2021' },
      { year: 2022, date: '05/30/2022' },
      { year: 2023, date: '05/29/2023' },
      { year: 2024, date: '05/27/2024' },
      { year: 2025, date: '05/26/2025' },
      { year: 2026, date: '05/25/2026' },
      { year: 2027, date: '05/31/2027' },
      { year: 2028, date: '05/29/2028' },
    ];
    const dateString = lookUp.find((item) => item.year === year)?.date;
    if (dateString) {
      return new Date(dateString);
    }

    // Memorial Day always last Monday of May
    const d = new Date();
    d.setFullYear(year);
    d.setDate(1); // Roll to the first day of ...
    d.setMonth(5 || d.getMonth() + 1); // ... the next month.
    do { // Roll the days backwards until Monday.
      d.setDate(d.getDate() - 1);
    } while (d.getDay() !== 1);
    return new Date(d.toDateString());
  }

  /**
   * Get Labor Day date
   * @param year
   * @returns
   */
  getLaborDay(year: number): Date {
    // Look up table
    const lookUp = [
      { year: 2020, date: '09/07/2020' },
      { year: 2021, date: '09/06/2021' },
      { year: 2022, date: '09/05/2022' },
      { year: 2023, date: '09/04/2023' },
      { year: 2024, date: '09/02/2024' },
      { year: 2025, date: '09/01/2025' },
      { year: 2026, date: '09/07/2026' },
      { year: 2027, date: '09/06/2027' },
      { year: 2028, date: '09/04/2028' },
    ];
    const dateString = lookUp.find((item) => item.year === year)?.date;
    if (dateString) {
      return new Date(dateString);
    }

    // Labor Day always falls on the first Monday in September
    const d = new Date();
    d.setFullYear(year);
    d.setDate(1); // Roll to the first day of ...
    d.setMonth(8);
    while (d.getDay() !== 1) {
      d.setDate(d.getDate() + 1);
    }
    return new Date(d.toDateString());
  }

  /**
   * Get Thanksgiving Day date
   * @param year
   * @returns
   */
  getThanksgivingDay(year: number): Date {
    // Look up table
    const lookUp = [
      { year: 2020, date: '11/26/2020' },
      { year: 2021, date: '11/25/2021' },
      { year: 2022, date: '11/24/2022' },
      { year: 2023, date: '11/23/2023' },
      { year: 2024, date: '11/28/2024' },
      { year: 2025, date: '11/27/2025' },
      { year: 2026, date: '11/26/2026' },
      { year: 2027, date: '11/25/2027' },
      { year: 2028, date: '11/23/2028' },
    ];
    const dateString = lookUp.find((item) => item.year === year)?.date;
    if (dateString) {
      return new Date(dateString);
    }

    // Thanksgiving is celebrated on the fourth Thursday of November
    const d = new Date();
    d.setFullYear(year);
    d.setDate(1); // Roll to the first day of ...
    d.setMonth(10);
    let dayEncounter = 0;
    while (dayEncounter < 4) {
      if (d.getDay() === 4) {
        dayEncounter++;
      }
      d.setDate(d.getDate() + 1);
    }
    d.setDate(d.getDate() - 1); // roll back 1 day
    return new Date(d.toDateString());
  }
}
