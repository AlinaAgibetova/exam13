import { createAction, props } from '@ngrx/store';
import { Review, ReviewData } from '../../models/review.model';

export const fetchReviewRequest = createAction('[Review] Fetch Request', props<{id: string}>());
export const fetchReviewSuccess = createAction('[Review] Fetch Success', props<{reviews: Review[]}>());
export const fetchReviewFailure = createAction('[Review] Fetch Failure', props<{error: string}>());

export const createReviewRequest = createAction('[Review] Create Request', props<{reviewData: ReviewData}>());
export const createReviewSuccess = createAction('[Review] Create Success');
export const createReviewFailure = createAction('[Review] Create Failure', props<{error: string}>());

export const removeReviewRequest = createAction('[Review] Remove Request', props<{id: string}>());
export const removeReviewSuccess = createAction('[Review] Remove Success', props<{reviews: Review[]}>());
