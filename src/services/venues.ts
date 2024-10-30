import appAxios from "./appAxios";
import { Venue } from "../utils/types";

const getAll = async (): Promise<Venue[]> => {
  return appAxios.get("/venues/all").then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

const getVenues = async (page: number, size: number): Promise<Venue[]> => {
  return appAxios.get(`/venues/?page=${page}&size=${size}`).then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
}

export default {
  getAll,
  getVenues
};
