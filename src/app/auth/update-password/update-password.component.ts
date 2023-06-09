import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

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
  authservice: any
  // protected readonly faLock = faLock;
  // protected readonly faEye = faEye;
  // protected readonly faEyeSlash = faEyeSlash;
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
