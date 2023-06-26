import {Injectable} from '@angular/core';
import {IPayment} from "./model/payment-model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private Http: HttpClient) {

  }


  accountLookup(value: any): Observable<any> {
    return this.Http.get(`http://localhost:3000/api/v1/users/lookup?accountNumber=${value}`)
  }


  initiateTransaction(payload: IPayment): Observable<any> {
    return this.Http.post('http://localhost:3000/api/v1/transactions', payload)
  }
}
