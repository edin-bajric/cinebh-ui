import { useLocation } from "react-router-dom";
import style from "./buy-ticket.module.scss";
import SeatOptions from "./SeatOptions";
import PaymentDetails from "./PaymentDetails";
import SessionExpiredPopup from "./SessionExpiredPopup";
import { FaCircleInfo } from "react-icons/fa6";
import { Tooltip } from "antd";
import useTimer from "../../../hooks/useTimer";

const BuyTicket = () => {
  const location = useLocation();
  const isPaymentRoute = location.pathname === "/buy-ticket-payment";

  const { timeLeft, isPopupVisible, resetTimer } = useTimer(300, isPaymentRoute);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleClosePopup = () => {
    resetTimer();
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title}>
          {isPaymentRoute ? "Payment Details" : "Seat Options"}
        </div>
        <div className={style.session}>
          <div className={style.reminder}>
            <Tooltip
              title="Session will expire in 5 minutes and selected seats will be refreshed"
              placement="bottom"
              color={"rgba(16, 24, 40, 1)"}
            >
              <FaCircleInfo />
            </Tooltip>
          </div>
          <p>Session Duration</p>
          <div className={style.session_time_container}>
            <div className={style.session_time}>{formatTime(timeLeft)}</div>
          </div>
        </div>
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
