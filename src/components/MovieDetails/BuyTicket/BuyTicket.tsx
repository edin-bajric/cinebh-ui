import { useLocation } from "react-router-dom";
import style from "./buy-ticket.module.scss";
import SeatOptions from "./SeatOptions";
import PaymentDetails from "./PaymentDetails";
import SessionExpiredPopup from "./SessionExpiredPopup";
import useTimer from "../../../hooks/useTimer";
import SessionTimer from "./SessionTimer"; 

const BuyTicket = () => {
  const location = useLocation();
  const isPaymentRoute = location.pathname === "/buy-ticket-payment";

  const { timeLeft, isPopupVisible, resetTimer } = useTimer(300, isPaymentRoute);

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
      {isPopupVisible && <SessionExpiredPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default BuyTicket;
