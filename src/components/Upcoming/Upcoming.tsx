import { useMemo, useCallback, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import style from "./upcoming.module.scss";
import CurrentlyShowingAndUpcomingTitle from "../CurrentlyShowingAndUpcomingTitle";
import Search from "../Search";
import UpcomingMovieList from "./UpcomingMovieList";
import useAllVenues from "../../hooks/useAllVenues";
import useGenres from "../../hooks/useGenres";
import UpcomingFilters from "./UpcomingFilters";
import CurrentlyShowingAndUpcomingNotFound from "../CurrentlyShowingAndUpcomingNotFound";

const INITIAL_PAGE_SIZE = 2;

const Upcoming = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalItems, setTotalItems] = useState(0);

  const filters = {
    title: searchParams.get("title") || "",
    city: searchParams.get("city") || "",
    cinema: searchParams.get("cinema") || "",
    genres: searchParams.get("genres") || "",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
  };

  const size = parseInt(searchParams.get("size") || `${INITIAL_PAGE_SIZE}`, 10);

  const { data: venuesData } = useAllVenues();
  const { data: genresData } = useGenres();

  const uniqueCities = useMemo(
    () => Array.from(new Set(venuesData?.map((venue) => venue.city)) || []),
    [venuesData]
  );

  const updateSearchParams = (newParams: Record<string, string | number>) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, String(value));
      } else {
        currentParams.delete(key);
      }
    });

    setSearchParams(currentParams);
  };

  const handleFilterChange = useCallback(
    (
      filterType: string,
      value: string | { startDate: string; endDate: string }
    ) => {
      if (filterType === "dateRange" && typeof value === "object") {
        const { startDate, endDate } = value;

        updateSearchParams({
          startDate,
          endDate,
        });
      } else {
        updateSearchParams({ [filterType]: value as string });
      }
    },
    [updateSearchParams]
  );

  const handleSizeChange = useCallback(
    (newSize: number) => {
      updateSearchParams({ size: newSize });
    },
    [updateSearchParams]
  );

  useEffect(() => {
    if (!searchParams.has("size")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("size", `${INITIAL_PAGE_SIZE}`);
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className={style.container}>
      <CurrentlyShowingAndUpcomingTitle
        type="upcoming"
        totalItems={totalItems}
      />
      <Search
        onSearch={(e) => {
          e.preventDefault();
          const newTitle =
            (e.target as HTMLFormElement).querySelector("input")?.value || "";
          updateSearchParams({ title: newTitle });
        }}
        title={filters.title}
      />
      <UpcomingFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        venues={venuesData?.map((venue) => venue.name) || []}
        cities={uniqueCities}
        genres={genresData?.map((genre) => genre.name) || []}
      />
      {totalItems === 0 && (
        <CurrentlyShowingAndUpcomingNotFound type="upcoming" />
      )}
      <UpcomingMovieList
        filters={filters}
        size={size}
        onSizeChange={handleSizeChange}
        setTotalItems={setTotalItems}
      />
    </div>
  );
};

export default Upcoming;
