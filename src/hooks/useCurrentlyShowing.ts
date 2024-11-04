import { useQuery } from "react-query";
import { MovieService } from "../services";
import { Movie, PaginatedResponse } from "../utils/types";

const useCurrentlyShowing = (page: number, size: number) => {
  return useQuery<PaginatedResponse<Movie>>(
    ["moviesCurrently", page, size],
    async () => {
      const response: PaginatedResponse<Movie> =
        await MovieService.getCurrentlyShowing(page, size);
      return response;
    }
  );
};

export default useCurrentlyShowing;
