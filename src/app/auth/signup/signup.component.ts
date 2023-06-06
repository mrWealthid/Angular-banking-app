import {Component, OnInit} from '@angular/core';
import {
  faAt,
  faCalendarAlt,
  faCircleExclamation,
  faEye,
  faEyeSlash,
  faLock,
  faPhone,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {AppStateInterface, IRegister} from "../../shared/interface/userAuth";
import {ModalService} from "../../shared/services/modal.service";
import * as AuthActions from "../../core/store/Auth/actions";

import {Store} from "@ngrx/store";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  faCircleExclamation = faCircleExclamation;
  faUser = faUser;
  faCalendar = faCalendarAlt;
  faPhone = faPhone;
  faAt = faAt;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faLock = faLock;
  SignupForm: UntypedFormGroup;
  firstname: UntypedFormControl;
  lastname: UntypedFormControl;
  // DOB: FormControl;
  email: UntypedFormControl;
  title: UntypedFormControl;
  phone: UntypedFormControl;
  password: UntypedFormControl;
  isShown: boolean = false;

  constructor(public authservice: AuthService, public modalService: ModalService, private store: Store<AppStateInterface>
  ) {
  }

  ngOnInit(): void {
    this.firstname = new UntypedFormControl('', Validators.required);
    this.lastname = new UntypedFormControl('', Validators.required);
    // this.DOB = new FormControl('', Validators.required);
    this.email = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.title = new UntypedFormControl('', Validators.required);
    this.phone = new UntypedFormControl('', Validators.required);
    this.password = new UntypedFormControl('', [Validators.required, Validators.minLength(6)]);
    this.SignupForm = new UntypedFormGroup({
      firstname: this.firstname,
      lastname: this.lastname,
      // DOB: this.DOB,
      email: this.email,
      title: this.title,
      Phone: this.phone,
      password: this.password
    });

  }

  handleRegister(values: any) {


    const payload: IRegister = {
      name: values.firstname + " " + values.lastname,
      email: values.email,
      password: values.password,
      passwordConfirm: values.password
    }

    console.log(payload);
    // console.log(values);
    // this.authservice.register(values);

    this.store.dispatch(AuthActions.register(payload))
  }

  togglePassword() {
    this.isShown = !this.isShown;
  }

  validateEmail() {
    return !this.email.pristine && /INVALID/i.test(this.email.status);
  }

  validatePassword() {
    return !this.password.pristine && /INVALID/i.test(this.password.status);
  }

  toggleModal() {
    this.modalService.HandleShowModal();
  }
}
