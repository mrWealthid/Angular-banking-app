import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTreeComponent } from './summary-tree.component';

describe('SummaryTreeComponent', () => {
  let component: SummaryTreeComponent;
  let fixture: ComponentFixture<SummaryTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryTreeComponent]
    });
    fixture = TestBed.createComponent(SummaryTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
