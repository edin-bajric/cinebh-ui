import { useState, useEffect } from "react";
import style from "./buy-ticket.module.scss";
import SeatOptions from "./SeatOptions";
import { FaCircleInfo } from "react-icons/fa6";
import { Tooltip } from "antd";

const BuyTicket = () => {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title}>Seat Options</div>
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
      <div className={style.border}></div>
      <div className={style.content}>
        <div className={style.seat_options}>
          <SeatOptions />
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;
