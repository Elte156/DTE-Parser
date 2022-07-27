import { Injectable } from '@angular/core';
import { parse } from 'csv-parse/browser/esm/sync';
import { DayUsage } from './day-usage';

@Injectable({
  providedIn: 'root'
})
export class CsvParserService {
  constructor() {
  }

  public parseCsvString(csv: string): Record<string, string>[] {
    return parse(csv, {columns: true});
  }

  public transform(csvItems: Record<string, string>[]): DayUsage[] {
    const items: DayUsage[] = [];
    csvItems.forEach(csvItem => {
      const item: DayUsage = {
        date: new Date(`${csvItem['Day']} ${csvItem['Hour of Day']}`),
        energyHour: parseFloat(csvItem['Hourly Total']),
        energyDay: parseFloat(csvItem['Daily Total']),
      };
      items.push(item);
    });
    return items;
  }
}
