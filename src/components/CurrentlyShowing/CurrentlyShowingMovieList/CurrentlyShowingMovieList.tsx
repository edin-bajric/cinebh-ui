import style from "./currently-showing-movie-list.module.scss";
import CurrentlyShowingCard from "../CurrentlyShowingCard";
import { Movie } from "../../../utils/types";
import classNames from "classnames";

type CurrentlyShowingMovieListProps = {
  movies: Movie[];
  onLoadMore: () => void;
  totalItems: number;
};

const CurrentlyShowingMovieList: React.FC<CurrentlyShowingMovieListProps> = ({
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
          className={classNames(style.load_more, {
            [style.disabled]: isLoadMoreDisabled,
            [style.hidden]: isNoMovies,
          })}
          onClick={!isLoadMoreDisabled ? onLoadMore : undefined}
        >
          <p className={style.load_more_text}>Load more</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyShowingMovieList;
