import style from "./booking-summary.module.scss";
import { SeatType, Movie } from "../../../../../utils/types";

type BookingSummaryProps = {
  selectedSeats: SeatType[];
  totalPrice: number;
  movie: Movie | null;
  projectionDetails: any;
};

const BookingSummary: React.FC<BookingSummaryProps> = ({
  /*
  selectedSeats,
  totalPrice,
  movie,
  projectionDetails,
  */
}) => {
  return <div className={style.container}></div>;
};

export default BookingSummary;
