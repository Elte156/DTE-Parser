import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { mockFullData } from '../data-full.fixture';
import { ParserService } from '../parser.service';
import { Result } from '../result';

@Component({
  selector: 'app-rate-section',
  templateUrl: './rate-section.component.html',
})
export class RateSectionComponent implements OnDestroy {
  results: Result[] = [];
  resultsSub: Subscription;

  constructor(private parserService: ParserService) {
    this.resultsSub = this.parserService.results$.subscribe((results) => {
      this.results.push(results);
    });
  }

  ngOnDestroy(): void {
    this.resultsSub.unsubscribe();
  }

  loadMockData(): void {
    const data = mockFullData;
    this.parserService.calculate(data);
  }
}
