import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';
import { ReviewsService } from '../../services/reviews.service';
import { PhotosService } from '../../services/photos.service';
import {
  createPhotoFailure,
  createPhotoRequest,
  createPhotoSuccess,
  fetchPhotoFailure,
  fetchPhotoRequest,
  fetchPhotoSuccess, removePhotoRequest, removePhotoSuccess
} from './photos.actions';

@Injectable()
export class PhotosEffects {
  constructor(
    private actions: Actions,
    private photosService: PhotosService,
    private router: Router,
    private helpers: HelpersService,
  ) {}

  fetchPhotos = createEffect(() => this.actions.pipe(
    ofType(fetchPhotoRequest),
    mergeMap(({id}) => this.photosService.getPhoto(id).pipe(
      map(photos => fetchPhotoSuccess({photos})),
      catchError(() => of(fetchPhotoFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createPhoto = createEffect(() => this.actions.pipe(
    ofType(createPhotoRequest),
    mergeMap(({photoData}) => this.photosService.createPhoto(photoData).pipe(
      map(() => createPhotoSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createPhotoFailure({error: 'Wrong data'})))
    ))
  ));

  removePhoto = createEffect(() => this.actions.pipe(
    ofType(removePhotoRequest),
    mergeMap(({id}) => this.photosService.removePhoto(id).pipe(
      map(photos => removePhotoSuccess({photos})),
      tap(() => {
        this.helpers.openSnackbar('Photos is delete!');
      })
    ))
  ));
}
