import {createReducer, on} from "@ngrx/store";
import * as AuthActions from './actions';
import {AuthState} from "../../../shared/interface/userAuth";
import jwtDecode from 'jwt-decode'


export const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  token: null,
  error: null,
};

export function decodeToken(token: any): any {
  return jwtDecode(token)
}

export const AuthReducer = createReducer(initialState,


  on(AuthActions.register, (state) => ({
    ...state, isLoading: false,
  })),
  on(AuthActions.registerSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    token: {key: action.newUser.token, exp: decodeToken(action.newUser.token), iat: decodeToken(action.newUser.token)}
  })),
  on(AuthActions.registerFailure, (state, action) => ({
    ...state, isLoading: false, error: action.error
  })), on(AuthActions.login, (state) => ({
    ...state, isLoading: false, isAuthenticated: false, token: null
  })),
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    isAuthenticated: false,
    token: {
      key: action.currentUser.token,
      exp: decodeToken(action.currentUser.token).exp,
      iat: decodeToken(action.currentUser.token).iat
    },
    error: null
  })),
  on(AuthActions.loginFailure, (state, action) => ({
    ...state, isLoading: false, error: action.error, token: null
  })),

  on(AuthActions.logout, (state, action) => ({
    ...state, isLoading: false, error: null, token: null, isAuthenticated: false
  })),


  ///I'm setting the user to be authenticated only when the profile is successfully loaded
  on(AuthActions.profileLookupSuccess, (state, action) => ({
    ...state, isLoading: false, isAuthenticated: true, error: null
  })),
);
