import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {routes} from "./auth-routes";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";
import {ReactiveFormsModule} from "@angular/forms";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {UpdatePasswordComponent} from "./update-password/update-password.component";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, ResetPasswordComponent,
    UpdatePasswordComponent,
    RedirectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.rotatingPlane,
      backdropBackgroundColour: "rgba(0,0,0,0.1)",
      backdropBorderRadius: "4px",
      primaryColour:'var(--primary-color)',
      secondaryColour: "red",
      tertiaryColour: "blue",
    }),
    SharedModule,


  ]
})
export class AuthModule {
}
