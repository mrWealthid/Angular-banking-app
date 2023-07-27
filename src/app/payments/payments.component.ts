import {Component, inject, OnInit, signal, Signal} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {CurrencyPipe} from "@angular/common";
import {select, Store} from "@ngrx/store";
import {currentUserSelector} from "../core/store/Profile/selectors";
import {AppStateInterface, IProfile} from "../shared/interface/userAuth";
import {PaymentService} from "./service/payment.service";
import {IPayment} from "./model/payment-model";
import {ITabs} from "../shared/tabs/tabs.component";
import {selectOptions} from "../shared/inputs/select-input/select-input.component";
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  
  // FORM GROUPS
  
  paymentForm: FormGroup;
  loanForm: FormGroup;
  walletFund:FormGroup


// FORM CONTROLS
  accountNumber: FormControl;
  amount: FormControl;
  name: FormControl;
  duration: FormControl;
  fundAmount:FormControl;
  fundChannel:FormControl
  tabIndex = new BehaviorSubject(1)
  formTabIndex = new BehaviorSubject(1)
  loanAmount: FormControl;

  transferSteps= signal(0)

  options: selectOptions[] = [
    {id: 6, name: '6 Months'},
    {id: 12, name: 'One Year'},
  ];

  //TABS CONFIG
  tabsForm: ITabs[] = [{
    title: "Make Payment",
    external: false,
    step: 1,icon:"../../../assets/images/transfer.svg"

  }, {
    title: "Loan Request",
    external: false,
    step: 2,
    icon:"../../../assets/images/transfer.svg"
  }, {
    title: "Fund Wallet",
    external: false,
    step: 3,
    icon:"../../../assets/images/fund.svg"
  }]

  BeneficiaryTabs: ITabs[] = [{
    title: "Beneficiaries",
    external: false,
    step: 1,
    icon:"../../../assets/images/beneficiaries.svg"

  }, 
  // {
  //   title: "Timelines",
  //   external: false,
  //   step: 2,
  // }
]


// PROPERTIES
  asyncValue: any;
  beneficiaries: Observable<any[]>;
  balance= signal<number>(0)
  private userDetails: IProfile;
  transferDetails:any
  loanDetails:any
  fundDetails: any
  paymentLoader:boolean = false
  loanLoader:boolean = false
  fundLoader=false

  selectOptions: selectOptions[] = [
    {id: "Card", name: 'Card'},
  ];
  //INJECTED SERVICES
  private paymentService = inject(PaymentService);
  private currencyPipe = inject(CurrencyPipe)
  private store = inject(Store<AppStateInterface>)
  private notify = inject(NotificationService)

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
    this.createWalletFundForm()
    // this.duration.valueChanges.subscribe(x => console.log(x))

    this.formatControlValue(this.amount)
    this.formatControlValue(this.loanAmount)
    this.formatControlValue(this.fundAmount)
    this.beneficiaries = this.paymentService.fetchBeneficiaries()
    this.fetchBalance()
  }


  fetchBalance() {
    this.paymentService.getBalance().subscribe(x=> 
      this.balance.set(x))
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
    return !control.pristine && control.errors?.hasOwnProperty(type) 
  }

  createWalletFundForm() {
    this.fundAmount = new FormControl('', [Validators.required]);
    this.fundChannel = new FormControl('Card', [Validators.required]);
    this.walletFund = new FormGroup({
      amount: this.fundAmount,
      channel:this.fundChannel
    });
  }


  createPaymentForm() {
    this.accountNumber = new FormControl('', [Validators.required], this.validateAccount.bind(this));
    this.amount = new FormControl('', [Validators.required, this.maxValueValidator.bind(this)]);
    this.paymentForm = new FormGroup({
      accountNumber: this.accountNumber,
      amount: this.amount
    });
  }

  createLoanForm() {
    this.loanAmount = new FormControl('', [Validators.required, this.maxLoanValueValidator.bind(this)]);
    this.duration = new FormControl('', [Validators.required]);
    this.loanForm = new FormGroup({
      amount: this.loanAmount,
      duration: this.duration
    });
  }


  handlePayment() {

    const values =this.paymentForm.value
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

    this.paymentLoader = true


//First Create a payment Session

this.paymentService.createPaymentSession(payload.user, payload.amount).subscribe((x: any) => window.open(x.session.url, 'blank'))

  
    // this.paymentService.initiateTransaction(payload).subscribe((x:any)=> {
    //   this.paymentLoader = false
    //  this.notify.showSuccess('Transfer Successful','Payment Notification' )
    //  this.fetchBalance()
    //  this.updateSignal(0)
    //  this.paymentForm.reset({accountNumber: '', amount : '' })
    // }, err=> {
    //   this.paymentLoader = false   
    //   this.notify.showError('Transfer Failed, Please Try Again','Payment Notification' )
    // })
  }

  updateSignal(val:number) {
  if(val === 1) {
    const values =this.paymentForm.value
   this.transferDetails ={
    initiatorName: this.userDetails.name,
    amount:this.removeCurrencyFormat(values.amount),
    beneficiaryName:this.asyncValue.name,
    beneficiaryAccount: values.accountNumber
  }
}

if(val === 2) {
  const values = this.loanForm.value
  this.loanDetails = {
    amount: this.removeCurrencyFormat(values.amount),
    duration: values.duration
  }
}

if(val === 3) {
  const values = this.walletFund.value
  this.fundDetails = {
    amount: this.removeCurrencyFormat(values.amount),
    name:this.userDetails.name,
    accountNumber: this.userDetails.accountNumber,
    user: this.userDetails.id
  } 
}
    this.transferSteps.set(val)
  }

  myValue:number = 5000
  removeCurrencyFormat(amount: string) {
    return Number(amount?.replace(/[$,]/g, ''))
  }

  maxValueValidator(control: AbstractControl): ValidationErrors | null {

    const value = Number(control.value?.replace(/[$,]/g, ''))

    if(!value) return null;
    if (value && value <= this.balance()) {
      return  null
    }
    return {maxValue: true};
  }



  maxLoanValueValidator(control: AbstractControl): ValidationErrors | null {

//Conditions for loan approval
//1) You must not have an existing unpaid loan --- The loan feature should be unavailable --pending
//2) if you don't have an existing loan, You can only request for loans one third of your balance

    const value = Number(control.value?.replace(/[$,]/g, ''))
if(!value) return null;
    if (value && value <= this.balance()* 2) {
      return  null
    }
    return {maxLoanValue: true};
  }
  
  //Validating balance asynchronously
  // validateBalance(control: AbstractControl): Promise<any> | Observable<any> {
  //   return this.paymentService.getBalance().pipe(map((val: any) => {
  //     let error:any
  //     const balance = val
  //     let value = this.removeCurrencyFormat(control.value)
  //     if (value > balance) {
  //       error = {'maxValue': true}
  //     } else if (val <= balance) {
  //       error = null;
  //     }
  //  return error
  //   }), catchError(err => {
  //     return of({'InvalidAccountNumber': true})
  //   }));
  // }

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
    // const values =this.loanForm.value
    // this.loanDetails = {
    //   amount: this.removeCurrencyFormat(values.amount),
    //   duration: values.duration,
    //   name:this.userDetails.name,
    //   accountNumber: this.userDetails.accountNumber,
    //   user: this.userDetails.id
    // } 
this.loanLoader = true

this.paymentService.requestLoan(this.loanDetails).subscribe((x:any)=> {
  this.loanLoader= false
 this.notify.showSuccess('Request Sent Successful','Loan Notification')
 this.loanForm.reset({duration: '', amount : '' })
 this.updateSignal(0)
}, err=> {
  this.loanLoader = false   
  this.notify.showError('Request Failed, Please Try Again','Loan Notification' )
})
    // console.log(values)
  }

  handleFundRequest() {
  
// this.fundLoader = true


// this.paymentService.requestWalletFunding(this.fundDetails).subscribe((x:any)=> {
//   this.loanLoader= false
// //  this.notify.showSuccess('Request Sent Successful','Loan Notification')
//  this.loanForm.reset({duration: '', amount : '' })
//  this.updateSignal(0)
// }, err=> {
//   this.loanLoader = false   
//   this.notify.showError('Request Failed, Please Try Again','Loan Notification' )
// })

this.paymentService.createFundingSession(this.fundDetails.amount).subscribe((x: any) => window.open(x.session.url, 'blank'))

    // console.log(this.fundDetails)
  }

  handleChange($event: any) {
    console.log($event)
  }
}
