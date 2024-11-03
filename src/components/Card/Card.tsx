import style from "./card.module.scss";
import { Movie, Venue } from "../../utils/types";

type Props = {
  type: "movie" | "venue";
  data: Movie | Venue;
};

const Card: React.FC<Props> = ({ type, data }) => {
  return (
    <div className={style.container}>
      {type === "movie" && (
        <>
          <div className={style.image_container}>
            <img
              className={style.image}
              src={(data as Movie).images.find((img) => img.isCoverImage)?.url}
              alt={(data as Movie).title}
            />
          </div>
          <p className={style.title}>{(data as Movie).title}</p>
          <div className={style.length_genre}>
            <p className={style.length}>{(data as Movie).length} MIN</p>
            <p className={style.divider}>|</p>
            <p className={style.genre}>{(data as Movie).genres[0]?.name}</p>
          </div>
        </>
      )}

      {type === "venue" && (
        <>
          <div className={style.image_container}>
            <img
              className={style.image}
              src={(data as Venue).imageURL}
              alt={(data as Venue).name}
            />
          </div>
          <p className={style.title}>{(data as Venue).name}</p>
          <div className={style.location}>
            <p className={style.location_text}>
              {(data as Venue).street} {(data as Venue).streetNumber},{" "}
              {(data as Venue).city} {(data as Venue).postcode}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
