import {Injectable} from '@angular/core';
import {ILogin, IProfile, IRegister, IUser} from "./shared/interface/userAuth";
import {Router} from "@angular/router";

import {NotificationService} from "./shared/services/notification.service";

import {DatabaseService} from "./shared/services/database.service";
import {DatabaseInterface} from "./shared/interface/database-interface";
import {WebStorageService} from "./shared/services/web-storage.service";
import {map, Observable} from "rxjs";
import {HttpClient, HttpContext} from "@angular/common/http";
import {BEARER_TOKEN} from "./headers.interceptor";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoading: boolean = false;
  currentUser: DatabaseInterface | undefined;

  constructor(private router: Router, private notifyService: NotificationService, private db: DatabaseService, private webStorage: WebStorageService, private Http: HttpClient) {

  }

  get isLoggedIn(): boolean {
    const user = this.webStorage.retrieveFromStorage('user');
    return !/null/.test(user);
  }

  // login(credentials: any) {
  //   this.isLoading = true;
  //   this.angularFireAuth
  //     .signInWithEmailAndPassword(credentials.email, credentials.password)
  //     .then(res => {
  //       this.webStorage.setToStorage("user", res.user);
  //       this.notifyService.showSuccess("Login Successful😊", "Auth Service ⚙");
  //       this.isLoading = false;
  //       this.db.getUserTransactions(this.db.data, res.user?.uid);
  //       this.router.navigate(["profile"]);
  //     })
  //     .catch(err => {
  //       this.isLoading = false;
  //       this.notifyService.showError(err.message, "Auth Service ⚙");
  //     });
  // }

  login2(credentials: ILogin): Observable<IUser> {
    return this.Http.post<IUser>('http://localhost:3000/api/v1/users/login', credentials, {
      context: new HttpContext().set(BEARER_TOKEN, false)
    })

  }


  register2(credentials: IRegister): Observable<IUser> {
    return this.Http.post<IUser>('http://localhost:3000/api/v1/users/signup', credentials)
  }


  fetchProfile(): Observable<IProfile> {
    return this.Http.get<any>('http://localhost:3000/api/v1/users/me').pipe(map((result) => {
        console.log(result);
        return {
          ...result.data
        }
      })
    )
  }


  updateUser(payload: any): Observable<any> {
    return this.Http.patch<any>('http://localhost:3000/api/v1/users/updateMe', payload)
  }

  updatePassword(payload: any): Observable<any> {
    return this.Http.patch<any>('http://localhost:3000/api/v1/users/updatePassword', payload)
  }

  // register(credentials: any) {
  //   this.isLoading = true;
  //   this.angularFireAuth
  //     .createUserWithEmailAndPassword(credentials.email, credentials.password,)
  //     .then(res => {
  //       const {uid} = res.user!;
  //       this.webStorage.setToStorage("user", res.user);
  //       this.notifyService.showSuccess("Registration Successful😊", "Auth Service ⚙");
  //       this.isLoading = false;
  //       this.db.createUserCollection(uid, credentials);
  //
  //       this.router.navigate(["profile"]);
  //     })
  //     .catch(error => {
  //       this.isLoading = false;
  //       this.notifyService.showError(error.message, "Auth Service ⚙");
  //       console.log('Something is wrong:', error.message);
  //     });
  // }

  logout() {
    // this.angularFireAuth.signOut().then(() => {
    //   this.webStorage.clearStorage();
    //   this.notifyService.showSuccess("Logout Successful!!!", "Auth Service ⚙");
    //   this.router.navigate(['login']);
    // });
  }
}
