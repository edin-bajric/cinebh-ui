import style from "../../movie-details.module.scss";

interface MovieInfoProps {
  title?: string;
  rating?: string;
  genres?: { id: string; name: string }[];
  startDate?: string;
  endDate?: string;
  language?: string;
  length?: string;
  description?: string;
  director?: string;
  writers?: { id: string; name: string }[];
}

const MovieInfo = ({
  title,
  rating,
  genres,
  startDate,
  endDate,
  language,
  length,
  description,
  director,
  writers,
}: MovieInfoProps) => {
  const formattedStartDate = startDate?.replace(/-/g, "/");
  const formattedEndDate = endDate?.replace(/-/g, "/");

  return (
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
        <p className={style.creator}>Director:</p>
        <p className={style.director_name}>{director}</p>
      </div>
      <div className={style.writers}>
        <p className={style.creator}>Writers:</p>
        <p className={style.writers_name}>
          {writers?.map((writer) => writer.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default MovieInfo;
