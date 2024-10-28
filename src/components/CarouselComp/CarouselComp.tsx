import { Carousel } from "antd";
import s from "../../assets/css/carousel.module.css";
import { Movie } from "../../utils/types";

type Props = {
  movies: Movie[];
};

const CarouselComp = ({ movies }: Props) => {
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
