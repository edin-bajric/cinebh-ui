import style from "./booking-summary.module.scss";
import { SeatType, Movie } from "../../../../../utils/types";

type BookingSummaryProps = {
  selectedSeats: SeatType[];
  totalPrice: number;
  movie: Movie | null;
  projectionDetails: any;
  filters: any;
};

const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedSeats,
  totalPrice,
  movie,
  projectionDetails,
  filters,
}) => {
  const formattedDate = new Date(filters?.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const formattedTime = filters?.showtime;

  return (
    <div className={style.container}>
      <div className={style.movie_details}>
        <div className={style.image}>
          <img
            src={
              movie?.images.find(
                (img: { isCoverImage: any }) => img.isCoverImage
              )?.url
            }
            alt="movie poster"
          />
        </div>
        <div className={style.movie_info}>
          <div className={style.title}>{movie?.title}</div>
          <div className={style.info}>
            <p className={style.text}>{movie?.rating}</p>
            <p className={style.divider}>|</p>
            <p className={style.text}>{movie?.language}</p>
            <p className={style.divider}>|</p>
            <p className={style.text}>{movie?.length} Min</p>
          </div>
        </div>
      </div>
      <div className={style.separator}></div>
      <div className={style.booking_details}>
        <div className={style.section}>
          <p className={style.title}>Date and Time</p>
          <p className={style.value}>
            {formattedDate} at {formattedTime}
          </p>
        </div>
        <div className={style.section}>
          <p className={style.title}>Cinema Details</p>
          <p className={style.value}>
            {filters.cinema}: Cinebh, {projectionDetails.streets[0]}{" "}
            {projectionDetails.streetNumbers[0]}, {filters.city}{" "}
            {projectionDetails.postcodes[0]}
          </p>
          <p className={style.value}>{projectionDetails.hallNames[0]}</p>
        </div>
        <div className={style.section}>
          <p className={style.title}>Seat(s) Details</p>
          <div className={style.desc_value}>
          <p className={style.desc}>Seat(s): </p>
          <p className={style.value}>{selectedSeats.map(seat => seat.name).join(", ")}</p>
          </div>
        </div>
        <div className={style.section}>
          <p className={style.title}>Price Details</p>
          <div className={style.desc_value}>
          <p className={style.desc}>Total Price:</p>
          <p className={style.value}>{totalPrice} KM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
