import {createReducer, on} from "@ngrx/store";
import * as AuthActions from './actions';
import {AuthState} from "../../../shared/interface/userAuth";


export const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  token: null,
  error: null,
};
export const AuthReducer = createReducer(initialState,


  on(AuthActions.register, (state) => ({
    ...state, isLoading: false,
  })),
  on(AuthActions.registerSuccess, (state, action) => ({
    ...state, isLoading: false,  token:action.newUser.token
  })),
  on(AuthActions.registerFailure, (state, action) => ({
    ...state, isLoading: false, error: action.error
  })), on(AuthActions.login, (state) => ({
    ...state, isLoading: false, isAuthenticated: false, token:null
  })),
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state, isLoading: false, isAuthenticated:false,  token:action.currentUser.token, error: null
  })),
  on(AuthActions.loginFailure, (state, action) => ({
    ...state, isLoading: false, error: action.error,  token:null
  })),

  on(AuthActions.logout, (state, action) => ({
    ...state, isLoading: false, error: null, token: null, isAuthenticated: false
  })),


  ///I'm setting the user to be authenticated only when the profile is successfully loaded
  on(AuthActions.profileLookupSuccess, (state, action) => ({
    ...state, isLoading: false, isAuthenticated:true, error: null
  })),

);
