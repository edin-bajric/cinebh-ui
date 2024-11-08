import appAxios from "./appAxios";
import { ProjectionTime } from "../utils/types";

const getProjectionTimes = async (): Promise<ProjectionTime[]> => {
  return appAxios.get("/projectionTimes/").then((response) => {
    return response.data;
  });
};

export default {
  getProjectionTimes,
};
