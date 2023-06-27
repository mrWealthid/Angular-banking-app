import {Component, OnInit} from '@angular/core';
import {FormControl, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
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
  loading: Boolean;


  constructor(public authservice: AuthService, private store: Store<AppStateInterface>) {
    this.store.pipe(select(isLoadingSelector)).subscribe(x => this.loading = x)

  }

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
