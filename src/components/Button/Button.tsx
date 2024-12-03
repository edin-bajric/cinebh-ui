import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames";

type Props = {
  text: string;
  variant?: "solid" | "outlined" | "navbar";
  width?: string;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<Props> = ({
  text,
  variant = "solid",
  width,
  onClick,
  className,
}) => {
  const buttonClass = classNames(styles.button, styles[variant], className);

  return (
    <button
      type="submit"
      className={buttonClass}
      style={{ width }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
