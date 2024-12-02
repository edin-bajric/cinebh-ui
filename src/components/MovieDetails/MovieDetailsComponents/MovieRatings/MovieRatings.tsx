import style from "../../movie-details.module.scss";
import { FaStar } from "react-icons/fa";

interface MovieRatingsProps {
  ratings?: { id: string; name: string; rating: string }[];
}

const MovieRatings = ({ ratings = [] }: MovieRatingsProps) => {
  return (
    <div className={style.movie_rating}>
      <div className={style.section_title}>
        <p className={style.divider}>|</p>
        <p>Ratings</p>
      </div>
      <div className={style.movie_rating_container}>
        {ratings.map((rating) => (
          <div key={rating.id} className={style.movie_rating_box}>
            <FaStar className={style.rating_star} />
            <div className={style.rating_info}>
              <p className={style.rating_value}>{rating.rating}</p>
              <p className={style.rating_provider}>{rating.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRatings;
