export class Place {
  constructor(
    public _id: string,
    public user: {
      _id: string,
      displayName: string
    },
    public photo: {
      _id: string,
      photo: string
    },
    public rate: {
      _id: string,
    },
    public photoContent: string,
    public title: string,
    public description: string
  ) {}
}

export interface PlaceData {
  [key: string]: any;
  user: string;
  title: string;
  photoContent: File | null;
  description: string;

}

export interface ApiPlaceData {
  _id: string,
  user: {
    _id: string,
    displayName: string
  },
  photo: {
    _id: string,
    photo: string,
  },
  rate: {
    _id: string,
  },
  photoContent: string,
  title: string,
  description: string
}
