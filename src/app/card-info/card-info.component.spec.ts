import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { CardInfoComponent } from './card-info.component';

describe('CardInfoComponent', () => {
  let component: CardInfoComponent;
  let fixture: ComponentFixture<CardInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardInfoComponent],
      imports: [MatCardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
