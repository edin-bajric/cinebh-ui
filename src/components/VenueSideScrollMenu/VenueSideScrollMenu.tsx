import style from "./venue-side-scroll-menu.module.scss";
import useAllVenues from "../../hooks/useAllVenues";
import Spinner from "../Spinner";
import Error from "../Error";

const VenueSideScrollMenu = () => {
  const {
    data: venues = [],
    isLoading: isLoading,
    isError: isError,
  } = useAllVenues();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Error />;
  }

  const repeatedVenues = Array(6).fill(venues).flat();

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
