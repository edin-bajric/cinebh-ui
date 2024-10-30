import { Carousel } from "antd";
import s from "../../assets/css/carousel.module.css";
import useFeaturedMovies from "../../hooks/useFeaturedMovies";
import Spinner from "../Spinner";
import Error from "../Error";

const CarouselComp = () => {
  const { data: movies = [], isLoading, isError } = useFeaturedMovies();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div id={s.container}>
      <Carousel>
        {movies.map((movie, index) => {
          const coverImage =
            movie.images.find((img) => img.isCoverImage)?.url || "";
          return (
            <div key={index} className={s.item}>
              <img src={coverImage} alt={movie.title} id={s.movie_image} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselComp;
