import { useMemo, useCallback, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import style from "./currently-showing.module.scss";
import CurrentlyShowingAndUpcomingTitle from "../CurrentlyShowingAndUpcomingTitle";
import Search from "../Search";
import CurrentlyShowingMovieList from "./CurrentlyShowingMovieList";
import useAllVenues from "../../hooks/useAllVenues";
import useGenres from "../../hooks/useGenres";
import useProjectionTimes from "../../hooks/useProjectionTimes";
import CurrentlyShowingFilters from "./CurrentlyShowingFilters";
import CurrentlyShowingAndUpcomingNotFound from "../CurrentlyShowingAndUpcomingNotFound";

const INITIAL_PAGE_SIZE = 2;

const CurrentlyShowing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalItems, setTotalItems] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    let hasChanged = false;

    if (!searchParams.has("size")) {
      newParams.set("size", `${INITIAL_PAGE_SIZE}`);
      hasChanged = true;
    }
    if (!searchParams.has("date")) {
      newParams.set("date", today);
      hasChanged = true;
    }

    if (hasChanged) {
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams, today]);

  const filters = {
    title: searchParams.get("title") || "",
    city: searchParams.get("city") || "",
    cinema: searchParams.get("cinema") || "",
    genres: searchParams.get("genres") || "",
    projectionTime: searchParams.get("projectionTime") || "",
    date: searchParams.get("date") || today,
  };

  const size = parseInt(searchParams.get("size") || `${INITIAL_PAGE_SIZE}`, 10);

  const { data: venuesData } = useAllVenues();
  const { data: genresData } = useGenres();
  const { data: projectionTimesData } = useProjectionTimes();

  const uniqueCities = useMemo(
    () => Array.from(new Set(venuesData?.map((venue) => venue.city)) || []),
    [venuesData]
  );

  const uniqueProjectionTimes = useMemo(
    () =>
      Array.from(
        new Set(projectionTimesData?.map((projection) => projection.time)) || []
      ),
    [projectionTimesData]
  );

  const updateSearchParams = useCallback(
    (params: Record<string, string | number>) => {
      const newParams = new URLSearchParams(searchParams);
      let hasChanged = false;

      Object.entries(params).forEach(([key, value]) => {
        if (value && `${searchParams.get(key)}` !== `${value}`) {
          newParams.set(key, `${value}`);
          hasChanged = true;
        } else if (!value && searchParams.has(key)) {
          newParams.delete(key);
          hasChanged = true;
        }
      });

      if (hasChanged) {
        setSearchParams(newParams, { replace: false });
      }
    },
    [searchParams, setSearchParams]
  );

  const handleFilterChange = useCallback(
    (filterType: string, value: string) => {
      updateSearchParams({ [filterType]: value });
    },
    [updateSearchParams]
  );

  const handleSizeChange = useCallback(
    (newSize: number) => {
      updateSearchParams({ size: newSize });
    },
    [updateSearchParams]
  );

  return (
    <div className={style.container}>
      <CurrentlyShowingAndUpcomingTitle
        type="currentlyShowing"
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
      <CurrentlyShowingFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        venues={venuesData?.map((venue) => venue.name) || []}
        cities={uniqueCities}
        genres={genresData?.map((genre) => genre.name) || []}
        projectionTimes={uniqueProjectionTimes}
      />
      <div className={style.reminder}>
        <p>
          Quick reminder that our cinema schedule is on a ten-day update cycle.
        </p>
      </div>
      {totalItems === 0 && (
        <CurrentlyShowingAndUpcomingNotFound type="currently-showing" />
      )}
      <CurrentlyShowingMovieList
        filters={filters}
        size={size}
        onSizeChange={handleSizeChange}
        setTotalItems={setTotalItems}
      />
    </div>
  );
};

export default CurrentlyShowing;
