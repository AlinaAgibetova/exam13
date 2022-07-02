import { LoginError, RegisterError, User } from '../models/user.model';
import { Place } from '../models/place.model';
import { Review } from '../models/review.model';
import { Photo } from '../models/photo.model';


export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError
}

export type PlaceState = {
  place: null | Place,
  places: Place[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
}

export type ReviewState = {
  review: null | Review,
  reviews: Review[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
}
export type PhotoState = {
  photo: null | Photo,
  photos: Photo[],
  fetchLoadingPhoto: boolean,
  fetchErrorPhoto: null | string,
  createLoadingPhoto: boolean,
  createErrorPhoto: null | string,
}


export type AppState = {
  users: UsersState,
  places: PlaceState,
  reviews: ReviewState,
  photos: PhotoState
}
