import { Injectable } from '@angular/core';
import { parse } from 'csv-parse/browser/esm/sync';
import { DayUsage } from './day-usage';

@Injectable({
  providedIn: 'root'
})
export class CsvParserService {
  /**
   * Regex Source: https://stackoverflow.com/a/12643073/1583548
   */
  public static readonly FLOAT_TESTER = /[+-]?([0-9]*[.])?[0-9]+/;

  constructor() {
  }

  public parseCsvString(csv: string): Record<string, string>[] {
    return parse(csv, {columns: true});
  }

  public transform(csvItems: Record<string, string>[]): DayUsage[] {
    const items: DayUsage[] = [];

    for (const csvItem of csvItems) {
      // Ensure data is a number
      if (!CsvParserService.FLOAT_TESTER.test(csvItem['Hourly Total'])) {
        continue;
      }
      if (!CsvParserService.FLOAT_TESTER.test(csvItem['Daily Total'])) {
        continue;
      }

      const item: DayUsage = {
        date: new Date(`${csvItem['Day']} ${csvItem['Hour of Day']}`),
        energyHour: parseFloat(csvItem['Hourly Total']),
        energyDay: parseFloat(csvItem['Daily Total']),
      };
      items.push(item);
    }
    return items;
  }
}
