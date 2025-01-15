import { useEffect } from "react";
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

type NavbarProps = {
  isModalOpen: boolean;
  modalType: "signin" | "signup";
  openModal: () => void;
  closeModal: () => void;
  setModalType: (type: "signin" | "signup") => void;
};

const Navbar: React.FC<NavbarProps> = ({
  isModalOpen,
  modalType,
  openModal,
  closeModal,
  setModalType,
}) => {
  const { userToken } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const decodedToken = userToken ? decodeJwtToken(userToken) : null;
  const username = decodedToken ? getUserNameFromToken(decodedToken) : "User";

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

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
            onClick={openModal}
          />
        )}
      </div>

      {isModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.signInModal}>
            <Authentication
              closeAllModals={closeModal}
              closeModal={closeModal}
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
