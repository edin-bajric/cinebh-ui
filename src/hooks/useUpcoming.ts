import { useQuery } from "react-query";
import { MovieService } from "../services";

const useUpcoming = (page: number, size: number) => {
  return useQuery(["movies", page, size], () => MovieService.getUpcoming(page, size));
};

export default useUpcoming;
