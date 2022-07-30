import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list months from most KWH to least KWH', () => {
    fail();
  });

  it('should list days from most KWH to least KWH', () => {
    fail();
  });

  it('should list hours from most KWH to least KWH', () => {
    fail();
  });

  it('should list hours (weekdays only) from most KWH to least KWH', () => {
    fail();
  });

  it('should list hours (weekends only) from most KWH to least KWH', () => {
    fail();
  });
});
