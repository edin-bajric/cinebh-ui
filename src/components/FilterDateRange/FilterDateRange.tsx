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

  const formatDateManually = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const [startDateInput, setStartDateInput] = useState(
    startDate ? formatDateManually(startDate) : ""
  );
  const [endDateInput, setEndDateInput] = useState(
    endDate ? formatDateManually(endDate) : ""
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const calendarRef = useRef(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start || undefined);
    setEndDate(end || undefined);
    setStartDateInput(start ? formatDateManually(start) : "");
    setEndDateInput(end ? formatDateManually(end) : "");
  };

  const handleCancel = () => {
    setStartDate(selectedStartDate ? new Date(selectedStartDate) : undefined);
    setEndDate(selectedEndDate ? new Date(selectedEndDate) : undefined);
    setStartDateInput(startDate ? formatDateManually(startDate) : "");
    setEndDateInput(endDate ? formatDateManually(endDate) : "");
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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "start" | "end"
  ) => {
    const value = event.target.value;
    if (type === "start") setStartDateInput(value);
    if (type === "end") setEndDateInput(value);
  };

  const handleInputBlur = (type: "start" | "end") => {
    const value = type === "start" ? startDateInput : endDateInput;
    const [day, month, year] = value.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    if (
      !isNaN(date.getTime()) &&
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    ) {
      if (type === "start") setStartDate(date);
      if (type === "end") setEndDate(date);
    }
  };

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
              startDate && endDate ? style.selected : ""
            }`}
          >
            {startDate && endDate
              ? `${formatDateManually(startDate)} - ${formatDateManually(
                  endDate
                )}`
              : "Date Range"}
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
              <input
                type="text"
                className={style.date_value}
                placeholder="DD/MM/YYYY"
                value={startDateInput}
                onChange={(e) => handleInputChange(e, "start")}
                onBlur={() => handleInputBlur("start")}
              />
            </div>
            <div className={style.date}>
              <p className={style.date_name}>End Date</p>
              <input
                type="text"
                className={style.date_value}
                placeholder="DD/MM/YYYY"
                value={endDateInput}
                onChange={(e) => handleInputChange(e, "end")}
                onBlur={() => handleInputBlur("end")}
              />
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
