import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {DebugElement} from "@angular/core";
import {Store, StoreModule} from "@ngrx/store";
import {SharedModule} from "../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el: DebugElement;


  beforeEach(async () => {
    const testStore = jasmine.createSpyObj('Store', ['select', 'pipe']);
    await TestBed.configureTestingModule({
      imports: [StoreModule, SharedModule, RouterTestingModule],
      declarations: [HomeComponent],
      providers: [{provide: Store, useValue: testStore}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have navigation links', () => {
  //   const header = el.query(By.css('app-header'))
  //   expect(header).toBeTruthy()
  //
  // });


  it('should have primary text', () => {
    const primaryText = el.query(By.css('h1'))
    expect(primaryText.nativeElement.textContent).toContain('The Easiest Way To Manage Personal Finances')
  });

  it('should have hero-btn', () => {
    const buttons = el.queryAll(By.css('button'))
    expect(buttons[0].nativeElement.textContent).toContain('Explore')
  });


  it('should have and display an about section', () => {
    const section = el.queryAll(By.css('.section-hero2'))
    const sectionText = el.query(By.css('.section-hero2 h2'))
    expect(section).toBeTruthy();
    expect(section.length).toBe(1);
    expect(sectionText.nativeElement.textContent).toContain('Unlimited Transfers. Hitch Free Transactions')


  });
  it('should have and display a footer', () => {
    const footer = el.queryAll(By.css('footer'))
    expect(footer).toBeTruthy()
    expect(footer.length).toBe(1);
    // expect(footer[0].nativeElement.textContent).toContain('Unlimited Transfers. Hitch Free Transactions')

  });

});
