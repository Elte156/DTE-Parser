import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { mockFullData } from '../data-full.fixture';
import { ParserService } from '../parser.service';
import { Result } from '../result';

@Component({
  selector: 'app-rate-section',
  templateUrl: './rate-section.component.html',
  styleUrls: ['./rate-section.component.scss'],
})
export class RateSectionComponent implements OnDestroy {
  results: Result[] = [];
  resultsSub: Subscription;

  constructor(
    private parserService: ParserService,
    private _snackBar: MatSnackBar
  ) {
    this.resultsSub = this.parserService.results$.subscribe((results) => {
      this.results.push(results);
      this._snackBar.open('Parsing Complete', 'Dismiss', { duration: 2000 });
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
