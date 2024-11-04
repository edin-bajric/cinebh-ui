import { useQuery } from "react-query";
import { VenueService } from "../services";
import { Venue, PaginatedResponse } from "../utils/types";

const useVenues = (page: number, size: number) => {
  return useQuery<PaginatedResponse<Venue>>(
    ["venues", page, size],
    async () => {
      const response: PaginatedResponse<Venue> = await VenueService.getVenues(
        page,
        size
      );
      return response;
    }
  );
};

export default useVenues;
