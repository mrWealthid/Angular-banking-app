import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminComponent} from './admin/admin.component';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";

import {StoreModule} from "@ngrx/store";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {effects, localStorageSyncReducer, reducers} from "./core/store";
import {HeadersInterceptor} from "./headers.interceptor";
import {CurrencyPipe} from "@angular/common";
import {routes} from "./app-routes";
import {SharedModule} from "./shared/shared.module";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AdminComponent,
  ],
  imports: [
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
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true}, CurrencyPipe],
  bootstrap: [AppComponent]
})


export class AppModule {
}
