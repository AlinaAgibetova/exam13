import { createReducer, on } from '@ngrx/store';
import { PhotoState } from '../types';
import {
  createPhotoFailure,
  createPhotoRequest,
  createPhotoSuccess,
  fetchPhotoFailure,
  fetchPhotoRequest,
  fetchPhotoSuccess,
  removePhotoRequest,
  removePhotoSuccess
} from './photos.actions';

const initialState: PhotoState = {
  photo: null,
  photos: [],
  fetchLoadingPhoto: false,
  fetchErrorPhoto: null,
  createLoadingPhoto: false,
  createErrorPhoto: null,
};
export const photosReducer = createReducer(
  initialState,
  on(fetchPhotoRequest, state => ({...state, fetchLoadingPhoto: true})),
  on(fetchPhotoSuccess, (state, {photos}) => ({...state, fetchLoadingPhoto: false, photos})),
  on(fetchPhotoFailure, (state, {error}) => ({...state, fetchLoadingPhoto: false, fetchErrorPhoto: error})),

  on(createPhotoRequest, state => ({...state, createLoadingPhoto: true})),
  on(createPhotoSuccess, state => ({...state, createLoadingPhoto: false})),
  on(createPhotoFailure, (state, {error}) => ({...state, createLoadingPhoto: false, createErrorPhoto: error,})),

  on(removePhotoRequest, state => ({...state, fetchLoadingPhoto: true})),
  on(removePhotoSuccess, (state, {photos}) => ({...state, fetchLoadingPhoto: false, photos})),
);
