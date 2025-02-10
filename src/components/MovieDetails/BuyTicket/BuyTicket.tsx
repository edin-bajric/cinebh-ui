import { useLocation } from "react-router-dom";
import style from "./buy-ticket.module.scss";
import SeatOptions from "./SeatOptions";
import PaymentDetails from "./PaymentDetails";
import Popup from "./Popup";
import useTimer from "../../../hooks/useTimer";
import SessionTimer from "./SessionTimer";

const BuyTicket = () => {
  const location = useLocation();
  const isPaymentRoute = location.pathname === "/buy-ticket-payment";

  const { timeLeft, isPopupVisible, resetTimer } = useTimer(
    300,
    isPaymentRoute
  );

  const handleClosePopup = () => {
    resetTimer();
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title}>
          {isPaymentRoute ? "Payment Details" : "Seat Options"}
        </div>
        <SessionTimer timeLeft={timeLeft} />
      </div>
      <div
        className={style.border}
        style={{ width: isPaymentRoute ? "100%" : "50%" }}
      ></div>
      <div className={style.content}>
        <div className={style.seat_options}>
          {isPaymentRoute ? <PaymentDetails /> : <SeatOptions />}
        </div>
      </div>
      {isPopupVisible && (
        <Popup
          title="Session Expired"
          subtitle="Your session expired and seats have been refreshed and updated."
          buttonText="Okay"
          buttonAction={handleClosePopup}
        />
      )}
    </div>
  );
};

export default BuyTicket;
