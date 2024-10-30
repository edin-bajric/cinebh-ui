import { useQuery } from "react-query";
import { MovieService } from "../services";

const useUpcoming = (page: number = 0, size: number = 4) => {
  return useQuery(["movies", page, size], () => MovieService.getUpcoming(page, size));
};

export default useUpcoming;
