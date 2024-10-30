import s from "../../assets/css/carousel.module.css";
import CarouselComp from "../CarouselComp";
import VenueSideScrollMenu from "../VenueSideScrollMenu";
import HomepageTile from "../HomepageTile";
import useCurrentlyShowing from "../../hooks/useCurrentlyShowing";
import useUpcoming from "../../hooks/useUpcoming";
import useVenues from "../../hooks/useVenues";

const Homepage = () => {
  const {
    data: currentlyShowing = [],
    isLoading: isLoadingCurrentlyShowing,
    isError: isErrorCurrentlyShowing,
  } = useCurrentlyShowing();
  const {
    data: upcoming = [],
    isLoading: isLoadingUpcoming,
    isError: isErrorUpcoming,
  } = useUpcoming();
  const { 
    data: venues = [], 
    isLoading: isLoadingVenues, 
    isError: isErrorVenues, 
  } = useVenues();

  return (
    <div id={s.container}>
      <CarouselComp />
      <VenueSideScrollMenu />
      <HomepageTile
        title="Currently Showing"
        type="movie"
        data={currentlyShowing}
        isLoading={isLoadingCurrentlyShowing}
        isError={isErrorCurrentlyShowing}
      />
      <HomepageTile
        title="Upcoming Movies"
        type="movie"
        data={upcoming}
        isLoading={isLoadingUpcoming}
        isError={isErrorUpcoming}
      />
      <HomepageTile
        title="Venues"
        type="venue"
        data={venues}
        isLoading={isLoadingVenues}
        isError={isErrorVenues}
      />
    </div>
  );
};

export default Homepage;
