import { UsersState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  FacebookSignFailure,
  FacebookSignRequest, FacebookSignSuccess,
  LoginUserFailure,
  LoginUserRequest,
  LoginUserSuccess,
  logoutUser,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';


const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null
};

export const usersReducer = createReducer(
  initialState,
  on(registerUserRequest, state =>
    ({...state, registerLoading: true, registerError: null})),
  on(registerUserSuccess, (state, {user}) =>
    ({...state, registerLoading: false, user})),
  on(registerUserFailure, (state, {error}) =>
    ({...state, registerLoading: true, registerError: error})),

  on(LoginUserRequest, state => ({...state, loginLoading: true, loginError: null})),
  on(LoginUserSuccess, (state, {user}) => ({...state, loginLoading: true, user})),
  on(LoginUserFailure, (state, {error}) => ({...state, loginLoading: true, loginError: error})),

  on(FacebookSignRequest, state => ({...state, loginLoading: true, loginError: null})),
  on(FacebookSignSuccess, (state, {user}) => ({...state, loginLoading: true, user})),
  on(FacebookSignFailure, (state, {error}) => ({...state, loginLoading: true, loginError: error})),
  on(logoutUser, state => ({...state, user: null}))
);
