import {HomeComponent} from "./home/home.component";
import {AdminComponent} from "./admin/admin.component";
import {Routes} from "@angular/router";

export const routes: Routes = [
  {path: '', component: HomeComponent},


  {path: 'admin', component: AdminComponent},

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  }, {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
]
