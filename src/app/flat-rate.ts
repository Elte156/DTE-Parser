import { Rate } from './rate';

export class FlatRate implements Rate {
  constructor(
    protected rate: number,
    protected name: string = 'Flat Rate',
    protected description: string = 'Flat Rate'
  ) {}

  getRateName(datetime: Date): string {
    return this.name;
  }

  getRate(datetime: Date): number {
    return this.rate;
  }

  getRateDescription(datetime: Date): string {
    return this.description;
  }
}
