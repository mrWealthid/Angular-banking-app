import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {OverviewComponent} from "./dashboard/overview/overview.component";
import {ProfileComponent} from "./profile/profile.component";
import {TransactionsComponent} from "./transactions/transactions.component";
import {PaymentsComponent} from "./payments/payments.component";
import {authGuard} from "./services/auth-guard2.guard";
import {AdminComponent} from "./admin/admin.component";
import {Routes} from "@angular/router";

export const routes: Routes = [
  {path: '', component: HomeComponent},

  {
    path: 'dashboard', component: DashboardComponent,
    children: [

      {path: '', component: OverviewComponent, pathMatch: 'full'}, {
        path: 'profile',
        component: ProfileComponent,
        pathMatch: 'full'
      }, {
        path: 'transactions',
        component: TransactionsComponent
      },
      {
        path: 'payments',
        component: PaymentsComponent
      }
    ]
  },
  // {path: 'profile', component: ProfileComponent,canActivate:[()=> {
  //  const store= inject(Store<AppStateInterface>);
  //   return store.pipe(select(currentUserSelector))
  //   }]},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},

  {path: 'admin', component: AdminComponent},

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  }, {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
]
