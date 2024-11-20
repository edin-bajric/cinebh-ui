import appAxios from "./appAxios";
import { Genre } from "../utils/types";

const getGenres = async (): Promise<Genre[]> => {
  return appAxios.get("/genres/").then((response) => {
    return response.data;
  });
};

export default {
  getGenres,
};