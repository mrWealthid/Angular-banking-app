import {Component, OnInit, inject} from '@angular/core';
import {FormControl, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../shared/interface/userAuth";
import {isLoadingSelector} from "../../core/store/Auth/selectors";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: UntypedFormGroup;
  email: FormControl;
  loading: boolean = false;

  //INJECTED SERVICE

  authservice = inject(AuthService);
  private store= inject(Store<AppStateInterface>)


  constructor() {
    this.store.pipe(select(isLoadingSelector)).subscribe(x => this.loading = x)

  }

  ngOnInit() {
    this.createResetPasswordForm()
  }



  handleClearError(){
    this.authservice.clearError()
  }

  createResetPasswordForm() {
    this.email = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.resetPasswordForm = new UntypedFormGroup({
      email: this.email,
    });
  }

  handleResetForm(email: any) {

    this.loading = true
    this.authservice.forgotPassword(email).subscribe((res:any)=> {
      this.loading = false;
this.authservice.setNotification(res.message, 'success')
    }, (err:any)=> {
      this.loading = false;
      this.authservice.setNotification(err.error.message, 'error')
    }
    )
  }
}
