import { createAction, props } from '@ngrx/store';
import { Photo, PhotoData } from '../../models/photo.model';

export const fetchPhotoRequest = createAction('[Photo] Fetch Request', props<{id: string}>());
export const fetchPhotoSuccess = createAction('[Photo] Fetch Success', props<{photo: Photo}>());
export const fetchPhotoFailure = createAction('[Photo] Fetch Failure', props<{error: string}>());

export const createPhotoRequest = createAction('[Photo] Create Request', props<{photoData: PhotoData}>());
export const createPhotoSuccess = createAction('[Photo] Create Success');
export const createPhotoFailure = createAction('[Photo] Create Failure', props<{error: string}>());

export const removePhotoRequest = createAction('[Photo] Remove Request', props<{id: string}>());
export const removePhotoSuccess = createAction('[Photo] Remove Success', props<{photos: Photo[]}>());
