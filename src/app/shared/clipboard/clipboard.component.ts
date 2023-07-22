import {Component, Input} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.component.html',
})
export class ClipboardComponent {
  @Input({required: true}) textToCopy: any;
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
