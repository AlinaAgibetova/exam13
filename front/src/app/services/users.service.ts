import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUserData, RegisterUserData, User } from '../models/user.model';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any;

  constructor(private http: HttpClient) { }

  registerUser(userData: RegisterUserData){
    return this.http.post<User>('http://localhost:8000/users', userData);
  }

  login(userData: LoginUserData){
    return this.http.post<User>('http://localhost:8000/users/sessions', userData)
  }

  logout(){
    return this.http.delete('http://localhost:8000/users/sessions');
  }

  signInFacebook(socialUser: SocialUser){
    console.log(socialUser);
    return this.http.post<User>('http://localhost:8000/users/facebookLogin', socialUser)
  }
}
