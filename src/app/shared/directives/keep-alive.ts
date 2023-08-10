import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output, } from '@angular/core';
import { filter, fromEvent, merge, Subscription } from 'rxjs';

@Directive({
    selector: '[keepAlive]',
})
export class KeepDirective implements AfterViewInit, OnDestroy {
    @Output() keepAlive = new EventEmitter<void>();

    documentClickSubscription: Subscription | undefined;
    clickEvents$ = fromEvent(this.document, 'click');
    keyboardEvents$ = fromEvent(this.document, 'keyup');
    allEvents$ = merge(this.clickEvents$, this.keyboardEvents$)


    constructor(
        @Inject(DOCUMENT) private document: Document
    ) {
    }

    ngAfterViewInit(): void {
        this.documentClickSubscription = this.allEvents$
            .subscribe(() => {
                this.keepAlive.emit();
            });


    }

    ngOnDestroy(): void {
        this.documentClickSubscription?.unsubscribe();
    }

    // isInsideAndEscapeKey(elementToCheck: HTMLElement, event: KeyboardEvent): boolean {

    //     let val: boolean;

    //     if (event.type === 'keyup') {
    //         val = this.onKeyDown(event)
    //     } else {
    //         val = elementToCheck === this.element.nativeElement ||
    //             this.element.nativeElement.contains(elementToCheck)
    //     }

    //     return val
    // }


    // onKeyDown(event: any): boolean {
    //     return !(event.key === 'Escape')

    // }
}
