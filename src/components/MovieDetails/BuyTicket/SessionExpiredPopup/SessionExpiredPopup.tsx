import React from "react";
import style from "./session-expired-popup.module.scss";
import Button from "../../../Button";

type Props = {
  onClose: () => void;
};

const SessionExpiredPopup: React.FC<Props> = ({ onClose }) => {
  return (
    <div className={style.overlay}>
      <div className={style.popup}>
        <div className={style.text}>
          <p className={style.title}>Session Expired</p>
          <p className={style.subtitle}>
            Your session expired and seats have been refreshed and updated.
          </p>
        </div>
        <div className={style.button_container}>
          <Button text="Okay" onClick={onClose} className={style.button} />
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredPopup;
