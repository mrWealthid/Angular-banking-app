import { createAction, props } from "@ngrx/store";

import { IProfile } from "../../../shared/interface/userAuth";


export const profileLookup = createAction('[PROFILE] profileLookup');

export const profileLookupSuccess = createAction('[PROFILE] Get profileLookupSuccess', props<{ newUser: IProfile }>());
export const profileLookupFailure = createAction('[PROFILE] Get profileLookupFailure', props<{ error: string }>());
export const profileUpdate = createAction('[PROFILE] profileUpdate', props<any>());

export const profileUpdateSuccess = createAction('[PROFILE] Get profileUpdateSuccess', props<{
  updateUser: IProfile
}>());
export const profileUpdateFailure = createAction('[PROFILE] Get profileUpdateFailure', props<{ error: string }>());

export const profilePasswordUpdate = createAction('[PROFILE] profilePasswordUpdate', props<any>());

export const profilePasswordUpdateSuccess = createAction('[PROFILE] Get profilePasswordUpdateSuccess', props<{
  updateCredentials: any
}>());
export const profilePasswordUpdateFailure = createAction('[PROFILE] Get profilePasswordUpdateFailure', props<{
  error: string
}>());

