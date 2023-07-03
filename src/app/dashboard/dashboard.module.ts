import {NgModule} from '@angular/core';
import {TransactionsComponent} from "../transactions/transactions.component";
import {ProfileComponent} from "../profile/profile.component";
import {DashboardComponent} from "./dashboard.component";
import {OverviewComponent} from "./overview/overview.component";
import {PaymentsComponent} from "../payments/payments.component";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {routes} from "./dashboard-routes";


@NgModule({
  declarations: [
    TransactionsComponent,

    ProfileComponent,
    DashboardComponent,

    OverviewComponent,
    PaymentsComponent,
  ],
  imports: [
    SharedModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes),
  ]
})
export class DashboardModule {
}
