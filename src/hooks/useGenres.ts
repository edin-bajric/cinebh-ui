import { useQuery } from "react-query";
import { GenreService } from "../services";

const useGenres = () => {
  return useQuery("genres", () => GenreService.getGenres());
};

export default useGenres;