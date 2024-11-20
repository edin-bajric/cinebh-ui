import style from "./venue-side-scroll-menu.module.scss";
import useAllVenues from "../../hooks/useAllVenues";
import Loading from "../Loading";
import Error from "../Error";

const REPEAT_COUNT = 6;

const VenueSideScrollMenu = () => {
  const { data: venues = [], isLoading, isError } = useAllVenues();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  const repeatedVenues = Array(REPEAT_COUNT).fill(venues).flat();

  return (
    <div className={style.container}>
      <div className={style.scrollContainer}>
        {repeatedVenues.map((venue, index) => (
          <div key={`${venue.id}-${index}`} className={style.venueItem}>
            {venue.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueSideScrollMenu;
