import {Component, OnInit} from '@angular/core';
import {faAt, faCircleExclamation, faEye, faEyeSlash, faLock} from '@fortawesome/free-solid-svg-icons';
import {FormControl, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {AppStateInterface, ILogin} from "../../shared/interface/userAuth";
import {Store} from "@ngrx/store";
import * as AuthActions from "../../core/store/Auth/actions";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faCircleExclamation = faCircleExclamation;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faLock = faLock;
  faAt = faAt;
  isShown: boolean = false;
  LoginForm: UntypedFormGroup;
  email: UntypedFormControl;
  password: UntypedFormControl;
  showModal: boolean = false;
  showMe: boolean = true;
 
  formRoute$ = new BehaviorSubject('updatePasswordForm')


  resetPasswordForm: UntypedFormGroup;
  reset_email: FormControl;
  updatePasswordForm: UntypedFormGroup;
  current_password_update: FormControl
  password_update: UntypedFormControl
  passwordConfirm_update: FormControl


  constructor(public authservice: AuthService, private store: Store<AppStateInterface>) {
  }

  ngOnInit(): void {
    this.email = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.password = new UntypedFormControl('', [Validators.required, Validators.minLength(6)]);
    this.LoginForm = new UntypedFormGroup({
      email: this.email,
      password: this.password
    });


    this.createUpdatePasswordForm()
    this.createResetPasswordForm()
  }

  togglePassword() {
    this.isShown = !this.isShown;
  }

  handleLogin(value: ILogin) {
    // this.authservice.login(value);
    console.log(value);

    this.store.dispatch(AuthActions.login(value))
  }

  validateEmail() {
    return !this.email.pristine && /INVALID/i.test(this.email.status);
  }

  validatePassword() {
    return !this.password.pristine && /INVALID/i.test(this.password.status);
  }

  handleModal($event: any) {
    console.log("I Bubbled", $event);
    this.showModal = $event;
  }


  updateRoute(route: string) {
    this.formRoute$.next(route)

  }

  createResetPasswordForm() {
    this.reset_email = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.resetPasswordForm = new UntypedFormGroup({
      email: this.reset_email,
    });
  }

  createUpdatePasswordForm() {
    this.password_update = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.current_password_update = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.passwordConfirm_update = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.updatePasswordForm = new UntypedFormGroup({
      currentPassword: this.current_password_update,
      password: this.password_update,
      confirmPassword: this.passwordConfirm_update,
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
    this.showMe = true;
  }

  handleUpdatePassword(value: any) {

    console.log(value)
  }

  handleForgotPassword(value: any) {
    console.log(value)
  }
}
