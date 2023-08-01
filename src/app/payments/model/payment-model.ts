export interface IPayment {
  initiatorName: string
  amount: number,
  transactionType: string
  user: string,
  initiatorAccountNumber: number,
  beneficiaryAccountNumber: number,
  createdAt?: Date

}


type User = Pick<IPayment, "user" | "createdAt">

export interface IBeneficiary {
  name: string,
  accountNumber: number,
  user:string
}
