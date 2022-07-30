import { EvRate } from './ev-rate';

describe('EvRate', () => {
  let sut: EvRate;

  beforeEach(() => {
    sut = new EvRate();
  });

  it('should create an instance', () => {
    expect(sut).toBeTruthy();
  });

  describe('getRateName', () => {
    // That reduced rate is available Monday through Friday from 11 p.m. to 9 a.m. and all weekend.
    const testCases = [
      { date: new Date('01/08/2022 12:00:00 AM'), result: 'Off-Peak' }, // Saturday
      { date: new Date('01/08/2022 08:59:59 AM'), result: 'Off-Peak' },
      { date: new Date('01/08/2022 09:00:00 AM'), result: 'Off-Peak' },
      { date: new Date('01/08/2022 10:59:59 PM'), result: 'Off-Peak' },
      { date: new Date('01/08/2022 11:00:00 PM'), result: 'Off-Peak' },
      { date: new Date('01/08/2022 11:59:59 PM'), result: 'Off-Peak' },

      { date: new Date('01/09/2022 12:00:00 AM'), result: 'Off-Peak' }, // Sunday
      { date: new Date('01/09/2022 08:59:59 AM'), result: 'Off-Peak' },
      { date: new Date('01/09/2022 09:00:00 AM'), result: 'Off-Peak' },
      { date: new Date('01/09/2022 10:59:59 PM'), result: 'Off-Peak' },
      { date: new Date('01/09/2022 11:00:00 PM'), result: 'Off-Peak' },
      { date: new Date('01/09/2022 11:59:59 PM'), result: 'Off-Peak' },

      { date: new Date('01/03/2022 12:00:00 AM'), result: 'Off-Peak' }, // Monday
      { date: new Date('01/03/2022 08:59:59 AM'), result: 'Off-Peak' },
      { date: new Date('01/03/2022 09:00:00 AM'), result: 'On-Peak' },
      { date: new Date('01/03/2022 10:59:59 PM'), result: 'On-Peak' },
      { date: new Date('01/03/2022 11:00:00 PM'), result: 'Off-Peak' },
      { date: new Date('01/03/2022 11:59:59 PM'), result: 'Off-Peak' },

      { date: new Date('01/07/2022 12:00:00 AM'), result: 'Off-Peak' }, // Friday
      { date: new Date('01/07/2022 08:59:59 AM'), result: 'Off-Peak' },
      { date: new Date('01/07/2022 09:00:00 AM'), result: 'On-Peak' },
      { date: new Date('01/07/2022 10:59:59 PM'), result: 'On-Peak' },
      { date: new Date('01/07/2022 11:00:00 PM'), result: 'Off-Peak' },
      { date: new Date('01/07/2022 11:59:59 PM'), result: 'Off-Peak' },
    ];

    testCases.forEach((test) => {
      it(`should get the rate name for datetime ${test.date}`, () => {
        const actual = sut.getRateName(test.date);
        expect(actual).toEqual(test.result);
      });
    });
  });

  describe('getRate', () => {
    const testCases = [
      { date: new Date('01/08/2022 12:00:00 AM'), result: 0.11 }, // Saturday
      { date: new Date('01/08/2022 08:59:59 AM'), result: 0.11 },
      { date: new Date('01/08/2022 09:00:00 AM'), result: 0.11 },
      { date: new Date('01/08/2022 10:59:59 PM'), result: 0.11 },
      { date: new Date('01/08/2022 11:00:00 PM'), result: 0.11 },
      { date: new Date('01/08/2022 11:59:59 PM'), result: 0.11 },

      { date: new Date('01/09/2022 12:00:00 AM'), result: 0.11 }, // Sunday
      { date: new Date('01/09/2022 08:59:59 AM'), result: 0.11 },
      { date: new Date('01/09/2022 09:00:00 AM'), result: 0.11 },
      { date: new Date('01/09/2022 10:59:59 PM'), result: 0.11 },
      { date: new Date('01/09/2022 11:00:00 PM'), result: 0.11 },
      { date: new Date('01/09/2022 11:59:59 PM'), result: 0.11 },

      { date: new Date('01/03/2022 12:00:00 AM'), result: 0.11 }, // Monday
      { date: new Date('01/03/2022 08:59:59 AM'), result: 0.11 },
      { date: new Date('01/03/2022 09:00:00 AM'), result: 0.24 },
      { date: new Date('01/03/2022 10:59:59 PM'), result: 0.24 },
      { date: new Date('01/03/2022 11:00:00 PM'), result: 0.11 },
      { date: new Date('01/03/2022 11:59:59 PM'), result: 0.11 },

      { date: new Date('01/07/2022 12:00:00 AM'), result: 0.11 }, // Friday
      { date: new Date('01/07/2022 08:59:59 AM'), result: 0.11 },
      { date: new Date('01/07/2022 09:00:00 AM'), result: 0.24 },
      { date: new Date('01/07/2022 10:59:59 PM'), result: 0.24 },
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

  describe('getRateDescription', () => {
    const testCases = [
      { date: new Date('01/08/2022 12:00:00 AM'), result: 'Off-Peak (11PM-9AM)' }, // Saturday
      { date: new Date('01/08/2022 08:59:59 AM'), result: 'Off-Peak (11PM-9AM)' },
      { date: new Date('01/08/2022 09:00:00 AM'), result: 'Off-Peak (11PM-9AM)' },
      { date: new Date('01/08/2022 10:59:59 PM'), result: 'Off-Peak (11PM-9AM)' },
      { date: new Date('01/08/2022 11:00:00 PM'), result: 'Off-Peak (11PM-9AM)' },
      { date: new Date('01/08/2022 11:59:59 PM'), result: 'Off-Peak (11PM-9AM)' },

      { date: new Date('01/09/2022 12:00:00 AM'), result: 'Off-Peak (11PM-9AM)' }, // Sunday
      { date: new Date('01/09/2022 08:59:59 AM'), result: 'Off-Peak (11PM-9AM)' },
      { date: new Date('01/09/2022 09:00:00 AM'), result: 'Off-Peak (11PM-9AM)' },
      { date: new Date('01/09/2022 10:59:59 PM'), result: 'Off-Peak (11PM-9AM)' },
      { date: new Date('01/09/2022 11:00:00 PM'), result: 'Off-Peak (11PM-9AM)' },
      { date: new Date('01/09/2022 11:59:59 PM'), result: 'Off-Peak (11PM-9AM)' },

      { date: new Date('01/03/2022 12:00:00 AM'), result: 'Off-Peak (11PM-9AM)' }, // Monday
      { date: new Date('01/03/2022 08:59:59 AM'), result: 'Off-Peak (11PM-9AM)' },
      { date: new Date('01/03/2022 09:00:00 AM'), result: 'On-Peak (9AM-11PM)' },
      { date: new Date('01/03/2022 10:59:59 PM'), result: 'On-Peak (9AM-11PM)' },
      { date: new Date('01/03/2022 11:00:00 PM'), result: 'Off-Peak (11PM-9AM)' },
      { date: new Date('01/03/2022 11:59:59 PM'), result: 'Off-Peak (11PM-9AM)' },

      { date: new Date('01/07/2022 12:00:00 AM'), result: 'Off-Peak (11PM-9AM)' }, // Friday
      { date: new Date('01/07/2022 08:59:59 AM'), result: 'Off-Peak (11PM-9AM)' },
      { date: new Date('01/07/2022 09:00:00 AM'), result: 'On-Peak (9AM-11PM)' },
      { date: new Date('01/07/2022 10:59:59 PM'), result: 'On-Peak (9AM-11PM)' },
      { date: new Date('01/07/2022 11:00:00 PM'), result: 'Off-Peak (11PM-9AM)' },
      { date: new Date('01/07/2022 11:59:59 PM'), result: 'Off-Peak (11PM-9AM)' },
    ];

    testCases.forEach((test) => {
      it(`should get the rate description for datetime ${test.date}`, () => {
        const actual = sut.getRateDescription(test.date);
        expect(actual).toEqual(test.result);
      });
    });
  });
});
