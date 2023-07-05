import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {CurrencyPipe} from "@angular/common";
import {select, Store} from "@ngrx/store";
import {currentUserSelector} from "../core/store/Profile/selectors";
import {AppStateInterface, IProfile} from "../shared/interface/userAuth";
import {PaymentService} from "./payment.service";
import {IPayment} from "./model/payment-model";

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
  private userDetails: IProfile;

  constructor(private paymentService: PaymentService, private currencyPipe: CurrencyPipe, private store: Store<AppStateInterface>) {
    this.store.pipe(select(currentUserSelector)).subscribe(userDetails => {
      if (userDetails) this.userDetails = userDetails
    })

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


  handleSettlement(values: any) {

    const payload: IPayment = {
      user: this.asyncValue.id,
      initiatorName: this.userDetails.name,
      initiatorAccountNumber: this.userDetails.accountNumber,
      beneficiaryAccountNumber: +values.accountNumber,
      amount: Number(values.amount.replace(/[$,]/g, '')),
      transactionType: 'Credit',
      createdAt: new Date('2023-06-20')
      // createdAt: new Date(Date.now())

    }
    console.log(payload)

    this.paymentService.initiateTransaction(payload).subscribe()
  }


  validateAccount(control: AbstractControl): Promise<any> | Observable<any> {
    if (!(String(control.value).length > 6)) return of({'InvalidAccountNumber': true})
    return this.paymentService.accountLookup(control.value).pipe(map((val: any) => {
      const {accountNumber} = val.data[0]
      if (Number(control.value) === this.userDetails.accountNumber) {
        return {'userAccountNumber': true}
      } else if (Number(control.value) === accountNumber) {
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
