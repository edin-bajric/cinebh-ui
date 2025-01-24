import React from "react";
import style from "./showtimes.module.scss";

interface ShowtimesProps {
  times: string[];
  variant?: "ticket" | "card";
  selectedTime?: string;
  onSelectTime?: (time: string) => void;
}

const Showtimes: React.FC<ShowtimesProps> = ({
  times,
  variant = "ticket",
  selectedTime,
  onSelectTime,
}) => {
  return (
    <div className={`${style.showtimes} ${style[variant]}`}>
      <p className={style.showtimes_title}>Showtimes</p>
      <div className={style.showtimes_container}>
        {times.map((time, index) => (
          <div
            key={index}
            className={`${style.showtime} ${
              selectedTime === time ? style.selected : ""
            }`}
            role={variant === "ticket" ? "button" : undefined}
            tabIndex={variant === "ticket" ? 0 : undefined}
            onClick={() => variant === "ticket" && onSelectTime?.(time)}
            onKeyDown={(e) =>
              variant === "ticket" && e.key === "Enter" && onSelectTime?.(time)
            }
          >
            <p>{time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showtimes;
