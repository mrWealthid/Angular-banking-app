export interface ILogin {
  email: string,
  password: string
}

export interface IRegister {
  name: string
  email: string
  role?: string
  photo?: string
  dateOfBirth: Date
  password: string
  passwordConfirm: string
}


export interface IProfile extends IUserDetails {
  transactions: ITransactions[]

}


export interface ITransactions {
  depositorName: string
  amount: number
  transactionType: 'debit | credit'
  user?: string,
  depositorAccountNumber: number,
  createdAt: Date
}


export interface AuthState {
  isLoading: boolean
  isAuthenticated: boolean,
  token: IToken | null

  error: String | null
}

export interface IToken {
  key: string,
  exp: string,
  iat: string
}

export interface IProfileState {
  isLoading: boolean
  currentUser: IProfile | null,
  error: string | null
}

export interface AppStateInterface {
  Auth: AuthState;
  Profile: IProfileState
}

type User = Pick<IUser, "token">

export interface IUser {
  status: string,
  token: string,

}

export interface IUserDetails {
  name: string,
  email: string,
  role: string
  photo?: string,
  dateOfBirth: Date,
  accountNumber: number
  imgUrl?: string,
  id?:string
}




