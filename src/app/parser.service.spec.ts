import { TestBed } from '@angular/core/testing';
import {
  mockBillingAug2021,
  mockBillingSep2021,
  mockBillingOct2021,
  mockBillingNov2021,
  mockBillingDec2021,
  mockBillingJan,
  mockBillingFeb,
  mockBillingMar,
  mockBillingApr,
  mockBillingMay,
  mockBillingJun,
} from './data-full.fixture';
import { DayUsage } from './day-usage';
import mockData from './day-usage.fixture';

import { ParserService } from './parser.service';

describe('ParserService', () => {
  let service: ParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculate', () => {
    it('should produce 4 rates', () => {
      const input: DayUsage[] = [
        { date: new Date('2021-01-01T00:00:00'), energyHour: 1.11 },
        { date: new Date('2022-05-01T00:00:00'), energyHour: 1.22 },
        { date: new Date('2023-12-01T00:00:00'), energyHour: 1.22 },
      ];
      service.results$.subscribe((result) => {
        // TODO: This can be better
        expect(result.title.length).toBeGreaterThan(0);
        expect(result.costMonthly).toBeGreaterThan(0);
        expect(result.costYearly).toBeGreaterThan(0);
      });

      service.calculate(input);
    });
  });

  xdescribe('parse details', () => {
    it('should list months from most KWH to least KWH', () => {
      fail();
    });

    it('should list days from most KWH to least KWH', () => {
      fail();
    });

    it('should list hours from most KWH to least KWH', () => {
      fail();
    });

    it('should list hours (weekdays only) from most KWH to least KWH', () => {
      fail();
    });

    it('should list hours (weekends only) from most KWH to least KWH', () => {
      fail();
    });
  });

  it('should sum up the energy usage for a given array', () => {
    const expected = 389.7100000000009;

    const actual = service.sum(mockData);

    expect(actual).toEqual(expected);
  });

  describe('filterByDayOfWeek', () => {
    it('should get single specific [year] and [month] from a given array', () => {
      const expected = 192; // 24 entries per day * 8 days

      const actual = service.filterByYearAndMonth(mockData, 2022, 6);

      expect(actual.length).toEqual(expected);
    });

    it('should get single specific [year] and [multiple months] from a given array', () => {
      const expected = 228; // (24 entries per day * 8 days) + 24 august + 12 august

      const actual = service.filterByYearAndMonth(mockData, 2022, [6, 7]);

      expect(actual.length).toEqual(expected);
    });
  });

  describe('filterByDayOfWeek', () => {
    it('should get single specific day of the week from a given array', () => {
      const expected = 48; // 48 items for Monday

      const actual = service.filterByDayOfWeek(mockData, 1);

      expect(actual.length).toEqual(expected);
    });

    it('should get multiple specific day of the week from a given array', () => {
      const expected = 72; // 48 items for Monday, 24 items for Sunday

      const actual = service.filterByDayOfWeek(mockData, [1, 0]);

      expect(actual.length).toEqual(expected);
    });
  });

  describe('filterByHourOfDay', () => {
    it('should get single specific hour items from a given array', () => {
      const expected = 10; // 10 days in mock with 3pm

      const actual = service.filterByHourOfDay(mockData, 15);

      expect(actual.length).toEqual(expected);
    });

    it('should get multiple specific hour items from a given array', () => {
      const expected = 21; // 10 days in mock with 3pm + 11 days with 1am

      const actual = service.filterByHourOfDay(mockData, [15, 1]);

      expect(actual.length).toEqual(expected);
    });
  });

  it('should get the sum of a specific hour for specific days in a specific month', () => {
    const expected = 2.88; // 2 days and their sum for noon

    let data = service.filterByYearAndMonth(mockData, 2022, 6);
    data = service.filterByDayOfWeek(data, 5);
    data = service.filterByHourOfDay(data, 12);
    const actual = service.sum(data);

    expect(actual).toEqual(expected);
  });

  it('should list available months in given array', () => {
    const input: DayUsage[] = [
      { date: new Date('2021-01-01T00:00:00'), energyHour: 1.11 },
      { date: new Date('2022-05-01T00:00:00'), energyHour: 1.22 },
      { date: new Date('2023-12-01T00:00:00'), energyHour: 1.22 },
    ];
    const expected = [2023, 2022, 2021];

    const actual = service.listYears(input);

    expect(actual).toEqual(expected);
  });

  it('should list available months in given array', () => {
    const input: DayUsage[] = [
      { date: new Date('2021-01-01T00:00:00'), energyHour: 1.11 },
      { date: new Date('2022-05-01T00:00:00'), energyHour: 1.22 },
      { date: new Date('2023-12-01T00:00:00'), energyHour: 1.22 },
    ];
    const expected = [0, 4, 11];

    const actual = service.listMonths(input);

    expect(actual).toEqual(expected);
  });

  it('should list available days in given array', () => {
    const input: DayUsage[] = [
      { date: new Date('2022-01-01T00:00:00'), energyHour: 1.11 },
      { date: new Date('2022-01-02T00:00:00'), energyHour: 1.22 },
      { date: new Date('2022-01-03T00:00:00'), energyHour: 1.22 },
    ];
    const expected = [6, 0, 1];

    const actual = service.listDays(input);

    expect(actual).toEqual(expected);
  });

  it('should list available hours in given array', () => {
    const input: DayUsage[] = [
      { date: new Date('2022-01-01T00:00:00'), energyHour: 1.11 },
      { date: new Date('2022-01-02T11:00:00'), energyHour: 1.22 },
      { date: new Date('2022-01-03T21:00:00'), energyHour: 1.22 },
    ];
    const expected = [0, 11, 21];

    const actual = service.listHours(input);

    expect(actual).toEqual(expected);
  });

  describe('Sum Audit', () => {
    const testCases = [
      { month: 'Aug2021', data: mockBillingAug2021, energyHour: 563 }, // Total = 593, No Data = 563
      { month: 'Sep2021', data: mockBillingSep2021, energyHour: 379 },
      { month: 'Oct2021', data: mockBillingOct2021, energyHour: 455 },
      { month: 'Nov2021', data: mockBillingNov2021, energyHour: 548 },
      { month: 'Dec2021', data: mockBillingDec2021, energyHour: 469 },
      { month: 'Jan2022', data: mockBillingJan, energyHour: 500 },
      { month: 'Feb2022', data: mockBillingFeb, energyHour: 608 },
      { month: 'Mar2022', data: mockBillingMar, energyHour: 948 },
      { month: 'Apr2022', data: mockBillingApr, energyHour: 1018 },
      { month: 'May2022', data: mockBillingMay, energyHour: 961 }, // Total = 987, No Data = 961
      { month: 'Jun2022', data: mockBillingJun, energyHour: 1086 }, // Total = 1115, No Data = 1086
    ];

    testCases.forEach((test) => {
      it(`should get match the energy usage sum of month: ${test.month}`, () => {
        const actual = service.sum(test.data);
        expect(Math.round(actual)).toEqual(test.energyHour);
      });
    });
  });
});
