import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./navbar.module.scss";
import Icon from "../Icon";
import Button from "../Button";
import ProfileDropdown from "./ProfileDropdown";
import Authentication from "../Authentication";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { decodeJwtToken } from "../../utils/decoder";
import { getUserNameFromToken } from "../../utils/getUsernameFromToken";

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"signin" | "signup">("signin");
  const { userToken } = useSelector((state: RootState) => state.auth);
  const [decodedToken, setDecodedToken] = useState<any>(null);
  const location = useLocation();

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const closeAllModals = () => {
    setModalOpen(false);
    setModalType("signin");
  };

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (userToken) {
      const decoded = decodeJwtToken(userToken);
      setDecodedToken(decoded);
    } else {
      setDecodedToken(null);
    }
  }, [userToken]);

  const username = decodedToken ? getUserNameFromToken(decodedToken) : "User";

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className={`${style.container} ${isModalOpen ? style.blur : ""}`}>
        <Icon />
        <div className={style.nav}>
          <Link
            to="/currently-showing"
            className={`${style.link} ${isActive("/currently-showing") ? style.active : ""}`}
          >
            Currently Showing
          </Link>
          <Link
            to="/upcoming"
            className={`${style.link} ${isActive("/upcoming") ? style.active : ""}`}
          >
            Upcoming Movies
          </Link>
          <Link
            to="/venues"
            className={`${style.link} ${isActive("/venues") ? style.active : ""}`}
          >
            Venues
          </Link>
        </div>

        {userToken ? (
          <ProfileDropdown userEmail={username} />
        ) : (
          <Button
            text="Sign In"
            variant="navbar"
            className={style.button}
            onClick={() => {
              setModalType("signin");
              toggleModal();
            }}
          />
        )}
      </div>

      {isModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.signInModal}>
            <Authentication
              closeAllModals={closeAllModals}
              closeModal={toggleModal}
              modalType={modalType}
              setModalType={setModalType}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
