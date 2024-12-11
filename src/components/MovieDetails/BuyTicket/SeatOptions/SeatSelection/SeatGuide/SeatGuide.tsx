import style from "./seat-guide.module.scss";
import Seat from "../Seat";

const SeatGuide = () => {
  return (
    <div className={style.container}>
      <div className={style.title}>Seat Guide</div>
      <div className={style.seat_guide}>
        <div className={style.statuses}>
          <div className={style.status}>
          <Seat name="XY" status="available" type="regular" />
          <p>Available</p>
          </div>
          <div className={style.status}>
          <Seat name="XY" status="reserved" type="regular" />
          <p>Reserved</p>
          </div>
          <div className={style.status}>
          <Seat name="XY" status="selected" type="regular" />
          <p>Selected</p>
          </div>
        </div>
        <div className={style.types}>
          <div className={style.type}>
            <Seat name="XY" status="available" type="regular" />
            <p>Regular Seats (7 BAM)</p>
          </div>
          <div className={style.type}>
            <Seat name="XY" status="available" type="vip" />
            <p>VIP Seats (10 BAM)</p>
          </div>
          <div className={style.type}>
            <Seat name="XY" status="available" type="love" />
            <p>Love Seats (24 BAM)</p>
          </div>
        </div>
      </div>
      <div className={style.border}></div>
    </div>
  )
}

export default SeatGuide