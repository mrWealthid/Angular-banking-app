import {Component, Input} from '@angular/core';
import {faCheck, faClipboard} from "@fortawesome/free-solid-svg-icons";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-clipboard',
  template: `

    <span (click)="copyToClipboard()">

     <ng-container *ngIf="(valueState| async)"> <i class="fa font-thin cursor-pointer fa-check text-green-400 "></i>
      </ng-container>

    <ng-container *ngIf="!(valueState| async)"> <i class="fa cursor-pointer text-green-400 fa-clipboard"></i>

      </ng-container>
    </span>
    <!--    <button ">{{ buttonText }}</button>-->
  `,
})
export class ClipboardComponent {
  @Input() textToCopy: string;
  @Input() buttonText: string;
  timer: any
  valueState = new BehaviorSubject(false)
  protected readonly faClipboard = faClipboard;
  protected readonly faCheck = faCheck;

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
