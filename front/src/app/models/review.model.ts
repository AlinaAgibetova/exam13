export class Review {
  constructor(
    public _id: string,
    public user: {
      _id: string,
      displayName: string
    },
    public place: {
      _id: string,
      title: string,
    },
    public content: string,
    public qualityOfService: number,
    public qualityOfFood: number,
    public interior: number
  ) {}
}

export interface ReviewData {
  place: string;
  content: string;
  qualityOfService: number;
  qualityOfFood: number,
  interior: number
}

export interface ApiReviewData {
  _id: string,
  user: {
    _id: string,
    displayName: string
  },
  place: {
    _id: string,
    title: string,
  },
  content: string,
  qualityOfService: number,
  qualityOfFood: number,
  interior: number
}
