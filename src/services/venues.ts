import appAxios from "./appAxios";
import { Venue } from "../utils/types";

const getAll = async (): Promise<Venue[]> => {
  return appAxios.get("/venues/all").then((response) => {
    const data = response.data;
    console.log(data);

    return data;
  });
};

export default {
  getAll,
};
