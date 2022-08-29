import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateSectionComponent } from './rate-section.component';

describe('RateSectionComponent', () => {
  let component: RateSectionComponent;
  let fixture: ComponentFixture<RateSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RateSectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load mock data', () => {
    component.loadMockData();
    expect(component.results.length).toEqual(4);
  });

  it('should load mock data twice', () => {
    component.loadMockData();
    component.loadMockData();
    expect(component.results.length).toEqual(8);
  });
});
