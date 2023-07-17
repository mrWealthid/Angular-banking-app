import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCardsComponent } from './summary-cards.component';

describe('SummaryCardsComponent', () => {
  let component: SummaryCardsComponent;
  let fixture: ComponentFixture<SummaryCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryCardsComponent]
    });
    fixture = TestBed.createComponent(SummaryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
