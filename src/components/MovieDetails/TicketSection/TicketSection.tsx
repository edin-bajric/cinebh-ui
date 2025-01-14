import React, { useRef, useState, useMemo, useCallback } from "react";
import style from "./ticket-section.module.scss";
import SelectDropdown from "../../SelectDropdown";
import DateList from "../../DateList";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Button from "../../Button";
import { Movie } from "../../../utils/types";
import Showtimes from "../../Showtimes";
import useProjectionDetails from "../../../hooks/useProjectionDetails";
import { useNavigate } from "react-router-dom";

interface TicketSectionProps {
  data: Movie | undefined;
}

const TicketContainer: React.FC<TicketSectionProps> = ({ data }) => {
  const dateListRef = useRef<HTMLDivElement | null>(null);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);

  const { data: projectionDetails } = useProjectionDetails(data?.id || "");

  const [filters, setFilters] = useState({
    city: "",
    cinema: "",
    date: new Date().toISOString().split("T")[0],
    showtime: "",
  });

  const uniqueCities = useMemo(
    () => Array.from(new Set(projectionDetails?.cities || [])),
    [projectionDetails]
  );

  const cinemas = useMemo(
    () => Array.from(new Set(projectionDetails?.cinemas || [])),
    [projectionDetails]
  );

  const uniqueProjectionTimes = useMemo(
    () =>
      Array.from(new Set(projectionDetails?.projectionTimes || []))
        .map((time) => time.split(":").slice(0, 2).join(":"))
        .sort(),
    [projectionDetails]
  );

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

  const handleFilterChange = useCallback(
    (filterType: string, value: string) => {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
    },
    []
  );

  const handleShowtimeSelect = (time: string) => {
    setFilters((prev) => ({ ...prev, showtime: time }));
  };

  const navigate = useNavigate();

  const handleBuyTicket = () => {
    if (!data || !projectionDetails) return;
  
    navigate("/buy-ticket", {
      state: {
        movie: data,
        filters,
        projectionDetails: {
          streets: projectionDetails.streets,
          postcodes: projectionDetails.postcodes,
          streetNumbers: projectionDetails.streetNumbers,
          hallNames: projectionDetails.hallNames,
          hallIds: projectionDetails.hallIds,
          projectionIds: projectionDetails.projectionIds,
        },
      },
    });
  };  

  return (
    <div className={style.ticket_container}>
      <div className={style.ticket_content}>
        <div className={style.city_cinema}>
          <SelectDropdown
            title="Choose City"
            data={uniqueCities}
            onSelect={(value) => handleFilterChange("city", value)}
            selectedValue={filters.city}
          />
          <SelectDropdown
            title="Choose Cinema"
            data={cinemas}
            onSelect={(value) => handleFilterChange("cinema", value)}
            selectedValue={filters.cinema}
          />
        </div>
        <div
          className={style.date}
          ref={dateListRef}
          onScroll={handleScrollCheck}
        >
          <DateList
            type="movieDetails"
            selectedDate={filters.date}
            onDateSelect={(value) => handleFilterChange("date", value)}
          />
        </div>
        <div className={style.arrows}>
          <div
            className={`${style.arrow} ${
              isLeftDisabled ? style.disabled : ""
            }`}
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
        <Showtimes
          times={uniqueProjectionTimes}
          variant="ticket"
          selectedTime={filters.showtime}
          onSelectTime={handleShowtimeSelect}
        />
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
          onClick={handleBuyTicket}
        />
      </div>
    </div>
  );
};

export default TicketContainer;
