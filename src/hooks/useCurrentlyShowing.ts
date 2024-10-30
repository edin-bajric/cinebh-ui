import { useQuery } from "react-query";
import { MovieService } from "../services";

const useCurrentlyShowing = (page: number, size: number) => {
  return useQuery(["movies", page, size], () => MovieService.getCurrentlyShowing(page, size));
};

export default useCurrentlyShowing;
