import { useQuery } from "react-query";
import { ProjectionService } from "../services";

const useProjectionDetails = (movieId: string) => {
  return useQuery(["projection", movieId], () =>
    ProjectionService.getProjectionDetails(movieId)
  );
};

export default useProjectionDetails;