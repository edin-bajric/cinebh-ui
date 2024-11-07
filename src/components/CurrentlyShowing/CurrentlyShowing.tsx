import { useState, useEffect } from "react";
import style from "./currently-showing.module.scss";
import CurrentlyShowingAndUpcomingTitle from "../CurrentlyShowingAndUpcomingTitle";
import Search from "../Search";
import Filter from "../Filter";
import CurrentlyShowingDateTile from "../CurrentlyShowingDateTile";
import CurrentlyShowingTile from "../CurrentlyShowingTile";
import useCurrentlyShowing from "../../hooks/useCurrentlyShowing";

const DEFAULT_PAGE = 0;
const INITIAL_PAGE_SIZE = 2;
const PAGE_INCREMENT = 2;

const CurrentlyShowing = () => {
  const [size, setSize] = useState(INITIAL_PAGE_SIZE);
  const { data, isLoading, error, refetch } = useCurrentlyShowing(DEFAULT_PAGE, size);

  useEffect(() => {
    refetch();
  }, [size, refetch]);

  const handleLoadMore = () => {
    setSize((prevSize) => prevSize + PAGE_INCREMENT);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies.</p>;

  return (
    <div className={style.container}>
      <div className={style.title}>
        <CurrentlyShowingAndUpcomingTitle
          type="currentlyShowing"
          totalItems={data?.totalElements || 0}
        />
      </div>
      <div className={style.search}>
        <Search />
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
        <p>
          Quick reminder that our cinema schedule is on a ten-day update cycle.
        </p>
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
