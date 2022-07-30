import { Injectable } from '@angular/core';
import { DayUsage } from './day-usage';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() { }

  public listYears(data: DayUsage[]): number[] {
    const found = data.map((item) => {
      return item.date.getFullYear();
    });
    return [...new Set(found)];
  }

  public listMonths(data: DayUsage[]): number[] {
    const found = data.map((item) => {
      return item.date.getMonth();
    });
    return [...new Set(found)];
  }

  public listDays(data: DayUsage[]): number[] {
    const found = data.map((item) => {
      return item.date.getDay();
    });
    return [...new Set(found)];
  }

  public listHours(data: DayUsage[]): number[] {
    const found = data.map((item) => {
      return item.date.getHours();
    });
    return [...new Set(found)];
  }

  public sum(data: DayUsage[]): number {
    return data.reduce((accumulator, item) => {
      return accumulator + item.energyHour;
    }, 0);
  }

  public filterByYearAndMonth(data: DayUsage[], year: number, month: number): DayUsage[] {
    return data.filter((item) => {
      return item.date.getFullYear() === year && item.date.getMonth() === month;
    });
  }

  public filterByDayOfWeek(data: DayUsage[], dayOfWeek: number): DayUsage[] {
    return data.filter((item) => {
      return item.date.getDay() === dayOfWeek;
    });
  }

  public filterByHourOfDay(data: DayUsage[], hourOfDay: number): DayUsage[] {
    return data.filter((item) => {
      return item.date.getHours() === hourOfDay;
    });
  }
}
