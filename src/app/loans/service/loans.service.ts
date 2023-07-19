import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IList} from "../../shared/table/model/table-model";
import {createParams} from "../../shared/helpers/helperFunctions";

@Injectable({
  providedIn: 'root'
})
export class LoansService {
  private Http = inject(HttpClient)

  getListData(params?: any): Observable<IList> {

    const query = createParams(params)

    return this.Http.get<IList>(`/api/v1/loans`, {params: query}).pipe(map((data: any) => {
      return {
        status: data.status,
        totalRecords: data.totalRecords,
        data: data.data
      }

    }));
  }
}
