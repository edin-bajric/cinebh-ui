import { useParams } from "react-router-dom";
import style from "./movie-details.module.scss";
import { FaStar } from "react-icons/fa";
import useMovieById from "../../hooks/useMovieById";
import SeeAlsoList from "./SeeAlsoList";
import Loading from "../Loading";
import Error from "../Error";
import TicketSection from "./TicketSection";

const MovieDetails = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { data, isLoading, isError } = useMovieById(movieId!);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const {
    title,
    rating,
    genres,
    images = [],
    trailerUrl,
    startDate,
    endDate,
    language,
    length,
    description,
    director,
    writers = [],
    performers = [],
    ratings = [],
    id,
  } = data || {};

  const formattedStartDate = startDate?.replace(/-/g, "/");
  const formattedEndDate = endDate?.replace(/-/g, "/");

  const PAGE_TITLE = "Movie Details";
  const SECTION_TITLE_CAST = "Cast";
  const SECTION_TITLE_RATINGS = "Ratings";

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.page_title}>{PAGE_TITLE}</div>
        <div className={style.media}>
          <div className={style.trailer}>
            <iframe
              src={trailerUrl || ""}
              title="Movie Trailer"
              frameBorder="0"
              allowFullScreen
              className={style.trailer_iframe}
            ></iframe>
          </div>
          <div className={style.images}>
            {images.map((image) => (
              <img
                key={image.id}
                src={image.url}
                alt="Movie Scene"
                className={style.image}
              />
            ))}
          </div>
        </div>
        <div className={style.info_ticket_container}>
          <div className={style.info}>
            <div className={style.title}>{title}</div>
            <div className={style.basic_info}>
              <p className={style.rating}>{rating}</p>
              <p className={style.divider}>|</p>
              <p className={style.language}>{language}</p>
              <p className={style.divider}>|</p>
              <p className={style.length}>{length} Min</p>
              <p className={style.divider}>|</p>
              <p className={style.projection_date}>
                Projection date: {formattedStartDate} - {formattedEndDate}
              </p>
            </div>
            <div className={style.genre_container}>
              {genres?.map((genre) => (
                <div key={genre.id} className={style.genre}>
                  <p>{genre.name}</p>
                </div>
              ))}
            </div>
            <div className={style.synopsis}>
              <p>{description}</p>
            </div>
            <div className={style.director}>
              <p className={style.creator}>Director: </p>
              <p className={style.director_name}>{director}</p>
            </div>
            <div className={style.writers}>
              <p className={style.creator}>Writers: </p>
              <p className={style.writers_name}>
                {writers.map((writer) => writer.name).join(", ")}
              </p>
            </div>
            <div className={style.cast}>
              <div className={style.section_title}>
                <p className={style.divider}>|</p>
                <p>{SECTION_TITLE_CAST}</p>
              </div>
              <div className={style.cast_container}>
                {performers.map((performer) => (
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
                <p>{SECTION_TITLE_RATINGS}</p>
              </div>
              <div className={style.movie_rating_container}>
                {ratings.map((rating) => (
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
