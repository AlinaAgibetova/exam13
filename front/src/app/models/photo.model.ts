export class Photo {
  constructor(
    public _id: string,
    public user: {
      _id: string,
      displayName: string
    },
    public place: {
      _id: string,
      title: string
    },
    public photo: string,
  ) {}
}

export interface PhotoData {
  [key: string]: any;
  place: string;
  photo: File | null;
}

export interface ApiPhotoData {
  _id: string,
  user: {
    _id: string,
    displayName: string
  },
  place: {
    _id: string,
    title: string
  },
  photo: string,
}
