import style from "./seat-selection.module.scss";
import SeatGuide from "./SeatGuide";
import SeatArrangement from "./SeatArrangement";

const SeatSelection = () => {
  return (
    <div className={style.container}>
      <div className={style.arrangement}>
      <SeatArrangement />
      </div>
      
      <div className={style.guide_choosen}>
        <SeatGuide />
      </div>
    </div>
  );
};

export default SeatSelection;
