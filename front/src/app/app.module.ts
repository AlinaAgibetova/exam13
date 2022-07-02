import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { CenterCardComponent } from './pages/ui/center-card/center-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FileInputComponent } from './pages/ui/file-input/file-input.component';
import { ValidateIdenticalDirective } from './validate-identical.directive';
import { AppStoreModule } from './app-store.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HasRolesDirective } from './directives/has-roles.directive';
import { PlacesComponent } from './pages/places/places.component';
import { ModalComponentComponent } from './pages/modal-component/modal-component.component';
import { AddPlacesComponent } from './pages/add-places/add-places.component';

const socialConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [{
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.fbAppId, {
      scope: 'email, public_profile'
    })
  }
  ]
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CenterCardComponent,
    FileInputComponent,
    ValidateIdenticalDirective,
    HasRolesDirective,
    PlacesComponent,
    ModalComponentComponent,
    AddPlacesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppStoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    SocialLoginModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'SocialAuthServiceConfig', useValue: socialConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
