import s from "../../assets/css/venue-side-scroll-menu.module.css";
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

  return (
    <div className={s.container}>
      <div className={s.scrollContainer}>
        {venues.map((venue) => (
          <div key={venue.id} className={s.venueItem}>
            {venue.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueSideScrollMenu;
