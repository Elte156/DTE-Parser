import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DayUsage } from './day-usage';
import { DynamicPeakRate } from './dynamic-peak-rate';
import { EvRate } from './ev-rate';
import { FlatRate } from './flat-rate';
import { MonthUsage } from './month-usage';
import { Result } from './result';
import { TimeOfDayRate } from './time-of-day-rate';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  private readonly results = new Subject<Result>();
  public readonly results$ = this.results.asObservable();

  constructor() {}

  public calculate(data: DayUsage[]) {
    const monthlyUsage: MonthUsage[] = [];

    // List available years
    const availableYears = this.listYears(data);

    // Walk through each month
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      let usage: DayUsage[] = [];

      // Walk through each available year
      for (const year of availableYears) {
        // Check if we already have data for that month
        if (usage.length) {
          continue;
        }

        // Fetch monthly data
        usage = this.filterByYearAndMonth(data, year, monthIndex);
      }

      monthlyUsage.push({ month: monthIndex, usage: usage });
    }

    // Calculate data rates
    const timeOfDayCost: number[] = [];
    const timeOfDayRate = new TimeOfDayRate();
    const dynamicPeakCost: number[] = [];
    const dynamicPeakRate = new DynamicPeakRate();
    const evCost: number[] = [];
    const evRate = new EvRate();
    const flatCost: number[] = [];
    const flatRate = new FlatRate(0.193);

    // Loop through months
    for (const monthly of monthlyUsage) {
      timeOfDayCost.push(0);
      dynamicPeakCost.push(0);
      evCost.push(0);
      flatCost.push(0);

      // Look through items
      for (const dayItem of monthly.usage) {
        timeOfDayCost[monthly.month] +=
          timeOfDayRate.getRate(dayItem.date) * dayItem.energyHour;
        dynamicPeakCost[monthly.month] +=
          dynamicPeakRate.getRate(dayItem.date) * dayItem.energyHour;
        evCost[monthly.month] +=
          evRate.getRate(dayItem.date) * dayItem.energyHour;
        flatCost[monthly.month] +=
          flatRate.getRate(dayItem.date) * dayItem.energyHour;
      }
    }

    // Push results
    this.results.next({
      title: 'TimeOfDayRate',
      costMonthly: timeOfDayCost.reduce((a, b) => a + b) / timeOfDayCost.length,
      costYearly: timeOfDayCost.reduce((a, b) => a + b),
    });
    this.results.next({
      title: 'DynamicPeakRate',
      costMonthly:
        dynamicPeakCost.reduce((a, b) => a + b) / dynamicPeakCost.length,
      costYearly: dynamicPeakCost.reduce((a, b) => a + b),
    });
    this.results.next({
      title: 'EvRate',
      costMonthly: evCost.reduce((a, b) => a + b) / evCost.length,
      costYearly: evCost.reduce((a, b) => a + b),
    });
    this.results.next({
      title: 'FlatRate',
      costMonthly: flatCost.reduce((a, b) => a + b) / flatCost.length,
      costYearly: flatCost.reduce((a, b) => a + b),
    });
  }

  public listYears(data: DayUsage[]): number[] {
    const found = data.map((item) => {
      return item.date.getFullYear();
    });
    return [...new Set(found)].sort(function (a, b) {
      return b - a;
    });
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
