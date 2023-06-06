export interface ILogin {
  email: String,
  password: String
}

export interface IRegister {
  name: String
  email: String
  role?: String
  photo?: String
  password: String
  passwordConfirm: String
}


export interface IProfile extends IUser{
transactions: ITransactions[]

}


export interface ITransactions {
  depositorName: String
  amount:Number
  transactionType: 'debit | credit'
  user?: String,
  depositiorAccountNumber:Number,
  createdAt:Date
}


export interface AuthState {
  isLoading: Boolean
  currentUser: User | null
  error: String | null
}

export interface AppStateInterface {
  Auth: AuthState;
}

type User = Pick<IUser, "token" >

export interface IUser {
  status: String,
  token: String,

}

export interface IUserDetails {
  name: String,
  email: String,
  role: String
  photo?: String
  accountNumber: String
}




