import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appMask]'
})
export class MaskDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
  }


  ngAfterViewInit() {
    this.maskContent();
  }

  private maskContent() {
    const originalContent = this.el.nativeElement.innerHTML;

    this.el.nativeElement.innerHTML = originalContent.replace(/./g, '*');
  }
}
