import {createSelector} from "@ngrx/store";
import {AppStateInterface} from "../../../shared/interface/userAuth";


export const selectFeature = (state: AppStateInterface) => state.Auth;
export const isLoadingSelector = createSelector(selectFeature, (state) => state.isLoading);
export const isAuthenticated = createSelector(selectFeature, (state) => state.isAuthenticated);
// export const currentUserSelector = createSelector(selectFeature, (state) => state.currentUser);
export const token = createSelector(selectFeature, (state) => state.token);
export const errorSelector = createSelector(selectFeature, (state) => state.error);
