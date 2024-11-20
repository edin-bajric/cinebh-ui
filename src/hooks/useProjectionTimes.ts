import { useQuery } from "react-query";
import { ProjectionTimeService } from "../services";

const useProjectionTimes = () => {
  return useQuery("projectionTimes", () => ProjectionTimeService.getProjectionTimes());
};

export default useProjectionTimes;