import style from "./seat-selection.module.scss";
import SeatGuide from "./SeatGuide";
import SeatArrangement from "./SeatArrangement";
import ChoosenSeats from "./ChoosenSeats";
import Button from "../../../../Button";
const SeatSelection = () => {
  return (
    <div className={style.container}>
      <div className={style.arrangement}>
        <SeatArrangement />
      </div>
      <div className={style.guide_choosen_button}>
        <div className={style.guide_choosen}>
        <SeatGuide />
        <ChoosenSeats />
        </div>
        <Button text="Continue to Payment" />
      </div>
    </div>
  );
};

export default SeatSelection;
