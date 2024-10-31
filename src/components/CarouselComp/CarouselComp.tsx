import { Carousel, ConfigProvider } from "antd";
import s from "../../assets/css/carousel.module.css";
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
      <div id={s.container}>
        <Carousel>
          {movies.map((movie, index) => {
            const coverImage =
              movie.images.find((img) => img.isCoverImage)?.url || "";
            const genre = movie.genres[0]?.name || "Unknown Genre";

            const shortDescription = movie.description.split(".")[0] + ".";

            return (
              <div key={index} className={s.item}>
                <img src={coverImage} alt={movie.title} id={s.movie_image} />
                <div className={s.overlay}>
                  <div className={s.genre}>
                    <p>{genre}</p>
                  </div>
                  <h2 className={s.title}>{movie.title}</h2>
                  <p className={s.description}>{shortDescription}</p>
                  <Button
                    borderColor="rgba(178, 34, 34, 1)"
                    color="rgba(178, 34, 34, 1)"
                    text="Buy Ticket"
                    textColor="rgba(250, 250, 250, 1)"
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
