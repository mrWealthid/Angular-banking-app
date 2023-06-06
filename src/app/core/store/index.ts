import {localStorageSync} from "ngrx-store-localstorage";
import {AuthReducer} from "./Auth/reducers";
import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {AuthState} from "../../shared/interface/userAuth";
import {AuthEffect} from "./Auth/effects";

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({ keys: ['Auth'], rehydrate: true })(reducer);
}

export interface IAppState {
  Auth:AuthState
}

export const metaReducers: Array<MetaReducer<any, any>> = [];

// Check if we are rendering on server
// In that case, we dont want to use localStorage sync
if (typeof window !== 'undefined') {
  metaReducers.push(localStorageSyncReducer);
}



// Define the global store shape by combining our application's
// reducers together into a given structure.
export const reducers: ActionReducerMap<IAppState> = {
  Auth: AuthReducer

};

export const effects = [
  AuthEffect
];
