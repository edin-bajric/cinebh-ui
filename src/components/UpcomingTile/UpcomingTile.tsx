import style from "./upcoming-tile.module.scss";
import Card from "../Card";
import { Movie } from "../../utils/types";

type UpcomingTileProps = {
  movies: Movie[];
  onLoadMore: () => void;
  totalItems: number;
};

const UpcomingTile: React.FC<UpcomingTileProps> = ({
  movies,
  onLoadMore,
  totalItems,
}) => {
  const isLoadMoreDisabled = movies.length >= totalItems;
  const isNoMovies = movies.length === 0;

  return (
    <div className={style.container}>
      <div className={style.content}>
        {movies.map((item, index) => (
          <Card key={index} type="movie" data={item} page="upcoming" />
        ))}
      </div>
      <div
        className={`${style.load_more} ${
          isLoadMoreDisabled ? style.disabled : ""
        } ${isNoMovies ? style.hidden : ""}`}
        onClick={!isLoadMoreDisabled ? onLoadMore : undefined}
      >
        <p className={style.load_more_text}>Load more</p>
      </div>
    </div>
  );
};

export default UpcomingTile;
