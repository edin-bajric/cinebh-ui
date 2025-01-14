import { useQuery } from "react-query";
import { SeatService } from "../services";

const useSeatsByHallId = (hallId: string) => {
  return useQuery(["seats", hallId], () => SeatService.getSeatsByHallId(hallId));
};

export default useSeatsByHallId;