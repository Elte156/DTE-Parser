export interface Rate {
  getRateName(datetime: Date): string,
  getRate(datetime: Date): number,
  getRateDescription(datetime: Date): string,
}
