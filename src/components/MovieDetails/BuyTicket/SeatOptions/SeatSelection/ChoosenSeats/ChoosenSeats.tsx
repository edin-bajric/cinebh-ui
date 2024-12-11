import style from "./choosen-seats.module.scss";

const ChoosenSeats = () => {
  return (
        <div className={style.container}>
            <div className={style.title}>Choosen Seats</div>
            <div className={style.seat_price}>
                <div className={style.seat}>Seat(s)</div>
                <div className={style.price}>Total price</div>
            </div>
            <div className={style.border}></div>
        </div>
  )
}

export default ChoosenSeats