import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {AppStateInterface, IRegister} from "../../shared/interface/userAuth";
import {ModalService} from "../../shared/services/modal.service";
import * as AuthActions from "../../core/store/Auth/actions";

import {select, Store} from "@ngrx/store";
import {isLoadingSelector} from "../../core/store/Auth/selectors";
import {IDatePickerConfig} from "ng2-date-picker";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  date = dayjs();
  SignupForm: UntypedFormGroup;
  firstname: UntypedFormControl;
  lastname: UntypedFormControl;
  DOB: UntypedFormControl;
  email: UntypedFormControl;
  password: UntypedFormControl;
  // passwordConfirm: UntypedFormControl;
  loading: Boolean;
  selectedDate: Date;
  config: IDatePickerConfig = {
    max: this.date.subtract(7, 'year'),
  };


  constructor(public authservice: AuthService, public modalService: ModalService, private store: Store<AppStateInterface>
  ) {

    this.store.pipe(select(isLoadingSelector)).subscribe(x => this.loading = x)
    this.selectedDate = new Date();
  }

  onDateSelected(event: any) {
    // Handle the selected date
    console.log(event.value);
  }

  ngOnInit(): void {
    this.createForm()
  }


  createForm() {
    this.firstname = new UntypedFormControl('', Validators.required);
    this.lastname = new UntypedFormControl('', Validators.required);
    this.email = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.DOB = new UntypedFormControl('', [Validators.required],);
    this.password = new UntypedFormControl('', [Validators.required, Validators.minLength(8)]);
    // this.passwordConfirm = new UntypedFormControl('', [Validators.required, Validators.minLength(8)]);
    this.SignupForm = new UntypedFormGroup({
      firstname: this.firstname,
      lastname: this.lastname,
      dob: this.DOB,
      email: this.email,
      password: this.password,
      passwordConfirm: this.password
    });

  }

  handleRegister(values: any) {


    const payload: IRegister = {
      name: values.firstname + " " + values.lastname,
      email: values.email,
      password: values.password,
      passwordConfirm: values.password,
      dateOfBirth: values.dob
    }

    console.log(payload);
    // console.log(values);
    // this.authservice.register(values);

    this.store.dispatch(AuthActions.register(payload))
  }


  toggleModal() {
    this.modalService.HandleShowModal();
  }

  onDateSelection($event: Event) {

  }


}
