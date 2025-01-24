import style from "./seat-guide.module.scss";
import Seat from "../Seat";
import { SeatType } from "../../../../../../utils/types";

const sampleSeat: SeatType = {
  id: "sample",
  name: "XY",
  hall: {
    id: "sampleHall",
    name: "Sample Hall",
  },
  type: {
    id: "sampleType",
    type: "Regular",
    price: 7,
  },
  status: {
    id: "sampleStatus",
    status: "available",
  },
};

const SeatGuide = () => {
  return (
    <div className={style.container}>
      <div className={style.title}>Seat Guide</div>
      <div className={style.seat_guide}>
        <div className={style.statuses}>
          <div className={style.status}>
            <Seat seat={{ ...sampleSeat, status: { ...sampleSeat.status, status: "available" } }} status="available" type="Regular" onSelect={() => {}} isSelected={false} />
            <p>Available</p>
          </div>
          <div className={style.status}>
            <Seat seat={{ ...sampleSeat, status: { ...sampleSeat.status, status: "reserved" } }} status="reserved" type="Regular" onSelect={() => {}} isSelected={false} />
            <p>Reserved</p>
          </div>
          <div className={style.status}>
            <Seat seat={{ ...sampleSeat, status: { ...sampleSeat.status, status: "selected" } }} status="selected" type="Regular" onSelect={() => {}} isSelected={true} />
            <p>Selected</p>
          </div>
        </div>
        <div className={style.types}>
          <div className={style.type}>
            <Seat seat={sampleSeat} status="available" type="Regular" onSelect={() => {}} isSelected={false} />
            <p>Regular Seats (7 BAM)</p>
          </div>
          <div className={style.type}>
            <Seat seat={{ ...sampleSeat, type: { ...sampleSeat.type, type: "VIP", price: 10 } }} status="available" type="VIP" onSelect={() => {}} isSelected={false} />
            <p>VIP Seats (10 BAM)</p>
          </div>
          <div className={style.type}>
            <Seat seat={{ ...sampleSeat, type: { ...sampleSeat.type, type: "Love", price: 24 } }} status="available" type="Love" onSelect={() => {}} isSelected={false} />
            <p>Love Seats (24 BAM)</p>
          </div>
        </div>
      </div>
      <div className={style.border}></div>
    </div>
  )
}

export default SeatGuide
