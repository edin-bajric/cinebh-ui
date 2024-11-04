import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import style from "./icon.module.css";

type IconProps = {
  to?: string;
  src?: string; 
  alt?: string;
  className?: string;
};

const Icon: React.FC<IconProps> = ({
  to = "/",
  src = logo,
  alt = "Logo", 
  className = "",
}) => {
  return (
    <Link to={to} className={`${style.icon} ${className}`}>
      <img src={src} alt={alt} className={style.image} />
    </Link>
  );
};

export default Icon;
