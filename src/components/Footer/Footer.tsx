import style from "./footer.module.css";
import logo from "../../assets/img/footer-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div id={style.container}>
      <div id={style.content}>
        <img src={logo} id={style.logo} />
        <div id={style.about_pricing}>
          <Link to="/about" className={style.text}>
            ABOUT US
          </Link>
          <p className={style.text}>|</p>
          <Link to="/tickets" className={style.text}>
            TICKETS
          </Link>
        </div>
        <p id={style.rights} className={style.text}>
          Copyrights @Cinebh. Built with love in Sarajevo. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
