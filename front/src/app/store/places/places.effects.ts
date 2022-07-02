import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { PlacesService } from '../../services/places.service';
import { HelpersService } from '../../services/helpers.service';
import {
  createPlaceFailure,
  createPlaceRequest, createPlaceSuccess,
  fetchOnePhotoOfPlaceFailure,
  fetchOnePhotoOfPlaceRequest, fetchOnePhotoOfPlaceSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess, removePlaceRequest, removePlaceSuccess
} from './places.actions';

@Injectable()
export class PlacesEffects {
  constructor(
    private actions: Actions,
    private placesService: PlacesService,
    private router: Router,
    private helpers: HelpersService,
  ) {}

  fetchPlaces = createEffect(() => this.actions.pipe(
    ofType(fetchPlacesRequest),
    mergeMap(() => this.placesService.getPlaces().pipe(
      map(places => fetchPlacesSuccess({places})),
      catchError(() => of(fetchPlacesFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  fetchOnePhotoOfPlaces = createEffect(() => this.actions.pipe(
    ofType(fetchOnePhotoOfPlaceRequest),
    mergeMap(({id}) => this.placesService.getPlace(id).pipe(
      map(place => fetchOnePhotoOfPlaceSuccess({place})),
      catchError(() => of(fetchOnePhotoOfPlaceFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createPlace = createEffect(() => this.actions.pipe(
    ofType(createPlaceRequest),
    mergeMap(({placeData}) => this.placesService.createPlace(placeData).pipe(
      map(() => createPlaceSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createPlaceFailure({error: 'Wrong data'})))
    ))
  ));

  removePlace = createEffect(() => this.actions.pipe(
    ofType(removePlaceRequest),
    mergeMap(({id}) => this.placesService.removePlace(id).pipe(
      map(places => removePlaceSuccess({places})),
      tap(() => {
        this.helpers.openSnackbar('Place is delete!');
      })
    ))
  ));
}
