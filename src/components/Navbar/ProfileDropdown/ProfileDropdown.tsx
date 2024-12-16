import { useState } from "react";
import style from "./profile-dropdown.module.scss";
import { FaChevronDown } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { logout, logoutUser } from "../../../store/authSlice";
import { AppDispatch } from "../../../store"; 

type Props = {
  userEmail: string;
};

const ProfileDropdown: React.FC<Props> = ({ userEmail }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>(); 

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      dispatch(logout());
      setDropdownOpen(false);
    }
  };

  return (
    <div className={style.profile_container}>
      <button className={style.container} onClick={toggleDropdown}>
        <div className={style.content}>
          <div>{userEmail}</div>
          <FaChevronDown
            className={`${style.dropdown_icon} ${
              isDropdownOpen ? style.icon_active : ""
            }`}
          />
        </div>
      </button>
      {isDropdownOpen && (
        <div className={style.dropdown}>
          <button className={style.dropdown_item} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
