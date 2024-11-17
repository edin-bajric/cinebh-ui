import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import style from "./currently-showing.module.scss";
import CurrentlyShowingAndUpcomingTitle from "../CurrentlyShowingAndUpcomingTitle";
import Search from "../Search";
import SelectDropdown from "../SelectDropdown";
import DateList from "../DateList";
import CurrentlyShowingMovieList from "./CurrentlyShowingMovieList";
import useCurrentlyShowing from "../../hooks/useCurrentlyShowing";
import useAllVenues from "../../hooks/useAllVenues";
import useGenres from "../../hooks/useGenres";
import useProjectionTimes from "../../hooks/useProjectionTimes";
import CurrentlyShowingAndUpcomingNotFound from "../CurrentlyShowingAndUpcomingNotFound";

const INITIAL_PAGE_SIZE = 2;
const PAGE_INCREMENT = 2;

const CurrentlyShowing = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const today = new Date().toISOString().split("T")[0];
  const selectedTitle = searchParams.get("title") || "";
  const selectedCity = searchParams.get("city") || "";
  const selectedVenue = searchParams.get("cinema") || "";
  const selectedGenre = searchParams.get("genres") || "";
  const selectedProjectionTime = searchParams.get("projectionTime") || "";
  const selectedDate = searchParams.get("date") || today;

  const [size, setSize] = useState(parseInt(searchParams.get("size") || `${INITIAL_PAGE_SIZE}`, 10));

  const { data: venuesData } = useAllVenues();
  const { data: genresData } = useGenres();
  const { data: projectionTimesData } = useProjectionTimes();
  const { data, isLoading, error } = useCurrentlyShowing(
    0,
    size,
    selectedTitle,
    selectedCity,
    selectedVenue,
    selectedGenre,
    selectedProjectionTime,
    selectedDate
  );

  const updateSearchParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key); 
    });
    setSearchParams(newParams);
  };

  const handleLoadMore = () => {
    const newSize = size + PAGE_INCREMENT;
    setSize(newSize);
    updateSearchParams({ size: newSize.toString() });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newTitle = (e.target as HTMLFormElement).querySelector("input")?.value || "";
    setSize(INITIAL_PAGE_SIZE);
    updateSearchParams({ title: newTitle, size: `${INITIAL_PAGE_SIZE}` });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setSize(INITIAL_PAGE_SIZE);
    updateSearchParams({ [filterType]: value, size: `${INITIAL_PAGE_SIZE}` });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies.</p>;

  const uniqueCities = Array.from(new Set(venuesData?.map((venue) => venue.city)));
  const uniqueProjectionTimes = Array.from(new Set(projectionTimesData?.map((projection) => projection.time)));

  return (
    <div className={style.container}>
      <div className={style.title}>
        <CurrentlyShowingAndUpcomingTitle
          type="currentlyShowing"
          totalItems={data?.totalElements || 0}
        />
      </div>
      <div className={style.search}>
        <Search onSearch={handleSearch} title={selectedTitle} />
      </div>
      <div className={style.filters}>
        <SelectDropdown
          title="Cities"
          data={uniqueCities}
          onSelect={(value) => handleFilterChange("city", value)}
          selectedValue={selectedCity}
        />
        <SelectDropdown
          title="Venues"
          data={venuesData?.map((venue) => venue.name) || []}
          onSelect={(value) => handleFilterChange("cinema", value)}
          selectedValue={selectedVenue}
        />
        <SelectDropdown
          title="Genres"
          data={genresData?.map((genre) => genre.name) || []}
          onSelect={(value) => handleFilterChange("genres", value)}
          selectedValue={selectedGenre}
        />
        <SelectDropdown
          title="Projection Times"
          data={uniqueProjectionTimes}
          onSelect={(value) => handleFilterChange("projectionTime", value)}
          selectedValue={selectedProjectionTime}
        />
      </div>
      <div className={style.dates}>
        <DateList
          onDateSelect={(value) => handleFilterChange("date", value)}
          selectedDate={selectedDate}
        />
      </div>
      <div className={style.reminder}>
        <p>Quick reminder that our cinema schedule is on a ten-day update cycle.</p>
      </div>
      <div className={style.showing}>
        {data?.content.length === 0 && (
          <CurrentlyShowingAndUpcomingNotFound type="currently-showing" />
        )}
        <CurrentlyShowingMovieList
          movies={data?.content || []}
          onLoadMore={handleLoadMore}
          totalItems={data?.totalElements || 0}
        />
      </div>
    </div>
  );
};

export default CurrentlyShowing;
