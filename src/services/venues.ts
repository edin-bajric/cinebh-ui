import appAxios from "./appAxios";
import { Venue, PaginatedResponse } from "../utils/types";

const getAll = async (): Promise<Venue[]> => {
  return appAxios.get("/venues/all").then((response) => {
    const data = response.data;
    return data;
  });
};

const getVenues = async (
  page: number,
  size: number
): Promise<PaginatedResponse<Venue>> => {
  return appAxios.get(`/venues/?page=${page}&size=${size}`).then((response) => {
    return response.data;
  });
};

export default {
  getAll,
  getVenues,
};
