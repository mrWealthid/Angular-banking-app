import {Component, OnInit} from '@angular/core';
import {faAt, faCircleExclamation, faEye, faEyeSlash, faLock} from '@fortawesome/free-solid-svg-icons';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {AppStateInterface, ILogin} from "../../shared/interface/userAuth";
import {Store} from "@ngrx/store";
import * as AuthActions from "../../core/store/Auth/actions";

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

  constructor(public authservice: AuthService, private store: Store<AppStateInterface>) {
  }

  ngOnInit(): void {
    this.email = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.password = new UntypedFormControl('', [Validators.required, Validators.minLength(6)]);
    this.LoginForm = new UntypedFormGroup({
      email: this.email,
      password: this.password
    });
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

  toggleModal() {
        this.showModal = !this.showModal;
        this.showMe = true;
    }
}
