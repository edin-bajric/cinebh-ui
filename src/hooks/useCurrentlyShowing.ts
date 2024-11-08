import { useQuery } from "react-query";
import { MovieService } from "../services";
import { Movie, PaginatedResponse } from "../utils/types";

const useCurrentlyShowing = (
  page: number,
  size: number,
  title: string,
  city: string,
  venue: string,
  genre: string,
  projectionTime: string,
  date: string
) => {
  return useQuery<PaginatedResponse<Movie>>(
    [
      "moviesCurrently",
      page,
      size,
      title,
      city,
      venue,
      genre,
      projectionTime,
      date,
    ],
    async () => {
      return await MovieService.getCurrentlyShowing(
        page,
        size,
        title,
        city,
        venue,
        genre,
        projectionTime,
        date
      );
    }
  );
};

export default useCurrentlyShowing;
