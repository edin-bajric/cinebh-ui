import style from "./currently-showing.module.scss";
import CurrentlyShowingAndUpcomingTitle from "../CurrentlyShowingAndUpcomingTitle";
import Search from "../Search";
import Filter from "../Filter";

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
    </div>
  );
};

export default CurrentlyShowing;
