import { useParams } from "react-router-dom";
import style from "./movie-details.module.scss";
import useMovieById from "../../hooks/useMovieById";
import Loading from "../Loading";
import Error from "../Error";
import TicketSection from "./TicketSection";
import MovieMedia from "./MovieDetailsComponents/MovieMedia";
import MovieInfo from "./MovieDetailsComponents/MovieInfo";
import MovieCast from "./MovieDetailsComponents/MovieCast";
import MovieRatings from "./MovieDetailsComponents/MovieRatings";
import SeeAlsoList from "./SeeAlsoList";

const MovieDetails = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { data, isLoading, isError } = useMovieById(movieId!);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const {
    title,
    rating,
    genres,
    images,
    trailerUrl,
    startDate,
    endDate,
    language,
    length,
    description,
    director,
    writers,
    performers,
    ratings,
    id,
  } = data || {};

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.page_title}>Movie Details</div>
        <MovieMedia trailerUrl={trailerUrl} images={images} />
        <div className={style.info_ticket_container}>
          <div className={style.info}>
            <MovieInfo
              title={title}
              rating={rating}
              genres={genres}
              startDate={startDate}
              endDate={endDate}
              language={language}
              length={length}
              description={description}
              director={director}
              writers={writers}
            />
            <MovieCast performers={performers} />
            <MovieRatings ratings={ratings} />
          </div>
          <TicketSection data={data} />
        </div>
      </div>
      <div className={style.see_also_container}>
        <SeeAlsoList movieId={id} />
      </div>
    </div>
  );
};

export default MovieDetails;
