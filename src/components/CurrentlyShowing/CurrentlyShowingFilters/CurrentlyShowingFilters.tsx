import React, { useCallback } from "react";
import SelectDropdown from "../../SelectDropdown";
import DateList from "../../DateList";
import style from "./currently-showing-filters.module.scss";

type FiltersProps = {
  filters: {
    title: string;
    city: string;
    cinema: string;
    genres: string;
    projectionTime: string;
    date: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
  venues: string[];
  cities: string[];
  genres: string[];
  projectionTimes: string[];
};

const CurrentlyShowingFilters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  venues,
  cities,
  genres,
  projectionTimes,
}) => {
  const handleFilterChange = useCallback(
    (filterType: string, value: string) => {
      onFilterChange(filterType, value);
    },
    [onFilterChange]
  );

  const projectionTimesMap = projectionTimes.reduce((acc, time) => {
    acc[time.slice(0, 5)] = time;
    return acc;
  }, {} as Record<string, string>);

  const displayProjectionTimes = Object.keys(projectionTimesMap);

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
        <SelectDropdown
          title="All Projection Times"
          data={displayProjectionTimes}
          onSelect={(value) =>
            handleFilterChange("projectionTime", projectionTimesMap[value])
          }
          selectedValue={filters.projectionTime.slice(0, 5)}
        />
      </div>
      <div className={style.dates}>
        <DateList
          onDateSelect={(value) => handleFilterChange("date", value)}
          selectedDate={filters.date}
        />
      </div>
    </div>
  );
};

export default CurrentlyShowingFilters;
