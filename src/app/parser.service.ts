import { Injectable } from '@angular/core';
import { DayUsage } from './day-usage';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  constructor() {}

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

  public filterByYearAndMonth(
    data: DayUsage[],
    year: number,
    month: number | number[]
  ): DayUsage[] {
    const months = Array.isArray(month) ? month : [month];
    return data.filter((item) => {
      return (
        item.date.getFullYear() === year &&
        months.includes(item.date.getMonth())
      );
    });
  }

  public filterByDayOfWeek(
    data: DayUsage[],
    dayOfWeek: number | number[]
  ): DayUsage[] {
    const input = Array.isArray(dayOfWeek) ? dayOfWeek : [dayOfWeek];
    return data.filter((item) => {
      return input.includes(item.date.getDay());
    });
  }

  public filterByHourOfDay(
    data: DayUsage[],
    hourOfDay: number | number[]
  ): DayUsage[] {
    const input = Array.isArray(hourOfDay) ? hourOfDay : [hourOfDay];
    return data.filter((item) => {
      return input.includes(item.date.getHours());
    });
  }
}
