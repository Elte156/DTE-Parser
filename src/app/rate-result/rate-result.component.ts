import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rate-result',
  templateUrl: './rate-result.component.html',
  styleUrls: ['./rate-result.component.scss'],
})
export class RateResultComponent {
  @Input()
  title = '';
  @Input()
  costMonthly = 0;
  @Input()
  costYearly = 0;
}
