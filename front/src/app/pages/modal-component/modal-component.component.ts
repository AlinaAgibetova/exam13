import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiPlaceData, Place } from '../../models/place.model';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiReviewData, Review, ReviewData } from '../../models/review.model';
import { createReviewRequest, fetchReviewRequest } from '../../store/reviews/reviews.actions';
import { ApiPhotoData, Photo, PhotoData } from '../../models/photo.model';
import { createPhotoRequest, fetchPhotoRequest } from '../../store/photos/photos.actions';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.sass']
})
export class ModalComponentComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  @ViewChild('forma') forma!: NgForm;

  place: Observable<Place | null>;
  reviews: Observable<Review[]>;
  photos: Observable<Photo[]>;

  user: Observable<User | null>;
  loadingPhoto: Observable<boolean>;
  errorPhoto: Observable<null | string>;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  thisPlace!: ApiPlaceData;
  thisPhoto!: ApiPhotoData;
  thisReview!: ApiReviewData;
  thisSub!: Subscription;
  UserSub!: Subscription;
  newUser!: User | null;

  constructor(private dialog: MatDialog,
              private store: Store<AppState>,
              private route: ActivatedRoute) {
    this.place = store.select(state => state.places.place);
    this.user = store.select(state => state.users.user);
    this.loading = store.select(state => state.places.fetchLoading);
    this.error = store.select(state => state.places.fetchError);
    this.photos = store.select(state => state.photos.photos);
    this.loadingPhoto = store.select(state => state.photos.fetchLoadingPhoto);
    this.errorPhoto = store.select(state => state.photos.fetchErrorPhoto);
    this.reviews = store.select(state => state.reviews.reviews);

  }

  ngOnInit(): void {
    this.thisSub = this.place.subscribe(params => {
      this.thisPlace = <ApiPlaceData>params;
    });
    this.UserSub = this.user.subscribe(user => {
      this.newUser = user;
    });
    this.store.dispatch(fetchPhotoRequest({id: this.thisPhoto._id}));
    this.store.dispatch(fetchReviewRequest({id: this.thisReview._id}));

  }

  onSubmit() {
    const review: ReviewData = this.form.value;
    review.place = this.thisPlace._id;

    this.store.dispatch(createReviewRequest({reviewData: review}));
  }

  onSubmitPhoto() {
    const photo: PhotoData = this.forma.value;
    photo.place = this.thisPlace._id;

    this.store.dispatch(createPhotoRequest({photoData: photo}))
  }

  onClose(){
    this.dialog.closeAll();
  }



  ngOnDestroy(): void {
    this.thisSub.unsubscribe();
    this.UserSub.unsubscribe();
  }
}
