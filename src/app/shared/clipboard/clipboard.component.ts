import {Component, Input} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-clipboard',
  template: `

    <span (click)="copyToClipboard()">

     <ng-container *ngIf="(valueState| async)"> <i [ngClass]="style? style: 'text-inherit'"
                                                   class="fa font-thin cursor-pointer fa-check  "></i>
      </ng-container>

    <ng-container *ngIf="!(valueState| async)"> <i [ngClass]="style? style: 'text-inherit'"
                                                   class="fa cursor-pointer  fa-clipboard"></i>

      </ng-container>
    </span>
    <!--    <button ">{{ buttonText }}</button>-->
  `,
})
export class ClipboardComponent {
  @Input({required: true}) textToCopy: string;
  @Input() buttonText: string;
  @Input() style: string
  timer: any
  valueState = new BehaviorSubject(false)


  copyToClipboard() {
    clearTimeout(this.timer)
    this.valueState.next(true)
    navigator.clipboard.writeText(this.textToCopy)
      .then(() => {

        this.timer = setTimeout(() => {
          this.valueState.next(false)
        }, 2000);
        console.log('Text copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying text to clipboard:', error);
      });
  }
}
