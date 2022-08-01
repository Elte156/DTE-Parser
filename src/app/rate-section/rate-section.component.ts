import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-section',
  templateUrl: './rate-section.component.html',
  styleUrls: ['./rate-section.component.scss']
})
export class RateSectionComponent implements OnInit {
  results: {title: string, costMonthly: number, costYearly: number}[] = []

  constructor() { }

  ngOnInit(): void {
    this.results = [
      {title: 'EV Plan', costMonthly: 45, costYearly: 500},
      {title: 'Time of Use Plan', costMonthly: 11, costYearly: 300},
    ];
  }
}
