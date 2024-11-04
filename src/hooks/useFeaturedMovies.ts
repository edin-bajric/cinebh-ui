import { useQuery } from "react-query";
import { MovieService } from "../services";

const useFeaturedMovies = () => {
  return useQuery("movies", () => MovieService.getFeatured());
};

export default useFeaturedMovies;
