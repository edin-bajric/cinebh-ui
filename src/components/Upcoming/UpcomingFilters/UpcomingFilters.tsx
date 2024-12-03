import React, { useCallback } from "react";
import SelectDropdown from "../../SelectDropdown";
import DateRangePicker from "../../FilterDateRange";
import style from "./upcoming-filters.module.scss";

type FiltersProps = {
  filters: {
    title: string;
    city: string;
    cinema: string;
    genres: string;
    startDate: string;
    endDate: string;
  };
  onFilterChange: (
    filterType: string,
    value: string | { startDate: string; endDate: string }
  ) => void;
  venues: string[];
  cities: string[];
  genres: string[];
};

const UpcomingFilters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  venues,
  cities,
  genres,
}) => {
  const handleFilterChange = useCallback(
    (filterType: string, value: string) => {
      onFilterChange(filterType, value);
    },
    [onFilterChange]
  );

  const handleDateRangeSelect = useCallback(
    (startDate: Date, endDate: Date) => {
      const formatDate = (date: Date) =>
        new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0];

      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      onFilterChange("dateRange", {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    },
    [onFilterChange]
  );

  return (
    <div className={style.container}>
      <div className={style.filters}>
        <SelectDropdown
          title="All Cities"
          data={cities}
          onSelect={(value) => handleFilterChange("city", value)}
          selectedValue={filters.city}
        />
        <SelectDropdown
          title="All Venues"
          data={venues}
          onSelect={(value) => handleFilterChange("cinema", value)}
          selectedValue={filters.cinema}
        />
        <SelectDropdown
          title="All Genres"
          data={genres}
          onSelect={(value) => handleFilterChange("genres", value)}
          selectedValue={filters.genres}
        />
        <DateRangePicker
          onSelect={handleDateRangeSelect}
          selectedStartDate={filters.startDate}
          selectedEndDate={filters.endDate}
        />
      </div>
    </div>
  );
};

export default UpcomingFilters;
