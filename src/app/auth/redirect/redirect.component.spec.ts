import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectComponent } from './redirect.component';

describe('RedirectComponent', () => {
  let component: RedirectComponent;
  let fixture: ComponentFixture<RedirectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RedirectComponent]
    });
    fixture = TestBed.createComponent(RedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
