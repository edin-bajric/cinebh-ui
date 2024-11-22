import { useRef, useState } from "react";
import style from "./ticket-section.module.scss";
import SelectDropdown from "../../SelectDropdown";
import DateList from "../../DateList";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Button from "../../Button";
import { Movie } from "../../../utils/types";

interface TicketSectionProps {
  data: Movie | undefined;
}

const TicketContainer: React.FC<TicketSectionProps> = ({ data }) => {
  const dateListRef = useRef<HTMLDivElement | null>(null);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);

  const handleScroll = (direction: "left" | "right") => {
    if (!dateListRef.current) return;
    const scrollAmount = 200;
    const { scrollLeft, scrollWidth, clientWidth } = dateListRef.current;
    if (direction === "left") {
      dateListRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      dateListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
    const updatedScrollLeft =
      direction === "left"
        ? scrollLeft - scrollAmount
        : scrollLeft + scrollAmount;
    const tolerance = 5;
    setIsLeftDisabled(updatedScrollLeft <= 0);
    setIsRightDisabled(
      updatedScrollLeft + clientWidth >= scrollWidth - tolerance
    );
  };

  const handleScrollCheck = () => {
    if (!dateListRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = dateListRef.current;
    const tolerance = 5;
    setIsLeftDisabled(scrollLeft <= 0);
    setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth - tolerance);
  };

  const uniqueProjectionTimes = Array.from(
    new Set(
      data?.projections.flatMap((projection: any) =>
        projection.projectionTimes.map((pt: any) =>
          pt.time.split(":").slice(0, 2).join(":")
        )
      )
    )
  ).sort();

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={style.ticket_container}>
      <div className={style.ticket_content}>
        <div className={style.city_cinema}>
          <SelectDropdown title="Choose City" />
          <SelectDropdown title="Choose Cinema" />
        </div>
        <div
          className={style.date}
          ref={dateListRef}
          onScroll={handleScrollCheck}
        >
          <DateList type="movieDetails" selectedDate={today} />
        </div>
        <div className={style.arrows}>
          <div
            className={`${style.arrow} ${isLeftDisabled ? style.disabled : ""}`}
            role="button"
            tabIndex={isLeftDisabled ? -1 : 0}
            aria-disabled={isLeftDisabled}
            onClick={() => !isLeftDisabled && handleScroll("left")}
            onKeyDown={(e) =>
              e.key === "Enter" && !isLeftDisabled && handleScroll("left")
            }
          >
            <FaArrowLeft className={style.prev} />
          </div>
          <div
            className={`${style.arrow} ${
              isRightDisabled ? style.disabled : ""
            }`}
            role="button"
            tabIndex={isRightDisabled ? -1 : 0}
            aria-disabled={isRightDisabled}
            onClick={() => !isRightDisabled && handleScroll("right")}
            onKeyDown={(e) =>
              e.key === "Enter" && !isRightDisabled && handleScroll("right")
            }
          >
            <FaArrowRight className={style.next} />
          </div>
        </div>
        <div className={style.showtimes}>
          <p className={style.showtimes_title}>Showtimes</p>
          <div className={style.showtimes_container}>
            {uniqueProjectionTimes.map((time, index) => (
              <div key={index} className={style.showtime}>
                <p>{time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={style.button_container}>
        <Button
          text="Reserve Ticket"
          variant="outlined"
          className={style.button_reserve}
        />
        <Button
          text="Buy Ticket"
          variant="solid"
          className={style.button_buy}
        />
      </div>
    </div>
  );
};

export default TicketContainer;
