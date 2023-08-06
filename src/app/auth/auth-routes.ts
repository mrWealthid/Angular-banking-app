import {LoginComponent} from "./login/login.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import {SignupComponent} from "./signup/signup.component";
import {Routes} from "@angular/router";

export const routes: Routes = [{
  path: 'login', component: LoginComponent
},
  {path: 'signup', component: SignupComponent},

  {path: 'resetPassword', component: ResetPasswordComponent}

]
