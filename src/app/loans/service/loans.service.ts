import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IList} from "../../shared/table/model/table-model";
import {createParams} from "../../shared/helpers/helperFunctions";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoansService {
  private Http = inject(HttpClient)

  getListData(params?: any): Observable<IList> {

    const query = createParams(params)

    return this.Http.get<IList>(`${environment.API_URL}/api/v1/loans`, {params: query}).pipe(map((data: any) => {
      return {
        status: data.status,
        totalRecords: data.totalRecords,
        data: data.data
      }

    }));
  }

getLoan(loanId:number) {
  return this.Http.get(`${environment.API_URL}/api/v1/loans/${loanId}`).pipe(map((data:any)=> {
    return data.data
  }))
}

  processLoan(data: any){
    return this.Http.post(`${environment.API_URL}/api/v1/loans`, data)
  }
}
