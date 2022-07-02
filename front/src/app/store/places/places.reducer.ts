import { createReducer, on } from '@ngrx/store';
import { PlaceState } from '../types';
import {
  createPlaceFailure,
  createPlaceRequest, createPlaceSuccess,
  fetchOnePhotoOfPlaceFailure,
  fetchOnePhotoOfPlaceRequest, fetchOnePhotoOfPlaceSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess, removePlaceRequest, removePlaceSuccess
} from './places.actions';

const initialState: PlaceState = {
  place: null,
  places: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};
export const placesReducer = createReducer(
  initialState,
  on(fetchPlacesRequest, state => ({...state, fetchLoading: true})),
  on(fetchPlacesSuccess, (state, {places}) => ({...state, fetchLoading: false, places})),
  on(fetchPlacesFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(fetchOnePhotoOfPlaceRequest, state => ({...state, fetchLoading: true})),
  on(fetchOnePhotoOfPlaceSuccess, (state, {place}) => ({...state, fetchLoading: false, place})),
  on(fetchOnePhotoOfPlaceFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createPlaceRequest, state => ({...state, createLoading: true})),
  on(createPlaceSuccess, state => ({...state, createLoading: false})),
  on(createPlaceFailure, (state, {error}) => ({...state, createLoading: false, createError: error,})),

  on(removePlaceRequest, state => ({...state, fetchLoading: true})),
  on(removePlaceSuccess, (state, {places}) => ({...state, fetchLoading: false, places})),
);
