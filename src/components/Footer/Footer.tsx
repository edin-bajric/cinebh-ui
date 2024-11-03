import { Link } from "react-router-dom";
import style from "./footer.module.scss";
import logo from "../../assets/img/footer-logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <img src={logo} className={style.logo} />
        <div className={style.about_pricing}>
          <Link to="/about" className={style.text} onClick={scrollToTop}>
            ABOUT US
          </Link>
          <p className={style.text}>|</p>
          <Link to="/tickets" className={style.text} onClick={scrollToTop}>
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
