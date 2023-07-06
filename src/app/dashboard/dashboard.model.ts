export interface IDashboardStats {
  x: String
  y: Number

}

export interface IDashboardData {
  name?: string,
  data: IDashboardStats[]


}

export interface IStatsParam {
  type?: string,
  time?: number
}

export interface IMonthlyStatsParam {
  type: string,
  year: string
}

export interface ISummary {
  totalCredit: Number,
  totalDebit: Number

}


