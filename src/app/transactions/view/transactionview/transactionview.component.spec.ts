import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionviewComponent } from './transactionview.component';

describe('TransactionviewComponent', () => {
  let component: TransactionviewComponent;
  let fixture: ComponentFixture<TransactionviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionviewComponent]
    });
    fixture = TestBed.createComponent(TransactionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
