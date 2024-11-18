import { useCallback, useEffect } from "react";
import style from "./currently-showing-movie-list.module.scss";
import CurrentlyShowingCard from "../CurrentlyShowingCard";
import { Movie } from "../../../utils/types";
import classNames from "classnames";
import useCurrentlyShowing from "../../../hooks/useCurrentlyShowing";

type CurrentlyShowingMovieListProps = {
  filters: {
    title: string;
    city: string;
    cinema: string;
    genres: string;
    projectionTime: string;
    date: string;
  };
  size: number;
  onSizeChange: (newSize: number) => void;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
};

const CurrentlyShowingMovieList: React.FC<CurrentlyShowingMovieListProps> = ({
  filters,
  size,
  onSizeChange,
  setTotalItems,
}) => {
  const PAGE_INCREMENT = 2;

  const { data, isLoading, error } = useCurrentlyShowing(
    0,
    size,
    filters.title,
    filters.city,
    filters.cinema,
    filters.genres,
    filters.projectionTime,
    filters.date
  );

  const handleLoadMore = useCallback(() => {
    onSizeChange(size + PAGE_INCREMENT);
  }, [onSizeChange, size]);

  const movies = data?.content || [];
  const totalItems = data?.totalElements || 0;
  const isLoadMoreDisabled = movies.length >= totalItems;
  const isNoMovies = movies.length === 0;

  useEffect(() => {
    setTotalItems(totalItems);
  }, [totalItems, setTotalItems]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies.</p>;

  return (
    <div className={style.container}>
      <div className={style.content}>
        {movies.map((movie: Movie) => (
          <CurrentlyShowingCard key={movie.id} movie={movie} />
        ))}
        <div
          className={classNames(style.load_more, {
            [style.disabled]: isLoadMoreDisabled,
            [style.hidden]: isNoMovies,
          })}
          onClick={!isLoadMoreDisabled ? handleLoadMore : undefined}
        >
          <p className={style.load_more_text}>Load more</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyShowingMovieList;
