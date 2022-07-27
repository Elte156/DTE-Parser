import { TestBed } from '@angular/core/testing';
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
    const expected = 372.1000000000008;

    const actual = service.sum(mockData);

    expect(actual).toEqual(expected);
  });

  it('should get all items for a specific year and month from a given array', () => {
    const expected = 24 * 8; // 24 entries per day * 8 days

    const actual = service.filterByYearAndMonth(mockData, 2022, 6);

    expect(actual.length).toEqual(expected);
  });

  it('should get all items for a specific day of the week from a given array', () => {
    const expected = 48;

    const actual = service.filterByDayOfWeek(mockData, 1);

    expect(actual.length).toEqual(expected);
  });

  it('should get all specific hour items from a given array', () => {
    const expected = 10; // 10 days in mock

    const actual = service.filterByHourOfDay(mockData, 12);

    expect(actual.length).toEqual(expected);
  });

  it('should get the sum of a specific hour for specific days in a specific month', () => {
    const expected = 2.88; // 2 days and their sum for noon

    let data = service.filterByYearAndMonth(mockData, 2022, 6);
    data = service.filterByDayOfWeek(data, 5);
    data = service.filterByHourOfDay(data, 12);
    const actual = service.sum(data);

    expect(actual).toEqual(expected);
  });
});
