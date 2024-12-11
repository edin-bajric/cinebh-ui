import React from "react";
import style from "./seat.module.scss";
import { FaStar } from "react-icons/fa6";
import classNames from "classnames";

type SeatProps = {
  name: string;
  status?: "available" | "reserved" | "selected";
  type?: "regular" | "vip" | "love";
};

const Seat: React.FC<SeatProps> = ({ name, status = "available", type = "regular" }) => {
  const seatClass = classNames(style.seat, {
    [style.available]: status === "available",
    [style.reserved]: status === "reserved",
    [style.selected]: status === "selected",
    [style.regular]: type === "regular",
    [style.vip]: type === "vip",
    [style.love]: type === "love",
  });

  return (
      <div className={seatClass}>
        {type === "vip" && (
          <div className={style.star}>
            <FaStar />
          </div>
        )}
        <p className={style.name}>{name}</p>
      </div>
  );
};

export default Seat;
