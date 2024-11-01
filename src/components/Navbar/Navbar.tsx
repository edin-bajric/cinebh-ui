import style from "./navbar.module.css";
import Icon from "../Icon"; 
import Button from "../Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div id={style.container}>
      <Icon /> 
      <div id={style.nav}>
        <Link to="/currently-showing" className={style.link}>Currently Showing</Link>
        <Link to="/upcoming" className={style.link}>Upcoming Movies</Link>
        <Link to="/venues" className={style.link}>Venues</Link>
      </div>
      <Button
        text="Sign In"
        color="rgba(29, 41, 57, 1)"
        textColor="rgba(252, 252, 253, 1)"
        borderColor="rgba(252, 252, 253, 1)"
      />
    </div>
  );
};

export default Navbar;
