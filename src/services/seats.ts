import appAxios from "./appAxios";
import { Seat } from "../utils/types";

const getSeatsByHallId = async (hallId: string): Promise<Seat[]> => {
  return appAxios.get(`/seats/${hallId}`).then((response) => {
    return response.data;
  });
};

export default {
  getSeatsByHallId,
};