import { createAction, props } from '@ngrx/store';
import { LoginError, LoginUserData, RegisterError, RegisterUserData, User } from '../../models/user.model';
import { SocialUser } from 'angularx-social-login';

export const registerUserRequest = createAction(
  '[Users] Register Request',
  props<{userData: RegisterUserData}>(),
);

export const registerUserSuccess = createAction(
  '[Users] Register Success',
  props<{user: User}>()
);

export const registerUserFailure = createAction(
  '[Users] Register Failure',
  props<{error: RegisterError | null}>()
);

export const LoginUserRequest = createAction(
  '[Users] Login Request',
  props<{userData: LoginUserData}>()
);
export const LoginUserSuccess = createAction(
  '[Users] Login Success',
  props<{user: User}>()
);
export const LoginUserFailure = createAction(
  '[Users] Login Failure',
  props<{error: null | LoginError}>()
);


export const FacebookSignRequest = createAction(
  '[Users] Login Request',
  props<{socialUser: SocialUser}>()
);
export const FacebookSignSuccess = createAction(
  '[Users] Login Success',
  props<{user: User}>()
);
export const FacebookSignFailure = createAction(
  '[Users] Login Failure',
  props<{error: null | LoginError}>()
);
export const logoutUser = createAction('[Users] Logout');
export const logoutUserRequest = createAction('[Users] Server Logout Request');

