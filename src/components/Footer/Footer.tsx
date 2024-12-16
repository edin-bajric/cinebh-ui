import { Link } from "react-router-dom";
import style from "./footer.module.scss";
import logo from "../../assets/img/footer-logo.png";

const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <img src={logo} className={style.logo} />
        <div className={style.about_pricing}>
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
