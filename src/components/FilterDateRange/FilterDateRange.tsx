import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "./react-datepicker.css";
import style from "./filter-date-range.module.scss";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import Button from "../Button";

type FilterDateRangeProps = {
  onSelect: (startDate: Date, endDate: Date) => void;
  selectedStartDate?: string;
  selectedEndDate?: string;
};

const FilterDateRange: React.FC<FilterDateRangeProps> = ({
  onSelect,
  selectedStartDate,
  selectedEndDate,
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    selectedStartDate ? new Date(selectedStartDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    selectedEndDate ? new Date(selectedEndDate) : undefined
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const calendarRef = useRef(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start || undefined);
    setEndDate(end || undefined);
  };

  const handleCancel = () => {
    setStartDate(selectedStartDate ? new Date(selectedStartDate) : undefined);
    setEndDate(selectedEndDate ? new Date(selectedEndDate) : undefined);
    setShowCalendar(false);
    setIsActive(false);
  };

  const handleApply = () => {
    if (startDate && endDate) {
      onSelect(startDate, endDate);
    }
    setShowCalendar(false);
    setIsActive(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    setIsActive(!isActive);
  };

  const formattedDateRange =
    startDate && endDate
      ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      : "Date Range";

  return (
    <div className={style.container}>
      <div
        className={`${style.filter_container} ${isActive ? style.active : ""}`}
        onClick={toggleCalendar}
      >
        <div className={style.filter}>
          <FaCalendarAlt
            className={`${style.icon} ${isActive ? style.icon_active : ""}`}
          />
          <p
            className={`${style.title} ${
              formattedDateRange !== "Date Range" ? style.selected : ""
            }`}
          >
            {formattedDateRange}
          </p>
        </div>
        <FaChevronDown
          className={`${style.dropdown_icon} ${
            isActive ? style.icon_active : ""
          }`}
        />
      </div>

      {showCalendar && (
        <div ref={calendarRef} className={style.calendar_dropdown}>
          <div className={style.date_container}>
            <div className={style.date}>
              <p className={style.date_name}>Start Date</p>
              <p className={style.date_value}>
                {startDate?.toLocaleDateString()}
              </p>
            </div>
            <div className={style.date}>
              <p className={style.date_name}>End Date</p>
              <p className={style.date_value}>
                {endDate?.toLocaleDateString()}
              </p>
            </div>
          </div>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            className={style.datepicker}
            formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3)}
            minDate={new Date()}
            renderDayContents={(day) => <span>{day}</span>}
          />
          <div className={style.button_container}>
            <Button
              text="Cancel"
              variant="outlined"
              onClick={handleCancel}
              className={style.button}
            />
            <Button
              text="Apply"
              variant="solid"
              onClick={handleApply}
              className={style.button}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDateRange;
