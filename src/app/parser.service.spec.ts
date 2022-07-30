import { TestBed } from '@angular/core/testing';
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

      const actual = service.filterByYearAndMonth(mockData, 2022, [6,7]);

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

      const actual = service.filterByHourOfDay(mockData, [15,1]);

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
      {date: new Date('2021-01-01T00:00:00'), energyHour: 1.110},
      {date: new Date('2022-05-01T00:00:00'), energyHour: 1.220},
      {date: new Date('2023-12-01T00:00:00'), energyHour: 1.220},
    ];
    const expected = [2021, 2022, 2023];

    const actual = service.listYears(input);

    expect(actual).toEqual(expected);
  });

  it('should list available months in given array', () => {
    const input: DayUsage[] = [
      {date: new Date('2021-01-01T00:00:00'), energyHour: 1.110},
      {date: new Date('2022-05-01T00:00:00'), energyHour: 1.220},
      {date: new Date('2023-12-01T00:00:00'), energyHour: 1.220},
    ];
    const expected = [0, 4, 11];

    const actual = service.listMonths(input);

    expect(actual).toEqual(expected);
  });

  it('should list available days in given array', () => {
    const input: DayUsage[] = [
      {date: new Date('2022-01-01T00:00:00'), energyHour: 1.110},
      {date: new Date('2022-01-02T00:00:00'), energyHour: 1.220},
      {date: new Date('2022-01-03T00:00:00'), energyHour: 1.220},
    ];
    const expected = [6, 0, 1];

    const actual = service.listDays(input);

    expect(actual).toEqual(expected);
  });

  it('should list available hours in given array', () => {
    const input: DayUsage[] = [
      {date: new Date('2022-01-01T00:00:00'), energyHour: 1.110},
      {date: new Date('2022-01-02T11:00:00'), energyHour: 1.220},
      {date: new Date('2022-01-03T21:00:00'), energyHour: 1.220},
    ];
    const expected = [0, 11, 21];

    const actual = service.listHours(input);

    expect(actual).toEqual(expected);
  });
});
