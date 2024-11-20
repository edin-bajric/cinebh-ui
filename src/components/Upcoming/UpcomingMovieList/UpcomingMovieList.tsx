import { useCallback, useEffect } from "react";
import style from "./upcoming-movie-list.module.scss";
import Card from "../../Card";
import { Movie } from "../../../utils/types";
import classNames from "classnames";
import useUpcoming from "../../../hooks/useUpcoming";
import Error from "../../Error";
import Loading from "../../Loading";

type UpcomingMovieListProps = {
  filters: {
    title: string;
    city: string;
    cinema: string;
    genres: string;
    startDate: string;
    endDate: string;
  };
  size: number;
  onSizeChange: (newSize: number) => void;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
};

const UpcomingMovieList: React.FC<UpcomingMovieListProps> = ({
  filters,
  size,
  onSizeChange,
  setTotalItems,
}) => {
  const PAGE_INCREMENT = 2;

  const { data, isLoading, error } = useUpcoming(
    0,
    size,
    filters.title,
    filters.city,
    filters.cinema,
    filters.genres,
    filters.startDate,
    filters.endDate
  );

  const handleLoadMore = useCallback(() => {
    onSizeChange(size + PAGE_INCREMENT);
  }, [onSizeChange, size]);

  const movies = data?.content || [];
  const totalItems = data?.totalElements || 0;
  const isLoadMoreDisabled = movies.length >= totalItems;
  const isNoMovies = !isLoading && movies.length === 0;

  useEffect(() => {
    if (!isLoading) {
      setTotalItems(totalItems);
    }
  }, [totalItems, setTotalItems, isLoading]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className={style.container}>
      <div className={style.content}>
        {movies.map((movie: Movie) => (
          <Card key={movie.id} data={movie} type="movie" page="upcoming" />
        ))}
      </div>
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
  );
};

export default UpcomingMovieList;
