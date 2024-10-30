import CarouselComp from "../CarouselComp";
import useFeaturedMovies from "../../hooks/useFeaturedMovies";
import s from "../../assets/css/carousel.module.css";
import VenueSideScrollMenu from "../VenueSideScrollMenu";
import useAllVenues from "../../hooks/useAllVenues";

const Homepage = () => {
  const {
    data: movies = [],
    error: moviesError,
    isLoading: isMoviesLoading,
    isError: isMoviesError,
  } = useFeaturedMovies();

  const {
    data: venues = [],
    error: venuesError,
    isLoading: isVenuesLoading,
    isError: isVenuesError,
  } = useAllVenues();

  return (
    <div id={s.container}>
      <CarouselComp movies={movies} />
      <VenueSideScrollMenu venues={venues} />
    </div>
  );
};

export default Homepage;
