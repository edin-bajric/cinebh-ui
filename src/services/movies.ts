import appAxios from "./appAxios";
import { Movie, PaginatedResponse } from "../utils/types";

const getFeatured = async (): Promise<Movie[]> => {
  return appAxios.get("/movies/featured").then((response) => response.data);
};

const getCurrentlyShowing = async (
  page: number,
  size: number,
  title = "",
  city = ""
): Promise<PaginatedResponse<Movie>> => {
  const url = `/movies/currently-showing?page=${page}&size=${size}&title=${title}&city=${city}`;
  return appAxios.get(url).then((response) => response.data);
};

const getUpcoming = async (
  page: number,
  size: number
): Promise<PaginatedResponse<Movie>> => {
  return appAxios
    .get(`/movies/upcoming?page=${page}&size=${size}`)
    .then((response) => response.data);
};

export default {
  getFeatured,
  getCurrentlyShowing,
  getUpcoming,
};
