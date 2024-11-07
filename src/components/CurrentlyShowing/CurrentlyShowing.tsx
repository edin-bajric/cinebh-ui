import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import style from "./currently-showing.module.scss";
import CurrentlyShowingAndUpcomingTitle from "../CurrentlyShowingAndUpcomingTitle";
import Search from "../Search";
import Filter from "../Filter";
import CurrentlyShowingDateTile from "../CurrentlyShowingDateTile";
import CurrentlyShowingTile from "../CurrentlyShowingTile";
import useCurrentlyShowing from "../../hooks/useCurrentlyShowing";
import useCurrentlyShowingSearch from "../../hooks/useCurrentlyShowingSearch";

const INITIAL_PAGE_SIZE = 2;
const PAGE_INCREMENT = 2;
const PAGE_DEFAULT = 0;

const CurrentlyShowing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const sizeFromUrl = parseInt(searchParams.get("size") || `${INITIAL_PAGE_SIZE}`, 10);
  const [size, setSize] = useState(sizeFromUrl);

  const { data, isLoading, error } = useCurrentlyShowing(PAGE_DEFAULT, size);
  const searchResults = useCurrentlyShowingSearch(query, PAGE_DEFAULT, size);

  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("size", size.toString());
      if (query) {
        newParams.set("query", query);
      }
      return newParams;
    });
  }, [size, query, setSearchParams]);

  const handleLoadMore = () => {
    setSize((prevSize) => prevSize + PAGE_INCREMENT);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchInput = (e.target as HTMLFormElement).querySelector("input") as HTMLInputElement;
    const newQuery = searchInput.value;
    setSearchParams({ size: `${INITIAL_PAGE_SIZE}` }); 
    setSize(INITIAL_PAGE_SIZE);
    if (newQuery) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set("query", newQuery); 
        return newParams;
      });
    }
  };

  const moviesData = query ? searchResults.data : data;
  const isFetching = query ? searchResults.isLoading : isLoading;

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error loading movies.</p>;

  return (
    <div className={style.container}>
      <div className={style.title}>
        <CurrentlyShowingAndUpcomingTitle
          type="currentlyShowing"
          totalItems={moviesData?.totalElements || 0}
        />
      </div>
      <div className={style.search}>
        <Search onSearch={handleSearch} query={query} />
      </div>
      <div className={style.filters}>
        <Filter />
        <Filter />
        <Filter />
        <Filter />
      </div>
      <div className={style.dates}>
        <CurrentlyShowingDateTile />
      </div>
      <div className={style.reminder}>
        <p>Quick reminder that our cinema schedule is on a ten-day update cycle.</p>
      </div>
      <div className={style.showing}>
        <CurrentlyShowingTile
          movies={moviesData?.content || []}
          onLoadMore={handleLoadMore}
          totalItems={moviesData?.totalElements || 0}
        />
      </div>
    </div>
  );
};

export default CurrentlyShowing;
