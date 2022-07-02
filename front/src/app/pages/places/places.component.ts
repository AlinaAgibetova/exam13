import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../../models/place.model';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PlacesService } from '../../services/places.service';
import { fetchOnePhotoOfPlaceRequest, fetchPlacesRequest } from '../../store/places/places.actions';
import { ModalComponentComponent } from '../modal-component/modal-component.component';
import { Review } from '../../models/review.model';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.sass']
})
export class PlacesComponent implements OnInit {
  places: Observable<Place[]>;
  place: Observable<Place | null>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  modalOpen = false;
  user: Observable<User | null>;
  newUser!: User | null;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private placesService: PlacesService,
              private dialog: MatDialog) {
    this.places = store.select(state => state.places.places);
    this.place = store.select(state => state.places.place);
    this.loading = store.select(state => state.places.fetchLoading);
    this.error = store.select(state => state.places.fetchError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPlacesRequest());

  }

  openDialog(id: string) {
    this.store.dispatch(fetchOnePhotoOfPlaceRequest({id}));
    this.dialog.open(ModalComponentComponent);
  }

}
