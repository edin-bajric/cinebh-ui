import { useQuery } from "react-query";
import { MovieService } from "../services";
import { Movie } from "../utils/types";

const useMovieById = (id: string) => {
  return useQuery<Movie>(
    ["movie", id],
    async () => await MovieService.getById(id),
    {
      cacheTime: 0,
      staleTime: 0, 
      refetchOnMount: true, 
      refetchOnWindowFocus: true, 
    }
  );
};

export default useMovieById;
