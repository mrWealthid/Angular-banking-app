import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IList} from "../../shared/table/model/table-model";
import {createParams} from "../../shared/helpers/helperFunctions";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private Http = inject(HttpClient)


  getListData(params?: any): Observable<IList> {

    const query = createParams(params)

    return this.Http.get<IList>(`${environment.API_URL}/api/v1/transactions`, {params: query}).pipe(map((data: any) => {
      return {
        status: data.status,
        totalRecords: data.totalRecords,
        data: data.data
      }

    }));
  }

  getTransaction(transactionId:number) {
    return this.Http.get(`${environment.API_URL}/api/v1/transactions/${transactionId}`).pipe(map((data:any)=> {
      return data.data
    }))
  }
  

}
