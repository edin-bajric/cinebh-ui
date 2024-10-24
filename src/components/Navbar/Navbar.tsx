import s from "../../assets/css/navbar.module.css";
import logo from "../../assets/img/logo.png";
import Button from "../Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div id={s.container}>
      <Link to="/"><img src={logo} alt="logo" id={s.logo}/></Link>
      <div id={s.nav}>
        <Link to="/currently-showing" className={s.link}>Currently Showing</Link>
        <Link to="/upcoming" className={s.link}>Upcoming Movies</Link>
        <Link to="/venues" className={s.link}>Venues</Link>
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
