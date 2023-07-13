import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, map, Observable, of} from "rxjs";
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
  tabs = new BehaviorSubject(1)

  asyncValue: any;
  beneficiaries: Observable<any[]>;
  private userDetails: IProfile;
  private paymentService = inject(PaymentService);
  private currencyPipe = inject(CurrencyPipe)
  private store = inject(Store<AppStateInterface>)


  constructor() {
    this.store.pipe(select(currentUserSelector)).subscribe(userDetails => {
      if (userDetails) this.userDetails = userDetails
    })

  }

  navigateTab(tab: number) {
    this.tabs.next(tab)
  }

  ngOnInit() {
    this.createPaymentForm()
    this.amount.valueChanges.subscribe(x => {
      if (x) {
        console.log(x)
        this.amount.patchValue(this.currencyPipe.transform(this.amount.value.replace(/\D/g, '').replace(/^0+/, ''), 'USD', "symbol", '1.0-0'), {emitEvent: false})
      }
    })

    this.beneficiaries = this.paymentService.fetchBeneficiaries()
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
      // createdAt: new Date('2023-06-20')
      createdAt: new Date(Date.now())

    }
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

  selectBeneficiary(event: MouseEvent, beneficiary: any) {
    this.updateDom()
    const target = (event.currentTarget) as HTMLElement
    target.children[0].classList.add('text-green-400')
    target.classList.add('border-green-200')
    this.paymentForm.patchValue({accountNumber: beneficiary.accountNumber})
  }


  updateDom() {
    const divs = document.querySelectorAll('.beneficiary-list') as NodeList
    divs.forEach((el) => {
      const element = el as HTMLElement
      element.children[0].classList.remove('text-green-400')
      element.classList.remove('border-green-200')
    })
  }
}
