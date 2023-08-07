import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IList} from "../../shared/table/model/table-model";
import {createParams} from "../../shared/helpers/helperFunctions";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Http = inject(HttpClient)

  getListData(params?: any): Observable<IList> {
   
    let query;

const userId = params.search?.userId
    
console.log(params)
    if(params.search?.userId){
      delete params.search.userId
   query = createParams(params)

    return this.Http.get<IList>(`${environment.API_URL}/api/v1/transactions?user=${userId}`, {params: query}).pipe(map((data: any) => {
      return {
        status: data.status,
        totalRecords: data.totalRecords,
        data: data.data
      }

    }));

  }
  if(params.search?.loanId){
    const userId =params.search.loanId
      delete params.search.loanId
   query = createParams(params)
    return this.Http.get<IList>(`${environment.API_URL}/api/v1/loans?user=${userId}`, {params: query}).pipe(map((data: any) => {
      return {
        status: data.status,
        totalRecords: data.totalRecords,
        data: data.data
      }

    }));


    
  }

  query = createParams(params)
    return this.Http.get<IList>(`${environment.API_URL}/api/v1/users`, {params: query}).pipe(map((data: any) => {
      return {
        status: data.status,
        totalRecords: data.totalRecords,
        data: data.data
      }

    }));
  }

 



  getBalance(userId:any) {
    return this.Http.get(`${environment.API_URL}/api/v1/transactions/user/balance?userId=${userId}`).pipe(map(({data}: any) => {
      return data.stats[0]?.total
    }))
  }

  getTransactionByUser(userId:string) {
    return this.Http.get<IList>(`${environment.API_URL}/api/v1/users/${userId}/transactions`).pipe(map((data: any) => {
return data.data
  }))
}
  getUser(userId:string) {
    return this.Http.get<IList>(`${environment.API_URL}/api/v1/users/${userId}`).pipe(map((data: any) => {
return data.data
  }))
}

}
