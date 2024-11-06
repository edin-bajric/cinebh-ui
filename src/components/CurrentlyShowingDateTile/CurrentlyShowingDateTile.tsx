import CurrentlyShowingDate from "../CurrentlyShowingDate";
import style from "./currently-showing-date-tile.module.scss";

const CurrentlyShowingDateTile = () => {
  const dates = Array(10).fill(null); 

  return (
    <div className={style.container}>
      {dates.map((_, index) => (
        <CurrentlyShowingDate key={index} />
      ))}
    </div>
  );
};

export default CurrentlyShowingDateTile;
