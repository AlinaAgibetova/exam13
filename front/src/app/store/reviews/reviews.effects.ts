import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';
import { ReviewsService } from '../../services/reviews.service';
import {
  createReviewFailure,
  createReviewRequest,
  createReviewSuccess,
  fetchReviewFailure,
  fetchReviewRequest,
  fetchReviewSuccess,
  removeReviewRequest,
  removeReviewSuccess
} from './reviews.actions';

@Injectable()
export class ReviewsEffects {
  constructor(
    private actions: Actions,
    private reviewsService: ReviewsService,
    private router: Router,
    private helpers: HelpersService,
  ) {}

  fetchReviews = createEffect(() => this.actions.pipe(
    ofType(fetchReviewRequest),
    mergeMap(({id}) => this.reviewsService.getReview(id).pipe(
      map(review => fetchReviewSuccess({review})),
      catchError(() => of(fetchReviewFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createReview = createEffect(() => this.actions.pipe(
    ofType(createReviewRequest),
    mergeMap(({reviewData}) => this.reviewsService.createReview(reviewData).pipe(
      map(() => createReviewSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createReviewFailure({error: 'Wrong data'})))
    ))
  ));

  removeReview = createEffect(() => this.actions.pipe(
    ofType(removeReviewRequest),
    mergeMap(({id}) => this.reviewsService.removeReview(id).pipe(
      map(reviews => removeReviewSuccess({reviews})),
      tap(() => {
        this.helpers.openSnackbar('Review is delete!');
      })
    ))
  ));
}
