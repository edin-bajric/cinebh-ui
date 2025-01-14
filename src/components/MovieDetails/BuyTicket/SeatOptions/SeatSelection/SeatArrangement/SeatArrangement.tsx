import React from "react";
import style from "./seat-arrangement.module.scss";
import Seat from "../Seat";
import useSeatsByHallId from "../../../../../../hooks/useSeatsByHallId";
import { useLocation } from "react-router-dom";

const SeatArrangement = () => {
  const location = useLocation();
  const { state } = location;

  const projectionDetails = state?.projectionDetails;

  const { data: seats, isLoading } = useSeatsByHallId(
    projectionDetails?.hallIds[0]
  );

  const groupedSeats = React.useMemo(() => {
    if (!seats) return {};

    return seats.reduce(
      (acc: Record<string, any[]>, seat: { name: string; type?: string }) => {
        const row = seat.name[0];

        if (row === "G" || row === "H") {
          seat.type = "vip";
        } else if (row === "I") {
          seat.type = "love";
        } else {
          seat.type = seat.type || "regular";
        }

        if (!acc[row]) acc[row] = [];
        acc[row].push(seat);
        return acc;
      },
      {}
    );
  }, [seats]);

  if (isLoading) {
    return <div>Loading seats...</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.title}>Cinema Screen</div>
      <div className={style.screen_parent}>
        <div className={style.screen}></div>
      </div>
      <div className={style.seats}>
        <div className={style.left_column}>
          {Object.entries(groupedSeats).map(([row, seats]) => (
            <div key={row} className={style.row}>
              {seats.slice(0, row === "I" ? 2 : 4).map((seat) => (
                <Seat
                  key={seat.name}
                  name={seat.name}
                  status={seat.status as "available" | "reserved" | "selected"}
                  type={seat.type as "regular" | "vip" | "love"}
                />
              ))}
            </div>
          ))}
        </div>
        <div className={style.middle_column}></div>
        <div className={style.right_column}>
          {Object.entries(groupedSeats).map(([row, seats]) => (
            <div key={row} className={style.row}>
              {seats.slice(row === "I" ? 2 : 4).map((seat) => (
                <Seat
                  key={seat.name}
                  name={seat.name}
                  status={seat.status as "available" | "reserved" | "selected"}
                  type={seat.type as "regular" | "vip" | "love"}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatArrangement;
