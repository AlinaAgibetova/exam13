import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PlacesComponent } from './pages/places/places.component';
import { ModalComponentComponent } from './pages/modal-component/modal-component.component';
import { AddPlacesComponent } from './pages/add-places/add-places.component';

const routes: Routes = [
  {path: '', component: PlacesComponent},
  {path: 'places/:id', component: ModalComponentComponent},
  {path: 'add-places', component: AddPlacesComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
