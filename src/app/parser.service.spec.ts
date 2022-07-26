import { TestBed } from '@angular/core/testing';
import { DayUsage } from './day-usage';

import { ParserService } from './parser.service';

describe('ParserService', () => {
  let service: ParserService;

  const mockData: DayUsage[] = [
    {date: new Date('07/24/2022T10:00:00'), energyHour: 1.2740, energyDay: 32.5840},
    {date: new Date('07/24/2022T11:00:00'), energyHour: 1.4330, energyDay: 32.5840},
    {date: new Date('07/24/2022T12:00:00'), energyHour: 1.2060, energyDay: 32.5840},
    {date: new Date('07/24/2022T13:00:00'), energyHour: 1.7550, energyDay: 32.5840},
    {date: new Date('07/24/2022T14:00:00'), energyHour: 0.9770, energyDay: 32.5840},
    {date: new Date('07/24/2022T15:00:00'), energyHour: 1.0990, energyDay: 32.5840},
    {date: new Date('07/24/2022T16:00:00'), energyHour: 1.3560, energyDay: 32.5840},
    {date: new Date('07/24/2022T17:00:00'), energyHour: 2.5560, energyDay: 32.5840},
    {date: new Date('07/24/2022T18:00:00'), energyHour: 1.7590, energyDay: 32.5840},
    {date: new Date('07/24/2022T19:00:00'), energyHour: 1.5310, energyDay: 32.5840},
    {date: new Date('07/24/2022T20:00:00'), energyHour: 1.8790, energyDay: 32.5840},
    {date: new Date('07/24/2022T21:00:00'), energyHour: 1.5980, energyDay: 32.5840},
    {date: new Date('07/24/2022T22:00:00'), energyHour: 1.4140, energyDay: 32.5840},
    {date: new Date('07/24/2022T23:00:00'), energyHour: 2.0820, energyDay: 32.5840},
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sum up the energy usage for a given array', () => {
    const expected = 21.919;

    const actual = service.sum(mockData);

    expect(actual).toEqual(expected);
  });
});
