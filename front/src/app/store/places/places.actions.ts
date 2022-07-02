import { createAction, props } from '@ngrx/store';
import { Place, PlaceData } from '../../models/place.model';

export const fetchPlacesRequest = createAction('[Places] Fetch Request');
export const fetchPlacesSuccess = createAction('[Places] Fetch Success', props<{places: Place[]}>());
export const fetchPlacesFailure = createAction('[Places] Fetch Failure', props<{error: string}>());

export const fetchOnePhotoOfPlaceRequest = createAction('[Places] FetchIng Request', props<{id: string}>());
export const fetchOnePhotoOfPlaceSuccess = createAction('[Places] FetchIng Success', props<{place: Place}>());
export const fetchOnePhotoOfPlaceFailure = createAction('[Places] FetchIng Failure', props<{error: string}>());

export const createPlaceRequest = createAction('[Places] Create Request', props<{placeData: PlaceData}>());
export const createPlaceSuccess = createAction('[Places] Create Success');
export const createPlaceFailure = createAction('[Places] Create Failure', props<{error: string}>());

export const removePlaceRequest = createAction('[Places] Remove Request', props<{id: string}>());
export const removePlaceSuccess = createAction('[Places] Remove Success', props<{places: Place[]}>());
