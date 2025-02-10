import style from "./payment-details.module.scss";
import NewCard from "./NewCard";
import BookingSummary from "./BookingSummary";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const PaymentDetails = () => {
  const location = useLocation();
  const { selectedSeats, totalPrice, movie, projectionDetails, filters } = location.state || {};
  
  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.new_card}>
          <div className={style.title}>Add New Card</div>
          <Elements stripe={stripePromise}>
          <NewCard />
          </Elements>
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
