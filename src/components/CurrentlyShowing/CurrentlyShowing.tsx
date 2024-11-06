import style from "./currently-showing.module.scss";
import CurrentlyShowingAndUpcomingTitle from "../CurrentlyShowingAndUpcomingTitle";
import Search from "../Search";
import Filter from "../Filter";
import CurrentlyShowingDateTile from "../CurrentlyShowingDateTile";
import CurrentlyShowingTile from "../CurrentlyShowingTile";

const CurrentlyShowing = () => {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <CurrentlyShowingAndUpcomingTitle
          type="currentlyShowing"
          totalItems={10}
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
        <CurrentlyShowingTile />
      </div>
    </div>
  );
};

export default CurrentlyShowing;
