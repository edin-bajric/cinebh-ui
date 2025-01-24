import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames";

type Props = {
  text: string;
  variant?: "solid" | "outlined" | "navbar";
  width?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({
  text,
  variant = "solid",
  width,
  type = "button",
  onClick,
  className,
  disabled = false,
}) => {
  const buttonClass = classNames(
    styles.button,
    styles[variant],
    className,
    disabled && styles.disabledButton 
  );

  return (
    <button
      type={type}
      className={buttonClass}
      style={{ width }}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
