import { Component, EventEmitter, Input, Output, inject} from '@angular/core';



@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input({required:true}) msg =""
  @Input() type: string = 'error'

  @Output() clearError = new EventEmitter<string>();


  handleClose() {
this.clearError.emit('')
  }
}
