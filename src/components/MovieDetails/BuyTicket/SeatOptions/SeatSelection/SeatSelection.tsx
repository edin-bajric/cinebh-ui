import style from "./seat-selection.module.scss";
import SeatGuide from "./SeatGuide";

const SeatSelection = () => {
  return (
    <div className={style.container}>
      <SeatGuide />
    </div>
  )
}

export default SeatSelection