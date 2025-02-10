import style from "./seat-selection.module.scss";
import SeatGuide from "./SeatGuide";
import SeatArrangement from "./SeatArrangement";
import ChoosenSeats from "./ChoosenSeats";
import Button from "../../../../Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

const SeatSelection = () => {
  const navigate = useNavigate();

  const { selectedSeats, totalPrice, userEmail, movie, projectionDetails, filters } = useSelector((state: RootState) => state.selectedSeats);

  const handleContinueToPayment = () => {
    if (selectedSeats.length === 0) return;

    navigate("/buy-ticket-payment", {
      state: {
        selectedSeats,
        totalPrice,
        userEmail,
        movie,
        projectionDetails,
        filters,
      },
    });
  };

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
        <Button
          text="Continue to Payment"
          onClick={handleContinueToPayment}
          disabled={selectedSeats.length === 0}
        />
      </div>
    </div>
  );
};

export default SeatSelection;
