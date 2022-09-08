import { TimeOfDayRate } from './time-of-day-rate';

describe('TimeOfDayRate', () => {
  let sut: TimeOfDayRate;

  beforeEach(() => {
    sut = new TimeOfDayRate();
  });

  it('should create an instance', () => {
    expect(sut).toBeTruthy();
  });

  describe('getRateName', () => {
    // Off-Peak rate Monday through Friday from 7 p.m. to 11 a.m. and/or during the weekend.
    const testCases = [
      { date: new Date('01/08/2022 12:00:00 AM'), result: 'Off-Peak' }, // Saturday
      { date: new Date('01/08/2022 10:59:59 AM'), result: 'Off-Peak' },
      { date: new Date('01/08/2022 11:00:00 AM'), result: 'Off-Peak' },
      { date: new Date('01/08/2022 06:59:59 PM'), result: 'Off-Peak' },
      { date: new Date('01/08/2022 07:00:00 PM'), result: 'Off-Peak' },
      { date: new Date('01/08/2022 11:59:59 PM'), result: 'Off-Peak' },

      { date: new Date('01/09/2022 12:00:00 AM'), result: 'Off-Peak' }, // Sunday
      { date: new Date('01/09/2022 10:59:59 AM'), result: 'Off-Peak' },
      { date: new Date('01/09/2022 11:00:00 AM'), result: 'Off-Peak' },
      { date: new Date('01/09/2022 06:59:59 PM'), result: 'Off-Peak' },
      { date: new Date('01/09/2022 07:00:00 PM'), result: 'Off-Peak' },
      { date: new Date('01/09/2022 11:59:59 PM'), result: 'Off-Peak' },

      { date: new Date('01/03/2022 12:00:00 AM'), result: 'Off-Peak' }, // Monday
      { date: new Date('01/03/2022 10:59:59 AM'), result: 'Off-Peak' },
      { date: new Date('01/03/2022 11:00:00 AM'), result: 'On-Peak' },
      { date: new Date('01/03/2022 06:59:59 PM'), result: 'On-Peak' },
      { date: new Date('01/03/2022 07:00:00 PM'), result: 'Off-Peak' },
      { date: new Date('01/03/2022 11:59:59 PM'), result: 'Off-Peak' },

      { date: new Date('01/07/2022 12:00:00 AM'), result: 'Off-Peak' }, // Friday
      { date: new Date('01/07/2022 10:59:59 AM'), result: 'Off-Peak' },
      { date: new Date('01/07/2022 11:00:00 AM'), result: 'On-Peak' },
      { date: new Date('01/07/2022 06:59:59 PM'), result: 'On-Peak' },
      { date: new Date('01/07/2022 07:00:00 PM'), result: 'Off-Peak' },
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
    // Off-Peak rate Monday through Friday from 7 p.m. to 11 a.m. and/or during the weekend.
    const testCases = [
      { date: new Date('01/08/2022 12:00:00 AM'), result: 0.12 }, // Saturday
      { date: new Date('01/08/2022 10:59:59 AM'), result: 0.12 },
      { date: new Date('01/08/2022 11:00:00 AM'), result: 0.12 },
      { date: new Date('01/08/2022 06:59:59 PM'), result: 0.12 },
      { date: new Date('01/08/2022 07:00:00 PM'), result: 0.12 },
      { date: new Date('01/08/2022 11:59:59 PM'), result: 0.12 },

      { date: new Date('01/09/2022 12:00:00 AM'), result: 0.12 }, // Sunday
      { date: new Date('01/09/2022 10:59:59 AM'), result: 0.12 },
      { date: new Date('01/09/2022 11:00:00 AM'), result: 0.12 },
      { date: new Date('01/09/2022 06:59:59 PM'), result: 0.12 },
      { date: new Date('01/09/2022 07:00:00 PM'), result: 0.12 },
      { date: new Date('01/09/2022 11:59:59 PM'), result: 0.12 },

      { date: new Date('01/03/2022 12:00:00 AM'), result: 0.12 }, // Monday
      { date: new Date('01/03/2022 10:59:59 AM'), result: 0.12 },
      { date: new Date('01/03/2022 11:00:00 AM'), result: 0.2 },
      { date: new Date('01/03/2022 06:59:59 PM'), result: 0.2 },
      { date: new Date('01/03/2022 07:00:00 PM'), result: 0.12 },
      { date: new Date('01/03/2022 11:59:59 PM'), result: 0.12 },

      { date: new Date('01/07/2022 12:00:00 AM'), result: 0.12 }, // Friday
      { date: new Date('01/07/2022 10:59:59 AM'), result: 0.12 },
      { date: new Date('01/07/2022 11:00:00 AM'), result: 0.2 },
      { date: new Date('01/07/2022 06:59:59 PM'), result: 0.2 },
      { date: new Date('01/07/2022 07:00:00 PM'), result: 0.12 },
      { date: new Date('01/07/2022 11:59:59 PM'), result: 0.12 },

      { date: new Date('06/06/2022 11:00:00 AM'), result: 0.23 }, // Monday - June
      { date: new Date('06/06/2022 06:59:59 PM'), result: 0.23 },
      { date: new Date('06/04/2022 11:00:00 AM'), result: 0.12 }, // Saturday
      { date: new Date('06/04/2022 06:59:59 PM'), result: 0.12 },

      { date: new Date('10/03/2022 11:00:00 AM'), result: 0.23 }, // Monday - October
      { date: new Date('10/03/2022 06:59:59 PM'), result: 0.23 },
      { date: new Date('10/01/2022 11:00:00 AM'), result: 0.12 }, // Saturday
      { date: new Date('10/01/2022 06:59:59 PM'), result: 0.12 },

      { date: new Date('11/07/2022 11:00:00 AM'), result: 0.2 }, // Monday - November
      { date: new Date('11/07/2022 06:59:59 PM'), result: 0.2 },
      { date: new Date('11/05/2022 11:00:00 AM'), result: 0.12 }, // Saturday
      { date: new Date('11/05/2022 06:59:59 PM'), result: 0.12 },

      { date: new Date('05/02/2022 11:00:00 AM'), result: 0.2 }, // Monday - May
      { date: new Date('05/02/2022 06:59:59 PM'), result: 0.2 },
      { date: new Date('05/07/2022 11:00:00 AM'), result: 0.12 }, // Saturday
      { date: new Date('05/07/2022 06:59:59 PM'), result: 0.12 },
    ];

    testCases.forEach((test) => {
      it(`should get the rate for datetime ${test.date}`, () => {
        const actual = sut.getRate(test.date);
        expect(actual).toEqual(test.result);
      });
    });
  });

  describe('getRateDescription', () => {
    // Off-Peak rate Monday through Friday from 7 p.m. to 11 a.m. and/or during the weekend.
    const testCases = [
      // Saturday
      {
        date: new Date('01/08/2022 12:00:00 AM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/08/2022 10:59:59 AM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/08/2022 11:00:00 AM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/08/2022 06:59:59 PM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/08/2022 07:00:00 PM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/08/2022 11:59:59 PM'),
        result: 'Off-Peak (7PM-11AM)',
      },

      // Sunday
      {
        date: new Date('01/09/2022 12:00:00 AM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/09/2022 10:59:59 AM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/09/2022 11:00:00 AM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/09/2022 06:59:59 PM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/09/2022 07:00:00 PM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/09/2022 11:59:59 PM'),
        result: 'Off-Peak (7PM-11AM)',
      },

      // Monday
      {
        date: new Date('01/03/2022 12:00:00 AM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/03/2022 10:59:59 AM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/03/2022 11:00:00 AM'),
        result: 'On-Peak (11AM-7PM)',
      },
      {
        date: new Date('01/03/2022 06:59:59 PM'),
        result: 'On-Peak (11AM-7PM)',
      },
      {
        date: new Date('01/03/2022 07:00:00 PM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/03/2022 11:59:59 PM'),
        result: 'Off-Peak (7PM-11AM)',
      },

      // Friday
      {
        date: new Date('01/07/2022 12:00:00 AM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/07/2022 10:59:59 AM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/07/2022 11:00:00 AM'),
        result: 'On-Peak (11AM-7PM)',
      },
      {
        date: new Date('01/07/2022 06:59:59 PM'),
        result: 'On-Peak (11AM-7PM)',
      },
      {
        date: new Date('01/07/2022 07:00:00 PM'),
        result: 'Off-Peak (7PM-11AM)',
      },
      {
        date: new Date('01/07/2022 11:59:59 PM'),
        result: 'Off-Peak (7PM-11AM)',
      },
    ];

    testCases.forEach((test) => {
      it(`should get the rate description for datetime ${test.date}`, () => {
        const actual = sut.getRateDescription(test.date);
        expect(actual).toEqual(test.result);
      });
    });
  });
});
