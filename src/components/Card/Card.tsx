import s from "../../assets/css/card.module.css";
import { Movie, Venue } from "../../utils/types";

type Props = {
  type: "movie" | "venue";
  data: Movie | Venue;
};

const Card: React.FC<Props> = ({ type, data }) => {
  return (
    <div id={s.container}>
      {type === "movie" && (
        <>
          <div id={s.image_container}>
            <img
              id={s.image}
              src={(data as Movie).images.find((img) => img.isCoverImage)?.url}
              alt={(data as Movie).title}
            />
          </div>
          <p id={s.title}>{(data as Movie).title}</p>
          <div id={s.length_genre}>
            <p id={s.length}>{(data as Movie).length} MIN</p>
            <p id={s.divider}>|</p>
            <p id={s.genre}>{(data as Movie).genres[0]?.name}</p>
          </div>
        </>
      )}

      {type === "venue" && (
        <>
          <div id={s.image_container}>
            <img
              id={s.image}
              src={(data as Venue).imageURL}
              alt={(data as Venue).name}
            />
          </div>
          <p id={s.title}>{(data as Venue).name}</p>
          <div id={s.location}>
            <p id={s.location_text}>
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
