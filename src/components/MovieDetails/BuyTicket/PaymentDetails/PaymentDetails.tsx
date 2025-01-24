import style from "./payment-details.module.scss";
import SavedCards from "./SavedCards";
import NewCard from "./NewCard";
import BookingSummary from "./BookingSummary";
import { useLocation } from "react-router-dom";

const PaymentDetails = () => {
  const location = useLocation();
  const { selectedSeats, totalPrice, movie, projectionDetails, filters } = location.state || {};

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.saved_cards}>
          <p className={style.title}>Saved Cards</p>
          <SavedCards />
        </div>
        <div className={style.divider}>
          <div className={style.line}></div>
          <p>or</p>
          <div className={style.line}></div>
        </div>
        <div className={style.new_card}>
          <div className={style.title}>Add New Card</div>
          <NewCard />
        </div>
      </div>
      <div className={style.booking_summary}>
        <div className={style.title}>Booking Summary</div>
        <BookingSummary 
          selectedSeats={selectedSeats} 
          totalPrice={totalPrice} 
          movie={movie} 
          projectionDetails={projectionDetails}
          filters={filters}
        />
      </div>
    </div>
  );
};

export default PaymentDetails;
