import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';

import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonComponent} from './shared/button/button.component';
import {ToastrModule} from "ngx-toastr";
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";
import {ModalComponent} from './shared/modal/modal.component';
import {AdminComponent} from './admin/admin.component';
import {ModalsComponent} from './shared/modals/modals.component';
import {TableComponent} from './shared/table/table.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";

import {StoreModule} from "@ngrx/store";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {effects, localStorageSyncReducer, reducers} from "./core/store";
import {HeadersInterceptor} from "./headers.interceptor";

import {authGuard} from "./services/auth-guard2.guard";
import {ImageUploadComponent} from './image-upload/image-upload.component';
import {StepperComponent} from './shared/stepper/stepper.component';
import {InputsComponent} from './shared/inputs/inputs.component';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {UpdatePasswordComponent} from './auth/update-password/update-password.component';
import {PasswordInputComponent} from './shared/inputs/password-input/password-input.component';
import {EmailInputComponent} from './shared/inputs/email-input/email-input.component';
import {TextInputComponent} from './shared/inputs/text-input/text-input.component';
import {SelectInputComponent} from './shared/inputs/select-input/select-input.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {OverviewComponent} from './dashboard/overview/overview.component';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {DropdownComponent} from './shared/dropdown/dropdown.component';
import {ClickOutsideDirective} from "./shared/directives/ClickOutside";


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
    TableComponent,
    ImageUploadComponent,
    StepperComponent,
    InputsComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    PasswordInputComponent,
    EmailInputComponent,
    TextInputComponent,
    SelectInputComponent,
    OverviewComponent,
    DropdownComponent, ClickOutsideDirective
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
      {
        path: 'dashboard', component: DashboardComponent,

        children: [

          {path: '', component: OverviewComponent, pathMatch: 'full'}, {
            path: 'profile',
            component: ProfileComponent,
            pathMatch: 'full'
          }, {
            path: 'transactions',
            component: TransactionsComponent
          }]
      },
      // {path: 'profile', component: ProfileComponent,canActivate:[()=> {
      //  const store= inject(Store<AppStateInterface>);
      //   return store.pipe(select(currentUserSelector))
      //   }]},
      {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
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
    NgxDatatableModule,
    FormsModule,
    NgSelectModule,
    BsDropdownModule.forRoot()

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true}],
  bootstrap: [AppComponent]
})


export class AppModule {
}
