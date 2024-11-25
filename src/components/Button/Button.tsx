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
  width = "auto",
  onClick,
  className,
}) => {
  const buttonClass = classNames(styles.button, styles[variant], className);

  return (
    <div className={styles.container}>
      <button
        type="submit"
        className={buttonClass}
        style={{ width }}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
