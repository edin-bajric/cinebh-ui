import appAxios from "./appAxios";
import { Movie, PaginatedResponse } from "../utils/types";

const getFeatured = async (): Promise<Movie[]> => {
  return appAxios.get("/movies/featured").then((response) => response.data);
};

const getCurrentlyShowing = async (
  page: number,
  size: number,
  title?: string,
  city?: string,
  venue?: string,
  genre?: string,
  projectionTime?: string,
  date?: string,
): Promise<PaginatedResponse<Movie>> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("size", size.toString());
  if (title) params.append("title", title);
  if (city) params.append("city", city);
  if (venue) params.append("cinema", venue);
  if (genre) params.append("genres", genre);
  if (projectionTime) params.append("projectionTime", projectionTime);
  if (date) params.append("date", date);

  return appAxios.get(`/movies/currently-showing?${params.toString()}`)
    .then((response) => response.data);
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
