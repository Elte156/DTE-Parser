import { DynamicPeakRate } from './dynamic-peak-rate';

describe('DynamicPeakRate', () => {
  let sut: DynamicPeakRate;

  beforeEach(() => {
    sut = new DynamicPeakRate();
  });

  it('should create an instance', () => {
    expect(sut).toBeTruthy();
  });

  describe('getRate', () => {
    // "Off-Peak" hours (11 p.m. – 7 a.m. Monday - Friday, all day long on weekends and holidays)
    const testCases = [
      { date: new Date('01/08/2022 12:00:00 AM'), result: 0.11 }, // Saturday
      { date: new Date('01/08/2022 06:59:59 AM'), result: 0.11 },
      { date: new Date('01/08/2022 07:00:00 AM'), result: 0.11 },
      { date: new Date('01/08/2022 02:59:59 PM'), result: 0.11 },
      { date: new Date('01/08/2022 03:00:00 PM'), result: 0.11 },
      { date: new Date('01/08/2022 06:59:59 PM'), result: 0.11 },
      { date: new Date('01/08/2022 07:00:00 PM'), result: 0.11 },
      { date: new Date('01/08/2022 10:59:59 PM'), result: 0.11 },
      { date: new Date('01/08/2022 11:00:00 PM'), result: 0.11 },
      { date: new Date('01/08/2022 11:59:59 PM'), result: 0.11 },

      { date: new Date('01/09/2022 12:00:00 AM'), result: 0.11 }, // Sunday
      { date: new Date('01/09/2022 06:59:59 AM'), result: 0.11 },
      { date: new Date('01/09/2022 07:00:00 AM'), result: 0.11 },
      { date: new Date('01/09/2022 02:59:59 PM'), result: 0.11 },
      { date: new Date('01/09/2022 03:00:00 PM'), result: 0.11 },
      { date: new Date('01/09/2022 06:59:59 PM'), result: 0.11 },
      { date: new Date('01/09/2022 07:00:00 PM'), result: 0.11 },
      { date: new Date('01/09/2022 10:59:59 PM'), result: 0.11 },
      { date: new Date('01/09/2022 11:00:00 PM'), result: 0.11 },
      { date: new Date('01/09/2022 11:59:59 PM'), result: 0.11 },

      // *Designated holidays:
      // New Year's Day
      // Good Friday
      // Memorial Day
      // Independence Day
      // Labor Day
      // Thanksgiving Day
      // Christmas Day

      { date: new Date('01/01/2021 12:00:00 AM'), result: 0.11 }, // New Year's Day
      { date: new Date('01/01/2021 06:59:59 AM'), result: 0.11 },
      { date: new Date('01/01/2021 07:00:00 AM'), result: 0.11 },
      { date: new Date('01/01/2021 02:59:59 PM'), result: 0.11 },
      { date: new Date('01/01/2021 03:00:00 PM'), result: 0.11 },
      { date: new Date('01/01/2021 06:59:59 PM'), result: 0.11 },
      { date: new Date('01/01/2021 07:00:00 PM'), result: 0.11 },
      { date: new Date('01/01/2021 10:59:59 PM'), result: 0.11 },
      { date: new Date('01/01/2021 11:00:00 PM'), result: 0.11 },
      { date: new Date('01/01/2021 11:59:59 PM'), result: 0.11 },

      // Easter falls on the first Sunday after the Full Moon date
      // { date: new Date('04/15/2022 12:00:00 AM'), result: 0.11 }, // Good Friday is always the Friday before Easter Sunday
      // { date: new Date('04/15/2022 06:59:59 AM'), result: 0.11 },
      // { date: new Date('04/15/2022 07:00:00 AM'), result: 0.11 },
      // { date: new Date('04/15/2022 02:59:59 PM'), result: 0.11 },
      // { date: new Date('04/15/2022 03:00:00 PM'), result: 0.11 },
      // { date: new Date('04/15/2022 06:59:59 PM'), result: 0.11 },
      // { date: new Date('04/15/2022 07:00:00 PM'), result: 0.11 },
      // { date: new Date('04/15/2022 10:59:59 PM'), result: 0.11 },
      // { date: new Date('04/15/2022 11:00:00 PM'), result: 0.11 },
      // { date: new Date('04/15/2022 11:59:59 PM'), result: 0.11 },

      // { date: new Date('05/30/2022 12:00:00 AM'), result: 0.11 }, // Memorial Day always last Monday of May
      // { date: new Date('05/30/2022 06:59:59 AM'), result: 0.11 },
      // { date: new Date('05/30/2022 07:00:00 AM'), result: 0.11 },
      // { date: new Date('05/30/2022 02:59:59 PM'), result: 0.11 },
      // { date: new Date('05/30/2022 03:00:00 PM'), result: 0.11 },
      // { date: new Date('05/30/2022 06:59:59 PM'), result: 0.11 },
      // { date: new Date('05/30/2022 07:00:00 PM'), result: 0.11 },
      // { date: new Date('05/30/2022 10:59:59 PM'), result: 0.11 },
      // { date: new Date('05/30/2022 11:00:00 PM'), result: 0.11 },
      // { date: new Date('05/30/2022 11:59:59 PM'), result: 0.11 },

      { date: new Date('07/04/2022 12:00:00 AM'), result: 0.11 }, // Independence Day always falls on 4 July
      { date: new Date('07/04/2022 06:59:59 AM'), result: 0.11 },
      { date: new Date('07/04/2022 07:00:00 AM'), result: 0.11 },
      { date: new Date('07/04/2022 02:59:59 PM'), result: 0.11 },
      { date: new Date('07/04/2022 03:00:00 PM'), result: 0.11 },
      { date: new Date('07/04/2022 06:59:59 PM'), result: 0.11 },
      { date: new Date('07/04/2022 07:00:00 PM'), result: 0.11 },
      { date: new Date('07/04/2022 10:59:59 PM'), result: 0.11 },
      { date: new Date('07/04/2022 11:00:00 PM'), result: 0.11 },
      { date: new Date('07/04/2022 11:59:59 PM'), result: 0.11 },

      // { date: new Date('09/05/2022 12:00:00 AM'), result: 0.11 }, // Labor Day always falls on the first Monday in September
      // { date: new Date('09/05/2022 06:59:59 AM'), result: 0.11 },
      // { date: new Date('09/05/2022 07:00:00 AM'), result: 0.11 },
      // { date: new Date('09/05/2022 02:59:59 PM'), result: 0.11 },
      // { date: new Date('09/05/2022 03:00:00 PM'), result: 0.11 },
      // { date: new Date('09/05/2022 06:59:59 PM'), result: 0.11 },
      // { date: new Date('09/05/2022 07:00:00 PM'), result: 0.11 },
      // { date: new Date('09/05/2022 10:59:59 PM'), result: 0.11 },
      // { date: new Date('09/05/2022 11:00:00 PM'), result: 0.11 },
      // { date: new Date('09/05/2022 11:59:59 PM'), result: 0.11 },

      // { date: new Date('11/24/2022 12:00:00 AM'), result: 0.11 }, // Thanksgiving is celebrated on the fourth Thursday of November
      // { date: new Date('11/24/2022 06:59:59 AM'), result: 0.11 },
      // { date: new Date('11/24/2022 07:00:00 AM'), result: 0.11 },
      // { date: new Date('11/24/2022 02:59:59 PM'), result: 0.11 },
      // { date: new Date('11/24/2022 03:00:00 PM'), result: 0.11 },
      // { date: new Date('11/24/2022 06:59:59 PM'), result: 0.11 },
      // { date: new Date('11/24/2022 07:00:00 PM'), result: 0.11 },
      // { date: new Date('11/24/2022 10:59:59 PM'), result: 0.11 },
      // { date: new Date('11/24/2022 11:00:00 PM'), result: 0.11 },
      // { date: new Date('11/24/2022 11:59:59 PM'), result: 0.11 },

      { date: new Date('12/25/2023 12:00:00 AM'), result: 0.11 }, // Christmas Day
      { date: new Date('12/25/2023 06:59:59 AM'), result: 0.11 },
      { date: new Date('12/25/2023 07:00:00 AM'), result: 0.11 },
      { date: new Date('12/25/2023 02:59:59 PM'), result: 0.11 },
      { date: new Date('12/25/2023 03:00:00 PM'), result: 0.11 },
      { date: new Date('12/25/2023 06:59:59 PM'), result: 0.11 },
      { date: new Date('12/25/2023 07:00:00 PM'), result: 0.11 },
      { date: new Date('12/25/2023 10:59:59 PM'), result: 0.11 },
      { date: new Date('12/25/2023 11:00:00 PM'), result: 0.11 },
      { date: new Date('12/25/2023 11:59:59 PM'), result: 0.11 },

      { date: new Date('01/03/2022 12:00:00 AM'), result: 0.11 }, // Monday
      { date: new Date('01/03/2022 06:59:59 AM'), result: 0.11 },
      { date: new Date('01/03/2022 07:00:00 AM'), result: 0.16 },
      { date: new Date('01/03/2022 02:59:59 PM'), result: 0.16 },
      { date: new Date('01/03/2022 03:00:00 PM'), result: 0.23 },
      { date: new Date('01/03/2022 06:59:59 PM'), result: 0.23 },
      { date: new Date('01/03/2022 07:00:00 PM'), result: 0.16 },
      { date: new Date('01/03/2022 10:59:59 PM'), result: 0.16 },
      { date: new Date('01/03/2022 11:00:00 PM'), result: 0.11 },
      { date: new Date('01/03/2022 11:59:59 PM'), result: 0.11 },

      { date: new Date('01/07/2022 12:00:00 AM'), result: 0.11 }, // Friday
      { date: new Date('01/07/2022 06:59:59 AM'), result: 0.11 },
      { date: new Date('01/07/2022 07:00:00 AM'), result: 0.16 },
      { date: new Date('01/07/2022 02:59:59 PM'), result: 0.16 },
      { date: new Date('01/07/2022 03:00:00 PM'), result: 0.23 },
      { date: new Date('01/07/2022 06:59:59 PM'), result: 0.23 },
      { date: new Date('01/07/2022 07:00:00 PM'), result: 0.16 },
      { date: new Date('01/07/2022 10:59:59 PM'), result: 0.16 },
      { date: new Date('01/07/2022 11:00:00 PM'), result: 0.11 },
      { date: new Date('01/07/2022 11:59:59 PM'), result: 0.11 },
    ];

    testCases.forEach((test) => {
      it(`should get the rate for datetime ${test.date}`, () => {
        const actual = sut.getRate(test.date);
        expect(actual).toEqual(test.result);
      });
    });
  });

  describe('getMemorialDay', () => {
    const testCases = [
      { year: 2017, result: new Date('05/29/2017') },
      { year: 2018, result: new Date('05/28/2018') },
      { year: 2019, result: new Date('05/27/2019') },
      { year: 2020, result: new Date('05/25/2020') },
      { year: 2021, result: new Date('05/31/2021') },
      { year: 2022, result: new Date('05/30/2022') },
      { year: 2023, result: new Date('05/29/2023') },
      { year: 2024, result: new Date('05/27/2024') },
      { year: 2025, result: new Date('05/26/2025') },
      { year: 2026, result: new Date('05/25/2026') },
      { year: 2027, result: new Date('05/31/2027') },
      { year: 2028, result: new Date('05/29/2028') },
      { year: 2029, result: new Date('05/28/2029') },
    ];

    testCases.forEach((test) => {
      it(`should get the date for year ${test.year}`, () => {
        const actual = sut.getMemorialDay(test.year);
        expect(actual).toEqual(test.result);
      });
    });
  });
});
