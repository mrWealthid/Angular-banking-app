import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IList} from "../shared/table/model/table-interface";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private Http: HttpClient) {

  }


  createParams(params: any) {
    let queryParams = new HttpParams();
    let newObj = {
      ...params.search,
      limit: params.limit,
      page: params.pageNumber + 1,
      sort: '-createdAt'
    }
    console.log(newObj)
    return queryParams.appendAll(newObj)
    // queryParams = queryParams.append('limit', params.size);
    // queryParams = queryParams.append('page', params.pageNumber + 1);


  }

  getListData(params?: any): Observable<IList> {

    const query = this.createParams(params)
    let queryParams = new HttpParams();
    console.log(params)

    // queryParams = queryParams.appendAll({'limit': params.size, 'page': params.pageNumber + 1});
    // queryParams = queryParams.append('page', params.pageNumber + 1);
    console.log(queryParams)
    return this.Http.get<IList>(`/api/v1/transactions`, {params: query}).pipe(map((data: any) => {
      return {
        status: data.status,
        totalRecords: data.totalRecords,
        data: data.data
      }

    }));
  }


}
