import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInputComponent } from './select-input.component';

describe('SelectInputComponent', () => {
  let component: SelectInputComponent;
  let fixture: ComponentFixture<SelectInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectInputComponent]
    });
    fixture = TestBed.createComponent(SelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
