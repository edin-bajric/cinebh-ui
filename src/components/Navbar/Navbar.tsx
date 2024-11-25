import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./navbar.module.scss";
import Icon from "../Icon";
import Button from "../Button";
import SignIn from "../SignIn";

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <>
      <div className={`${style.container} ${isModalOpen ? style.blur : ""}`}>
        <Icon />
        <div className={style.nav}>
          <Link to="/currently-showing" className={style.link}>
            Currently Showing
          </Link>
          <Link to="/upcoming" className={style.link}>
            Upcoming Movies
          </Link>
          <Link to="/venues" className={style.link}>
            Venues
          </Link>
        </div>
        <Button
          text="Sign In"
          variant="navbar"
          className={style.button}
          onClick={toggleModal}
        />
      </div>

      {isModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.signInModal}>
            <SignIn closeModal={toggleModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
