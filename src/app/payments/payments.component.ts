import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {CurrencyPipe} from "@angular/common";
import {select, Store} from "@ngrx/store";
import {currentUserSelector} from "../core/store/Profile/selectors";
import {AppStateInterface, IProfile} from "../shared/interface/userAuth";
import {PaymentService} from "./payment.service";
import {IPayment} from "./model/payment-model";
import {ITabs} from "../shared/tabs/tabs.component";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  paymentForm: FormGroup;
  loanForm: FormGroup;
  accountNumber: FormControl;
  amount: FormControl;
  name: FormControl;
  tabIndex = new BehaviorSubject(1)
  formTabIndex = new BehaviorSubject(1)
  loanAmount: FormControl;


  tabsForm: ITabs[] = [{
    title: "Make Payment",
    external: false,
    step: 1

  }, {
    title: "Loan Request",
    external: false,
    step: 2,


  }]


  asyncValue: any;
  beneficiaries: Observable<any[]>;
  balance: Observable<any>;
  private userDetails: IProfile;
  private paymentService = inject(PaymentService);
  private currencyPipe = inject(CurrencyPipe)
  private store = inject(Store<AppStateInterface>)

  constructor() {
    this.store.pipe(select(currentUserSelector)).subscribe(userDetails => {
      if (userDetails) this.userDetails = userDetails
    })

  }

  navigateTab(tab: number, type: BehaviorSubject<any>) {
    type.next(tab)
  }


  ngOnInit() {
    this.createPaymentForm()
    this.createLoanForm()
    this.formatControlValue(this.amount)
    this.formatControlValue(this.loanAmount)
    this.beneficiaries = this.paymentService.fetchBeneficiaries()
    this.balance = this.paymentService.getBalance()
  }

  formatControlValue(control: FormControl) {
    control.valueChanges.subscribe(x => {
      if (x) {
        control.patchValue(this.currencyPipe.transform(control.value.replace(/\D/g, '').replace(/^0+/, ''), 'USD', "symbol", '1.0-0'), {emitEvent: false})
      }
    })
  }

  hasRequiredValidator() {
    return this.amount.hasValidator(Validators.required)
  }

  validateControl(control: FormControl, type: string) {
    return !control.pristine && control.errors?.hasOwnProperty(type);
  }


  createPaymentForm() {
    this.accountNumber = new FormControl('', [Validators.required], this.validateAccount.bind(this));
    this.amount = new FormControl('', [Validators.required, this.maxValueValidator]);
    this.paymentForm = new FormGroup({
      accountNumber: this.accountNumber,
      amount: this.amount
    });
  }

  createLoanForm() {
    this.loanAmount = new FormControl('', [Validators.required, this.maxValueValidator]);
    this.loanForm = new FormGroup({
      amount: this.loanAmount
    });
  }


  handlePayment(values: any) {
    const payload: IPayment = {
      user: this.asyncValue.id,
      initiatorName: this.userDetails.name,
      initiatorAccountNumber: this.userDetails.accountNumber,
      beneficiaryAccountNumber: +values.accountNumber,
      amount: this.removeCurrencyFormat(values.amount),
      transactionType: 'Credit',
      // createdAt: new Date('2023-06-20')
      createdAt: new Date(Date.now())
    }
    this.paymentService.initiateTransaction(payload).subscribe()
  }

  removeCurrencyFormat(amount: string) {
    return Number(amount?.replace(/[$,]/g, ''))
  }

  maxValueValidator(control: AbstractControl): ValidationErrors | null {
    const value = Number(control.value?.replace(/[$,]/g, ''))
    if (value && value > 5000) {
      return {maxValue: true};
    }
    return null;
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

  updateSteps($event: number) {

  }

  handleLoanRequest() {

  }
}
