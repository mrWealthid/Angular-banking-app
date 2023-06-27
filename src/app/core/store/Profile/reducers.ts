import {createReducer, on} from "@ngrx/store";
import * as ProfileActions from './actions';
import * as AuthActions from '../Auth/actions';
import {IProfileState} from "../../../shared/interface/userAuth";


export const initialState: IProfileState = {
  isLoading: false,
  currentUser: null,
  error: null,
};
export const ProfileReducer = createReducer(initialState,


  on(ProfileActions.profileLookup, (state, action) => ({
    ...state, isLoading: true, currentUser: null, error: null
  })),
  on(ProfileActions.profileLookupSuccess, (state, action) => ({
    ...state, isLoading: false, currentUser: action.newUser, error: null
  })), on(ProfileActions.profileLookupFailure, (state, action) => ({
    ...state, isLoading: false, currentUser: null, error: action.error
  })),

  on(ProfileActions.profileUpdate, (state, action) => ({
    ...state, isLoading: true, error: null
  })), on(ProfileActions.profileUpdateSuccess, (state, action) => ({
    ...state, isLoading: false, currentUser: action.updateUser, error: null
  })), on(ProfileActions.profileUpdateFailure, (state, action) => ({
    ...state, isLoading: false, error: action.error
  })),

  on(AuthActions.logout, (state, action) => ({
    ...state, isLoading: false, currentUser: null, error: null
  })),
);
