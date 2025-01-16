import React from "react";
import style from "./seat.module.scss";
import { FaStar } from "react-icons/fa6";
import classNames from "classnames";
import { SeatType } from "../../../../../../utils/types";

type SeatProps = {
  seat: SeatType;
  onSelect: (seat: SeatType) => void;
  isSelected: boolean;
  status?: "available" | "reserved" | "selected";
  type?: "Regular" | "VIP" | "Love";
};

const Seat: React.FC<SeatProps> = ({ seat, onSelect, isSelected, status, type }) => {
  if (!seat) {
    return null;
  }

  const seatClass = classNames(style.seat, {
    [style.available]: status === "available" && !isSelected,
    [style.reserved]: status === "reserved",
    [style.selected]: isSelected,
    [style.regular]: type === "Regular",
    [style.vip]: type === "VIP",
    [style.love]: type === "Love",
  });

  const handleSelect = () => {
    onSelect(seat);
  };

  return (
    <div className={seatClass} onClick={handleSelect}>
      {type === "VIP" && (
        <div className={style.star}>
          <FaStar />
        </div>
      )}
      <p className={style.name}>{seat.name}</p>
    </div>
  );
};

export default Seat;
