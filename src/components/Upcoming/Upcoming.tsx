import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import style from "./upcoming.module.scss";
import CurrentlyShowingAndUpcomingTitle from "../CurrentlyShowingAndUpcomingTitle";
import Search from "../Search";
import Filter from "../Filter";
import UpcomingTile from "../UpcomingTile";
import useAllVenues from "../../hooks/useAllVenues";
import useGenres from "../../hooks/useGenres";
import useUpcoming from "../../hooks/useUpcoming";
import CurrentlyShowingAndUpcomingNotFound from "../CurrentlyShowingAndUpcomingNotFound";

const INITIAL_PAGE_SIZE = 2;
const PAGE_INCREMENT = 2;
const PAGE_DEFAULT = 0;

const Upcoming = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const today = new Date().toISOString().split("T")[0];
  const selectedTitle = searchParams.get("title") || "";
  const selectedCity = searchParams.get("city") || "";
  const selectedVenue = searchParams.get("cinema") || "";
  const selectedGenre = searchParams.get("genres") || "";
  const selectedStartDate = searchParams.get("startDate") || today;
  const selectedEndDate = searchParams.get("endDate") || today;
  const sizeFromUrl = parseInt(
    searchParams.get("size") || `${INITIAL_PAGE_SIZE}`,
    10
  );

  const [size, setSize] = useState(sizeFromUrl);

  const { data: venuesData } = useAllVenues();
  const { data: genresData } = useGenres();
  const { data, isLoading, error } = useUpcoming(
    PAGE_DEFAULT,
    size,
    selectedTitle,
    selectedCity,
    selectedVenue,
    selectedGenre,
    selectedStartDate,
    selectedEndDate
  );

  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("size", size.toString());
      if (selectedTitle) newParams.set("title", selectedTitle);
      if (selectedCity) newParams.set("city", selectedCity);
      if (selectedVenue) newParams.set("cinema", selectedVenue);
      if (selectedGenre) newParams.set("genres", selectedGenre);
      if (selectedStartDate) newParams.set("startDate", selectedStartDate);
      if (selectedEndDate) newParams.set("endDate", selectedEndDate);
      return newParams;
    });
  }, [
    size,
    selectedTitle,
    selectedCity,
    selectedVenue,
    selectedGenre,
    selectedStartDate,
    selectedEndDate,
    setSearchParams,
  ]);

  const handleLoadMore = () => {
    setSize((prevSize) => prevSize + PAGE_INCREMENT);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchInput = (e.target as HTMLFormElement).querySelector(
      "input"
    ) as HTMLInputElement;
    const newTitle = searchInput.value;
    setSize(INITIAL_PAGE_SIZE);
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("size", `${INITIAL_PAGE_SIZE}`);
      newParams.set("title", newTitle);
      return newParams;
    });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setSize(INITIAL_PAGE_SIZE);
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("size", `${INITIAL_PAGE_SIZE}`);
      if (filterType === "city") newParams.set("city", value);
      if (filterType === "cinema") newParams.set("cinema", value);
      if (filterType === "genres") newParams.set("genres", value);
      if (filterType === "startDate") newParams.set("startDate", value);
      if (filterType === "endDate") newParams.set("endDate", value);
      return newParams;
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies.</p>;

  const uniqueCities = Array.from(
    new Set(venuesData?.map((venue) => venue.city))
  );
  <div className={style.search}>
        <Search onSearch={handleSearch} title={selectedTitle} />
      </div>
  return (
    <div className={style.container}>
      <div className={style.title}>
      <CurrentlyShowingAndUpcomingTitle
          type="upcoming"
          totalItems={data?.totalElements || 0}
        />
      </div>
      <div className={style.search}>
        <Search onSearch={handleSearch} title={selectedTitle} />
      </div>
      <div className={style.filters}>
      <Filter
          title="Cities"
          data={uniqueCities}
          onSelect={(value) => handleFilterChange("city", value)}
          selectedValue={selectedCity}
        />
        <Filter
          title="Venues"
          data={venuesData?.map((venue) => venue.name) || []}
          onSelect={(value) => handleFilterChange("cinema", value)}
          selectedValue={selectedVenue}
        />
        <Filter
          title="Genres"
          data={genresData?.map((genre) => genre.name) || []}
          onSelect={(value) => handleFilterChange("genres", value)}
          selectedValue={selectedGenre}
        />
      </div>
      <div className={style.upcoming}>
      {data?.content.length === 0 && (
          <CurrentlyShowingAndUpcomingNotFound type="upcoming" />
        )}
        <UpcomingTile movies={data?.content || []} onLoadMore={handleLoadMore} totalItems={data?.totalElements || 0}/>
      </div>
    </div>
  )
}

export default Upcoming