import {createReducer, on} from "@ngrx/store";
import * as AuthActions from './actions';
import {IProfileState} from "../../../shared/interface/userAuth";


export const initialState: IProfileState = {
  isLoading: false,
  currentUser: null,
  error: null,
};
export const ProfileReducer = createReducer(initialState,


  on(AuthActions.profileLookupSuccess, (state, action) => ({
    ...state, isLoading: false, currentUser: action.newUser, error: null
  })),

  on(AuthActions.profileUpdateSuccess, (state, action) => ({
    ...state, isLoading: false, currentUser: action.updateUser, error: null
  })),
);
