import {Component, OnInit} from '@angular/core';
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

  SignupForm: UntypedFormGroup;
  firstname: UntypedFormControl;
  lastname: UntypedFormControl;
  DOB: UntypedFormControl;
  email: UntypedFormControl;
  password: UntypedFormControl;
  passwordConfirm: UntypedFormControl;


  constructor(public authservice: AuthService, public modalService: ModalService, private store: Store<AppStateInterface>
  ) {
  }

  ngOnInit(): void {
    this.createForm()
  }


  createForm() {
    this.firstname = new UntypedFormControl('', Validators.required);
    this.lastname = new UntypedFormControl('', Validators.required);
    this.email = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.DOB = new UntypedFormControl('', [Validators.required],);
    this.password = new UntypedFormControl('', [Validators.required, Validators.minLength(6)]);
    this.passwordConfirm = new UntypedFormControl('', [Validators.required, Validators.minLength(6)]);
    this.SignupForm = new UntypedFormGroup({
      firstname: this.firstname,
      lastname: this.lastname,
      dob: this.DOB,
      email: this.email,
      password: this.password,
      passwordConfirm: this.passwordConfirm
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


  toggleModal() {
    this.modalService.HandleShowModal();
  }
}
