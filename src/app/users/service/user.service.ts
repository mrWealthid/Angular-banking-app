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
    
    if(params.search?.userId){
      delete params.search.userId
   query = createParams(params)
    return this.Http.get<IList>(`${environment.API_URL}/api/v1/users/${userId}/transactions`, {params: query}).pipe(map((data: any) => {
      return {
        status: data.status,
        totalRecords: data.totalRecords,
        data: data.data
      }

    }));

  }


    return this.Http.get<IList>(`${environment.API_URL}/api/v1/users`, {params: query}).pipe(map((data: any) => {
      return {
        status: data.status,
        totalRecords: data.totalRecords,
        data: data.data
      }

    }));
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
