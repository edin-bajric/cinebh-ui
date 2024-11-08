import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import style from "./currently-showing.module.scss";
import CurrentlyShowingAndUpcomingTitle from "../CurrentlyShowingAndUpcomingTitle";
import Search from "../Search";
import Filter from "../Filter";
import CurrentlyShowingDateTile from "../CurrentlyShowingDateTile";
import CurrentlyShowingTile from "../CurrentlyShowingTile";
import useCurrentlyShowing from "../../hooks/useCurrentlyShowing";
import useAllVenues from "../../hooks/useAllVenues";

const INITIAL_PAGE_SIZE = 2;
const PAGE_INCREMENT = 2;
const PAGE_DEFAULT = 0;

const CurrentlyShowing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTitle = searchParams.get("title") || "";
  const selectedCity = searchParams.get("city") || "";
  const sizeFromUrl = parseInt(searchParams.get("size") || `${INITIAL_PAGE_SIZE}`, 10);
  const [size, setSize] = useState(sizeFromUrl);

  const { data: venuesData } = useAllVenues();
  const { data, isLoading, error } = useCurrentlyShowing(PAGE_DEFAULT, size, selectedTitle, selectedCity);

  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("size", size.toString());
      if (selectedTitle) newParams.set("title", selectedTitle);
      if (selectedCity) newParams.set("city", selectedCity);
      return newParams;
    });
  }, [size, selectedTitle, selectedCity, setSearchParams]);

  const handleLoadMore = () => {
    setSize((prevSize) => prevSize + PAGE_INCREMENT);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchInput = (e.target as HTMLFormElement).querySelector("input") as HTMLInputElement;
    const newTitle = searchInput.value;
    setSize(INITIAL_PAGE_SIZE);
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("size", `${INITIAL_PAGE_SIZE}`);
      newParams.set("title", newTitle);
      return newParams;
    });
  };

  const handleCityFilter = (city: string) => {
    setSize(INITIAL_PAGE_SIZE);
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("size", `${INITIAL_PAGE_SIZE}`);
      newParams.set("city", city);
      return newParams;
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies.</p>;

  const uniqueCities = Array.from(new Set(venuesData?.map((venue) => venue.city)));

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
        <Filter title={"Cities"} data={uniqueCities} onSelect={handleCityFilter} />
      </div>
      <div className={style.dates}>
        <CurrentlyShowingDateTile />
      </div>
      <div className={style.reminder}>
        <p>Quick reminder that our cinema schedule is on a ten-day update cycle.</p>
      </div>
      <div className={style.showing}>
        <CurrentlyShowingTile
          movies={data?.content || []}
          onLoadMore={handleLoadMore}
          totalItems={data?.totalElements || 0}
        />
      </div>
    </div>
  );
};

export default CurrentlyShowing;
