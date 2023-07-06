import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IDashboardData, IDashboardStats, ISummary} from "./dashboard.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private Http: HttpClient) {


  }


  getMonthlyStatsData(type: string, year: number = new Date(Date.now()).getFullYear()): Observable<IDashboardData[]> {
    return this.Http.get(`api/v1/transactions/monthly-stats/${type}/${year}`).pipe(map(({data}: any) => {
      return ([
        {
          name: type,
          data: this.transformChartData(data.stats)
        }
      ])
    }));
  }

  getStatsData(type: string = 'month', time: number = new Date().getMonth()): Observable<ISummary> {
    return this.Http.get(`api/v1/transactions/stats/${type}/${time}`).pipe(map(({data}: any) => {
      const {Credit, Debit} = data.stats[0]
      return (
        {
          totalCredit: Credit ? Credit.totalAmount : 0,
          totalDebit: Debit ? Math.abs(Debit.totalAmount) : 0,
        }
      )
    }));
  }

  transformChartData(stats: any[]): IDashboardStats[] {
    let response: IDashboardStats[] = [];
    for (const data of stats) {
      response.push({
        x: data.time.month, y: Math.abs(data.totalAmount)
      })
    }
    return response
  }
}



