import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import style from "./icon.module.css";

const Icon = () => {
  return (
    <Link to="/" className={style.icon}>
      <img src={logo} alt="Home" />
    </Link>
  );
};

export default Icon;
