import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store";
import style from "./choosen-seats.module.scss";

const ChoosenSeats = () => {
  const { selectedSeats, totalPrice } = useSelector((state: RootState) => state.selectedSeats);

  return (
    <div className={style.container}>
      <div className={style.title}>Choosen Seats</div>
      <div className={style.seat_price}>
        <div className={style.seat}>Seat(s)</div>
        <div className={style.price}>Total price</div>
      </div>
      <div className={style.border}></div>
      <div className={style.seat_price}>
        <div className={style.value}>
          {selectedSeats.map(seat => seat.name).join(", ")}
        </div>
        {totalPrice > 0 && (
          <div className={style.value}>{totalPrice} KM</div>
        )}
      </div>
    </div>
  );
};

export default ChoosenSeats;
