import { NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { usersReducer } from './store/users/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users/users.effects';
import { localStorageSync } from 'ngrx-store-localstorage';
import { placesReducer } from './store/places/places.reducer';
import { PlacesEffects } from './store/places/places.effects';
import { reviewsReducer } from './store/reviews/reviews.reducer';
import { ReviewsEffects } from './store/reviews/reviews.effects';
import { photosReducer } from './store/photos/photos.reducer';
import { PhotosEffects } from './store/photos/photos.effects';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];
const reducers = {
  users: usersReducer,
  places: placesReducer,
  reviews: reviewsReducer,
  photos: photosReducer
}

const effects = [UsersEffects, PlacesEffects, ReviewsEffects, PhotosEffects];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule{}
