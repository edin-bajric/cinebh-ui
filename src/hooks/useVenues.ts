import { useQuery } from "react-query";
import { VenueService } from "../services";

const useVenues = (page: number = 0, size: number = 4) => {
    return useQuery(["venues", page, size], () => VenueService.getVenues(page, size));
  };

export default useVenues;
