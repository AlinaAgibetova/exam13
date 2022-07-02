import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Place } from '../../models/place.model';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { createPlaceRequest } from '../../store/places/places.actions';

@Component({
  selector: 'app-add-places',
  templateUrl: './add-places.component.html',
  styleUrls: ['./add-places.component.sass']
})
export class AddPlacesComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<string | null>;
  places: Observable<Place[]>;
  user: Observable<User | null>;
  newUser!: User | null;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.places.createLoading);
    this.error = store.select(state => state.places.createError);
    this.places = store.select(state => state.places.places);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.user.subscribe(user => {
      this.newUser = user;
    });
  }

  onSubmit() {
    const place = {
      user: <string>this.newUser?._id,
      title: this.form.value.title,
      description: this.form.value.description,
      photoContent: this.form.value.photoContent,
      isAgree: this.form.value.isAgree
    }
    this.store.dispatch(createPlaceRequest({placeData: place}));
  }

}
