import { useQuery } from "react-query";
import { MovieService } from "../services";
import { Movie, PaginatedResponse } from "../utils/types";

const useUpcoming = (
  page: number,
  size: number,
  title: string,
  city: string,
  venue: string,
  genre: string,
  startDate: string,
  endDate: string
) => {
  return useQuery<PaginatedResponse<Movie>>(
    [
      "moviesUpcoming",
      page,
      size,
      title,
      city,
      venue,
      genre,
      startDate,
      endDate,
    ],
    async () => {
      return await MovieService.getUpcoming(
        page,
        size,
        title,
        city,
        venue,
        genre,
        startDate,
        endDate
      );
    }
  );
};

export default useUpcoming;
