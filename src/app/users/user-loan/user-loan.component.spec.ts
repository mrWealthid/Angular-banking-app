import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoanComponent } from './user-loan.component';

describe('UserLoanComponent', () => {
  let component: UserLoanComponent;
  let fixture: ComponentFixture<UserLoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoanComponent]
    });
    fixture = TestBed.createComponent(UserLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
