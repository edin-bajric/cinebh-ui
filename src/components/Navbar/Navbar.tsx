import style from "./navbar.module.css";
import logo from "../../assets/img/logo.png";
import Button from "../Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div id={style.container}>
      <Link to="/"><img src={logo} alt="logo" id={style.logo}/></Link>
      <div id={style.nav}>
        <Link to="/currently-showing" className={style.link}>Currently Showing</Link>
        <Link to="/upcoming" className={style.link}>Upcoming Movies</Link>
        <Link to="/venues" className={style.link}>Venues</Link>
      </div>
      <Button
        text={"Sign In"}
        color={"rgba(29, 41, 57, 1)"}
        textColor={"rgba(252, 252, 253, 1)"}
        borderColor={"rgba(252, 252, 253, 1)"}
      ></Button>
    </div>
  );
};

export default Navbar;
