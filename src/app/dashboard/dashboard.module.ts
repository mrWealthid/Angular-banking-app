import {NgModule} from '@angular/core';
import {TransactionsComponent} from "../transactions/transactions.component";
import {ProfileComponent} from "../profile/profile.component";
import {DashboardComponent} from "./dashboard.component";
import {OverviewComponent} from "./overview/overview.component";
import {PaymentsComponent} from "../payments/payments.component";
import {SharedModule} from "../shared/shared.module";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {routes} from "./dashboard-routes";
import {UsersComponent} from "../users/users.component";
import {LoansComponent} from "../loans/loans.component";


@NgModule({
  declarations: [
    TransactionsComponent,

    ProfileComponent,
    DashboardComponent,
    UsersComponent,
    OverviewComponent,
    PaymentsComponent,
    LoansComponent
  ],
  imports: [
    SharedModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), NgOptimizedImage,
  ]
})
export class DashboardModule {
}
