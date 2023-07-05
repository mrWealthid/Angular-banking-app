import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IDashboardData, IDashboardStats} from "./dashboard.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private Http: HttpClient) {


  }


  getStatsData(type: string, year: number = new Date(Date.now()).getFullYear()): Observable<IDashboardData[]> {
    return this.Http.get(`api/v1/transactions/monthly-plan/${type}/${year}`).pipe(map(({data}: any) => {
      return ([
        {
          name: type,
          data: this.transformChartData(data.stats)
        }
      ])
    }));
  }

  transformChartData(stats: any[]): IDashboardStats[] {
    let response: IDashboardStats[] = [];
    for (const data of stats) {
      response.push({
        x: data.time.month, y: data.totalAmount
      })
    }
    return response
  }
}



