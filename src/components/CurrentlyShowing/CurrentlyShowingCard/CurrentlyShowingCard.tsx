import style from "./currently-showing-card.module.scss";
import { Movie } from "../../../utils/types";

type CurrentlyShowingCardProps = {
  movie: Movie;
};

const CurrentlyShowingCard: React.FC<CurrentlyShowingCardProps> = ({
  movie,
}) => {
  const {
    title,
    rating,
    language,
    length,
    genres,
    images,
    endDate,
    projections,
  } = movie;

  const formattedEndDate = new Date(endDate);
  const day = String(formattedEndDate.getDate()).padStart(2, "0");
  const month = String(formattedEndDate.getMonth() + 1).padStart(2, "0");
  const year = formattedEndDate.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const showtimes = projections[0]?.projectionTimes.map((p) => p.time) || [];

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.image}>
          <img
            src={images.find((img) => img.isCoverImage)?.url || ""}
            alt={`${title} poster`}
          />
        </div>
        <div className={style.middle_section}>
          <div className={style.details}>
            <p className={style.title}>{title}</p>
            <div className={style.info}>
              <p className={style.text}>{rating}</p>
              <p className={style.divider}>|</p>
              <p className={style.text}>{language}</p>
              <p className={style.divider}>|</p>
              <p className={style.text}>{length} Min</p>
            </div>
            <div className={style.genre_container}>
              {genres.map((genre, index) => (
                <div key={`${genre.id}-${index}`} className={style.genre}>
                  <p>{genre.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={style.playing_until}>
            <p>Playing in cinema until {formattedDate}.</p>
          </div>
        </div>
        <div className={style.showtimes}>
          <p className={style.showtimes_title}>Showtimes</p>
          <div className={style.showtimes_container}>
            {showtimes.map((time) => {
              const formattedTime = time.slice(0, 5);
              return (
                <div key={formattedTime} className={style.showtime}>
                  <p>{formattedTime}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyShowingCard;
