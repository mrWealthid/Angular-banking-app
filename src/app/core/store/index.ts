import {localStorageSync} from "ngrx-store-localstorage";
import {AuthReducer} from "./Auth/reducers";
import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {AuthState, IProfileState} from "../../shared/interface/userAuth";
import {AuthEffect} from "./Auth/effects";
import {ProfileReducer} from "./Profile/reducers";
import {ProfileEffect} from "./Profile/effects";

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({ keys: ['Auth', 'Profile'], rehydrate: true })(reducer);
}

export interface IAppState {
  Auth:AuthState,
  Profile:IProfileState
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
  Auth: AuthReducer,
  Profile:ProfileReducer

};

export const effects = [
  AuthEffect,
  ProfileEffect
];
