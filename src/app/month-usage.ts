import { DayUsage } from './day-usage';

export interface MonthUsage {
  month: number;
  usage: DayUsage[];
}
