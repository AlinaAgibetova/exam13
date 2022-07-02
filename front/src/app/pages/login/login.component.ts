import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { LoginError, LoginUserData } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { FacebookSignRequest, LoginUserRequest } from '../../store/users/users.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | LoginError>;
  authSubscription!: Subscription;
  isFbLogin = false;

  constructor(private store: Store<AppState>,
              private auth: SocialAuthService) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(LoginUserRequest({userData}));

  }

  fbLogin(){
    this.isFbLogin = true;
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID)
  }

  ngOnInit(): void {
    this.authSubscription = this.auth.authState.subscribe((socialUser: SocialUser) => {
      if (this.isFbLogin){
        this.store.dispatch(FacebookSignRequest({socialUser: socialUser}))
      }
    })
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
