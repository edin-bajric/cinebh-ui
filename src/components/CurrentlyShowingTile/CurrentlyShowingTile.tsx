import style from "./currently-showing-tile.module.scss";
import CurrentlyShowingCard from "../CurrentlyShowingCard";
import { Movie } from "../../utils/types";

type CurrentlyShowingTileProps = {
  movies: Movie[];
  onLoadMore: () => void;
  totalItems: number;
};

const CurrentlyShowingTile: React.FC<CurrentlyShowingTileProps> = ({
  movies,
  onLoadMore,
  totalItems,
}) => {
  const isLoadMoreDisabled = movies.length >= totalItems;
  const isNoMovies = movies.length === 0;

  return (
    <div className={style.container}>
      <div className={style.content}>
        {movies.map((movie) => (
          <CurrentlyShowingCard key={movie.id} movie={movie} />
        ))}
        <div
          className={`${style.load_more} ${
            isLoadMoreDisabled ? style.disabled : ""
          } ${isNoMovies ? style.hidden : ""}`}
          onClick={!isLoadMoreDisabled ? onLoadMore : undefined}
        >
          <p className={style.load_more_text}>Load more</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyShowingTile;
