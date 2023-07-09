import {inject, Injectable} from '@angular/core';
import {IPayment} from "./model/payment-model";
import {Observable} from "rxjs";
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
}
