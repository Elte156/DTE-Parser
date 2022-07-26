import { Injectable } from '@angular/core';
import { Options, parse } from 'csv-parse/browser/esm/sync';
import { DayUsage } from './day-usage';

@Injectable({
  providedIn: 'root',
})
export class CsvParserService {
  /**
   * Regex Source: https://stackoverflow.com/a/12643073/1583548
   */
  public static readonly FLOAT_TESTER = /[+-]?([0-9]*[.])?[0-9]+/;

  constructor() {}

  public parseCsvString(csv: string): Record<string, string>[] {
    const options: Options = {
      columns: true,
    };

    return parse(csv, options);
  }

  public transform(csvItems: Record<string, string>[]): DayUsage[] {
    const items: DayUsage[] = [];

    for (const csvItem of csvItems) {
      // Ensure data is a number
      if (!CsvParserService.FLOAT_TESTER.test(csvItem['Hourly Total'])) {
        continue;
      }

      const item: DayUsage = {
        date: new Date(`${csvItem['Day']} ${csvItem['Hour of Day']}`),
        energyHour: parseFloat(csvItem['Hourly Total']),
      };

      // Check against Date parsing an validity
      // Source: https://stackoverflow.com/a/1353711/1583548
      if (isNaN(item.date.getTime())) {
        continue;
      }

      items.push(item);
    }
    return items;
  }
}
