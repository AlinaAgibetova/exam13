import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiPlaceData, Place, PlaceData } from '../models/place.model';
import { ApiPhotoData, Photo, PhotoData } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  constructor(private http: HttpClient) { }

  getPhoto(id: string) {
    return this.http.get<ApiPhotoData[]>(`http://localhost:8000/photos/${id}`).pipe(
      map(result => {
        return result
      })
    );
  }

  createPhoto(photoData: PhotoData) {
    console.log(photoData);
    const formData = new FormData();

    Object.keys(photoData).forEach(key => {
      if (photoData[key] !== null) {
        formData.append(key, photoData[key]);
      }
    });

    return this.http.post('http://localhost:8000/photos', formData);
  }

  removePhoto(id: string) {
    return this.http.delete<ApiPhotoData[]>(`http://localhost:8000/photos/${id}`).pipe(
      map(response => {
        return response
      })
    );
  }
}
