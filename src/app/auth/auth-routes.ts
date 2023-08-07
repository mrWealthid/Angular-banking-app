import {LoginComponent} from "./login/login.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import {SignupComponent} from "./signup/signup.component";
import {Routes} from "@angular/router";
import { UpdatePasswordComponent } from "./update-password/update-password.component";

export const routes: Routes = [{
  path: 'login', component: LoginComponent
},
  {path: 'signup', component: SignupComponent},

  {path: 'resetPassword', component: ResetPasswordComponent},

  {path: 'updatePassword/:token', component: UpdatePasswordComponent}

]
