import { useQuery } from "react-query";
import { ProjectionTimeService } from "../services";

const useProjectionTimes = () => {
  return useQuery("genres", () => ProjectionTimeService.getProjectionTimes());
};

export default useProjectionTimes;