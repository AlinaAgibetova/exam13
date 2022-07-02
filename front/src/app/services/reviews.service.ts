import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiReviewData, Review, ReviewData } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(private http: HttpClient) { }

  getReview(id: string) {
    return this.http.get<ApiReviewData[]>(`http://localhost:8000/reviews?place=${id}`).pipe(
      map(result => {
        return result
      })
    );
  }

  createReview(reviewData: ReviewData) {
    return this.http.post('http://localhost:8000/reviews', reviewData);
  };




  removeReview(id: string) {
    return this.http.delete<ApiReviewData[]>(`http://localhost:8000/reviews/${id}`).pipe(
      map(response => {
        return response
      })
    );
  }
}
