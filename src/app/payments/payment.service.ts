import {inject, Injectable} from '@angular/core';
import {IBeneficiary, IPayment} from "./model/payment-model";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private Http = inject(HttpClient)


  accountLookup(value: any): Observable<any> {
    return this.Http.get(`/api/v1/users/lookup?accountNumber=${value}`)
  }


  initiateTransaction(payload: IPayment): Observable<any> {
    return this.Http.post('/api/v1/transactions', payload)
  }

  fetchBeneficiaries(): Observable<IBeneficiary[]> {
    return this.Http.get('/api/v1/beneficiaries').pipe(map(({data}: any) => {
      return data
    }))
  }

  addBeneficiaries(payload: IBeneficiary): Observable<any> {
    return this.Http.post('/api/v1/beneficiaries', payload)
  }
}
