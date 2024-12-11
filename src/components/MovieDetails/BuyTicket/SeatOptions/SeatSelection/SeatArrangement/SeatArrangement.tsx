import style from "./seat-arrangement.module.scss";
import Seat from "../Seat";

const SeatArrangement = () => {
  return (
    <div className={style.container}>
        <div className={style.title}>Cinema Screen</div>
        <div className={style.screen}></div>
        <div className={style.seats}>
          <div className={style.left_column}>
            <div className={style.row}>
             
          </div>
          <div className={style.right_column}></div>
        </div>
    </div>
    </div>
  )
}

export default SeatArrangement