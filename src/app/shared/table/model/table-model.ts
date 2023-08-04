import {Pipe} from "@angular/core";
import { selectOptions } from "../../inputs/select-input/select-input.component";

export interface IList {
  status: string,
  totalRecords: number,
  data: Object[]

}

export class Page {
  // The number of elements in the page
  limit: number = 0;
  // The total number of elements
  totalElements: number = 0;
  // The total number of pages
  totalPages: number = 0;
  // The current page number
  pageNumber: number = 0;
  search: Record<any, {}>;
}


export type columnProps = {
  name: string,
  prop: string,
  selectOptions?: any,
  searchType?: any,
  pipe?: any
  custom?: boolean

}
// & (selectProps | otherProps)
//
//
// type selectProps = {
//   searchType: 'select',
//   selectOptions: { [key: string]: any }
// }
// type otherProps = {
//   searchType: 'Date',
// }


export type ITableConfig = {
  actionable?: boolean,
  checkable?: boolean,
  showSummary?: boolean
  downloadable?: boolean,
  singleAction?: boolean,
  searchParams?:Record<string, any>
  statusData? : any[]
  defaultQuery?: Record<string, any>
  limit?:any

} & (SummaryName | SummaryProps)

type SummaryName = {
  showSummary: true,
  tableName: string
}
type SummaryProps = {
  showSummary: false,
}
