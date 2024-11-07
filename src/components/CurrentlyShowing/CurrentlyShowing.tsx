import { useState } from "react";
import style from "./currently-showing.module.scss";
import CurrentlyShowingAndUpcomingTitle from "../CurrentlyShowingAndUpcomingTitle";
import Search from "../Search";
import Filter from "../Filter";
import CurrentlyShowingDateTile from "../CurrentlyShowingDateTile";
import CurrentlyShowingTile from "../CurrentlyShowingTile";
import useCurrentlyShowing from "../../hooks/useCurrentlyShowing";
import useCurrentlyShowingSearch from "../../hooks/useCurrentlyShowingSearch";

const DEFAULT_PAGE = 0;
const INITIAL_PAGE_SIZE = 2;
const PAGE_INCREMENT = 2;

const CurrentlyShowing = () => {
  const [size, setSize] = useState(INITIAL_PAGE_SIZE);
  const [query, setQuery] = useState<string>("");
  const { data, isLoading, error } = useCurrentlyShowing(DEFAULT_PAGE, size);
  const searchResults = useCurrentlyShowingSearch(query, DEFAULT_PAGE, size);

  const handleLoadMore = () => {
    setSize((prevSize) => prevSize + PAGE_INCREMENT);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchInput = (e.target as HTMLFormElement).querySelector("input") as HTMLInputElement;
    setQuery(searchInput.value);
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
        <Search onSearch={handleSearch} />
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
