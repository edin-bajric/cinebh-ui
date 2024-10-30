import { useQuery } from "react-query";
import { VenueService } from "../services";

const useAllVenues = () => {
  return useQuery("venues", () => VenueService.getAll());
};

export default useAllVenues;
