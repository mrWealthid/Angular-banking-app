import {Component, OnInit} from '@angular/core';
import {FormControl, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: UntypedFormGroup;
  email: FormControl;
  authservice: any;

  ngOnInit() {
    this.createResetPasswordForm()
  }

  createResetPasswordForm() {
    this.email = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.resetPasswordForm = new UntypedFormGroup({
      email: this.email,
    });
  }

  handleResetForm(val: any) {

  }
}
