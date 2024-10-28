import appAxios from "./appAxios";
import { Movie } from "../utils/types";

const getFeatured = async (): Promise<Movie[]> => {
  return appAxios.get("/movies/featured").then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

export default {
  getFeatured,
};
