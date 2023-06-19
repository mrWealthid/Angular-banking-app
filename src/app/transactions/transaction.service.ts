import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IList} from "../shared/table/model/table-interface";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private Http: HttpClient) {

  }

  getListData(): Observable<IList> {
    return this.Http.get<IList>('http://localhost:3000/api/v1/transactions').pipe(map((data: any) => {
      return {
        status: data.status,
        length: data.length,
        data: data.data
      }

    }));
  }

}
