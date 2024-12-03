import React from "react";
import style from "./showtimes.module.scss";

interface ShowtimesProps {
  times: string[];
  variant?: "ticket" | "card"; 
}

const Showtimes: React.FC<ShowtimesProps> = ({ times, variant = "ticket" }) => {
  return (
    <div className={`${style.showtimes} ${style[variant]}`}>
      <p className={style.showtimes_title}>Showtimes</p>
      <div className={style.showtimes_container}>
        {times.map((time, index) => (
          <div key={index} className={style.showtime}>
            <p>{time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showtimes;
