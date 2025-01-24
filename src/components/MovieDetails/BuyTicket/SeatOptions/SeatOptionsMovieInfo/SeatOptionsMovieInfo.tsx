import { useLocation } from "react-router-dom";
import style from "./seat-options-movie-info.module.scss";
import { formatDate, findCoverImage } from "../../../../../utils/dateFormatImageExtract";

const SeatOptionsMovieInfo = () => {
  const location = useLocation();
  const { movie, filters, projectionDetails } = location.state || {};

  if (!movie || !projectionDetails) {
    return <div>No data available</div>;
  }

  const formattedDate = formatDate(filters.date);
  const formattedTime = filters.showtime;
  const coverImage = findCoverImage(movie.images);

  return (
    <div className={style.container}>
      <div className={style.image}>
        <img src={coverImage} alt="movie poster" />
      </div>
      <div className={style.movie_info}>
        <div className={style.title}>{movie.title}</div>
        <div className={style.info}>
          <p className={style.text}>{movie.rating}</p>
          <p className={style.divider}>|</p>
          <p className={style.text}>{movie.language}</p>
          <p className={style.divider}>|</p>
          <p className={style.text}>{movie.length} Min</p>
        </div>
      </div>
      <div className={style.booking_details}>
        <div className={style.title}>Booking Details</div>
        <div className={style.time_place}>
          <p className={style.text}>
            {formattedDate} at {formattedTime}
          </p>
          <p className={style.text}>
            {filters.cinema}: Cinebh, {projectionDetails.streets[0]} {projectionDetails.streetNumbers[0]}, {filters.city} {projectionDetails.postcodes[0]}
          </p>
        </div>
        <div className={style.hall}>
          <p className={style.text}>{projectionDetails.hallNames[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default SeatOptionsMovieInfo;
