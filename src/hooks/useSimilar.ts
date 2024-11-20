import { useQuery } from "react-query";
import { MovieService } from "../services";
import { Movie, PaginatedResponse } from "../utils/types";

const useSimilar = (movieId: string, page: number, size: number) => {
  return useQuery<PaginatedResponse<Movie>>(
    ["similarMovies", page, size],
    async () => {
      const response: PaginatedResponse<Movie> = await MovieService.getSimilar(
        movieId,
        page,
        size
      );
      return response;
    }
  );
};

export default useSimilar;
