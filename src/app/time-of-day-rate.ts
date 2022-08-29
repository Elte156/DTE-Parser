import { Rate } from './rate';

export class TimeOfDayRate implements Rate {
  public static readonly RATE_OFF_PEAK = 0.12;
  public static readonly RATE_ON_PEAK_COLD = 0.2;
  public static readonly RATE_ON_PEAK_HOT = 0.23;

  getRateName(datetime: Date): string {
    const rate = this.getRate(datetime);
    switch (rate) {
      case TimeOfDayRate.RATE_ON_PEAK_COLD:
      case TimeOfDayRate.RATE_ON_PEAK_HOT:
        return 'On-Peak';
      default:
        return 'Off-Peak';
    }
  }

  getRate(datetime: Date): number {
    // Weekend check
    if (datetime.getDay() === 6 || datetime.getDay() === 0) {
      return TimeOfDayRate.RATE_OFF_PEAK;
    }

    // Off peak hour check
    if (datetime.getHours() >= 11 && datetime.getHours() < 19) {
      if (datetime.getMonth() >= 5 && datetime.getMonth() <= 9) {
        return TimeOfDayRate.RATE_ON_PEAK_HOT;
      } else {
        return TimeOfDayRate.RATE_ON_PEAK_COLD;
      }
    }

    return TimeOfDayRate.RATE_OFF_PEAK;
  }

  getRateDescription(datetime: Date): string {
    const rate = this.getRate(datetime);
    switch (rate) {
      case TimeOfDayRate.RATE_ON_PEAK_COLD:
      case TimeOfDayRate.RATE_ON_PEAK_HOT:
        return 'On-Peak (11AM-7PM)';
      default:
        return 'Off-Peak (7PM-11AM)';
    }
  }
}
