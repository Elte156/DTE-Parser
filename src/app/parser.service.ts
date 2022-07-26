import { Injectable } from '@angular/core';
import { DayUsage } from './day-usage';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() { }

  public sum(data: DayUsage[]): number {
    return data.reduce((accumulator, object) => {
      return accumulator + object.energyHour;
    }, 0);
  }
}
