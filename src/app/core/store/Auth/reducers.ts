import {createReducer, on} from "@ngrx/store";
import * as AuthActions from './actions';
import {AuthState} from "../../../shared/interface/userAuth";


export const initialState: AuthState = {
  isLoading: false,
  currentUser: null,
  error: null,
};
export const AuthReducer = createReducer(initialState,


  on(AuthActions.register, (state) => ({
    ...state, isLoading: false,
  })),
  on(AuthActions.registerSuccess, (state, action) => ({
    ...state, isLoading: false, currentUser: {...state.currentUser, ...action.newUser}
  })),
  on(AuthActions.registerFailure, (state, action) => ({
    ...state, isLoading: false, error: action.error
  })), on(AuthActions.login, (state) => ({
    ...state, isLoading: false,
  })),
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state, isLoading: false, currentUser: {...state.currentUser, ...action.currentUser}, error: null
  })),
  on(AuthActions.loginFailure, (state, action) => ({
    ...state, isLoading: false, error: action.error, currentUser: null
  })),

  on(AuthActions.logout, (state, action) => ({
    ...state, isLoading: false, error: null, currentUser: null
  })),
);
