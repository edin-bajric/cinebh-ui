import appAxios from "./appAxios";
import { Movie, PaginatedResponse } from "../utils/types";

const getFeatured = async (): Promise<Movie[]> => {
  return appAxios.get("/movies/featured").then((response) => {
    const data = response.data;
    return data;
  });
};

const getCurrentlyShowing = async (
  page: number,
  size: number
): Promise<PaginatedResponse<Movie>> => {
  return appAxios
    .get(`/movies/currently-showing?page=${page}&size=${size}`)
    .then((response) => {
      return response.data;
    });
};

const getUpcoming = async (
  page: number,
  size: number
): Promise<PaginatedResponse<Movie>> => {
  return appAxios
    .get(`/movies/upcoming?page=${page}&size=${size}`)
    .then((response) => {
      return response.data;
    });
};

const searchMovies = async (query: string, page: number, size: number): Promise<PaginatedResponse<Movie>> => {
  return appAxios
    .get(`/movies/currently-showing/search?query=${query}&page=${page}&size=${size}`)
    .then((response) => response.data);
};

export default {
  getFeatured,
  getCurrentlyShowing,
  getUpcoming,
  searchMovies,
};
