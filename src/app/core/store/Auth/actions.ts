import {createAction, props} from "@ngrx/store";

import {ILogin, IProfile, IRegister, IUser} from "../../../shared/interface/userAuth";


export const login = createAction('[AUTH] Login', props<ILogin>());
export const loginSuccess = createAction('[AUTH] Get LoginSuccess', props<{ currentUser: IUser }>());
export const loginFailure = createAction('[AUTH] Get LoginFailure', props<{ error: string }>());
export const register = createAction('[AUTH] Register', props<IRegister>());

export const registerSuccess = createAction('[AUTH] Get RegisterSuccess', props<{ newUser:IUser }>());
export const registerFailure = createAction('[AUTH] Get RegisterFailure', props<{ error: string }>());


export const profileLookup = createAction('[PROFILE] profileLookup');

export const profileLookupSuccess = createAction('[PROFILE] Get profileLookupSuccess', props<{ newUser:IProfile }>());
export const profileLookupFailure = createAction('[PROFILE] Get profileLookupFailure', props<{ error: string }>());
export const logout = createAction('[AUTH] logout');
