import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FacebookSignFailure,
  FacebookSignRequest, FacebookSignSuccess,
  LoginUserFailure,
  LoginUserRequest,
  LoginUserSuccess,
  logoutUser,
  logoutUserRequest,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';
import { map, mergeMap, tap } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from '../types';

@Injectable()
export class UsersEffects{
  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar,
    private helpers: HelpersService,
    private store: Store<AppState>
  ) {}

  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.userService.registerUser(userData).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Register successful')
        void this.router.navigate(['/'])
      }),
      this.helpers.catchServerError(registerUserFailure)
    ))
  ));

  loginUser = createEffect(() => this.actions.pipe(
    ofType(LoginUserRequest),
    mergeMap(({userData}) => this.userService.login(userData).pipe(
      map(user => LoginUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Login successful')
        void this.router.navigate(['/'])
      }),
      this.helpers.catchServerError(LoginUserFailure)
    ))
  ));

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    mergeMap(() => {
      return this.userService.logout().pipe(
        map(() => logoutUser()),
        tap(() => {
          void this.router.navigate(['/']);
          this.helpers.openSnackbar('Logout successful')
        })
      );
    }))
  )

  facebookSign = createEffect(() => this.actions.pipe(
    ofType(FacebookSignRequest),
    mergeMap(({socialUser}) => this.userService.signInFacebook(socialUser).pipe(
      map(user => FacebookSignSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Sign in Facebook');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(FacebookSignFailure)
    ))
  ));
}
