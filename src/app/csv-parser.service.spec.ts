import { TestBed } from '@angular/core/testing';

import { CsvParserService } from './csv-parser.service';

describe('CsvParserService', () => {
  let service: CsvParserService;

  const mockCsv =
    '"Account Number","Meter Number","Day","Hour of Day","Hourly Total","Daily Total","Unit of Measurement"\n' +
    '"0000 000 0000 0","0000000","06/24/2022","12:00 AM","1.11","18.7810","kWh"\n' +
    '"0000 000 0000 0","0000000","06/24/2022","1:00 AM","0.999","18.7810","kWh"';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse a CSV string', () => {
    const expected = [
      {
        'Account Number': '0000 000 0000 0',
        'Meter Number': '0000000',
        'Day': '06/24/2022',
        'Hour of Day': '12:00 AM',
        'Hourly Total': '1.11',
        'Daily Total': '18.7810',
        'Unit of Measurement': 'kWh',
      },
      {
        'Account Number': '0000 000 0000 0',
        'Meter Number': '0000000',
        'Day': '06/24/2022',
        'Hour of Day': '1:00 AM',
        'Hourly Total': '0.999',
        'Daily Total': '18.7810',
        'Unit of Measurement': 'kWh',
      },
    ];

    const actual = service.parseCsvString(mockCsv);

    expect(actual).toEqual(expected);
  });

  it('should transform CSV items to DayUsage items', () => {
    const expected = [
      {
        date: new Date('2022-06-24T00:00:00'),
        energyHour: 1.11,
        energyDay: 18.7810,
      },
      {
        date: new Date('2022-06-24T01:00:00'),
        energyHour: 0.999,
        energyDay: 18.7810,
      },
    ];

    const input = service.parseCsvString(mockCsv);
    const actual = service.transform(input);

    expect(actual).toEqual(expected);
  });
});
