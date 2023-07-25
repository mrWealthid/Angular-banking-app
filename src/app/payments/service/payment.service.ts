import {inject, Injectable} from '@angular/core';
import {IBeneficiary, IPayment} from "../model/payment-model";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private Http = inject(HttpClient)


  accountLookup(value: any): Observable<any> {
    return this.Http.get(`${environment.API_URL}/api/v1/users/lookup?accountNumber=${value}`)
  }

  createPaymentSession(beneficiaryId: string, amount:number):Observable<any> {
    return this.Http.get(`${environment.API_URL}/api/v1/bookings/checkout-session/${beneficiaryId}/${amount}`)

  }

  initiateTransaction(payload: IPayment): Observable<any> {
    return this.Http.post(`${environment.API_URL}/api/v1/transactions`, payload)
  }

  requestLoan(payload: any): Observable<any> {
    return this.Http.post(`${environment.API_URL}/api/v1/loans`, payload)
  }

  fetchBeneficiaries(): Observable<IBeneficiary[]> {
    return this.Http.get(`${environment.API_URL}/api/v1/beneficiaries`).pipe(map(({data}: any) => {
      return data
    }))
  }

  addBeneficiaries(payload: IBeneficiary): Observable<any> {
    return this.Http.post(`${environment.API_URL}/api/v1/beneficiaries`, payload)
  }

  getBalance() {
    return this.Http.get(`${environment.API_URL}/api/v1/transactions/user/balance`).pipe(map(({data}: any) => {
      return data.stats[0]?.total
    }))
  }
}
