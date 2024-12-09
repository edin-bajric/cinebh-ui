import style from "./buy-ticket.module.scss";
import SeatOptions from "./SeatOptions";

const BuyTicket = () => {
  return (
    <div className={style.container}>
        <div className={style.header}>
            <div className={style.title}>Seat Options</div>
            <div className={style.session}>
                <div className={style.reminder}></div>
                <p>Session Duration</p>
                <div className={style.session_time_container}>
                    <div className={style.session_time}></div>
                </div>
            </div>
        </div>
        <div className={style.content}>
            <div className={style.seat_options}>
                <SeatOptions />
            </div>
        </div>
    </div>
  )
}

export default BuyTicket;