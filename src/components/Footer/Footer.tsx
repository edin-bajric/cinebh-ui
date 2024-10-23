import "../../assets/css/footer.css";
import logo from "../../assets/img/footer-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div id="container">
      <div id="content">
        <img src={logo} id="logo"></img>
        <div id="about-pricing">
          <Link to="/about" className="text">
            ABOUT US
          </Link>
          <p className="text">|</p>
          <Link to="/pricing" className="text">
            TICKETS
          </Link>
        </div>
        <p id="rights" className="text">
          Copyrights @Cinebh. Built with love in Sarajevo. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
