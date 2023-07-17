import {Component, inject, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {IDashboardData, IStatsParam, ISummary} from "../dashboard.model";
import {forkJoin, Observable} from "rxjs";
import {PaymentService} from "../../payments/payment.service";
import {globalizeDate} from "../../shared/helpers/helperFunctions";
import {select, Store} from "@ngrx/store";
import {currentUserSelector} from "../../core/store/Profile/selectors";
import {AppStateInterface, IProfile} from "../../shared/interface/userAuth";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  private dashboardService = inject(DashboardService)
  private paymentService = inject(PaymentService)
  private store = inject(Store<AppStateInterface>)

  series: IDashboardData[] = []

  summary: ISummary = {
    totalCredit: 0,
    totalDebit: 0,
    profit: 0
  }
  month = JSON.stringify({type: 'month', time: new Date().getMonth()})
  year = JSON.stringify({type: 'year', time: new Date().getFullYear()})

  protected readonly Date = Date;
  protected readonly Math = Math;
  balance: Observable<any>;
  currentUser$: Observable<IProfile | null>;

  ngOnInit() {
    this.currentUser$ = this.store.pipe(select(currentUserSelector))

    forkJoin([this.dashboardService.getMonthlyStatsData('Credit'), this.dashboardService.getMonthlyStatsData('Debit')]).subscribe(data => {
      this.series = (data.map(x => x[0]))
    })
    this.fetchStatsData()

    this.balance = this.paymentService.getBalance()

  }

  fetchStatsData(val?: IStatsParam) {
    this.dashboardService.getStatsData(val?.type, val?.time).subscribe((x: ISummary) => this.summary = x)
  }

  handleChange(event: any) {
    const {value} = event.target

    const payload = JSON.parse(value)

    this.fetchStatsData({type: payload.type, time: payload.time})

  }

  protected readonly globalizeDate = globalizeDate()
}


