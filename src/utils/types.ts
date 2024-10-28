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
  projections: Array<any>;
};
