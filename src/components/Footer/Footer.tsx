import { Link } from "react-router-dom";
import s from "../../assets/css/footer.module.css";
import logo from "../../assets/img/footer-logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id={s.container}>
      <div id={s.content}>
        <img src={logo} id={s.logo} alt="footer logo" />
        <div id={s.about_pricing}>
          <Link to="/about" className={s.text} onClick={scrollToTop}>
            ABOUT US
          </Link>
          <p className={s.text}>|</p>
          <Link to="/tickets" className={s.text} onClick={scrollToTop}>
            TICKETS
          </Link>
        </div>
        <p id={s.rights} className={s.text}>
          Copyrights @Cinebh. Built with love in Sarajevo. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
