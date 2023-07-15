import {Pipe} from "@angular/core";

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
  selectOptions?: { [key: string]: any },
  searchType?: any,
  pipe?: Pipe
  custom?: string

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

