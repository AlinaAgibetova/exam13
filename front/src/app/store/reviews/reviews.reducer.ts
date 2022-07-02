import { createReducer, on } from '@ngrx/store';
import { ReviewState } from '../types';
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

const initialState: ReviewState = {
  review: null,
  reviews: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};
export const reviewsReducer = createReducer(
  initialState,
  on(fetchReviewRequest, state => ({...state, fetchLoading: true})),
  on(fetchReviewSuccess, (state, {reviews}) => ({...state, fetchLoading: false, reviews})),
  on(fetchReviewFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createReviewRequest, state => ({...state, createLoading: true})),
  on(createReviewSuccess, state => ({...state, createLoading: false})),
  on(createReviewFailure, (state, {error}) => ({...state, createLoading: false, createError: error,})),

  on(removeReviewRequest, state => ({...state, fetchLoading: true})),
  on(removeReviewSuccess, (state, {reviews}) => ({...state, fetchLoading: false, reviews})),
);
