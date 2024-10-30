import { useQuery } from "react-query";
import { MovieService } from "../services";

const useCurrentlyShowing = (page: number = 0, size: number = 4) => {
  return useQuery(["movies", page, size], () => MovieService.getCurrentlyShowing(page, size));
};

export default useCurrentlyShowing;
