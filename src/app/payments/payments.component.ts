import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  paymentForm: FormGroup;
  accountNumber: FormControl;
  amount: FormControl;
  name: FormControl;

  asyncValue: any;

  constructor(private _http: HttpClient, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit() {
    this.createPaymentForm()
    this.amount.valueChanges.subscribe(x => {
      if (x) {
        console.log(x)
        this.amount.patchValue(this.currencyPipe.transform(this.amount.value.replace(/\D/g, '').replace(/^0+/, ''), 'USD', "symbol", '1.0-0'), {emitEvent: false})
      }
    })
  }

  hasRequiredValidator() {
    return this.amount.hasValidator(Validators.required)
  }

  validateControl() {
    return !this.amount.pristine && /INVALID/i.test(this.amount.status);
  }

  createPaymentForm() {

    this.accountNumber = new FormControl('', [Validators.required], this.validateAccount.bind(this));
    this.amount = new FormControl('', [Validators.required]);
    this.paymentForm = new FormGroup({
      accountNumber: this.accountNumber,
      amount: this.amount
    });
  }


  validateAccount(control: AbstractControl): Promise<any> | Observable<any> {
    if (!(String(control.value).length > 6)) return of(null)
    return this._http.get(`http://localhost:3000/api/v1/users/lookup?accountNumber=${control.value}`).pipe(debounceTime(1000)).pipe(map((val: any) => {
      const {accountNumber} = val.data[0]
      if (Number(control.value) === accountNumber) {
        this.asyncValue = val.data[0]
        return null;
      } else {
        return {'InvalidAccountNumber': true}
      }
    }), catchError(err => {
      this.asyncValue = null
      return of({'InvalidAccountNumber': true})
    }));
  }

}
