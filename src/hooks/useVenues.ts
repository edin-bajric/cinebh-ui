import { useQuery } from "react-query";
import { VenueService } from "../services";

const useVenues = (page: number, size: number) => {
    return useQuery(["venues", page, size], () => VenueService.getVenues(page, size));
  };

export default useVenues;
