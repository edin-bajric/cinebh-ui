import style from "./currently-showing-and-upcoming-not-found.module.scss";
import { FaFilm } from "react-icons/fa6";
import { Link } from "react-router-dom";

type CurrentlyShowingAndUpcomingNotFoundProps = {
  type: "currently-showing" | "upcoming";
};

const CurrentlyShowingAndUpcomingNotFound: React.FC<
  CurrentlyShowingAndUpcomingNotFoundProps
> = ({ type }) => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <FaFilm className={style.icon} />
        <p className={style.title}>
          {type === "currently-showing"
            ? "No movies to preview for current date"
            : "No movies to preview for current date range"}
        </p>
        <p className={style.subtitle}>
          We are working on updating our schedule for upcoming movies. Stay
          tuned for amazing movie experience or explore our other exciting
          cinema features in the meantime!
        </p>
        <Link to="/upcoming" className={style.explore}>
          Explore Upcoming Movies
        </Link>
      </div>
    </div>
  );
};

export default CurrentlyShowingAndUpcomingNotFound;
