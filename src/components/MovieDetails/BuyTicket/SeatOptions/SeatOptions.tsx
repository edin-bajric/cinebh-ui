import style from "./seat-options.module.scss";
import SeatOptionsMovieInfo from "./SeatOptionsMovieInfo";
import SeatSelection from "./SeatSelection";

const SeatOptions = () => {
  return (
    <div className={style.container}>
      <SeatOptionsMovieInfo />
      <SeatSelection />
    </div>
  )
}

export default SeatOptions