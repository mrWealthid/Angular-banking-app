import {createSelector} from "@ngrx/store";
import {AppStateInterface} from "../../../shared/interface/userAuth";


export const selectFeature = (state: AppStateInterface) => state.Profile;
export const currentUserSelector = createSelector(selectFeature, (state) => state.currentUser);
export const isLoading = createSelector(selectFeature, (state) => state.isLoading);
