import { useState } from "react";
import style from "./homepage.module.scss";
import CarouselComp from "../CarouselComp";
import VenueSideScrollMenu from "../VenueSideScrollMenu";
import HomepageTile from "../HomepageTile";
import useCurrentlyShowing from "../../hooks/useCurrentlyShowing";
import useUpcoming from "../../hooks/useUpcoming";
import useVenues from "../../hooks/useVenues";
import Loading from "../Loading";
import Error from "../Error";

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

  
  const isLoading = isLoadingCurrentlyShowing || isLoadingUpcoming || isLoadingVenues;
  const isError = isErrorCurrentlyShowing || isErrorUpcoming || isErrorVenues;

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div id={style.container}>
      <CarouselComp />
      <VenueSideScrollMenu />
      <HomepageTile
        title="Currently Showing"
        type="movie"
        data={currentlyShowing?.content || []}   
        totalItems={currentlyShowing?.totalElements || 0}
        pageSize={DEFAULT_SIZE}
        onPageChange={setCurrentlyShowingPage}
        linkTo="/currently-showing"
      />
      <HomepageTile
        title="Upcoming Movies"
        type="movie"
        data={upcoming?.content || []}
        totalItems={upcoming?.totalElements || 0}
        pageSize={DEFAULT_SIZE}
        onPageChange={setUpcomingPage}
        linkTo="/upcoming"
      />
      <HomepageTile
        title="Venues"
        type="venue"
        data={venues?.content || []}
        totalItems={venues?.totalElements || 0}
        pageSize={DEFAULT_SIZE}
        onPageChange={setVenuesPage}
        linkTo="/venues"
      />
    </div>
  );
};

export default Homepage;
