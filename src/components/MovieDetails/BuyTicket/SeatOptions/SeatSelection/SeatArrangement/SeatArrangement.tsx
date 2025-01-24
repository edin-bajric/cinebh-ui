import React, { useState, useEffect } from "react";
import style from "./seat-arrangement.module.scss";
import Seat from "../Seat";
import useSeatsByHallId from "../../../../../../hooks/useSeatsByHallId";
import { useLocation } from "react-router-dom";
import { SeatType } from "../../../../../../utils/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../../store";
import { decodeJwtToken } from "../../../../../../utils/decoder";
import {
  setSelectedSeats,
  setTotalPrice,
  setUserEmail,
  setMovie,
  setProjectionDetails,
  setFilters,
} from "../../../../../../store/selectedSeatsSlice";
import Loading from "../../../../../../components/Loading";

const SeatArrangement = () => {
  const location = useLocation();
  const { state } = location;
  const { projectionDetails, filters, movie } = state || {};
  const { data: seats, isLoading } = useSeatsByHallId(projectionDetails?.hallIds[0]);
  const [selectedSeats, setSelectedSeatsState] = useState<SeatType[]>([]);
  const [totalPrice, setTotalPriceState] = useState(0);

  const { userToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const decodedToken = userToken ? decodeJwtToken(userToken) : null;
  const userEmail = decodedToken ? decodedToken.sub : "";

  useEffect(() => {
    dispatch(setSelectedSeats(selectedSeats));
    dispatch(setTotalPrice(totalPrice));
    dispatch(setUserEmail(userEmail));
    dispatch(setMovie(movie));
    dispatch(setProjectionDetails(projectionDetails));
    dispatch(setFilters(filters));
  }, [
    selectedSeats,
    totalPrice,
    userEmail,
    movie,
    projectionDetails,
    filters,
    dispatch,
  ]);

  const groupedSeats = React.useMemo(() => {
    if (!seats) return {};

    return seats.reduce((acc: Record<string, SeatType[]>, seat) => {
      const row = seat.name[0];
      if (!acc[row]) acc[row] = [];
      acc[row].push(seat);
      return acc;
    }, {});
  }, [seats]);

  const handleSeatSelect = (seat: SeatType) => {
    if (seat.status.status === "available") {
      const isSelected = selectedSeats.find(
        (selectedSeat) => selectedSeat.id === seat.id
      );
      let newSelectedSeats;
      let newTotalPrice = totalPrice;

      if (isSelected) {
        newSelectedSeats = selectedSeats.filter(
          (selectedSeat) => selectedSeat.id !== seat.id
        );
        newTotalPrice -= seat.type.price;
      } else {
        newSelectedSeats = [
          ...selectedSeats,
          { ...seat, status: { ...seat.status, status: "selected" } },
        ];
        newTotalPrice += seat.type.price;
      }

      setSelectedSeatsState(newSelectedSeats);
      setTotalPriceState(newTotalPrice);
    }
  };

  const renderSeatColumn = (
    seats: Record<string, SeatType[]>,
    isLeft: boolean
  ) => {
    return Object.entries(seats).map(([row, rowSeats]) => (
      <div key={row} className={style.row}>
        {rowSeats
          .slice(
            isLeft ? 0 : row === "I" ? 2 : 4,
            isLeft ? (row === "I" ? 2 : 4) : undefined
          )
          .map((seat) => (
            <Seat
              key={seat.id}
              seat={seat}
              onSelect={handleSeatSelect}
              isSelected={selectedSeats.some(
                (selectedSeat) => selectedSeat.id === seat.id
              )}
              status={
                seat.status.status as "available" | "reserved" | "selected"
              }
              type={seat.type.type as "Regular" | "VIP" | "Love"}
            />
          ))}
      </div>
    ));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={style.container}>
      <div className={style.title}>Cinema Screen</div>
      <div className={style.screen_parent}>
        <div className={style.screen}></div>
      </div>
      <div className={style.seats}>
        <div className={style.left_column}>
          {renderSeatColumn(groupedSeats, true)}
        </div>

        <div className={style.middle_column}></div>

        <div className={style.right_column}>
          {renderSeatColumn(groupedSeats, false)}
        </div>
      </div>
    </div>
  );
};

export default SeatArrangement;
