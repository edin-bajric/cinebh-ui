import appAxios from "./appAxios";
import { Movie } from "../utils/types";

const getFeatured = async (): Promise<Movie[]> => {
  return appAxios.get("/movies/featured").then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

const getCurrentlyShowing = async (page: number, size: number): Promise<Movie[]> => {
  return appAxios.get(`/movies/currently-showing?page=${page}&size=${size}`).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

const getUpcoming = async (page: number, size: number): Promise<Movie[]> => {
  return appAxios.get(`/movies/upcoming?page=${page}&size=${size}`).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
}

export default {
  getFeatured,
  getCurrentlyShowing,
  getUpcoming
};
