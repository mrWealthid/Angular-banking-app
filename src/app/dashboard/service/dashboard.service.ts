import { inject, Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IDashboardData, IDashboardStats, ISummary } from "../dashboard.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private Http = inject(HttpClient)


  getMonthlyStatsData(type: string, year: number = new Date(Date.now()).getFullYear()): Observable<IDashboardData[]> {
    return this.Http.get(`${environment.API_URL}/api/v1/transactions/monthly-stats/${type}/${year}`).pipe(map(({ data }: any) => {
      return ([
        {
          name: type,
          data: this.transformChartData(data.stats)
        }
      ])
    }));
  }
  getMonthlyUserStatsData(type: string, year: number = new Date(Date.now()).getFullYear()): Observable<IDashboardData[]> {
    return this.Http.get(`${environment.API_URL}/api/v1/users/monthly-stats/${type}/${year}`).pipe(map(({ data }: any) => {
      return ([
        {
          name: type[0].toUpperCase() + type.slice(1).toLowerCase(),
          data: this.transformUserChartData(data.stats)
        }
      ])
    }));
  }
  getMonthlyTransactionChannelStatsData(type: string, year: number = new Date(Date.now()).getFullYear()): Observable<IDashboardData[]> {
    return this.Http.get(`${environment.API_URL}/api/v1/transactions/monthlyChannel-stats/${type}/${year}`).pipe(map(({ data }: any) => {
      return ([
        {
          name: type,
          data: this.transformUserChartData(data.stats)
        }
      ])
    }));
  }
  getMonthlyLoanStatsData(type: string, year: number = new Date(Date.now()).getFullYear()): Observable<IDashboardData[]> {
    return this.Http.get(`${environment.API_URL}/api/v1/loans/monthly-stats/${type}/${year}`).pipe(map(({ data }: any) => {
      return ([
        {
          name: type[0] + type.slice(1).toLowerCase(),
          data: this.transformUserChartData(data.stats)
        }
      ])
    }));
  }


  getLoanStats() {
    return this.Http.get(`${environment.API_URL}/api/v1/loans/loan-stats`).pipe(map(({ data }: any) => {
      return {
        approved: data[0]?.APPROVED?.totalCount || 0,
        declined: data[0]?.DECLINED?.totalCount || 0,
        pending: data[0]?.PENDING?.totalCount || 0
      }
    }))

  }
  getUserStats() {
    return this.Http.get(`${environment.API_URL}/api/v1/users/user-stats`).pipe(map(({ data }: any) => {
      return {
        user: data[0]?.user?.totalCount || 0,
        admin: data[0]?.admin?.totalCount || 0,
      }
    }))

  }

  getStatsData(type: string = 'month', time: number = new Date().getMonth()): Observable<ISummary> {
    return this.Http.get(`${environment.API_URL}/api/v1/transactions/stats/${type}/${time}`).pipe(map(({ data }: any) => {

      if (data.stats.length === 0) {
        return {
          totalCredit: 0,
          totalDebit: 0,
          profit: 0,
        }
      }
      const { Credit = { totalAmount: 0 }, Debit = { totalAmount: 0 } } = data.stats[0]
      return (
        {
          totalCredit: Credit.totalAmount,
          totalDebit: Math.abs(Debit.totalAmount),
          profit: Credit.totalAmount - Math.abs(Debit.totalAmount),
        }
      )
    }));
  }



  getMonthlyHighlight() {
    return this.Http.get(`${environment.API_URL}/api/v1/transactions/monthly-highlights`).pipe(map(({ data }: any) => {

      return {
        credit: data[0]?.Credit?.totalAmount || 0,
        debit: Math.abs(data[0]?.Debit?.totalAmount) || 0,

      }
    }))

  }


  getDailyHighlight() {
    return this.Http.get(`${environment.API_URL}/api/v1/transactions/daily-highlights`).pipe(map(({ data }: any) => {
      return {
        credit: data[0]?.Credit?.totalAmount || 0,
        debit: Math.abs(data[0]?.Debit?.totalAmount) || 0,
      }
    }))

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
  transformUserChartData(stats: any[]): IDashboardStats[] {
    let response: IDashboardStats[] = [];
    for (const data of stats) {
      response.push({
        x: data.time.month, y: data.totalCount
      })
    }
    return response
  }
}



