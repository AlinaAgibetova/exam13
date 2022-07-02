import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiPlaceData, Place, PlaceData } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  constructor(private http: HttpClient) { }

  getPlaces() {
    return this.http.get<ApiPlaceData[]>(`http://localhost:8000/places`).pipe(
      map(response => {
        return response.map(placeData => {
          return new Place(
            placeData._id,
            placeData.user,
            placeData.photo,
            placeData.review,
            placeData.photoContent,
            placeData.title,
          );
        });
      })
    );
  }

  getPlace(id: string) {
    return this.http.get<Place>(`http://localhost:8000/places/${id}`).pipe(
      map(result => {
        return result
      })
    );
  }

  createPlace(placeData: PlaceData) {
    const formData = new FormData();

    Object.keys(placeData).forEach(key => {
      if (placeData[key] !== null) {
        formData.append(key, placeData[key]);
      }
    });

    return this.http.post('http://localhost:8000/places', formData);
  }

  removePlace(id: string) {
    return this.http.delete<ApiPlaceData[]>(`http://localhost:8000/places/${id}`).pipe(
      map(response => {
        return response.map(placeData => {
          return new Place(
            placeData._id,
            placeData.user,
            placeData.photo,
            placeData.review,
            placeData.photoContent,
            placeData.title,
          );
        });
      })
    );
  }
}
