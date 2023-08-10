import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output, } from '@angular/core';
import { filter, fromEvent, merge, Subscription } from 'rxjs';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() clickOutside = new EventEmitter<void>();

  documentClickSubscription: Subscription | undefined;
  clickEvents$ = fromEvent(this.document, 'click');
  keyboardEvents$ = fromEvent(this.document, 'keyup');
  allEvents$ = merge(this.clickEvents$, this.keyboardEvents$)


  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngAfterViewInit(): void {
    this.documentClickSubscription = this.allEvents$
      .pipe(
        filter((event: Event | KeyboardEvent) => {
          return !this.isInsideAndEscapeKey(event.target as HTMLElement, event as KeyboardEvent)
        })
      )
      .subscribe(() => {
        this.clickOutside.emit();
      });


  }

  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }

  isInsideAndEscapeKey(elementToCheck: HTMLElement, event: KeyboardEvent): boolean {

    let val: boolean;

    if (event.type === 'keyup') {
      val = this.onKeyDown(event)
    } else {
      val = elementToCheck === this.element.nativeElement ||
        this.element.nativeElement.contains(elementToCheck)
    }

    return val
  }


  onKeyDown(event: any): boolean {
    return !(event.key === 'Escape')

  }
}
