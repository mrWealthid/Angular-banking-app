import {Component, OnInit, inject} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../shared/interface/userAuth";
import {isLoadingSelector} from "../../core/store/Auth/selectors";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  updatePasswordForm: UntypedFormGroup;
  currentPassword: UntypedFormControl
  password: UntypedFormControl
  passwordConfirm: UntypedFormControl
  loading: Boolean;

    //INJECTED SERVICE

    authservice = inject(AuthService);
    private store= inject(Store<AppStateInterface>)
  

  constructor() {
    this.store.pipe(select(isLoadingSelector)).subscribe(x => this.loading = x)

  }

  createUpdatePasswordForm() {
    this.password = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.currentPassword = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.passwordConfirm = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.updatePasswordForm = new UntypedFormGroup({
      currentPassword: this.currentPassword,
      password: this.password,
      confirmPassword: this.passwordConfirm,
    });
  }

  ngOnInit() {
    this.createUpdatePasswordForm()
  }


  handleUpdatePassword(value: any) {
    console.log(value)
  }
}
