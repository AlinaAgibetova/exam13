import { Component } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { User } from './models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from './store/types';
import { logoutUserRequest } from './store/users/users.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  user: Observable<User | null>;
  newUser!: User | null;

  constructor(private breakpointObserver: BreakpointObserver,
              private store: Store<AppState>) {
    this.user = store.select(state => state.users.user)
  }

  logout(){
    this.store.dispatch(logoutUserRequest());
  }

  ngOnInit(): void {}

}
