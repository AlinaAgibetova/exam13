import { LoginError, RegisterError, User } from '../models/user.model';
import { Place } from '../models/place.model';


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

export type AppState = {
  users: UsersState,
  places: PlaceState,
}
