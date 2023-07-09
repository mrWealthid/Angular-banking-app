import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {IDashboardData, IStatsParam, ISummary} from "../dashboard.model";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  // chartOptions = {
  //   series: [
  //     {
  //       name: "My-series",
  //       data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  //     }
  //   ],
  //   chart: {
  //     height: 350,
  //     type: "bar"
  //   },
  //   title: {
  //     text: "My First Angular Chart"
  //   },
  //   xaxis: {
  //     categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
  //   }
  // };
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

  constructor(private dashboardService: DashboardService) {


  }

  ngOnInit() {

    forkJoin([this.dashboardService.getMonthlyStatsData('Credit'), this.dashboardService.getMonthlyStatsData('Debit')]).subscribe(data => {
      this.series = (data.map(x => x[0]))
    })

    this.fetchStatsData()

  }

  fetchStatsData(val?: IStatsParam) {
    this.dashboardService.getStatsData(val?.type, val?.time).subscribe(x => this.summary = x)
  }

  handleChange(event: any) {
    const {value} = event.target

    const payload = JSON.parse(value)

    this.fetchStatsData({type: payload.type, time: payload.time})

  }
}


