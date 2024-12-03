import style from "./card.module.scss";
import { Movie, Venue } from "../../utils/types";
import { format, isWithinInterval, addDays } from "date-fns";
import { Link } from "react-router-dom";

type Props = {
  type: "movie" | "venue";
  data: Movie | Venue;
  page: "home" | "upcoming";
};

const Card: React.FC<Props> = ({ type, data, page }) => {
  const isMovie = type === "movie";
  const isVenue = type === "venue";
  const isUpcoming = page === "upcoming";

  const title = isMovie ? (data as Movie).title : (data as Venue).name;
  const imageUrl = isMovie
    ? (data as Movie).images.find((img) => img.isCoverImage)?.url
    : (data as Venue).imageURL;

  const getFormattedStartDate = (startDate: string) => {
    const date = new Date(startDate);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      return "Opens Today";
    }

    const sevenDaysFromToday = addDays(today, 7);
    if (isWithinInterval(date, { start: today, end: sevenDaysFromToday })) {
      return `Opens ${format(date, "EEEE")}`;
    }

    return format(date, "EEE, MMM d, yyyy");
  };

  const cardContent = (
    <>
      <div className={style.image_container}>
        {isUpcoming && isMovie && (
          <div className={style.upcoming}>
            {getFormattedStartDate((data as Movie).startDate)}
          </div>
        )}
        <img className={style.image} src={imageUrl} alt={title} />
      </div>
      <p className={style.title}>{title}</p>

      {isMovie && (
        <div className={style.length_genre}>
          <p className={style.length}>{(data as Movie).length} MIN</p>
          <p className={style.divider}>|</p>
          <p className={style.genre}>{(data as Movie).genres[0]?.name}</p>
        </div>
      )}

      {isVenue && (
        <div className={style.location}>
          <p className={style.location_text}>
            {(data as Venue).street} {(data as Venue).streetNumber},{" "}
            {(data as Venue).city} {(data as Venue).postcode}
          </p>
        </div>
      )}
    </>
  );

  return isMovie ? (
    <Link
      to={`/movie/${(data as Movie).id}`}
      className={style.container}
    >
      {cardContent}
    </Link>
  ) : (
    <div className={style.container}>{cardContent}</div>
  );
};

export default Card;
