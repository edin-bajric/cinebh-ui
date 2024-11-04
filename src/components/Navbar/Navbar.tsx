import style from "./navbar.module.scss";
import Icon from "../Icon"; 
import Button from "../Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={style.container}>
      <Icon /> 
      <div className={style.nav}>
        <Link to="/currently-showing" className={style.link}>Currently Showing</Link>
        <Link to="/upcoming" className={style.link}>Upcoming Movies</Link>
        <Link to="/venues" className={style.link}>Venues</Link>
      </div>
      <Button
        text="Sign In"
        variant="navbar"
      />
    </div>
  );
};

export default Navbar;
