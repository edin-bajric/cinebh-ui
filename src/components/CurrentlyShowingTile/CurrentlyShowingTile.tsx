import style from "./currently-showing-tile.module.scss";
import CurrentlyShowingCard from "../CurrentlyShowingCard";

const CurrentlyShowingTile = () => {
  const cards = Array(10).fill(null); 

  return (
    <div className={style.container}>
      <div className={style.content}>
        {cards.map((_, index) => (
          <CurrentlyShowingCard key={index} />
        ))}
        <div className={style.load_more}>
          <p className={style.load_more_text}>Load more</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyShowingTile;
