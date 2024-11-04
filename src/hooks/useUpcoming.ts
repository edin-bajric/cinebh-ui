import { useQuery } from "react-query";
import { MovieService } from "../services";
import { Movie, PaginatedResponse } from "../utils/types";

const useUpcoming = (page: number, size: number) => {
  return useQuery<PaginatedResponse<Movie>>(
    ["moviesUpcoming", page, size],
    async () => {
      const response: PaginatedResponse<Movie> = await MovieService.getUpcoming(
        page,
        size
      );
      return response;
    }
  );
};

export default useUpcoming;
