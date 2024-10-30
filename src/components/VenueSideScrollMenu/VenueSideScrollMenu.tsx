import s from "../../assets/css/venue-side-scroll-menu.module.css";
import { Venue } from "../../utils/types";

type Props = {
  venues: Venue[];
};

const VenueSideScrollMenu = ({ venues }: Props) => {
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
