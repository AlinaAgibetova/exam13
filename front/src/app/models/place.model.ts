export class Place {
  constructor(
    public _id: string,
    public user: {
      _id: string,
      displayName: string
    },
    public photo: {
      _id: string,
      user: {
        displayName: string,
        _id: string,
      }
    }[],
    public review: {
      _id: string,
      user: {
        displayName: string,
        _id: string,
      }
    }[],
    public photoContent: string,
    public title: string,
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
    user: {
      displayName: string,
      _id: string,
    }
  }[],
  review: {
    _id: string,
    user: {
      displayName: string,
      _id: string,
    }
  }[],
  photoContent: string,
  title: string,
}
