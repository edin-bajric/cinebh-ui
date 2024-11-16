import style from "./navbar.module.scss";
import Icon from "../Icon";
import Button from "../Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }; 

  return (
    <div className={style.container}>
      <Icon />
      <div className={style.nav}>
        <Link to="/currently-showing" className={style.link} onClick={scrollToTop}>
          Currently Showing
        </Link>
        <Link to="/upcoming" className={style.link} onClick={scrollToTop}>
          Upcoming Movies
        </Link>
        <Link to="/venues" className={style.link} onClick={scrollToTop}>
          Venues
        </Link>
      </div>
      <Button text="Sign In" variant="navbar" className={style.button}/>
    </div>
  );
};

export default Navbar;
