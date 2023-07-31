import { Component, EventEmitter, Input, Output, inject} from '@angular/core';
import { AuthService } from 'src/app/auth.service';



@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input({required:true}) msg =""

  @Output() clearError = new EventEmitter<string>();


  handleClose() {
this.clearError.emit('')
  }
}
