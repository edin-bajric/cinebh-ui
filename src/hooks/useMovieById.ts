import { useQuery } from "react-query";
import { MovieService } from "../services";
import { Movie } from "../utils/types";

const useMovieById = (id: string) => {
  return useQuery<Movie>(["movie", id], async () => {
    return await MovieService.getById(id);
  });
};

export default useMovieById;
