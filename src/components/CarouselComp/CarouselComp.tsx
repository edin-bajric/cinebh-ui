import { Carousel, ConfigProvider } from "antd";
import style from "./carousel.module.scss";
import useFeaturedMovies from "../../hooks/useFeaturedMovies";
import Spinner from "../Spinner";
import Error from "../Error";
import Button from "../Button";

const CarouselComp: React.FC = () => {
  const { data: movies = [], isLoading, isError } = useFeaturedMovies();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            dotActiveWidth: 30,
            dotGap: 12,
            dotHeight: 4,
            dotOffset: 24,
            dotWidth: 30,
          },
        },
      }}
    >
      <div className={style.container}>
        <Carousel>
          {movies.map((movie, index) => {
            const coverImage =
              movie.images.find((img) => img.isCoverImage)?.url || "";
            const genre = movie.genres[0]?.name || "Unknown Genre";

            const shortDescription = movie.description.split(".")[0] + ".";

            return (
              <div key={index} className={style.item}>
                <img src={coverImage} alt={movie.title} className={style.movie_image} />
                <div className={style.overlay}>
                  <div className={style.genre}>
                    <p>{genre}</p>
                  </div>
                  <h2 className={style.title}>{movie.title}</h2>
                  <p className={style.description}>{shortDescription}</p>
                  <Button
                    variant="solid"
                    text="Buy Ticket"
                  />
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </ConfigProvider>
  );
};

export default CarouselComp;
