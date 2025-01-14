export type Movie = {
  id: string;
  title: string;
  rating: string;
  language: string;
  length: string;
  description: string;
  director: string;
  startDate: string;
  endDate: string;
  trailerUrl: string;
  writers: Array<{ id: string; name: string }>;
  genres: Array<{ id: string; name: string }>;
  performers: Array<{ id: string; name: string; role: string }>;
  images: Array<{
    id: string;
    movie: string;
    isCoverImage: boolean;
    url: string;
  }>;
  ratings: Array<{ id: string; name: string; rating: string; movie: string }>;
  projections: Array<{
    id: string;
    projectionTimes: Array<{ id: string; time: string }>;
  }>;
};

export type Venue = {
  id: string;
  name: string;
  phone: string;
  street: string;
  streetNumber: string;
  city: string;
  postcode: string;
  imageURL: string;
  projections: Array<any>;
};

export type PaginatedResponse<T> = {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: any;
  size: number;
  sort: any;
  totalElements: number;
  totalPages: number;
};

export type Genre = {
  id: string;
  name: string;
};

export type ProjectionTime = {
  id: string;
  time: string;
};

export type ProjectionDetails = {
  cities: string[];
  cinemas: string[];
  streets: string[];
  postcodes: string[];
  streetNumbers: string[];
  hallNames: string[];
  hallIds: string[];
  startDate: string;
  endDate: string;
  projectionTimes: string[];
  projectionIds: string[];
};

export type Seat = {
  id: string;
  name: string;
  seatProjections: string[];
}
