import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DatePickerComponents} from './date-pickers.component';

describe('DatePickerComponent', () => {
  let component: DatePickerComponents;
  let fixture: ComponentFixture<DatePickerComponents>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerComponents]
    });
    fixture = TestBed.createComponent(DatePickerComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
