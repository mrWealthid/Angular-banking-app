import {Component, OnInit, inject} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService, IPasswordUpdate} from "../../auth/auth.service";
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../shared/interface/userAuth";
import {isLoadingSelector} from "../../core/store/Auth/selectors";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  updatePasswordForm: UntypedFormGroup;
  password: UntypedFormControl
  // passwordConfirm: UntypedFormControl
  loading: boolean;
  token:any

    //INJECTED SERVICE

    authservice = inject(AuthService);
    private store= inject(Store<AppStateInterface>);
    route = inject( ActivatedRoute)
  

  constructor() {
    this.store.pipe(select(isLoadingSelector)).subscribe(x => this.loading = x)

   this.token =this.route.snapshot.params['token']

  }

  createUpdatePasswordForm() {
    this.password = new UntypedFormControl('', [Validators.required, Validators.minLength(8)]);
    // this.passwordConfirm = new UntypedFormControl('', [Validators.required,Validators.minLength(8)]);
    this.updatePasswordForm = new UntypedFormGroup({
      password: this.password,
      // confirmPassword: this.passwordConfirm,
    });
  }

  ngOnInit() {
    this.createUpdatePasswordForm()
  }

  handleClearError(){
    this.authservice.clearError()
  }


  handleUpdatePassword(value: any) {

    console.log(value)

    this.loading = true

    const payload:IPasswordUpdate = {
password: value.password,
passwordConfirm: value.password
    }
    this.authservice.resetPassword(this.token, payload).subscribe(x => {
      this.loading = true,


      this.authservice.setNotification(x.message, 'success')

      console.log(x)
    }, err=> {
      this.authservice.setNotification(err.error.message, 'error')
    })
  }
}
