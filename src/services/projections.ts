import appAxios from "./appAxios";
import { ProjectionDetails } from "../utils/types";

const getProjectionDetails = async (movieId: string): Promise<ProjectionDetails> => {
  return appAxios.get(`/projections/details/${movieId}`).then((response) => {
    return response.data;
  });
};

export default {
  getProjectionDetails,
};