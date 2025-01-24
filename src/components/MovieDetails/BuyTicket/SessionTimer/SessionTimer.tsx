import React from "react";
import { Tooltip } from "antd";
import { FaCircleInfo } from "react-icons/fa6";
import style from "../buy-ticket.module.scss";

interface SessionTimerProps {
  timeLeft: number;
}

const SessionTimer: React.FC<SessionTimerProps> = ({ timeLeft }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
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
  );
};

export default SessionTimer;
