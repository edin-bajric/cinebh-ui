import style from "./card.module.scss";
import { Movie, Venue } from "../../utils/types";

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

  return (
    <div className={style.container}>
      <div className={style.image_container}>
        {isUpcoming && !isVenue && <div className={style.upcoming}>Upcoming</div>}
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
    </div>
  );
};

export default Card;
