import React from "react";
import style from "./popup.module.scss";
import Button from "../../../Button";

type Props = {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonAction: () => void;
  className?: string;
};

const Popup: React.FC<Props> = ({
  title,
  subtitle,
  buttonText,
  buttonAction,
  className,
}) => {
  return (
    <div className={style.overlay}>
      <div className={style.popup}>
        <div className={style.text}>
          <p className={style.title}>{title}</p>
          <p className={style.subtitle}>{subtitle}</p>
        </div>
        <div className={style.button_container}>
          <Button
            text={buttonText}
            onClick={buttonAction}
            className={className || style.button}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
