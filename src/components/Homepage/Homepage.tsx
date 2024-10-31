import { useState } from "react";
import s from "../../assets/css/carousel.module.css";
import CarouselComp from "../CarouselComp";
import VenueSideScrollMenu from "../VenueSideScrollMenu";
import HomepageTile from "../HomepageTile";
import useCurrentlyShowing from "../../hooks/useCurrentlyShowing";
import useUpcoming from "../../hooks/useUpcoming";
import useVenues from "../../hooks/useVenues";

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 4;

const Homepage = () => {
  const [currentlyShowingPage, setCurrentlyShowingPage] = useState(DEFAULT_PAGE);
  const [upcomingPage, setUpcomingPage] = useState(DEFAULT_PAGE);
  const [venuesPage, setVenuesPage] = useState(DEFAULT_PAGE);

  const {
    data: currentlyShowing,
    isLoading: isLoadingCurrentlyShowing,
    isError: isErrorCurrentlyShowing,
  } = useCurrentlyShowing(currentlyShowingPage, DEFAULT_SIZE);

  const {
    data: upcoming,
    isLoading: isLoadingUpcoming,
    isError: isErrorUpcoming,
  } = useUpcoming(upcomingPage, DEFAULT_SIZE);

  const {
    data: venues,
    isLoading: isLoadingVenues,
    isError: isErrorVenues,
  } = useVenues(venuesPage, DEFAULT_SIZE);

  return (
    <div id={s.container}>
      <CarouselComp />
      <VenueSideScrollMenu />
      <HomepageTile
        title="Currently Showing"
        type="movie"
        data={currentlyShowing?.content || []}
        isLoading={isLoadingCurrentlyShowing}
        isError={isErrorCurrentlyShowing}
        totalItems={currentlyShowing?.totalElements || 0}
        pageSize={DEFAULT_SIZE}
        onPageChange={(page) => setCurrentlyShowingPage(page)}
      />
      <HomepageTile
        title="Upcoming Movies"
        type="movie"
        data={upcoming?.content || []}
        isLoading={isLoadingUpcoming}
        isError={isErrorUpcoming}
        totalItems={upcoming?.totalElements || 0}
        pageSize={DEFAULT_SIZE}
        onPageChange={(page) => setUpcomingPage(page)}
      />
      <HomepageTile
        title="Venues"
        type="venue"
        data={venues?.content || []}
        isLoading={isLoadingVenues}
        isError={isErrorVenues}
        totalItems={venues?.totalElements || 0}
        pageSize={DEFAULT_SIZE}
        onPageChange={(page) => setVenuesPage(page)}
      />
    </div>
  );
};

export default Homepage;
