import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanViewComponent } from './loan-view.component';

describe('LoanViewComponent', () => {
  let component: LoanViewComponent;
  let fixture: ComponentFixture<LoanViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanViewComponent]
    });
    fixture = TestBed.createComponent(LoanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
