import appAxios from "./appAxios";
import { SeatType } from "../utils/types";

const getSeatsByHallId = async (hallId: string): Promise<SeatType[]> => {
  return appAxios.get(`/seats/${hallId}`).then((response) => {
    return response.data;
  });
};

export default {
  getSeatsByHallId,
};