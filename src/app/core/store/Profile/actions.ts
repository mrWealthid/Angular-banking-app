import {createAction, props} from "@ngrx/store";

import {ILogin, IProfile, IRegister, IUser} from "../../../shared/interface/userAuth";



export const profileLookup = createAction('[PROFILE] profileLookup');

export const profileLookupSuccess = createAction('[PROFILE] Get profileLookupSuccess', props<{ newUser:IProfile }>());
export const profileLookupFailure = createAction('[PROFILE] Get profileLookupFailure', props<{ error: string }>());

