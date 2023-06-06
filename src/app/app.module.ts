import {inject, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';

import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {AuthGuardService} from "./shared/services/auth-guard.service";
import {ButtonComponent} from './shared/button/button.component';
import {ToastrModule} from "ngx-toastr";
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";
import {ModalComponent} from './shared/modal/modal.component';
import {AdminComponent} from './admin/admin.component';
import {ModalsComponent} from './shared/modals/modals.component';
import { TableComponent } from './shared/table/table.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {AuthEffect} from "./core/store/Auth/effects";
import {EffectsModule} from "@ngrx/effects";
import {AuthReducer} from "./core/store/Auth/reducers";
import {select, Store, StoreModule} from "@ngrx/store";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {effects, localStorageSyncReducer, reducers} from "./core/store";
import {HeadersInterceptor} from "./headers.interceptor";
import {AppStateInterface} from "./shared/interface/userAuth";
import {currentUserSelector, token} from "./core/store/Auth/selectors";
import {authGuard} from "./services/auth-guard2.guard";


@NgModule({
    declarations: [
        AppComponent,
        TransactionsComponent,
        HomeComponent,
        ProfileComponent,
        DashboardComponent,
        LoginComponent,
        SignupComponent,
        HeaderComponent,
        ButtonComponent,
        ModalComponent,
        AdminComponent,
        ModalsComponent,
        TableComponent
    ],
    imports: [
      FontAwesomeModule,
        ReactiveFormsModule,
        BrowserModule,
      HttpClientModule,
      StoreModule.forRoot(reducers, {
        metaReducers: [
          localStorageSyncReducer
        ],
      }),
      EffectsModule.forRoot(effects),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: false,
        autoPause: true,
        features: {
          pause: false,
          lock: true,
          persist: true
        }
      }),


        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'dashboard', component: DashboardComponent},
            // {path: 'profile', component: ProfileComponent,canActivate:[()=> {
            //  const store= inject(Store<AppStateInterface>);
            //   return store.pipe(select(currentUserSelector))
            //   }]},
          {path: 'profile', component: ProfileComponent,canActivate:[authGuard]},
            {
                path: 'login', component: LoginComponent
            },
            {path: 'signup', component: SignupComponent},
            {path: 'admin', component: AdminComponent},
        ]),


        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        NgxLoadingModule.forRoot({
            animationType: ngxLoadingAnimationTypes.rotatingPlane,
            backdropBackgroundColour: "rgba(0,0,0,0.1)",
            backdropBorderRadius: "4px",
            primaryColour: "green",
            secondaryColour: "red",
            tertiaryColour: "blue",
        }),

    ],
    providers: [{  provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true}],
    bootstrap: [AppComponent]
})


export class AppModule {
}
