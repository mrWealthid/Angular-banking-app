import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from "../service/dashboard.service";
import { IDashboardData, IStatsParam, ISummary } from "../dashboard.model";
import { forkJoin, map, Observable } from "rxjs";
import { PaymentService } from "../../payments/service/payment.service";
import { getMonthInWords, globalizeDate } from "../../shared/helpers/helperFunctions";
import { select, Store } from "@ngrx/store";
import { currentUserSelector } from "../../core/store/Profile/selectors";
import { AppStateInterface, IProfile } from "../../shared/interface/userAuth";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  private dashboardService = inject(DashboardService)
  private paymentService = inject(PaymentService)
  private store = inject(Store<AppStateInterface>)

  series: Observable<IDashboardData[]>
  userseries: Observable<IDashboardData[]>

  summary: ISummary = {
    totalCredit: 0,
    totalDebit: 0,
    profit: 0
  }
  month = JSON.stringify({ type: 'month', time: new Date().getMonth() })
  year = JSON.stringify({ type: 'year', time: new Date().getFullYear() })

  protected readonly Date = Date;
  protected readonly Math = Math;
  balance: Observable<any>;
  loanStats = signal<any>({})
  dailyStats = signal<any>({})
  monthlyStats = signal<any>({})
  userStats = signal<any>({})
  currentUser$: Observable<IProfile | null>;


  modalSignal = signal(0)

  ngOnInit() {
    this.currentUser$ = this.store.pipe(select(currentUserSelector))


    this.fetchMonthlyTransactionsStats()
    //  this.fetchMonthlyUserStats()

    this.fetchStatsData()

    this.balance = this.paymentService.getBalance()
    this.dashboardService.getLoanStats().subscribe(val => this.loanStats.set(val))
    this.dashboardService.getDailyHighlight().subscribe(val => this.dailyStats.set(val))
    this.dashboardService.getMonthlyHighlight().subscribe(val => this.monthlyStats.set(val))

    this.currentUser$.subscribe((x) => {
      if (x?.role === 'admin') this.dashboardService.getUserStats().subscribe(val => this.userStats.set(val))
    })

  }





  constructor() {
    effect((onCleanup) => {
      const mytimer = setTimeout(() => {
        if (this.summary.totalCredit === 0) this.toggleModal()
      }, 5000)

      onCleanup(() => {
        clearTimeout(mytimer);
      });

    });

  }




  updateSignal(val: number, maxNumber = 3) {

    if (val === maxNumber) { this.modalSignal.set(0) }
    else {
      this.modalSignal.set(val)
    }
  }

  fetchMonthlyUserStats() {
    this.series = forkJoin([this.dashboardService.getMonthlyUserStatsData('user'), this.dashboardService.getMonthlyUserStatsData('admin')]).pipe(map(data => {
      return data.map(x => x[0])
    }))
  }
  fetchMonthlyLoanStats() {
    this.series = forkJoin([this.dashboardService.getMonthlyLoanStatsData('PENDING'), this.dashboardService.getMonthlyLoanStatsData('APPROVED'), this.dashboardService.getMonthlyLoanStatsData('DECLINED')]).pipe(map(data => {
      return data.map(x => x[0])
    }))
  }
  fetchMonthlyTransactionsStats() {
    this.series = forkJoin([this.dashboardService.getMonthlyStatsData('Credit'), this.dashboardService.getMonthlyStatsData('Debit')]).pipe(map(data => {
      return data.map(x => x[0])
    }))
  }

  fetchStatsData(val?: IStatsParam) {
    this.dashboardService.getStatsData(val?.type, val?.time).subscribe((x: ISummary) => this.summary = x)
  }

  handleChange(event: any) {
    const { value } = event.target

    const payload = JSON.parse(value)

    this.fetchStatsData({ type: payload.type, time: payload.time })

  }

  userChartType: any = 'transaction'
  handleChartChange(event: any) {

    this.userChartType = event.target.value
    if (this.userChartType === "user") {
      this.fetchMonthlyUserStats()
    }
    if (this.userChartType === "transaction") {
      this.fetchMonthlyTransactionsStats()
    }
    if (this.userChartType === "loan") {
      this.fetchMonthlyLoanStats()
    }

  }

  protected readonly globalizeDate = globalizeDate()
  protected readonly getMonths = getMonthInWords()


  showModal: boolean = false;
  showMe: boolean = true;



  handleModal($event: any) {
    this.showModal = $event;
  }


  toggleModal(e?: any) {
    this.showModal = !this.showModal;
    this.showMe = true;
  }


  closeModal() {
    this.showModal = !this.showModal;
    this.showMe = false;
  }


}


