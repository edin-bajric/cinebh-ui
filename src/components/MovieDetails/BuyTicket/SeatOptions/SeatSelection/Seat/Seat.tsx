import React from "react";
import style from "./seat.module.scss";
import { FaStar } from "react-icons/fa6";
import classNames from "classnames";

type SeatProps = {
  name: string;
  status?: "available" | "reserved" | "selected";
  type?: "Regular" | "VIP" | "Love";
};

const Seat: React.FC<SeatProps> = ({ name, status = "available", type = "Regular" }) => {
  const seatClass = classNames(style.seat, {
    [style.available]: status === "available",
    [style.reserved]: status === "reserved",
    [style.selected]: status === "selected",
    [style.regular]: type === "Regular",
    [style.vip]: type === "VIP",
    [style.love]: type === "Love",
  });

  return (
      <div className={seatClass}>
        {type === "VIP" && (
          <div className={style.star}>
            <FaStar />
          </div>
        )}
        <p className={style.name}>{name}</p>
      </div>
  );
};

export default Seat;
