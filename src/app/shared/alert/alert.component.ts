import { Component, Input, inject} from '@angular/core';
import { AuthService } from 'src/app/auth.service';



@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input({required:true}) msg =""

  authService = inject(AuthService)


  handleClose() {
this.authService.setError('')
  }
}
