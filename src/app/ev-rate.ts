import { Rate } from "./rate";

export class EvRate implements Rate {
  public static readonly RATE_OFF_PEAK = 0.11;
  public static readonly RATE_ON_PEAK = 0.24;

  getRateName(datetime: Date): string {
    const rate = this.getRate(datetime);
    switch (rate) {
      case EvRate.RATE_ON_PEAK:
        return 'On-Peak';
      default:
        return 'Off-Peak';
    }
  }

  getRate(datetime: Date): number {
    // Weekend check
    if (datetime.getDay() === 6 || datetime.getDay() === 0) {
      return EvRate.RATE_OFF_PEAK;
    }

    // Off peak hour check
    if (datetime.getHours() >= 9 && datetime.getHours() < 23) {
      return EvRate.RATE_ON_PEAK;
    }

    return EvRate.RATE_OFF_PEAK;
  }

  getRateDescription(datetime: Date): string {
    const rate = this.getRate(datetime);
    switch (rate) {
      case EvRate.RATE_ON_PEAK:
        return 'On-Peak (9AM-11PM)';
      default:
        return 'Off-Peak (11PM-9AM)';
    }
  }
}
