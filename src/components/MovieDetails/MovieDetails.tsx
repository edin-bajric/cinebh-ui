import { useParams } from "react-router-dom";
import style from "./movie-details.module.scss";
import { FaStar } from "react-icons/fa";
import useMovieById from "../../hooks/useMovieById";
import SeeAlsoList from "./SeeAlsoList";
import Loading from "../Loading";
import Error from "../Error";

const MovieDetails = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { data, isLoading, isError } = useMovieById(movieId!);

  const formattedStartDate = data?.startDate.replace(/-/g, "/");
  const formattedEndDate = data?.endDate.replace(/-/g, "/");

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.page_title}>Movie Details</div>
        <div className={style.media}>
          <div className={style.trailer}>
            <iframe
              src={data?.trailerUrl || ""}
              title="Movie Trailer"
              frameBorder="0"
              allowFullScreen
              className={style.trailer_iframe}
            ></iframe>
          </div>
          <div className={style.images}>
            {data?.images.map((image) => (
              <img
                key={image.id}
                src={image.url}
                alt={`Movie Scene`}
                className={style.image}
              />
            ))}
          </div>
        </div>
        <div className={style.info}>
          <div className={style.title}>{data?.title}</div>
          <div className={style.basic_info}>
            <p className={style.rating}>{data?.rating}</p>
            <p className={style.divider}>|</p>
            <p className={style.language}>{data?.language}</p>
            <p className={style.divider}>|</p>
            <p className={style.length}>{data?.length} Min</p>
            <p className={style.divider}>|</p>
            <p className={style.projection_date}>
              Projection date: {formattedStartDate} - {formattedEndDate}
            </p>
          </div>
          <div className={style.genre_container}>
            {data?.genres.map((genre) => (
              <div key={genre.id} className={style.genre}>
                <p>{genre.name}</p>
              </div>
            ))}
          </div>
          <div className={style.synopsis}>
            <p>{data?.description}</p>
          </div>
          <div className={style.director}>
            <p className={style.creator}>Director: </p>
            <p className={style.director_name}>{data?.director}</p>
          </div>
          <div className={style.writers}>
            <p className={style.creator}>Writers: </p>
            <p className={style.writers_name}>
              {data?.writers.map((writer) => writer.name).join(", ")}
            </p>
          </div>
          <div className={style.cast}>
            <div className={style.section_title}>
              <p className={style.divider}>|</p>
              <p>Cast</p>
            </div>
            <div className={style.cast_container}>
              {data?.performers.map((performer) => (
                <div key={performer.id} className={style.cast_member}>
                  <p className={style.cast_name}>{performer.name}</p>
                  <p className={style.cast_role}>{performer.role}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={style.movie_rating}>
            <div className={style.section_title}>
              <p className={style.divider}>|</p>
              <p>Ratings</p>
            </div>
            <div className={style.movie_rating_container}>
              {data?.ratings.map((rating) => (
                <div key={rating.id} className={style.movie_rating_box}>
                  <FaStar className={style.rating_star} />
                  <div className={style.rating_info}>
                    <p className={style.rating_value}>{rating.rating}</p>
                    <p className={style.rating_provider}>{rating.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
        <div className={style.see_also_container}>
            <SeeAlsoList movieId={data?.id}/>
          </div>
      </div>
    </div>
  );
};

export default MovieDetails;
