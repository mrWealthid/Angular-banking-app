export interface IPayment {
  initiatorName: String
  amount: number,
  transactionType: String
  user: String,
  initiatorAccountNumber: number,
  beneficiaryAccountNumber: number,
  createdAt?: Date

}


type User = Pick<IPayment, "user" | "createdAt">

export interface IBeneficiary extends User {
  name: string,
  accountNumber: number
}
