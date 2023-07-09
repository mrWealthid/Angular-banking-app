import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {IProfile} from "../shared/interface/userAuth";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  step = new BehaviorSubject(0)
  private Http = inject(HttpClient)


  updateSteps(val: number): void {
    return this.step.next(val)
  }


  fetchProfile(): Observable<IProfile> {
    return this.Http.get<any>('/api/v1/users/me').pipe(map((result) => {
        return {
          ...result.data
        }
      })
    )
  }


  updateUser(payload: FormData): Observable<IProfile> {
    return this.Http.patch<any>('/api/v1/users/updateMe', payload).pipe(map((result) => {
        return {
          ...result.data.user
        }
      })
    )
  }

  updatePassword(payload: Partial<IProfile>): Observable<IProfile> {
    return this.Http.patch<any>('/api/v1/users/updatePassword', payload)
  }


}
