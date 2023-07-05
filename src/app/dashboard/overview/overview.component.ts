import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {IDashboardData} from "../dashboard.model";
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
  series: IDashboardData[]

  constructor(private dashboardService: DashboardService) {

    forkJoin([this.dashboardService.getStatsData('Credit'), this.dashboardService.getStatsData('Debit')]).subscribe(data => {
      this.series = (data.map(x => x[0]))
    })
  }

  ngOnInit() {

  }

}
