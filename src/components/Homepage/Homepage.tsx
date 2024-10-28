import CarouselComp from "../CarouselComp";
import useMovies from "../../hooks/useFeaturedMovies";
import s from "../../assets/css/carousel.module.css";

const Homepage = () => {
  const { data: movies = [], error, isLoading, isError } = useMovies();
  return (
    <div id={s.container}>
      <CarouselComp movies={movies} />
    </div>
  );
};

export default Homepage;
