import { useQuery } from "react-query";
import { MovieService } from "../services";
import { Movie, PaginatedResponse } from "../utils/types";

const useCurrentlyShowing = (page: number, size: number, title: string, city: string) => {
  return useQuery<PaginatedResponse<Movie>>(
    ["moviesCurrently", page, size, title, city],
    async () => {
      const response: PaginatedResponse<Movie> =
        await MovieService.getCurrentlyShowing(page, size, title, city);
      return response;
    }
  );
};


export default useCurrentlyShowing;
