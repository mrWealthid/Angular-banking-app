import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansComponent } from './loans.component';

describe('LoansComponent', () => {
  let component: LoansComponent;
  let fixture: ComponentFixture<LoansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoansComponent]
    });
    fixture = TestBed.createComponent(LoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
